/*
 *  The MIT License (MIT)
 *  Copyright (C) 2020  Seeed Technology Co.,Ltd.
 */

#define TAG "WIFI LWIP"
#include "rpc_wifi_lwip_utils.h"

#include <stdbool.h>
#include <string.h>
#include <stdlib.h>
#include "dns.h"
#include "erpc/erpc_shim_unified.h"
#include "erpc/erpc_port.h"

/**
 * @ingroup dns
 * Resolve a hostname (string) into an IP address.
 * NON-BLOCKING callback version for use with raw API!!!
 *
 * Returns immediately with one of err_t return codes:
 * - ERR_OK if hostname is a valid IP address string or the host
 *   name is already in the local names table.
 * - ERR_INPROGRESS enqueue a request to be sent to the DNS server
 *   for resolution if no errors are present.
 * - ERR_ARG: dns client not initialized or invalid hostname
 *
 * @param hostname the hostname that is to be queried
 * @param addr pointer to a ip_addr_t where to store the address if it is already
 *             cached in the dns_table (only valid if ERR_OK is returned!)
 * @param found a callback function to be called on success, failure or timeout (only if
 *              ERR_INPROGRESS is returned!)
 * @param callback_arg argument to pass to the callback function
 * @return a err_t return code.
 */
err_t dns_gethostbyname(const char *hostname, ip_addr_t *addr, dns_found_callback found,
                        void *callback_arg)
{
  return dns_gethostbyname_addrtype(hostname, addr, found, callback_arg, LWIP_DNS_ADDRTYPE_DEFAULT);
}

/**
 * @ingroup dns
 * Like dns_gethostbyname, but returned address type can be controlled:
 * @param hostname the hostname that is to be queried
 * @param addr pointer to a ip_addr_t where to store the address if it is already
 *             cached in the dns_table (only valid if ERR_OK is returned!)
 * @param found a callback function to be called on success, failure or timeout (only if
 *              ERR_INPROGRESS is returned!)
 * @param callback_arg argument to pass to the callback function
 * @param dns_addrtype - LWIP_DNS_ADDRTYPE_IPV4_IPV6: try to resolve IPv4 first, try IPv6 if IPv4 fails only
 *                     - LWIP_DNS_ADDRTYPE_IPV6_IPV4: try to resolve IPv6 first, try IPv4 if IPv6 fails only
 *                     - LWIP_DNS_ADDRTYPE_IPV4: try to resolve IPv4 only
 *                     - LWIP_DNS_ADDRTYPE_IPV6: try to resolve IPv6 only
 */
err_t dns_gethostbyname_addrtype(const char *hostname, ip_addr_t *addr, dns_found_callback found,
                                 void *callback_arg, u8_t dns_addrtype)
{
  FUNC_ENTRY;
  binary_t b_addr;
  binary_t b_callback_arg;
  uint8_t *data = NULL;
  if (found != NULL)
  {
    data = (uint8_t *)erpc_malloc(8);
    memcpy(data, &found, 4);
    memcpy(data + 4, &callback_arg, 4);
    b_callback_arg.data = data;
    b_callback_arg.dataLength = 8;
  }
  else
  {
    data = (uint8_t *)erpc_malloc(4);
    memcpy(data, &callback_arg, 4);
    b_callback_arg.data = data;
    b_callback_arg.dataLength = 4;
  }
  err_t ret = rpc_dns_gethostbyname_addrtype(hostname, &b_addr, (uint32_t)found, &b_callback_arg, dns_addrtype);
  memcpy(addr, b_addr.data, sizeof(ip_addr_t));
  if(data != NULL)
  {
    erpc_free(data);
    data = NULL;
  }
  if(b_addr.data != NULL)
  {
    erpc_free(b_addr.data);
    b_addr.data = NULL;
  }
  FUNC_EXIT_RC((int8_t)ret);
}
