
/*****************************************************************************
 *                                                                           *
 * COPYRIGHT (C) 2018 Chaihuo-edu - All Rights Reserved                      *
 *                                                                           *
 * Chaihuo-edu makes no warranty express or implied including but not        *
 * limited to, any warranty of                                               *
 *                                                                           *
 *                                                                           *
 *  (i)  merchantability or fitness for a particular purpose and/or          *
 *                                                                           *
 *  (ii) requirements, for a particular purpose in relation to the LICENSED  *
 *       MATERIALS, which is provided AS IS, WITH ALL FAULTS. Chaihuo-edu    *
 *       does not represent or warrant that the LICENSED MATERIALS provided  *
 *       here under is free of infringement of any third party patents,      *
 *       copyrights, trade secrets or other intellectual property rights.    *
 *       ALL WARRANTIES, CONDITIONS OR OTHER TERMS IMPLIED BY LAW ARE        *
 *       EXCLUDED TO THE FULLEST EXTENT PERMITTED BY LAW                     *
 *                                                                           *
 *****************************************************************************
 * */

/* config.h -*- mode:C; c-file-style: "eay" -*- */
/*
 * @author Monsoon Song <zhengbin.song@chaihuo.org>
 *
 */

#ifndef  __config_H__
#define  __config_H__


#define  HARDWARE_V2

/* 影响boot.hex,和demoinit */
#ifdef   HARDWARE_V2
//#define  UARTSWITCH_DBG
#endif


/* 自己填充CMD头,这样可传12B数据,否则只有8B*/
#define  BMSG_12BYTE


//#define  DDBG


/*********************************************************************/
/*                                                                   */
/* 系统宏定义,勿修改                                                 */
/*                                                                   */
/*********************************************************************/


/* #define  USE_S112_SECTION  @原用于L0 API配置,不再使用
 * #define  USE_MLIB_SECTION  @原用于stdlib配置,不再使用
 * */


#define  VECT_RAM_ADDR                 0x20002180


#define  LEVEL1_ADDR                   0x00023000
#define  LTABLE_ADDR                   0x00024000
#define  LEVEL2_ADDR                   0x00025000
#define  LEVEL3_ADDR                   0x00029000

#define  FLASH_END                     0x00080000

/* 29000 - 2B000 */
#define  APP_ADDR_DEFAULT            ( LEVEL3_ADDR + 0x00000000 )
/* 2B000 - 2D000 */
#define  APP_ADDR_SCRATCH            ( LEVEL3_ADDR + 0x00002000 )
/* 2D000 - 2F000 */
#define  APP_ADDR_MOBILE             ( LEVEL3_ADDR + 0x00004000 )

/* 2F000 - 38000 */
#define  APP_ADDR_L4LIB              ( LEVEL3_ADDR + 0x00006000 )


#define  RAMFLASH_ADDR                 0x20005000

#define  LIB4RAM_ADDR                  0x20004000
#define  STRCAT_ADDR                   0x20003C00



/* 来自上位机UART/BLE的命令处理宏定义
 * */

#define  CMD_TYPE_TOCORE               0xA5
#define  CMD_TYPE_TONODE               0xC3
#define  CMD_TYPE_FRCORE               0xD2
#define  CMD_TYPE_FRNODE               0xF0


#define  CMD_EXEC_INFO                 0x00
#define  CMD_EXEC_SCAN                 0x01
#define  CMD_EXEC_UART                 0x02
#define  CMD_EXEC_MODE                 0x08
#define  CMD_EXEC_VERS                 0x0D
#define  CMD_EXEC_BOOT                 0x0F
#define  CMD_EXEC_FSTA                 0x10
#define  CMD_EXEC_FDAT                 0x11
#define  CMD_EXEC_FFIN                 0x12
#define  CMD_EXEC_FCHK                 0x13
#define  CMD_EXEC_FRED                 0x14
#define  CMD_EXEC_FENT                 0x15

#define  CMD_EXEC_RDAT                 0x16
#define  CMD_EXEC_RFIN                 0x17


#define  CMD_EXEC_BNET                 0x20
#define  CMD_EXEC_BMSG                 0x21

#define  CMD_EXEC_INST                 0x40

#define  CMD_EXEC_SKEY                 0x5A
#define  CMD_EXEC_GUID                 0x5C


#define  CMD_RESP_INFO                 0x00
#define  CMD_RESP_RAW                  0xD0
#define  CMD_RESP_EVT                  0x0E
#define  CMD_RESP_EXEC                 0x40



#define  CMD_HEAD_LEN                  cmd[0]
#define  CMD_HEAD_TYP                  cmd[1]
#define  CMD_HEAD_EXE                  cmd[2]
#define  CMD_HEAD_OPT                  cmd[3]

#define  CMD_HEAD_DAT                 (cmd+4)



/* systick计数值*/
#define  SYSTICK_CTRL                  0x00
#define  SYSTICK_LOAD                  0x04
#define  SYSTICK_VAL                   0x08
#define  SYSTICK_ADDR                  0xe000e010

#define  tickdown()     \
   *(volatile uint32_t*)(SYSTICK_ADDR + SYSTICK_CTRL) = 0



#if 1

#define  rtc1_init         ((void(*)(int ))0x00022501)
#define  checkRtc          ((int (*)(void))0x00022535)
#define  tickup            ((void(*)(int ))0x00022889)
//#define  sreset            ((void(*)(int ))0x00022585)
#define  sfeed             ((void(*)(void))0x0002259D)

#endif


#ifndef  LEVEL1

#define  mmcpy             ((void(*)(void*,void*,int))0x00023009)
#define  mmset             ((void(*)(void*,int,int))0x00023073)
#define  checksum          ((uint32_t(*)(uint32_t*,int))0x000230C9)
#define  softDelay         ((void(*)(int ))0x000230DD)
#define  find_default      ((int (*)(void))0x000230F5)
#define  sector_entry      ((int (*)(void))0x00023115)
#define  validate_entry    ((int (*)(uint32_t*))0x00023165)
#define  clear_entry       ((void(*)(void))0x0002316F)
#define  entrypoint        ((uint8_t(*)(uint8_t *))0x000231D5)
#define  _fbitchk_         ((int (*)(uint16_t ))0x00023231)
#define  _fbitset_         ((int (*)(uint8_t  ))0x0002324D)

#define  MODB              ((uint16_t(*)(uint32_t ))0x00023269)
#define  MULT              ((int (*)(uint32_t*,uint32_t,uint32_t ))0x000232AB)
#define  galInit           ((void(*)(void ))0x00023363)
#define  galUpdate         ((uint16_t(*)(uint8_t*,uint8_t ))0x00023371)

#else

#define  uart_init         ((void(*)(void))0x00022619)
#define  rx_byte           ((int (*)(void))0x00022689)
#define  tx_bytes          ((int (*)(uint8_t*,uint8_t))0x000226BD)
#define  uartx             ((void(*)(uint8_t))0x00022735)
#define  printk            ((void(*)(const char*, ...))0x000228B5)
#define  printd            ((void(*)(const char*, ...))0x00022729)

#endif


#ifndef  LEVEL2

#define  L2FUNC            ((uint32_t*)(LEVEL2_ADDR + 16))

#ifndef  LEVEL1
#define  printd            ((void(*)(const char*, ...)) L2FUNC[0] )
#endif

/*************************************************************
 *
 * _co_switch_, 强制切换,放在while(1)末尾
 *
 * Parameter:
 *       NA
 * Return:
 *
 *************************************************************
 * */
#define  _co_switch_        ((void(*)( )) L2FUNC[6] )


/*************************************************************
 *
 * _co_delay_, 延时,(离线模式Only)
 *
 * Parameter:
 *       tick,10ms, index
 * Return:
 *
 *************************************************************
 * */
#define  _co_delay_        ((void(*)(int )) L2FUNC[3] )

#define  _co_timeout_      ((void(*)(int )) L2FUNC[4] )


/*************************************************************
 *
 * _co_tick_, 得到当前时间
 *
 * Parameter:
 *
 * Return: 当前时间
 *
 *************************************************************
 * */
#define  _co_tick_         ((uint32_t(*)()) L2FUNC[5] )


/*************************************************************
 *
 * _co_registerCB_, 注册回调函数,(离线模式Only)
 *
 * BLE广播用这个框架处理也没有问题,它要使用一个特殊的节点地址,0xFF,
 * 另外,INS需要模拟成EVT/RAW , 通常配置为 0xFFFF
 *
 *
 * Parameter:
 *       evt, 节点地址B0+事件/RAW数据类型B1
 *       fun, 回调函数指针
 *       par, 回调参数,通常是NODE结构体
 *       tmo, bit15-8,Flag, bit7-0,tmo
 *
 * Return: Index , -1,满无资源,-2,重复,-3,参数错
 *
 *************************************************************
 * */
#define  _co_registerCB_   ((int (*)(uint16_t,uint32_t,uint32_t,uint16_t)) L2FUNC[1] )
#define  _co_unregisterCB_ ((int (*)(uint16_t,uint32_t)) L2FUNC[2] )


/*************************************************************
 *
 * _co_brdNet_, 设置广播子网并激活广播,-1则关闭广播
 *
 * Parameter:
 *       net, 子网,0-63,
 *
 * Return:
 *
 *************************************************************
 * */
#define  _co_brdNet_       ((void(*)( int8_t )) L2FUNC[10] )


/*************************************************************
 *
 * _co_brdIvl_, 设置广播命令间隔
 *
 * Parameter:
 *       ivl, 单位Tick,至少大于20,(200ms)
 *
 * Return:
 *
 *************************************************************
 * */
#define  _co_brdIvl_       ((void(*)(uint8_t*)) L2FUNC[12] )


/*************************************************************
 *
 * _co_pseudu_, 伪造事件
 *
 * Parameter:
 *       p,数据
 * Return:
 *
 *************************************************************
 * */
#define  _co_pseudu_       ((void(*)(uint8_t*)) L2FUNC[7] )


/*************************************************************
 *
 * _co_brdMsg_, 设置广播数据
 *
 * Parameter:
 *       msg, 最大16B
 *
 * Return:
 *
 *************************************************************
 * */
#define  _co_brdMsg_       ((void(*)(uint8_t*)) L2FUNC[11] )


/*************************************************************
 *
 * _co_putCmd_, 放入命令Buffer,只用于离线模式
 *
 * Parameter:
 *       p,l, I2C命令,数据和长度
 *
 * Return:
 *
 *************************************************************
 * */
#define  _co_putCmd_        ((void(*)(uint8_t*,uint8_t )) L2FUNC[8] )


/*************************************************************
 *
 * _co_ctrlRaw_, 控制节点RAW数据使能/除能,
 *
 * Parameter:
 *       dev, 节点地址(B0)+ RAW数据类别,例如,0xD0,0xD1,...
 *       en , 0,除能, 1,使能
 *       tmo, 指定raw data间隔,单位,ms,0使用默认值
 *
 * Return:
 *
 *************************************************************
 * */
#define  _co_ctrlRaw_      ((void(*)(uint16_t,uint8_t,uint16_t)) L2FUNC[9] )


/*************************************************************
 *
 * _co_protCmd_, 保护cmd缓冲区
 *
 * Parameter:
 *       NA
 * Return:
 *
 *************************************************************
 * */
#define  _co_protCmd_      ((void(*)( )) L2FUNC[13] )
#define  _co_freeCmd_      ((void(*)( )) L2FUNC[14] )

#define  _co_protOth_      ((void(*)( )) L2FUNC[15] )
#define  _co_freeOth_      ((void(*)( )) L2FUNC[16] )


#endif



/* 减少栈的使用 */
#define  coreBle           ( (uint8_t *)( 0x20002300 + 0  ))
#define  coreCmd           ( (uint8_t *)( 0x20002300 + 32 ))
#define  nodeCmd           ( (uint8_t *)( 0x20002300 + 52 ))



/* for systick */
#define  tikHead           (*(volatile uint8_t *)(VECT_RAM_ADDR + 17*4 + 2 ))
#define  tikTail           (*(volatile uint8_t *)(VECT_RAM_ADDR + 17*4 + 3 ))


/* @nrf_rtc.c */
#define  rtcHead           (*(volatile uint8_t *)(VECT_RAM_ADDR + 40*4 + 0 ))
#define  rtcTail           (*(volatile uint8_t *)(VECT_RAM_ADDR + 40*4 + 1 ))

/* @nrf_uart.c */
#define  txHead            (*(volatile uint8_t *)(VECT_RAM_ADDR + 16*4 + 0 ))
#define  txTail            (*(volatile uint8_t *)(VECT_RAM_ADDR + 16*4 + 1 ))
#define  rxHead            (*(volatile uint8_t *)(VECT_RAM_ADDR + 16*4 + 2 ))
#define  rxTail            (*(volatile uint8_t *)(VECT_RAM_ADDR + 16*4 + 3 ))
//#define  txBuff            ( (uint8_t *)(VECT_RAM_ADDR +  2*4))
//#define  rxBuff            ( (uint8_t *)(VECT_RAM_ADDR + 34*4))

/* uart response个数,uspHead,uspTail */
#define  RSPL                          64 /*MUST 2的次幂*/

/* uart/ble command个数,cmdHead,cmdTail */
#define  CMDL                          200


/* @nrf_gap.c */
#define  EVTL                          4
//#define  chaihuo_service_handle  (*(uint16_t*)(VECT_RAM_ADDR + 17*4 + 0 ))

/* 控制UART切换烧写NODE标记, 17*4+1,utm */
#define  boflag            (*(volatile uint8_t *)(VECT_RAM_ADDR + 17*4 + 0 ))


//uint8_t  evtHead = 0 , evtTail = 0 ;
#define  evtHead           (*(volatile uint8_t *)(VECT_RAM_ADDR + 40*4 + 2 ))
#define  evtTail           (*(volatile uint8_t *)(VECT_RAM_ADDR + 40*4 + 3 ))


/* @flashcmd.c */
#define  fbitmap           ( (uint32_t*)(VECT_RAM_ADDR + 20*4))
#define  _fd_              ( (uint32_t*)(VECT_RAM_ADDR + 28*4))
#define  _fstart_          (*(uint32_t*)(VECT_RAM_ADDR + 32*4))


/* SCAN */
#define  pscan_params      ( (ble_gap_scan_params_t const*)0x000224A8 )


#define  base64char              ( (uint8_t*)0x000224C0 )



#define  hexTable                ( (uint8_t*)0x000224B0 )



/* CORE板在线离线模式*/
#define  offline           (*(uint8_t *)(VECT_RAM_ADDR+48*4+0) )

#define  LINEMODE_OFF                  0
#define  LINEMODE_UART                 1
#define  LINEMODE_BLE                  2
#define  LINEMODE_POLL                 3


#define  advertData        ( (uint8_t *)(VECT_RAM_ADDR+48*4+1) )
#define  padvertData       ( (uint8_t *)0x00022C81 )

#define  HEXMAC            ( (uint32_t*)(LEVEL1_ADDR + 0x3A8 ))
/* 用于识别不匹配的MAC */
#define  FAKEMAC           (*(uint32_t*)(LEVEL1_ADDR + 0x3A0 ))
/* :108FF000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF81 */

#define  HEXGUID           ( (uint32_t*)(LEVEL1_ADDR + 0x3B0))



#define  adv_params        (*(ble_gap_adv_params_t*)(VECT_RAM_ADDR+44*4) )
#define  padv_params       ( (ble_gap_adv_params_t*)0x00022CA0 )



#define  clock_lf_cfg      (*(nrf_clock_lf_cfg_t  *)(VECT_RAM_ADDR+41*4))
#define  pclock_lf_cfg     ( (nrf_clock_lf_cfg_t  *)0x00022CB0 )


#define  NOTIFYIVL                     6


/* Galois */
#define  GXE                     ( (uint8_t *)0x00022CC0 )
#define  GOL                     ( (uint8_t *)0x00022EC0 )
#define  GXB                     ( (uint32_t*)0x00022FC0 )
#define  G4B                     ( (uint32_t*)0x00022FD0 )


#define  galx              (*(uint16_t*)(VECT_RAM_ADDR + 43*4 + 2 ))


/*********************************************************************/
/*********************************************************************/

#define  usm               (*(uint8_t *)(VECT_RAM_ADDR + 66*4 + 0 ))
#define  ule               (*(uint8_t *)(VECT_RAM_ADDR + 66*4 + 1 ))
#define  ucmd              ( (uint8_t *)(VECT_RAM_ADDR + 56*4 ))
#define  ursp              ( (uint8_t *)(VECT_RAM_ADDR + 61*4 ))
/* UART命令字符间超时,不能大于1秒 */
#define  utm               (*(uint8_t *)(VECT_RAM_ADDR + 17*4 + 1) )
/* */

#define  UARTCMD_STATUS_IDLE           0
#define  UARTCMD_STATUS_LENG           1
#define  UARTCMD_STATUS_CORE           2
#define  UARTCMD_STATUS_TYPE           3
#define  UARTCMD_STATUS_CONT           4
#define  UARTCMD_STATUS_OPTI           5


/* I2C Master出错计数 */
#define  MAXMERR                       3

#define  merr              (*(uint8_t *)(VECT_RAM_ADDR + 66*4 + 3) )


/*XXX*/
#define  chktmo            (*(uint32_t*)(VECT_RAM_ADDR + 67*4 + 0) )


#define  MagicA            (*(volatile uint32_t*)(VECT_RAM_ADDR + 68*4 + 0) )
#define  MagicB            (*(volatile uint32_t*)(VECT_RAM_ADDR + 69*4 + 0) )

#define  MicClrEntA           0x436C6561
#define  MicClrEntB           0x456E7472

#define  MicRebootA           0x5265626F
#define  MicRebootB           0x72454254

#define  MicBomodeA           0x426F6F74
#define  MicBomodeB           0x4D6F6465

#define  MicRamburA           0x52616D62
#define  MicRamburB           0x4275726E


#define  MicBurnOKA           0x4275724F
#define  MicBurnOKB           0x726E4F4B

#define  MicBurnErA           0x42757245
#define  MicBurnErB           0x726E4572


/*********************************************************************/
/*********************************************************************/


/* 运行指示灯*/
#define  led_tmo           (*(uint16_t*)(VECT_RAM_ADDR + 42*4 + 0 ))
#define  trx_tmo           (*(uint16_t*)(VECT_RAM_ADDR + 42*4 + 2 ))


/* BLE-CORE板的唯一按键,DBGPIN*/
#define  DBGPIN                        30

#define  dbg_tmo           (*(uint16_t*)(VECT_RAM_ADDR + 43*4 + 0 ))


#define  LEDPIN                        11
#define  TRXPIN                        12
#define  CTRPIN                        13

/* Connector 上的RX/TX*/
#ifdef   HARDWARE_V2

#define  BUSTXD                        3
#define  BUSRXD                        2

#else

#define  BUSTXD                        4
#define  BUSRXD                        5

#endif


#define  _DBG_()                       ({ \
      NRF_P0->IN & (1UL << DBGPIN );      \
      })


#define  RUNLED_ON()       ({ NRF_P0->OUTCLR = 1UL << LEDPIN ;})
#define  RUNLED_OFF()      ({ NRF_P0->OUTSET = 1UL << LEDPIN ;})

#define  TRXLED_ON()       ({ NRF_P0->OUTCLR = 1UL << TRXPIN ;})
#define  TRXLED_OFF()      ({ NRF_P0->OUTSET = 1UL << TRXPIN ;})


#if 0
#define  BOUART_ON()       ({ NRF_P0->OUTCLR = 1UL << CTRPIN ;})
#define  BOUART_OFF()      ({ NRF_P0->OUTSET = 1UL << CTRPIN ;})
#else
#define  BOUART_ON()       ({ NRF_P0->OUTSET = 1UL << CTRPIN ;})
#define  BOUART_OFF()      ({ NRF_P0->OUTCLR = 1UL << CTRPIN ;})
#endif


#define  BUSTXD_LO()       ({ NRF_P0->OUTCLR = 1UL << BUSTXD ;})
#define  BUSTXD_HI()       ({ NRF_P0->OUTSET = 1UL << BUSTXD ;})


/* I2C引脚相关定义 */

#ifdef   HARDWARE_V2

#define  HScl                          5
#define  HSda                          7

#define  SScl                          6
#define  SSda                          8

#else

#define  HScl                          2
#define  HSda                          3

#define  SScl                          2
#define  SSda                          3

#endif


#define  SOFT_SCL(a)                   ({    \
      NRF_P0->PIN_CNF [SScl] =               \
         NRF_GPIO_PIN_DIR_OUTPUT   << GPIO_PIN_CNF_DIR_Pos   |\
         NRF_GPIO_PIN_INPUT_CONNECT<< GPIO_PIN_CNF_INPUT_Pos |\
         NRF_GPIO_PIN_NOPULL       << GPIO_PIN_CNF_PULL_Pos  |\
         NRF_GPIO_PIN_H0D1         << GPIO_PIN_CNF_DRIVE_Pos |\
         NRF_GPIO_PIN_NOSENSE      << GPIO_PIN_CNF_SENSE_Pos ;\
      if(a) { NRF_P0->OUTSET = 1UL << SScl ;}\
      else  { NRF_P0->OUTCLR = 1UL << SScl ;}\
      })


#define  _SCL_()                       ({    \
      NRF_P0->IN & (1UL << SScl) ;           \
      })


#define  INPU_SCL()                    ({    \
      NRF_P0->PIN_CNF [SScl] =               \
         NRF_GPIO_PIN_DIR_INPUT    << GPIO_PIN_CNF_DIR_Pos   |\
         NRF_GPIO_PIN_INPUT_CONNECT<< GPIO_PIN_CNF_INPUT_Pos |\
         NRF_GPIO_PIN_NOPULL       << GPIO_PIN_CNF_PULL_Pos  |\
         NRF_GPIO_PIN_H0D1         << GPIO_PIN_CNF_DRIVE_Pos |\
         NRF_GPIO_PIN_NOSENSE      << GPIO_PIN_CNF_SENSE_Pos ;\
      })

#define  INPU_SDA()                    ({    \
      NRF_P0->PIN_CNF [SSda] =               \
         NRF_GPIO_PIN_DIR_INPUT    << GPIO_PIN_CNF_DIR_Pos   |\
         NRF_GPIO_PIN_INPUT_CONNECT<< GPIO_PIN_CNF_INPUT_Pos |\
         NRF_GPIO_PIN_NOPULL       << GPIO_PIN_CNF_PULL_Pos  |\
         NRF_GPIO_PIN_H0D1         << GPIO_PIN_CNF_DRIVE_Pos |\
         NRF_GPIO_PIN_NOSENSE      << GPIO_PIN_CNF_SENSE_Pos ;\
      })


#define  SOFT_SDA(a)                   ({    \
      NRF_P0->PIN_CNF [SSda] =               \
         NRF_GPIO_PIN_DIR_OUTPUT   << GPIO_PIN_CNF_DIR_Pos   |\
         NRF_GPIO_PIN_INPUT_CONNECT<< GPIO_PIN_CNF_INPUT_Pos |\
         NRF_GPIO_PIN_NOPULL       << GPIO_PIN_CNF_PULL_Pos  |\
         NRF_GPIO_PIN_H0D1         << GPIO_PIN_CNF_DRIVE_Pos |\
         NRF_GPIO_PIN_NOSENSE      << GPIO_PIN_CNF_SENSE_Pos ;\
      if(a) { NRF_P0->OUTSET = 1UL << SSda ;}\
      else  { NRF_P0->OUTCLR = 1UL << SSda ;}\
      })


#define  _SDA_()                       ({    \
      NRF_P0->IN & (1UL << SSda) ? 256 : 0 ; \
      })


/* 作为Master的返回状态*/
#define  TWIM_STATUS_OK                0
#define  TWIM_STATUS_BUSY              1
#define  TWIM_STATUS_COMP              2
#define  TWIM_STATUS_NAK               3
#define  TWIM_STATUS_ERR               4


/* I2C Slave OP STATE */
#define  TWIS_FLAG_NONE                0
#define  TWIS_FLAG_STOP                1
#define  TWIS_FLAG_READ                2
#define  TWIS_FLAG_WRITE               3

#define  MAX_I2CBUSY                   16


/* I2C协议Header */
#define  I2C_HEAD_LEN                  i2c[0]
#define  I2C_HEAD_INS                  i2c[1]
#define  I2C_HEAD_DEV                  i2c[2]
#define  I2C_HEAD_OPT                  i2c[3]


#define  I2C_DATA_D0                   i2c[4]
#define  I2C_DATA_D1                   i2c[5]
#define  I2C_DATA_D2                   i2c[6]
#define  I2C_DATA_D3                   i2c[7]
#define  I2C_DATA_D4                   i2c[8]
#define  I2C_DATA_D5                   i2c[9]
#define  I2C_DATA_D6                   i2c[10]
#define  I2C_DATA_D7                   i2c[11]
#define  I2C_DATA_D8                   i2c[12]


/* I2C Slave Buff长度
 * */
#define  ISLL                          2


/* I2C协议中的INS字段*/
#define  NODE_INS_EVT                  0x0E
#define  NODE_INS_RAW                  0xD0
#define  NODE_INS_RSP                  0xF0



#define  CB_STAT_RUNNING               0x80

#define  CB_FLAG_FOREVER               0x40


/* 结构定义*/

#define  ALL_CBB                       128

struct callback_block {

   uint16_t tag16 ; /* "CB",B0B1 */
   uint16_t event ; /* node,B2,event,B3*/
   uint8_t  tmsav , tmout ; /* TMO  */
   uint8_t  stat  , flag  ;

   void(*entry)(uint8_t*,int,int);
   uint32_t param ; /* 参数 */
};




/*********************************************************************/
/*                                                                   */
/* 系统宏定义,勿修改                                                 */
/*                                                                   */
/*********************************************************************/




#endif /*__config_H__*/


