#include "configargs.h"

#define GCCPLUGIN_VERSION_MAJOR   7
#define GCCPLUGIN_VERSION_MINOR   2
#define GCCPLUGIN_VERSION_PATCHLEVEL   1
#define GCCPLUGIN_VERSION  (GCCPLUGIN_VERSION_MAJOR*1000 + GCCPLUGIN_VERSION_MINOR)

static char basever[] = "7.2.1";
static char datestamp[] = "20170904";
static char devphase[] = "release";
static char revision[] = "[ARM/embedded-7-branch revision 255204]";

/* FIXME plugins: We should make the version information more precise.
   One way to do is to add a checksum. */

static struct plugin_gcc_version gcc_version = {basever, datestamp,
						devphase, revision,
						configuration_arguments};
