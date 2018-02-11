module.exports = {
  plugins: [
    require('cssnano')({
      autoprefixer: {
          add: true,
          browsers: ['> 5%']
      },
      zindex: {
          disable:true
      }
    })
  ]
}
