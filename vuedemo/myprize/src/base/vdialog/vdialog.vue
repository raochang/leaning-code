<template>
  <div class="dialog-wrapper" v-show="dialogVisible">
    <div class="dialog">
      <div class="header">
        <div class="star">
          <img :src="`${require('./star.png')+'?v='+version}`" alt="">
        </div>
        <div class="tit-wrapper">
          <div class="pre-tit">恭喜你获得</div>
          <div class="title">{{title}}</div>
        </div>
        <div class="close" @click="close">
          <img :src="`${require('./close.png')+'?v='+version}`" alt="关闭">
        </div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="error" v-show="error!==''">{{error}}</div>
      <div class="bottom">
        <div class="btnOK" @click="submit">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vdialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    version: {
      type: Number,
      default: 0
    }
  },
  computed: {
    dialogVisible() {
      return this.visible
    }
  },
  watch: {},
  methods: {
    close() {
      this.$emit('onClose')
    },
    submit() {
      this.$emit('onOK')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.dialog-wrapper
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0, 0, 0, 0.6)
  z-index 100
.dialog
  position absolute
  border-radius 8px
  width 300px
  left 50%
  top 50%
  transform translate3d(-50%, -50%, 0)
  background-color #ffffff
  .header
    display flex
    align-items center
    border-radius 8px 8px 0 0
    background linear-gradient(120deg, #de6262, #c07dc7)
    .star
      width 75px
      transform scale3d(1.35, 1.35, 1.35)
      flex 0 0 65px
      img
        width 100%
    .tit-wrapper
      flex 1
      padding-left 12px
      .pre-tit
        color #ffffff
        font-size 16px
      .title
        color #f5ee66
        margin-top 7px
        font-weight 600
        font-size 19px
        max-height 48px
        overflow hidden
        line-height 24px
        word-break break-all
    .close
      position absolute
      top 4px
      right 4px
      width 16px
      extend-click(-5px)
      img
        width 100%
  .content
    padding 13px 13px 20px 13px
  .bottom
    display flex
    padding 7px 13px 16.7px 13px
    border-bottom-right-radius 8px
    border-bottom-left-radius 8px
    .btnOK
      flex 1
      border-radius 2px
      background #de4545
      color #ffffff
      font-size 16px
      height 36.7px
      text-align center
      line-height 36.7px
  .error
    color red
    font-size 12px
    text-align center
</style>
