# img-loader-directive

## 使用方法

1. 引入

```javascript
import ImageLoaderDirective from '@liguang/img-loader-directive'
Vue.use(ImageLoaderDirective)
```

2. 使用

   - 当前DOM节点不是 `IMG` 时，在加载过程中，会在相应DOM上添加 `small-loading` 样式
   - 当前DOM节点如果是 `IMG`，只会设置对应的 `src` 属性

3. 参数说明
   - url: 必须传入
   - defaultUrl: 可选，如果未传，则加载失败时，不显示任何内容
   - defaultStyle: 图片加载失败时的样式

**ulr可以为promise，返回图片路径. 但使用Promise时，防止出现 由于页面的刷新，返回的Promise对象随之变化（会导致每次刷新都会重新加载图片）。**


```html
<div v-img-loader="{url: '图片路径', defaultUrl: '图片加载失败时的图片路径', defaultStyle: {}}">
</div>
```


[查看示例](https://liguang86.github.io/img-loader-directive/dist)

