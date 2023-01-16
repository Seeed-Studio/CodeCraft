#define TAG "WIFI CALLBACK"
#include "Arduino.h"
#include "wifi_unified.h"
#include "erpc/erpc_shim_unified.h"
#include "erpc/erpc_port.h"
#include "esp/esp_lib_unified.h"
#include "rpc_unified_log.h"
#include "lwip/dns.h"
#include "lwip/tcp.h"

extern void copy_rtp_to_tp(struct rpc_tcp_pcb *rpc_pcb,struct tcp_pcb *pcb);

system_event_cb_t ptr_wifi_event_callback = NULL;

void rpc_wifi_dns_found(const char *hostname, const binary_t *ipaddr, const binary_t *arg)
{
    FUNC_ENTRY;
    uint32_t *ptr_args;
    dns_found_callback ptr_found;

    memcpy(&ptr_found, arg->data, 4);
    memcpy(&ptr_args, arg->data + 4, 4);
    if (ptr_found != NULL)
    {
        ptr_found(hostname, (ip_addr_t *)ipaddr->data, (void *)ptr_args);
    }
    FUNC_EXIT;
}

void rpc_wifi_event_callback(const binary_t *event)
{
    FUNC_ENTRY;
    system_event_t *event_data = (system_event_t *)event->data;

    if (ptr_wifi_event_callback != NULL)
    {
        ptr_wifi_event_callback(NULL, event_data);
    }
    FUNC_EXIT;
}

int32_t rpc_tcpip_api_call_fn(uint32_t func, const binary_t * call)
{
    RPC_DEBUG("call");
    return ERR_OK;
}

//typedef err_t (*tcp_connected_fn)(void *arg, struct tcp_pcb *tpcb, err_t err);
int32_t rpc_tcp_connected_fn(uint32_t func, const binary_t * arg, const binary_t * tpcb, int32_t err_val)
{
    tcp_connected_fn func_p = (tcp_connected_fn)func;
    uint32_t arg_addr = *(uint32_t *)arg->data;
    void * arg_p = (void *)arg_addr;
    struct tcp_pcb * tpcb_p = NULL;

    if(tpcb->data != NULL){
        struct rpc_tcp_pcb * rtp = (struct rpc_tcp_pcb *)tpcb->data;
        tpcb_p = (struct tcp_pcb *)rtp->master_addr;
        copy_rtp_to_tp(rtp,tpcb_p);
    }

    RPC_DEBUG("func:%x,arg:%x,pcb:%x,err:%d",func,arg_p,tpcb_p->client_addr,err_val);

    func_p(arg_p,tpcb_p,err_val);

    return ERR_OK;
}

//typedef err_t (*tcp_recv_fn)(void *arg, struct tcp_pcb *tpcb,struct pbuf *p, err_t err);
int32_t rpc_tcp_recv_fn(uint32_t func, const binary_t * arg, const binary_t * tpcb, const binary_t * p_data, const binary_t * p_addr, int32_t err_val)
{
    tcp_recv_fn func_p = (tcp_recv_fn)func;
    uint32_t arg_addr = *(uint32_t *)arg->data;
    void * arg_p = (void *)arg_addr;
    struct tcp_pcb * tpcb_p = NULL;
    struct pbuf *pbuf_p = NULL;
    void *pbuf_payload_p = NULL;

    if(tpcb->data != NULL){
        struct rpc_tcp_pcb * rtp = (struct rpc_tcp_pcb *)tpcb->data;
        tpcb_p = (struct tcp_pcb *)rtp->master_addr;
        copy_rtp_to_tp(rtp,tpcb_p);
    }

    if(p_data->data && p_addr->data){
        if(*((uint32_t *)p_addr->data) != NULL){
            pbuf_payload_p = erpc_malloc(p_data->dataLength);
            if(pbuf_payload_p != NULL){
                memcpy(pbuf_payload_p,p_data->data,p_data->dataLength);
                pbuf_p = (struct pbuf *)erpc_malloc(sizeof(pbuf));
                if(pbuf_p != NULL){
               
                    pbuf_p->next = NULL;
                    pbuf_p->payload = pbuf_payload_p;
                    pbuf_p->tot_len = p_data->dataLength;
                    pbuf_p->len = p_data->dataLength;
                    pbuf_p->master_addr = (uint32_t)pbuf_p;
                    pbuf_p->client_addr = *((uint32_t *)p_addr->data);
                    RPC_DEBUG("func:%x,arg:%x,pcb:%x(%x,%x),pbuf:%d,%x,err:%d",func,arg_p,tpcb_p,tpcb_p->master_addr,tpcb_p->client_addr,pbuf_p->tot_len,pbuf_p->client_addr,err_val);
                    func_p(arg_p,tpcb_p,pbuf_p,err_val);
                }else{
                    // Serial.printf("rpc_tcp_recv_fn pbuf_p malloc failed \r\n");
                }
            }else{
                // Serial.printf("rpc_tcp_recv_fn pbuf_payload_p malloc failed \r\n");
            }
        }else{
            RPC_DEBUG("func:%x,arg:%x,pcb:%x,pbuf null,err:%d",func,arg_p,tpcb_p->client_addr,err_val);
            func_p(arg_p,tpcb_p,pbuf_p,err_val);
        }
    }

    return ERR_OK;
}

//typedef void  (*tcp_err_fn)(void *arg, err_t err);
int32_t rpc_tcp_err_fn(uint32_t func, const binary_t * arg, int32_t err_val)
{
    tcp_err_fn func_p = (tcp_err_fn)func;
    uint32_t arg_addr = *(uint32_t *)arg->data;
    void * arg_p = (void *)arg_addr;

    RPC_DEBUG("func:%x,arg:%x,err:%d",func,arg_p,err_val);

    func_p(arg_p,err_val);

    return ERR_OK;
}

//typedef err_t (*tcp_sent_fn)(void *arg, struct tcp_pcb *tpcb,u16_t len);
int32_t rpc_tcp_sent_fn(uint32_t func, const binary_t * arg, const binary_t * tpcb, uint16_t len)
{
    tcp_sent_fn func_p = (tcp_sent_fn)func;
    uint32_t arg_addr = *(uint32_t *)arg->data;
    void * arg_p = (void *)arg_addr;
    struct tcp_pcb * tpcb_p = NULL;

    if(tpcb->data != NULL){
        struct rpc_tcp_pcb * rtp = (struct rpc_tcp_pcb *)tpcb->data;
        tpcb_p = (struct tcp_pcb *)rtp->master_addr;
        copy_rtp_to_tp(rtp,tpcb_p);
    }

    RPC_DEBUG("func:%x,arg:%x,pcb:%x,len:%d",func,arg_p,tpcb_p->client_addr,len);

    func_p(arg_p,tpcb_p,len);

    return ERR_OK;
}

//typedef err_t (*tcp_poll_fn)(void *arg, struct tcp_pcb *tpcb);
int32_t rpc_tcp_poll_fn(uint32_t func, const binary_t * arg, const binary_t * tpcb)
{
    tcp_poll_fn func_p = (tcp_poll_fn)func;
    uint32_t arg_addr = *(uint32_t *)arg->data;
    void * arg_p = (void *)arg_addr;
    struct tcp_pcb * tpcb_p = NULL;

    if(tpcb->data != NULL){
        struct rpc_tcp_pcb * rtp = (struct rpc_tcp_pcb *)tpcb->data;
        tpcb_p = (struct tcp_pcb *)rtp->master_addr;
        copy_rtp_to_tp(rtp,tpcb_p);
    }

    RPC_DEBUG("func:%x,arg:%x,pcb:%x",func,arg_p,tpcb_p->client_addr);

    func_p(arg_p,tpcb_p);

    return ERR_OK;
}

//typedef err_t (*tcp_accept_fn)(void *arg, struct tcp_pcb *newpcb, err_t err);
int32_t rpc_tcp_accept_fn(uint32_t func, const binary_t * arg, const binary_t * newpcb, int32_t err_val)
{
    tcp_accept_fn func_p = (tcp_accept_fn)func;
    uint32_t arg_addr = *(uint32_t *)arg->data;
    void * arg_p = (void *)arg_addr;
    struct tcp_pcb * newpcb_p = NULL;

    if(newpcb->data != NULL){
        struct rpc_tcp_pcb * rtp = (struct rpc_tcp_pcb *)newpcb->data;
        newpcb_p = (struct tcp_pcb *)erpc_malloc(sizeof(tcp_pcb));
        copy_rtp_to_tp(rtp,newpcb_p);
        newpcb_p->master_addr = (uint32_t)newpcb_p;
    }

    RPC_DEBUG("func:%x,arg:%x,pcb:%x,err:%d",func_p,arg_p,newpcb_p->client_addr,err_val);

    func_p(arg_p,newpcb_p,err_val);

    return ERR_OK;
}
