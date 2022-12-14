export default {
    install(app, options) {
        app.directive('scrollFade', {
            mounted: (el) => {
                const bounding = el.getBoundingClientRect()
        
                const isVisible = ()=>{
                    if (bounding.top <= document.getElementById('app').scrollTop+window.innerHeight-200) {
                        return true
                    }
                    return false
                }
        
                const scrollHandler = ()=>{
                    if (isVisible()) {
                        el.style.transition = 'opacity 1s, translate 0.75s'
                        el.style.opacity = 1
                        el.style.translate = '0'
                        document.getElementById('app').removeEventListener("scroll", scrollHandler);
                    }
                }
        
                el.style.opacity = 0
                el.style.translate = '0 30px'
        
                setTimeout(() => {
                    if (isVisible()) return scrollHandler()
                    document.getElementById('app').addEventListener("scroll", scrollHandler);
                }, 400);
               
            }
        })
    }
}