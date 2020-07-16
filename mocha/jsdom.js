require('jsdom-global')(undefined, {
  // Need to execute <script> for JSONP tests
  runScripts: 'dangerously',
  resources: 'usable',
});
