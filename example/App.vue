<template>
  <div id="app">
    <h2>示例</h2>
    <div class="image-loading" v-img-loader="{url: `./assets/timg${currentIndex}.jpg`}">
      <div>
        <div class="loading-1"></div>
        <div class="loading-2"></div>
        <div class="loading-3"></div>
        <div class="loading-4"></div>
      </div>
    </div>
    <button @click="nextImage">切换图片</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    nextImage () {
      this.currentIndex = (this.currentIndex + 1) % 3
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
@keyframes loading
  0%, 100%
    transform translate(0)
  25%
    transform translate(160%)
  50%
    transform translate(160%, 160%)
  75%
    transform translate(0, 160%)
.image-loading.small-loading
  >div
    display block
.image-loading
  position relative
  width 400px
  height 400px
  background-size contain
  background-repeat no-repeat
  background-position center
  >div
    display none
    position absolute
    left 50%
    top 50%
    margin-left -20px
    margin-top -20px
  .loading-1
  .loading-2
  .loading-3
  .loading-4
    border 0
    margin 0
    width 16px
    height 16px
    position absolute
    border-radius 50%
    animation loading 2s ease infinite
  .loading-1
    background #19a68c
    animation-delay -1.5s
  .loading-2
    background #F63D3A
    animation-delay -1s
  .loading-3
    background #FDA543
    animation-delay -0.5s
  .loading-4
    background #193B48
    animation-delay 0
</style>
