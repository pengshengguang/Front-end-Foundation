const div3 = document.getElementById('div3')
// 普通绑定
bindEvent(div, 'click', event => {
    event.preventDefault()
    alert(this.innerHTML)
})

// 代理绑定
bindEvent(div, 'click', 'a', function(event)  {
    event.preventDefault()
    alert(this.innerHTML)
})

function bindEvent(ele, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }
    ele.addEventListener(type, event => {
        const target = event.target
        if (selector) {
            // 代理绑定
            if (target.matches(selector)) {
                fn.call(target, event)
            }
        } else {
            // 普通绑定
            fn.call(target, event)
        }
    })
    const target = event.target

}