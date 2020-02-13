const plugins = [
  [require('fast-async'), { useRuntimeModule: false }],
  [
    require('@babel/plugin-proposal-pipeline-operator'),
    { proposal: 'minimal' },
  ],
  [require('@babel/plugin-proposal-optional-chaining'), { loose: true }],
];

module.exports = {
  plugins,
  presets: [
    [
      require('@babel/preset-env'),
      {
        loose: true,
        targets: {
          ie: 11,
        },
      },
    ],
  ],
};
