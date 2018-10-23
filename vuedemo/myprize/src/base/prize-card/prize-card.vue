<template>
  <div class="prize-card" :class="getTypeCls()">
    <div class="card-left" :class="getLeCls()">
      <div class="label" v-if="data.prizeStatus!==-1">
        <img :src="getTypeSrc()" alt="">
      </div>
      <div class="content">
        <div class="content-wrapper c333 bold name">
          <span class="tit">活动名称：</span>
          <span class="text" v-html="trimTitle(data.acDesc)"></span>
        </div>
        <div class="content-wrapper c999 time">
          <span class="tit" v-if="data.prizeStatus!==-1">中奖时间：</span>
          <span class="tit" v-else>参与时间：</span>
          <span class="text">{{data.exchangedTime}}</span>
        </div>
        <div class="content-wrapper pname" v-if="data.prizeStatus!==-1">
          <span class="tit">奖品名称：</span>
          <span class="text">{{trimTitle(data.prizeDesc)}}</span>
        </div>
        <div class="content-wrapper status">
          <span class="tit">奖品发放：</span>
          <span class="text" v-html="getPrizeStatusText()"></span>
        </div>
      </div>
    </div>
    <div class="card-right" @click="showDialog" v-if="needShowOpt()">
      <div class="opt">
        <img :src="getOptSrc()" alt="">
        <div class="dotted"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { STATUS_MAP } from 'common/js/config'

const MAX_TITLE_LENGTH = 19

export default {
  name: 'prize-card',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },

  methods: {
    getTypeCls() {
      if (this.data.prizeStatus === -1) {
        return ''
      }
      switch (this.data.prizeType) {
        case 0:
          if (this.data.prizeStatus === 2) {
            return 'shiwu expired'
          }
          return 'shiwu'
        case 1:
          if (this.data.prizeStatus === 3) {
            return 'shiwu expired'
          }
          return 'daicong'
        case 2:
          return 'zicong'
      }
    },
    getTypeSrc() {
      switch (this.data.prizeType) {
        case 0:
          return `${require('./shiwu.png')}?v=${this.data.index}`
        case 1:
          return `${require('./daicong.png')}?v=${this.data.index}`
        case 2:
          return `${require('./zicong.png')}?v=${this.data.index}`
      }
    },
    getOptSrc() {
      if (this.data.prizeType === 0 && this.data.prizeStatus === 0) {
        if (this.data.address && this.data.address.province) {
          return `${require('./pen.png')}?v=${this.data.index}`
        } else {
          return `${require('./car.png')}?v=${this.data.index}`
        }
      }
      if (this.data.prizeType === 1 && this.data.prizeStatus === 0) {
        return `${require('./number.png')}?v=${this.data.index}`
      }
    },
    needShowOpt() {
      // 10.25 U豆不显示编辑
      if (this.data.subPrizeType === 'UBEAN') {
        return false
      }
      if (this.data.prizeType === 0 && this.data.prizeStatus === 0) {
        return true
      }
      if (this.data.prizeType === 1 && this.data.prizeStatus === 0) {
        return true
      }

      return false
    },
    getPrizeStatusText() {
      if (this.data.prizeStatus === -1) {
        return '未中奖'
      }
      if (this.data.prizeStatus === -2) {
        return '刷奖,未发放'
      }
      if (this.data.prizeRemark) {
        return this.data.prizeRemark.trim()
      }
      let postfix = ''
      if (this.data.prizeType === 1) {
        if (this.data.prizeStatus === 1 || this.data.prizeStatus === 2) {
          postfix += this.data.phone || this.data.qq
        }
        // 10.25 U豆不添加手机号或者QQ号
        if (this.data.subPrizeType === 'UBEAN') {
          postfix = ''
        }
      }
      if (this.data.prizeType === 0) {
        if (this.data.prizeStatus === 1) {
          postfix += this.data.deliveryNum.trim()
        }
      }
      if (postfix) {
        return (
          STATUS_MAP[this.data.prizeType][this.data.prizeStatus + ''] +
          '-' +
          postfix
        )
      }
      return STATUS_MAP[this.data.prizeType][this.data.prizeStatus + '']
    },
    getLeCls() {
      if (this.data.prizeStatus === -1) {
        return 'lebg'
      }
      switch (this.data.prizeType) {
        case 0:
          if (this.data.prizeStatus !== 0) {
            return 'lebg'
          }
          break
        case 1:
          if (this.data.prizeStatus !== 0) {
            return 'lebg'
          }
          break
        case 2:
          return 'lebg'
      }
    },
    showDialog() {
      this.$emit('onClick', this.data)
    },
    trimTitle(tit) {
      if (!tit) {
        return ''
      }
      if (tit.length <= MAX_TITLE_LENGTH) {
        return tit
      } else {
        return tit.substring(0, MAX_TITLE_LENGTH) + '...'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.prize-card
  margin-top 10px
  background #ffffff
  display flex
  align-items stretch
  border-radius 8px
  overflow hidden
  .card-left
    position relative
    flex 1
    .label
      border-bottom-right-radius 20px
      width 50px
      height 20px
      padding-left 10px
      img
        width 18px
    .content
      padding 10px 16px 13px 13px
      .status
        color $color-text-ll
      .content-wrapper
        padding 5px
        display flex
        line-height 14px
        max-height 28px
        overflow hidden
        text-overflow ellipsis
        position relative
        .tit
          flex 0 0 70px
        .text
          flex 1
          word-break break-all
          overflow hidden
        .tit, .text
          font-size 12px
      .pname
        display inline-block
        .tit
          display inline-block
          width 70px
          position absolute
        .text
          padding-left 70px
          display inline-block
          max-height 28px
          overflow hidden
  .card-right
    flex 0 0 98px
    position relative
    .opt
      display flex
      height 100%
      position absolute
      padding 0 12px
      background linear-gradient(150deg, $color-bg-op-l, $color-bg-op-l 50%, $color-bg-op-r)
      img
        align-self center
        width 100%
      .dotted
        position absolute
        background-image url('./dotted.png')
        background-size contain
        background-repeat repeat-y
        width 8px
        left -4px
        height 100%
        z-index 10
        top 0
  .lebg
    background-image url('./le.png')
    background-repeat no-repeat
    background-size contain
    background-position right 110%
    .content
      .pname
        margin-right 98px
.shiwu
  .card-left
    .label
      background $color-bg-a-lt
    .content
      .pname
        background $color-bg-a-tit
        color #ffffff
      .status
        color $color-text-a
.daicong
  .card-left
    .label
      background $color-bg-c-lt
    .content
      .pname
        background $color-bg-c-tit
        color #ffffff
      .status
        color $color-text-c
.zicong
  .card-left
    .label
      background $color-bg-d-lt
    .content
      .pname
        background $color-bg-d-tit
        color #ffffff
      .status
        color $color-text-d
.expired
  .card-left
    .label
      background #919191
    .content
      .pname
        background #919191
        color #ffffff
      .status
        color #666666
</style>

