/*
 *  The MIT License (MIT)
 *  Copyright (C) 2020  Seeed Technology Co.,Ltd.
 */

#define TAG "WIFI LWIP"
#include "rpc_wifi_lwip_utils.h"

#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "sockets.h"
#include "erpc/erpc_shim_unified.h"
#include "erpc/erpc_port.h"

int lwip_errno()
{
    int so_error = rpc_lwip_errno();
    return so_error;
}

int lwip_accept(int s, struct sockaddr *addr, socklen_t *addrlen)
{
    FUNC_ENTRY;
    binary_t b_addr;
    b_addr.data = (uint8_t *)addr;
    b_addr.dataLength = sizeof(struct sockaddr);
    int ret = rpc_lwip_accept(s, &b_addr, addrlen);
    FUNC_EXIT_RC(ret);
}
int lwip_bind(int s, const struct sockaddr *name, socklen_t namelen)
{
    FUNC_ENTRY;
    binary_t b_name;
    b_name.data = (uint8_t *)name;
    b_name.dataLength = sizeof(struct sockaddr);
    int ret = rpc_lwip_bind(s, &b_name, namelen);
    FUNC_EXIT_RC(ret);
}
int lwip_shutdown(int s, int how)
{
    RPC_FUN_RETURN_2(lwip_shutdown, s, how, int);
}
int lwip_getpeername(int s, struct sockaddr *name, socklen_t *namelen)
{
    FUNC_ENTRY;
    binary_t b_name;
    int ret = rpc_lwip_getpeername(s, &b_name, namelen);
    memcpy(name, b_name.data, sizeof(struct sockaddr));
    FUNC_EXIT_RC(ret);
}
int lwip_getsockname(int s, struct sockaddr *name, socklen_t *namelen)
{
    FUNC_ENTRY;
    binary_t b_name;
    int ret = rpc_lwip_getsockname(s, &b_name, namelen);
    memcpy(name, b_name.data, sizeof(struct sockaddr));
    FUNC_EXIT_RC(ret);
}
int lwip_getsockopt(int s, int level, int optname, void *optval, socklen_t *optlen)
{
    FUNC_ENTRY;
    binary_t b_in_optval, b_out_optval;
    b_in_optval.data = (uint8_t *)optval;
    b_in_optval.dataLength = *optlen;
    int ret = rpc_lwip_getsockopt(s, level, optname, &b_in_optval, &b_out_optval, optlen);
    memcpy(optval, b_out_optval.data, b_out_optval.dataLength);
    if (b_out_optval.data != NULL)
    {
        erpc_free(b_out_optval.data);
    }
    FUNC_EXIT_RC(ret);
}
int lwip_setsockopt(int s, int level, int optname, const void *optval, socklen_t optlen)
{
    FUNC_ENTRY;
    binary_t b_optval;
    b_optval.data = (uint8_t *)optval;
    b_optval.dataLength = (uint32_t)optlen;
    int ret = rpc_lwip_setsockopt(s, level, optname, &b_optval, optlen);
    FUNC_EXIT_RC(ret);
}
int lwip_close(int s)
{
    RPC_FUN_RETURN_1(lwip_close, s, int);
}
int lwip_connect(int s, const struct sockaddr *name, socklen_t namelen)
{
    FUNC_ENTRY;
    binary_t b_name;
    b_name.data = (uint8_t *)name;
    b_name.dataLength = sizeof(struct sockaddr);
    int ret = rpc_lwip_connect(s, &b_name, namelen);
    FUNC_EXIT_RC(ret);
}
int lwip_listen(int s, int backlog)
{
    RPC_FUN_RETURN_2(lwip_listen, s, backlog, int);
}

int lwip_available(int s)
{
    RPC_FUN_RETURN_1(lwip_available, s, int);
}

int lwip_recv(int s, void *mem, size_t len, int flags)
{
    FUNC_ENTRY;
    binary_t b_mem;
    int ret = rpc_lwip_recv(s, &b_mem, len, flags, len*10);
    if (ret > 0)
    {
        memcpy(mem, b_mem.data, b_mem.dataLength);
    }
    if (b_mem.data != NULL)
    {
        erpc_free(b_mem.data);
    }
    FUNC_EXIT_RC(ret);
}
int lwip_read(int s, void *mem, size_t len)
{
    FUNC_ENTRY;
    binary_t b_mem;
    int ret = rpc_lwip_read(s, &b_mem, len, len * 10);
    if (ret > 0)
    {
        memcpy(mem, b_mem.data, b_mem.dataLength);
    }
    if (b_mem.data != NULL)
    {
        erpc_free(b_mem.data);
    }
    FUNC_EXIT_RC(ret);
}

int lwip_recvfrom(int s, void *mem, size_t len, int flags,struct sockaddr *from, socklen_t *fromlen)
{
    FUNC_ENTRY;
    binary_t b_mem;
    binary_t b_from;
    
    int ret = rpc_lwip_recvfrom(s, &b_mem, len, flags, &b_from, fromlen, len * 10);
	// rpc_printf("recvfrom  %d %d %d\r\n",  ret ,flags,s); 
    if (ret > 0)
    {
        memcpy(mem, b_mem.data, b_mem.dataLength);
        memcpy(from,b_from.data,b_from.dataLength);
    }

    if (b_mem.data != NULL)
    {
        erpc_free(b_mem.data);
    }

    if (b_from.data != NULL)
    {
        erpc_free(b_from.data);
    }

    FUNC_EXIT_RC(ret);
}
int lwip_send(int s, const void *dataptr, size_t size, int flags)
{
    FUNC_ENTRY;
    binary_t b_data;
    b_data.data = (uint8_t *)dataptr;
    b_data.dataLength = (uint32_t)size;
#ifdef ENABLE_RPC_DEBUG
    for (int i = 0; i < size; i++)
    {
        rpc_printf("%c", b_data.data[i]);
    }
    rpc_printf("\n\r");
#endif
    int ret = rpc_lwip_send(s, &b_data, flags);
    FUNC_EXIT_RC(ret);
}
int lwip_sendmsg(int s, const struct msghdr *message, int flags)
{
    FUNC_ENTRY;
    binary_t b_msg_name;
    b_msg_name.data = message->msg_name;
    b_msg_name.dataLength = message->msg_namelen;
    binary_t b_msg_iov;
    b_msg_iov.data = message->msg_iov->iov_base;
    b_msg_iov.dataLength = message->msg_iov->iov_len;
    binary_t b_msg_control;
    b_msg_control.data = message->msg_control;
    b_msg_control.dataLength = message->msg_controllen;
    int ret = rpc_lwip_sendmsg(s, &b_msg_name, &b_msg_iov, &b_msg_control, message->msg_flags, flags);
    FUNC_EXIT_RC(ret);
}
int lwip_sendto(int s, const void *dataptr, size_t size, int flags,
                const struct sockaddr *to, socklen_t tolen)
{
    FUNC_ENTRY;
    binary_t b_data;
    b_data.data = (uint8_t *)dataptr;
    b_data.dataLength = (uint32_t)size;
    binary_t b_to;
    b_to.data = (uint8_t *)to;
    b_to.dataLength = sizeof(struct sockaddr);
    int ret = rpc_lwip_sendto(s, &b_data, flags, &b_to, tolen);
    FUNC_EXIT_RC(ret);
}
int lwip_socket(int domain, int type, int protocol)
{
    RPC_FUN_RETURN_3(lwip_socket, domain, type, protocol, int);
}
int lwip_write(int s, const void *dataptr, size_t size)
{
    FUNC_ENTRY;
    binary_t b_data;
    b_data.data = (uint8_t *)dataptr;
    b_data.dataLength = (uint32_t)size;
    int ret = rpc_lwip_write(s, &b_data, size);
    FUNC_EXIT_RC(ret);
}
int lwip_writev(int s, const struct iovec *iov, int iovcnt)
{
    FUNC_ENTRY;
    binary_t b_iov;
    b_iov.data = (uint8_t *)iov->iov_base;
    b_iov.dataLength = (uint32_t)iov->iov_len;
    int ret = rpc_lwip_writev(s, &b_iov, iovcnt);
    FUNC_EXIT_RC(ret);
}
int lwip_select(int maxfdp1, fd_set *readset, fd_set *writeset, fd_set *exceptset,
                struct timeval *timeout)
{
    FUNC_ENTRY;
    binary_t *b_readset = NULL;
    if (readset != NULL)
    {
        b_readset = (binary_t *)erpc_malloc(sizeof(binary_t));
        b_readset->data = (uint8_t *)readset;
        b_readset->dataLength = sizeof(fd_set);
    }
    binary_t *b_writeset = NULL;
    if (writeset != NULL)
    {
        b_writeset = (binary_t *)erpc_malloc(sizeof(binary_t));
        b_writeset->data = (uint8_t *)writeset;
        b_writeset->dataLength = sizeof(fd_set);
    }
    binary_t *b_exceptset = NULL;
    if (exceptset != NULL)
    {
        b_exceptset = (binary_t *)erpc_malloc(sizeof(binary_t));
        b_exceptset->data = (uint8_t *)exceptset;
        b_exceptset->dataLength = sizeof(fd_set);
    }
    binary_t *b_timeout = NULL;
    if (timeout != NULL)
    {
        b_timeout = (binary_t *)erpc_malloc(sizeof(binary_t));
        b_timeout->data = (uint8_t *)timeout;
        b_timeout->dataLength = sizeof(struct timeval);
    }
    int ret = rpc_lwip_select(maxfdp1, b_readset, b_writeset, b_exceptset, b_timeout);
    if (b_readset != NULL)
    {
        erpc_free(b_readset);
    }
    if (b_writeset != NULL)
    {
        erpc_free(b_writeset);
    }
    if (b_exceptset != NULL)
    {
        erpc_free(b_exceptset);
    }
    if (b_timeout != NULL)
    {
        erpc_free(b_timeout);
    }
    FUNC_EXIT_RC(ret);
}
int lwip_ioctl(int s, long cmd, void *argp)
{
    FUNC_ENTRY;
    binary_t b_in_argp;
    binary_t b_out_argp;
    b_in_argp.data = (uint8_t *)argp;
    b_in_argp.dataLength = 4;

    int ret = rpc_lwip_ioctl(s, cmd, &b_in_argp, &b_out_argp);
    memcpy(argp, b_out_argp.data, b_in_argp.dataLength);
    if (b_out_argp.data != NULL)
    {
        erpc_free(b_out_argp.data);
    }
    FUNC_EXIT_RC(ret);
}
int lwip_fcntl(int s, int cmd, int val)
{
    RPC_FUN_RETURN_3(lwip_fcntl, s, cmd, val, int);
}

u16_t atu_htons(u16_t x)
{
    u16_t y = ((x << 8) | (x >> 8));
    return y;
}

u32_t atu_htonl(u32_t x)
{
    union
    {
        u32_t y;
        char c[4];
    } u;

    u.c[0] = ((char *)&x)[3];
    u.c[1] = ((char *)&x)[2];
    u.c[2] = ((char *)&x)[1];
    u.c[3] = ((char *)&x)[0];
    return u.y;
}
