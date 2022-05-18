
#include <time.h>
#include <sys/time.h>
#include <stdlib.h>
#include "esp_hal_log.h"
#include "FreeRTOS.h"

//used by hal log
const char * pathToFileName(const char * path)
{
    size_t i = 0;
    size_t pos = 0;
    char * p = (char *)path;
    while(*p){
        i++;
        if(*p == '/' || *p == '\\'){
            pos = i;
        }
        p++;
    }
    return path+pos;
}

int dump_tasks(void) {
    static char TaskListBuf[0x180];

    vTaskList(TaskListBuf);
    rpc_printf(TaskListBuf);
    return 0;
}

int ntp_conf_time(int timezone, int reserved, const char* server1, const char* server2, const char* server3) {
    (void)timezone;
    (void)reserved;
    (void)server1;
    (void)server2;
    (void)server3;
    // esp_datetime_t et[1];
    // struct tm tm[1] = {{0}};
    // struct timeval tv[1];
    // espr_t r;

    // r = esp_sntp_configure(1, timezone, server1, server2, server3, NULL, NULL, 1);
    // if (r != espOK) {
    //     return -1;
    // }

    // r = esp_sntp_gettime(et, NULL, NULL, 1);
    // if (r != espOK) {
    //     return -1;
    // }

    // tm->tm_year = et->year - 1900U;
    // /* tm_mon in [0..11], month in [1..12] */
    // tm->tm_mon  = et->month - 1;
    // tm->tm_mday = et->date  - 0;
    // tm->tm_hour = et->hours;
    // tm->tm_min  = et->minutes;
    // tm->tm_sec  = et->seconds;

    // tv->tv_sec  = mktime(tm);
    // tv->tv_usec = 0;

    // /*
    // printf("%s() L%d set time to %s\r\n",
    //           __func__, __LINE__, asctime(tm));
    // */
    // return settimeofday(tv, NULL);
    return 0;
}
