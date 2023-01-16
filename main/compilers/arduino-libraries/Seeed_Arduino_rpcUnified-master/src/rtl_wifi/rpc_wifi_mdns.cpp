#define TAG "WIFI API"
#include "rpc_wifi_api_utils.h"

#include <stdlib.h>
#include <string.h>
#include "erpc/erpc_shim_unified.h"
#include "erpc/erpc_port.h"
#include "esp/esp_lib_unified.h"
#include "rpc_wifi_mdns.h"

#define MDNS_NAME_MAX_LEN           64                      // Maximum string length of hostname, instance, service and proto
#define MDNS_NAME_BUF_LEN           (MDNS_NAME_MAX_LEN+1)   // Maximum char buffer size to hold hostname, instance, service or proto

typedef struct {
    const char key[MDNS_NAME_BUF_LEN];
    const char value[MDNS_NAME_BUF_LEN];
} rpc_mdns_txt_item_t;

typedef struct rpc_mdns_result_basic_s {
    tcpip_adapter_if_t tcpip_if;
    mdns_ip_protocol_t ip_protocol;
    // PTR
    char instance_name[MDNS_NAME_BUF_LEN];
    // SRV
    char hostname[MDNS_NAME_BUF_LEN];
    uint16_t port;
    // TXT
    uint16_t txt_count;
    // A and AAAA
    uint16_t addr_count;
} rpc_mdns_result_basic_s;

esp_err_t mdns_init(void)
{
    FUNC_ENTRY;
    esp_err_t ret = rpc_mdns_init();
    FUNC_EXIT;

    return ret;
}

void mdns_free(void)
{
    FUNC_ENTRY;
    esp_err_t ret = rpc_mdns_free();
    FUNC_EXIT;
}

esp_err_t mdns_hostname_set(const char * hostname)
{
    FUNC_ENTRY;
    esp_err_t ret = rpc_mdns_hostname_set(hostname);
    FUNC_EXIT;

    return ret;
}

esp_err_t mdns_instance_name_set(const char * instance_name)
{
    FUNC_ENTRY;
    esp_err_t ret = rpc_mdns_instance_name_set(instance_name);
    FUNC_EXIT;
    return ret;
}

esp_err_t mdns_service_add(const char * instance_name, const char * service_type, const char * proto, uint16_t port, mdns_txt_item_t txt[], size_t num_items)
{
    int count = 0;
    esp_err_t ret;

    FUNC_ENTRY;

    if(instance_name == NULL){
        ret = rpc_mdns_service_add("NULL",service_type,proto,port);
    }else{
        ret = rpc_mdns_service_add(instance_name,service_type,proto,port);
    }

    if(ret == ESP_OK){
        for(count = 0 ; count < num_items ; count++){
            rpc_mdns_service_txt_item_set(service_type,proto,txt[count].key,txt[count].value);
        }
    }
    FUNC_EXIT;
    return ret;
}

esp_err_t mdns_service_remove(const char * service_type, const char * proto)
{
    FUNC_ENTRY;
    esp_err_t ret = rpc_mdns_service_remove(service_type,proto);
    FUNC_EXIT;
    return ret;
}

esp_err_t mdns_service_txt_item_set(const char * service_type, const char * proto, const char * key, const char * value)
{
    FUNC_ENTRY;
    esp_err_t ret = rpc_mdns_service_txt_item_set(service_type,proto,key,value);
    FUNC_EXIT;
    return ret;
}

esp_err_t mdns_service_instance_name_set(const char * service, const char * proto, const char * instance)
{
    FUNC_ENTRY;
    esp_err_t ret = rpc_mdns_service_instance_name_set(service,proto,instance);
    FUNC_EXIT;
    return ret;
}

void mdns_query_results_free(mdns_result_t * results)
{
    mdns_result_t * r;
    mdns_ip_addr_t * a;
    int i;
    
    FUNC_ENTRY;
    r = results;
    if(r != NULL){
        while (r) {

            free((char *)(r->hostname));
            free((char *)(r->instance_name));

            for (i=0; i<r->txt_count; i++) {
                free((char *)(r->txt[i].key));
                free((char *)(r->txt[i].value));
            }
            erpc_free(r->txt);
            while (r->addr) {
                a = r->addr;
                r->addr = r->addr->next;
                erpc_free(a);
            }

            r = r->next;
        }
        erpc_free(results);
    }

    rpc_mdns_query_results_free();
    FUNC_EXIT;
}

esp_err_t mdns_query_ptr(const char * service_type, const char * proto, uint32_t timeout, size_t max_results, mdns_result_t ** results)
{
    int32_t result_total;
    mdns_result_t * result;
    mdns_ip_addr_t * mdns_addr;
    rpc_mdns_result_basic_s * rpc_result;
    binary_t binary_result;
    binary_t binary_txt;
    binary_t binary_addr;
    esp_err_t ret;
    int count_result = 0;
    int count_txt = 0;
    int count_addr = 0;

    FUNC_ENTRY;

    if(*results != NULL){
        mdns_query_results_free(*results);
    }

    ret = rpc_mdns_query_ptr(service_type,proto,timeout,max_results,&result_total);
    if(ret == ESP_OK && result_total > 0){
        *results = (mdns_result_t *)erpc_malloc(sizeof(mdns_result_t) * result_total);
        if(*results){
            for(count_result = 0 ; count_result < result_total ; count_result++){
                result = results[count_result];
                result->next = NULL;
                result->txt = NULL;
                result->addr = NULL;
                result->instance_name = NULL;
                result->hostname = NULL;
                ret = rpc_mdns_query_ptr_result_basic(count_result,&binary_result);
                if(ret == ESP_OK){
                    rpc_result = (rpc_mdns_result_basic_s * )binary_result.data;
                    result->tcpip_if = rpc_result->tcpip_if;
                    result->ip_protocol = rpc_result->ip_protocol;
                    result->port = rpc_result->port;
                    result->txt_count = rpc_result->txt_count;
                    result->txt = (mdns_txt_item_t *)erpc_malloc(sizeof(mdns_txt_item_t) * result->txt_count);
                    result->instance_name = strndup(rpc_result->instance_name,MDNS_NAME_BUF_LEN);
                    result->hostname = strndup(rpc_result->hostname,MDNS_NAME_BUF_LEN);

                    if(result->txt_count > 0 && result->txt == NULL){
                        FUNC_EXIT;
                        return ESP_FAIL;
                    }

                    if(result->instance_name == NULL || result->hostname == NULL){
                        FUNC_EXIT;
                        return ESP_FAIL;
                    }

                    for(count_txt = 0 ; count_txt < rpc_result->txt_count ; count_txt++){
                        uint16_t * key_size;
                        uint16_t * value_size;
                        char * key;
                        char * value;
                        ret = rpc_mdns_query_ptr_result_txt(count_result,count_txt,&binary_txt);
                        if(ret == ESP_OK){
                            key_size = (uint16_t *)&binary_txt.data[0];
                            value_size = (uint16_t *)&binary_txt.data[2];
                            key = (char *)&binary_txt.data[4];
                            value = (char *)&binary_txt.data[4 + *key_size];

                            result->txt[count_txt].key = strdup(key);
                            result->txt[count_txt].value = strdup(value);

                            if(result->txt[count_txt].key == NULL || result->txt[count_txt].value == NULL){
                                FUNC_EXIT;
                                return ESP_FAIL;
                            }
                        }
                        if(binary_txt.data){
                            erpc_free(binary_txt.data);
                        }
                    }

                    for(count_addr = 0 ; count_addr < rpc_result->addr_count ; count_addr++){
                        ret = rpc_mdns_query_ptr_result_addr(count_result,count_addr,&binary_addr);
                        if(ret == ESP_OK){
                            mdns_addr = (mdns_ip_addr_t *)erpc_malloc(sizeof(mdns_ip_addr_t));

                            mdns_addr->addr.type = IPADDR_TYPE_V4;
                            memcpy(&mdns_addr->addr.u_addr.ip4.addr,binary_addr.data,sizeof(u32_t));
                            
                            mdns_addr->next = result->addr;
                            result->addr = mdns_addr;
                        }
                        if(binary_addr.data){
                            erpc_free(binary_addr.data);
                        }
                    }

                    if(binary_result.data){
                        erpc_free(binary_result.data);
                    }
                }else{
                    FUNC_EXIT;
                    return ESP_FAIL;
                }
            }
        }
 
    }
    FUNC_EXIT;
    return ret;
}

esp_err_t mdns_query_a(const char * host_name, uint32_t timeout, ip4_addr_t * addr)
{
    binary_t binary_addr;

    FUNC_ENTRY;

    esp_err_t ret = rpc_mdns_query_a(host_name,timeout,&binary_addr);
    if(ret == ESP_OK){
        memcpy(&addr->addr,binary_addr.data,sizeof(u32_t));
    }

    if(binary_addr.data){
        erpc_free(binary_addr.data);
    }

    FUNC_EXIT;

    return ret;
}

esp_err_t mdns_handle_system_event(void *ctx, system_event_t *event)
{
    return ESP_OK;
}
