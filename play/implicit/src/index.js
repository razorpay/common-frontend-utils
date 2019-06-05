const EXPOSED_MODULES = {
  _Arr,
};

Object.keys(EXPOSED_MODULES).forEach(key => {
  global[key] = EXPOSED_MODULES[key];
});
