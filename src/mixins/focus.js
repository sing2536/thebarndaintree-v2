import '../assets/css/tooltip.css'

export default {
  install: (app, options) => {
    
    app.directive('focus', {
      mounted: (el, binding) => {
        el.focus()
      }
    })
  }
}