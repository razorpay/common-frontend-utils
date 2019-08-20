const plugins = [
  [require('fast-async'), { useRuntimeModule: false }],
  [
    require('@babel/plugin-proposal-pipeline-operator'),
    { proposal: 'minimal' },
  ],
];

module.exports = {
  extensions: ['.js'],
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
