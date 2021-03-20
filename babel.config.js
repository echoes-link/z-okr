module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }],
    [
      'import',
      {
        libraryName: '@icon-park/vue-next',
        libraryDirectory: 'es/icons',
        camel2DashComponentName: false
      },
      'icon-park'
    ]
  ]
}
