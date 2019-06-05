const EXPOSED_MODULES = {
  _Arr,
  _Obj,
};

Object.keys(EXPOSED_MODULES).forEach(key => {
  global[key] = EXPOSED_MODULES[key];
});
