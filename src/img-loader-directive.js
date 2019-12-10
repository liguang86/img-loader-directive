import Promise from 'promise'

/*
// 将Image转为Base64
function getBase64Image (img) {
  let canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  return canvas.toDataURL('image/' + ext)
}
 */

function getDataUri (el, url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => {
      // resolve(getBase64Image(img)) 图片加裁过大时，此方式导致界面卡
      resolve(url)
    }
    img.onerror = () => {
      reject(new Error('load err'))
    }
    img.src = url
  })
}

// {url: '', defaultUrl: ''} ulr可以为promise，返回图片路径. 但使用Promise时，由于页面的Refresh，返回的Promise对象都不一样，会导致每次刷新都会重新加载图片
export default {
  install (Vue, options) {
    let loadImg = (el, binding, url, errorUrl, errorStyle) => {
      let setImgSource = (imgSrc) => {
        if (el.tagName === 'IMG') {
          el.onerror = () => {
            if (url === (binding.value && binding.value.url)) {
              // 判断图片是否是通过处理程序进行处理的,如果是,则去除处理程序后再尝试
              if (imgSrc.indexOf('?') > -1) {
                imgSrc = imgSrc.split('?')[0]
                loading = false
                setImgSource(imgSrc)
                return
              }
              errorUrl && (el.src = errorUrl)
              el.onerror = null
            }
          }
          el.src = imgSrc
          return
        }
        // 防止同一DOM上对于相同图片的重复加载
        if (el.currentLoadingUrl && el.currentLoadingUrl === imgSrc) {
          return
        }
        el.currentLoadingUrl = imgSrc
        let loading = true
        getDataUri(el, imgSrc).then(uri => {
          if (url === (binding.value && binding.value.url)) {
            el.style.backgroundImage = `url('${uri}')`
            el.style.backgroundSize = ``
            if (el.classList) {
              el.classList.remove('small-loading')
            } else {
              el.className = el.className.replace('small-loading', '')
            }
            loading = false
          }
        }).catch(() => {
          if (url === (binding.value && binding.value.url)) {
            // 判断图片是否是通过处理程序进行处理的,如果是,则去除处理程序后再尝试
            if (imgSrc.indexOf('?') > -1) {
              imgSrc = imgSrc.split('?')[0]
              loading = false
              setImgSource(imgSrc)
              return
            }
            if (errorUrl) {
              el.style.backgroundImage = `url('${errorUrl}')`
              el.style.backgroundSize = `50% auto`
              for (let key in errorStyle) {
                if (errorStyle.hasOwnProperty(key)) {
                  el.style[key] = errorStyle[key]
                }
              }
            } else {
              el.style.backgroundImage = 'none'
            }
            if (el.classList) {
              el.classList.remove('small-loading')
            } else {
              el.className = el.className.replace('small-loading', '')
            }
            el.currentLoadingUrl = null
            loading = false
          }
        })
        setTimeout(() => {
          if (url === (binding.value && binding.value.url)) {
            if (loading) {
              if (el.classList) {
                el.classList.add('small-loading')
              } else {
                el.className = el.className += ' small-loading'
              }
            }
          }
        }, 300)
      }
      if (!url) {
        el.style.backgroundImage = errorUrl ? `url('${errorUrl}')` : 'none'
        el.style.backgroundSize = `50% auto`
        for (let key in errorStyle) {
          if (errorStyle.hasOwnProperty(key)) {
            el.style[key] = errorStyle[key]
          }
        }
      } else {
        if (url.then) {
          url.then(rst => {
            setImgSource(rst)
          })
        } else {
          setImgSource(url)
        }
      }
    }
    Vue.directive('img-loader', {
      bind (el, binding) {
        if (binding.value) {
          loadImg(el, binding, binding.value.url, binding.value.defaultUrl || null, binding.value.errorStyle || null)
        }
      },
      update (el, binding) {
        if (binding.value && binding.value !== binding.oldValue) {
          loadImg(el, binding, binding.value.url, binding.value.defaultUrl || null, binding.value.errorStyle || null)
        }
      }
    })
  }
}
