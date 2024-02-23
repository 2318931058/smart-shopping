// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏的宽度：以iphoneX为例，可以自己调：设计图如果是750，就调成375，以此类推
      viewportWidth: 375
    }
  }
}
