#include "codecraft_def.h"
#define NULL 0
#define USE_RGBLED 1
void onStartUp(void)
{
grovezero->rgbled->displayStop();
}

void usr_init(void)
{
grovezero->blecore->onstartup((int)onStartUp);
}
