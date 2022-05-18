interface ftdi
ftdi_device_desc "Dual RS232"
ftdi_vid_pid 0x0403 0x6010

ftdi_layout_init 0x0508 0x0f1b
ftdi_layout_signal nTRST -data 0
ftdi_layout_signal nSRST -data 0x0020

transport select swd
ftdi_layout_signal SWD_EN -data 0

adapter_nsrst_delay 100
adapter_nsrst_assert_width 100

set CHIPNAME samd51p19a
source [find target/atsame5x.cfg]

init
targets

proc flash_bin {bin_file} {
    reset halt
    set file_size [file size $bin_file]
    set end_addr [expr $file_size + 0x4000]
    for {set addr 0x4000} {$addr < $end_addr} {incr addr 0x2000} {
        flash erase_address $addr 0x2000
        sleep 200
    }
    flash write_image $bin_file 0x4000
    verify_image $bin_file 0x4000 
    echo "flashing $bin_file complete"
    reset halt
}
