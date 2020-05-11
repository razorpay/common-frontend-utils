const EXPOSED_MODULES = {
  _Arr,
  _Obj,
  _Doc,
  _Str,
  _El,
  _,
  _Func,
  _Date,
  fetch,
  global: global,
};

Object.keys(EXPOSED_MODULES).forEach(key => {
  global[key] = EXPOSED_MODULES[key];
});
