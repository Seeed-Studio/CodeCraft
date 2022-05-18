
#include "max_interrupt.h"

#define PFUNC_CALLBACKS

#define CREATE_CALLBACK(x) static void dhtCallback##x() { objectAtInt[x]->dhtCallback(); }

#if MAX_INTERRUPT >= 0
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0
  CREATE_CALLBACK(0);
#endif

#if MAX_INTERRUPT >= 1
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1
  CREATE_CALLBACK(1);
#endif

#if MAX_INTERRUPT >= 2
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2
  CREATE_CALLBACK(2);
#endif

#if MAX_INTERRUPT >= 3
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3
  CREATE_CALLBACK(3);
#endif

#if MAX_INTERRUPT >= 4
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4
  CREATE_CALLBACK(4);
#endif

#if MAX_INTERRUPT >= 5
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5
  CREATE_CALLBACK(5);
#endif

#if MAX_INTERRUPT >= 6
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6
  CREATE_CALLBACK(6);
#endif

#if MAX_INTERRUPT >= 7
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7
  CREATE_CALLBACK(7);
#endif

#if MAX_INTERRUPT >= 8
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8
  CREATE_CALLBACK(8);
#endif

#if MAX_INTERRUPT >= 9
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9
  CREATE_CALLBACK(9);
#endif

#if MAX_INTERRUPT >= 10
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10
  CREATE_CALLBACK(10);
#endif

#if MAX_INTERRUPT >= 11
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11
  CREATE_CALLBACK(11);
#endif

#if MAX_INTERRUPT >= 12
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12
  CREATE_CALLBACK(12);
#endif

#if MAX_INTERRUPT >= 13
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13
  CREATE_CALLBACK(13);
#endif

#if MAX_INTERRUPT >= 14
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14
  CREATE_CALLBACK(14);
#endif

#if MAX_INTERRUPT >= 15
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15
  CREATE_CALLBACK(15);
#endif

#if MAX_INTERRUPT >= 16
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16
  CREATE_CALLBACK(16);
#endif

#if MAX_INTERRUPT >= 17
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17
  CREATE_CALLBACK(17);
#endif

#if MAX_INTERRUPT >= 18
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18
  CREATE_CALLBACK(18);
#endif

#if MAX_INTERRUPT >= 19
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19
  CREATE_CALLBACK(19);
#endif

#if MAX_INTERRUPT >= 20
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20
  CREATE_CALLBACK(20);
#endif

#if MAX_INTERRUPT >= 21
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20, &idDHTLib::dhtCallback21
  CREATE_CALLBACK(21);
#endif

#if MAX_INTERRUPT >= 22
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20, &idDHTLib::dhtCallback21, &idDHTLib::dhtCallback22
  CREATE_CALLBACK(22);
#endif

#if MAX_INTERRUPT >= 23
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20, &idDHTLib::dhtCallback21, &idDHTLib::dhtCallback22, &idDHTLib::dhtCallback23
  CREATE_CALLBACK(23);
#endif

#if MAX_INTERRUPT >= 24
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20, &idDHTLib::dhtCallback21, &idDHTLib::dhtCallback22, &idDHTLib::dhtCallback23, &idDHTLib::dhtCallback24
  CREATE_CALLBACK(24);
#endif

#if MAX_INTERRUPT >= 25
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20, &idDHTLib::dhtCallback21, &idDHTLib::dhtCallback22, &idDHTLib::dhtCallback23, &idDHTLib::dhtCallback24, &idDHTLib::dhtCallback25
  CREATE_CALLBACK(25);
#endif

#if MAX_INTERRUPT >= 26
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20, &idDHTLib::dhtCallback21, &idDHTLib::dhtCallback22, &idDHTLib::dhtCallback23, &idDHTLib::dhtCallback24, &idDHTLib::dhtCallback25, &idDHTLib::dhtCallback26
  CREATE_CALLBACK(26);
#endif

#if MAX_INTERRUPT >= 27
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20, &idDHTLib::dhtCallback21, &idDHTLib::dhtCallback22, &idDHTLib::dhtCallback23, &idDHTLib::dhtCallback24, &idDHTLib::dhtCallback25, &idDHTLib::dhtCallback26, &idDHTLib::dhtCallback27
  CREATE_CALLBACK(27);
#endif

#if MAX_INTERRUPT >= 28
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20, &idDHTLib::dhtCallback21, &idDHTLib::dhtCallback22, &idDHTLib::dhtCallback23, &idDHTLib::dhtCallback24, &idDHTLib::dhtCallback25, &idDHTLib::dhtCallback26, &idDHTLib::dhtCallback27, &idDHTLib::dhtCallback28
  CREATE_CALLBACK(28);
#endif

#if MAX_INTERRUPT >= 29
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20, &idDHTLib::dhtCallback21, &idDHTLib::dhtCallback22, &idDHTLib::dhtCallback23, &idDHTLib::dhtCallback24, &idDHTLib::dhtCallback25, &idDHTLib::dhtCallback26, &idDHTLib::dhtCallback27, &idDHTLib::dhtCallback28, &idDHTLib::dhtCallback29
  CREATE_CALLBACK(29);
#endif

#if MAX_INTERRUPT >= 30
#define PFUNC_CALLBACKS &idDHTLib::dhtCallback0, &idDHTLib::dhtCallback1, &idDHTLib::dhtCallback2, &idDHTLib::dhtCallback3, &idDHTLib::dhtCallback4, &idDHTLib::dhtCallback5, &idDHTLib::dhtCallback6, &idDHTLib::dhtCallback7, &idDHTLib::dhtCallback8, &idDHTLib::dhtCallback9, &idDHTLib::dhtCallback10, &idDHTLib::dhtCallback11, &idDHTLib::dhtCallback12, &idDHTLib::dhtCallback13, &idDHTLib::dhtCallback14, &idDHTLib::dhtCallback15, &idDHTLib::dhtCallback16, &idDHTLib::dhtCallback17, &idDHTLib::dhtCallback18, &idDHTLib::dhtCallback19, &idDHTLib::dhtCallback20, &idDHTLib::dhtCallback21, &idDHTLib::dhtCallback22, &idDHTLib::dhtCallback23, &idDHTLib::dhtCallback24, &idDHTLib::dhtCallback25, &idDHTLib::dhtCallback26, &idDHTLib::dhtCallback27, &idDHTLib::dhtCallback28, &idDHTLib::dhtCallback29, &idDHTLib::dhtCallback30
  CREATE_CALLBACK(30);
#endif

