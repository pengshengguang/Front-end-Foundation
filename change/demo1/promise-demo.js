
function loadImg(src) {
    const p = new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            reject(new Error(`图片加载失败 ${src}`))
        }
        img.src = src
    })
    return p
}

const url1 = 'https://i0.hdslb.com/bfs/archive/e62b6b095ef38dfb742687f11e4b570dde420b5d.png'
const url2 = 'https://pic1.zhimg.com/v2-9b2e936c8b37faa17ac9d5ba87869cdc_is.jpg'
loadImg(url1).then((img) => {
    console.log(img.width)
    return img
}).then((img) => {
    console.log(img.height)
    return loadImg(url2)
}).then((img2) => {
    console.log(img2.width)
    console.log(img2.height)
}).catch(ex => console.error(ex))