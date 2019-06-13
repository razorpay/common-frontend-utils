const EXPOSED_MODULES = {
  _Arr,
  _Obj,
  _Doc,
  _El,
};

Object.keys(EXPOSED_MODULES).forEach(key => {
  global[key] = EXPOSED_MODULES[key];
});
