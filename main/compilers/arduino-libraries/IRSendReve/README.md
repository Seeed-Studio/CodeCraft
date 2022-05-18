IR Send and Receive  [![Build Status](https://travis-ci.com/Seeed-Studio/IRSendRev.svg?branch=master)](https://travis-ci.com/Seeed-Studio/IRSendRev)
---------------------------------------------------------


<img src=https://raw.githubusercontent.com/SeeedDocument/Grove-Infrared_Emitter/master/img/Grove-Infrared_Emitter.jpg width=400>

[Grove - Infrared Emitter](https://www.seeedstudio.com/Grove-Infrared-Emitter-p-993.html)

<img src=https://raw.githubusercontent.com/SeeedDocument/Grove-Infrared_Receiver/master/img/Grove-Infrared_Receiver.jpg width=400>

[Grove - Infrared Receiver](https://www.seeedstudio.com/Grove-Infrared-Receiver-p-994.html)



The Infrared Emitter is used to transmit infrared signals through an infrared LED, while there is an Infrared receiver to get the signals on the other side . An infrared LED is like any other LED, with its color centered around 940nm. We can use the emitter not only to transmit data or commands, but also to emulate remotes to control your home appliance using an Arduino. The Infrared Emitter can transmit signals reliable up to 10 meters. Beyond 10 meters, the receiver may not get the signals.

The Infrared Receiver is used to receive infrared signals and also used for remote control detection. There is a IR detector on the Infrared Receiver which is used to get the infrared light emitted by the Infrared Emitter. The IR detector have a demodulator inside that looks for modulated IR at 38 KHz. The Infrared Receiver can receive signals well within 10 meters. If more than 10 meters , the receiver may not get the signals. We often use the two Twigs-the Infrared Receiver and the Infrared Emitter to work together.

# Usage:

This library include 2parts, ir send and ir receive.

### Send Data

You can use this function to send a buf:

    void Send(unsigned char *dta_buf, unsigned char ifreq);


- dta_buf[0] len of the buf(not include dta_buf[0])
- dta_buf[1] start signal high time
- dta_buf[2] start signal low time
- dta_buf[3] bit high time
- dta_buf[4] bit low time
- dta_buf[5] data lenght(how many byte to send)
- dta_buf[6] dta_buf[n] : data to send

- ifreq: frequence, eg:38(means 38k)

![](http://www.seeedstudio.com/wiki/images/4/40/Ir_time.jpg)


### Receive Data

**Initialize:**

    IR.Init(pin);		// pin to receive

**Check Data:**

	IR.IsDta();			// if get data, return 1

**Receive Data:**

	IR.Recv(unsigned char *dta);	



For more information, please refer to [wiki page](http://www.seeedstudio.com/wiki/).

    
----


This software is written by loovee [luweicong@seeedstudio.com](luweicong@seeedstudio.com "luweicong@seeedstudio.com") for seeed studio<br>
and is licensed under [The MIT License](http://opensource.org/licenses/mit-license.php). Check License.txt for more information.<br>

Contributing to this software is warmly welcomed. You can do this basically by<br>
[forking](https://help.github.com/articles/fork-a-repo), committing modifications and then [pulling requests](https://help.github.com/articles/using-pull-requests) (follow the links above<br>
for operating guide). Adding change log and your contact into file header is encouraged.<br>
Thanks for your contribution.

Seeed Studio is an open hardware facilitation company based in Shenzhen, China. <br>
Benefiting from local manufacture power and convenient global logistic system, <br>
we integrate resources to serve new era of innovation. Seeed also works with <br>
global distributors and partners to push open hardware movement.<br>





[![Analytics](https://ga-beacon.appspot.com/UA-46589105-3/IRSendRev)](https://github.com/igrigorik/ga-beacon)

