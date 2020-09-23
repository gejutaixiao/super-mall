module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,  //视图的宽度，对应的是我们的设计稿的宽度
      viewportHeight: 667,  //视图的高度，对应的是我们的设计稿的宽度
      unitPrecision: 5,  //指定‘px’转换为是视窗单位值的小数位数
      viewportUnit: 'vw',
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],  //指定不需要转换的试图宽度
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/^TabBar'/]
    }
  }
}
