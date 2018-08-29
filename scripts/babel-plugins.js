module.exports = [
  ['module:fast-async', { useRuntimeModule: false }],
  '@babel/transform-arrow-functions',
  '@babel/transform-block-scoped-functions',
  '@babel/transform-block-scoping',
  ['@babel/transform-computed-properties', { loose: true }],
  '@babel/transform-destructuring',

  // loose mode: parameters with default values
  // will be counted into the arity of the function
  ['@babel/transform-parameters', { loose: true }],

  '@babel/transform-shorthand-properties',
  ['@babel/transform-template-literals', { loose: true }],

  ['@babel/proposal-pipeline-operator', { proposal: 'minimal' }],
]
