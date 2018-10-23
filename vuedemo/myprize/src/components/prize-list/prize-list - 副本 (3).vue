<template>
  <div class="prize-list">
    <div class="top-bar">
      <label class="radio-label" for="filterCheck">
        <span class="radio-btn">
          <input type="checkbox" id="filterCheck" v-model="isChoosed" class="radio-input">
          <span class="radio-btn-core"></span>
        </span>
        <span class="text">仅查看中奖活动</span>
      </label>
    </div>
    <div class="card-wrapper" v-if="data.prize&&data.prize.length">
      <prize-card :data="item" v-for="(item,index) in data.prize" @onClick="showDialog" :key="index"></prize-card>
    </div>
    <div class="no-data" v-else>
      没有获取到您的中奖数据
    </div>
    <div class="link-more">
      <a href="leapp://ptn/xiaobianinfo.do?get_lpsust=true&targetUrl= http://www.lenovomm.com/welfare/index.html">点此查看更多活动</a>
    </div>
    <v-dialog :visible="dialogVisibleAddr" :error="error" :version="version" :title="dialogTitle" @onOK="submit" @onClose="closeDialogAddr">
      <div class="label-wrapper">
        <span class="text">请尽快填写你的收货地址</span><img :src="`${require('./editor.png')+'?v=1'}`" alt="">
      </div>
      <div class="input-wrapper">
        <span class="label">收货人：</span>
        <input type="text" v-model="addrModel.name" class="text">
      </div>
      <div class="input-wrapper">
        <span class="label">联系电话：</span>
        <input type="text" v-model="addrModel.phone" class="text">
      </div>
      <div class="input-wrapper">
        <span class="label">收货地址：</span>
        <address-cascader @choosed="onChoosed" :default-province="address.province" :default-city="address.city" :default-area="address.area"></address-cascader>
      </div>
      <div class="input-wrapper">
        <span class="label">详细地址：</span>
        <textarea class="text-area" v-model="addrModel.detailAddr"></textarea>
      </div>
    </v-dialog>
    <v-dialog :visible="dialogVisiblePhone" :version="version" :title="dialogTitle" @onOK="submitPhone" @onClose="closeDialogPhone">
      <div class="phoneWrapper">
        <span class="title">手机号码：</span>
        <span class="text">{{phoneNum}}</span>
      </div>
      <div class="phoneTips">( 如有变动请联系客服 )</div>
    </v-dialog>
    <v-dialog :visible="dialogVisibleQB" :error="error" :version="version" :title="dialogTitle" @onOK="submitQB" @onClose="closeDialogQB">
      <div class="label-wrapper">
        <span class="text">请尽快填写你的获奖信息</span><img :src="`${require('./editor.png')+'?v=2'}`" alt="">
      </div>
      <div class="input-wrapper">
        <span class="label">QQ号码：</span>
        <input type="text" v-model="qq" class="text">
      </div>
    </v-dialog>
    <v-dialog :visible="dialogVisibleFlow" :error="error" :version="version" :title="dialogTitle" @onOK="submitFlow" @onClose="closeDialogFlow">
      <div class="label-wrapper ">
        <span class="text">请尽快填写你的收货地址</span><img src="./editor.png" alt="">
      </div>
      <div class="input-wrapper flowWrapper">
        <span class="label">运营商：</span>
        <select v-model="flowModel.supplier">
          <option disabled value="">请选择</option>
          <option>移动</option>
          <option>联通</option>
          <option>电信</option>
        </select>
      </div>
      <div class="flowWrapper input-wrapper">
        <span class="label">充值手机号：</span>
        <input type="text" v-model="flowModel.phone" class="text" disabled>
      </div>
      <div class="flowWrapper input-wrapper">
        <span class="label">充值时间：</span>
        <input type="radio" id="one" value="本月" v-if="monthshow()" v-model="flowModel.chargeTime">
        <label for="本月" v-if="monthshow()">本月</label>
        <br>
        <input type="radio" id="two" value="次月" v-if="nextshow()" v-model="flowModel.chargeTime">
        <label for="次月" v-if="nextshow()">次月</label>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import PrizeCard from 'base/prize-card/prize-card'
import VDialog from 'base/vdialog/vdialog'
const AddressCascader = () => import('base/address-cascader/address-cascader')
// const AddressCascader = (resolve) => {
//   import('base/address-cascader/address-cascader').then((moduel) => {
//     resolve(moduel)
//   })
// }
// import AddressCascader from 'base/address-cascader/address-cascader'
import { getPrizeList, updateAddr, updateQQ, updateFlow } from 'api/prize'
import { ERR_OK } from 'api/config'

export default {
  name: 'prize-list',
  data() {
    return {
      data: {},
      dialogVisibleAddr: false,
      dialogVisiblePhone: false,
      dialogVisibleQB: false,
      dialogVisibleFlow: false,
      itemId: '',
      addrModel: {
        name: '',
        phone: '',
        province: '',
        city: '',
        area: '',
        detailAddr: ''
      },
      selected: '',
      address: {
        province: '',
        city: '',
        area: ''
      },
      dialogTitle: '',
      phoneNum: '',
      qq: '',
      sn: '',
      moduleId: '',
      exchgType: '',
      flowModel: {
        supplier: '',
        phone: '',
        chargeTime: ''
      },
      error: '',
      version: 0,
      isChoosed: false,
      originData: []
    }
  },
  watch: {
    isChoosed() {
      this.filterPrize()
    }
  },
  created() {
    // 获取api接口数据
    this._getPrizeList()
  },
  methods: {
    _getPrizeList() {
      getPrizeList().then(res => {
        if (res.code === ERR_OK) {
          res.data.prize.forEach((v, i) => {
            v.index = i
          })
          this.data = res.data
          this.originData = res.data.prize
        }
      })
    },
    _updateAddr(data) {
      updateAddr(data).then(res => {
        if (res.code === ERR_OK) {
          this.closeDialogAddr()
        }
      })
    },
    _updateQQ(data) {
      updateQQ(data).then(res => {
        if (res.code === ERR_OK) {
          this.closeDialogQB()
        }
      })
    },
    _updateFlow(data) {
      updateFlow(data).then(res => {
        if (res.code === ERR_OK) {
          this.closeDialogFlow()
        }
      })
    },
    filterPrize() {
      let ret = []
      if (this.isChoosed) {
        this.data.prize &&
          this.data.prize.forEach(item => {
            if (item.prizeStatus !== -1) {
              ret.push(item)
            }
          })
      } else {
        ret = this.originData
      }
      this.data.prize = ret
    },
    showDialog(item) {
      this.error = ''
      this.itemId = item.itemId
      this.version = item.index
      // addr 新增字段 moduleId + sn
      this.moduleId = item.moduleId.toString()
      this.sn = item.sn
      // 针对后台返回的address为null值处理
      if (!item.address) {
        item.address = {}
      }
      if (item.prizeType === 0) {
        this.address.province = item.address.province
        this.address.city = item.address.city
        this.address.area = item.address.area
        this.addrModel = item.address
        this.dialogTitle = item.prizeDesc
        this.dialogVisibleAddr = true
        return
      }
      if (item.subPrizeType.toUpperCase() === 'PHONE') {
        this.dialogTitle = item.prizeDesc
        this.phoneNum = item.phone
        this.dialogVisiblePhone = true
        return
      }
      if (item.subPrizeType.toUpperCase() === 'QB') {
        this.dialogTitle = item.prizeDesc
        this.qq = item.qq
        this.dialogVisibleQB = true
        return
      }
      if (item.subPrizeType.toUpperCase() === 'FLOW') {
        this.dialogTitle = item.prizeDesc
        this.flowModel.phone = item.phone
        this.flowModel.supplier = item.supplier
        this.flowModel.chargeTime = item.chargeTime
        this.dialogVisibleFlow = true
        return
      }
    },
    getEntDay() {
      let date = new Date()
      let currentMonth = date.getMonth()
      let nextMonth = ++currentMonth
      let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
      let oneDay = 1000 * 60 * 60 * 24
      return new Date(nextMonthFirstDay - oneDay)
    },
    monthshow() {
      let theday = new Date().getDate()
      let enday = this.getEntDay().getDate()
      if (theday === enday) {
        return false
      } else {
        return true
      }
    },
    nextshow() {
      let theday = 28
      let enday = this.getEntDay().getDate()
      let dauNum = enday - 5
      if (theday <= dauNum) {
        return false
      } else {
        return true
      }
    },
    closeDialogAddr() {
      this.dialogVisibleAddr = false
    },
    onChoosed(obj) {
      this.addrModel.province = obj.province
      this.addrModel.city = obj.city
      this.addrModel.area = obj.area
    },
    submit() {
      if (!this.addrModel.name) {
        this.error = '收货人不能为空'
        return
      }
      if (!this.addrModel.phone) {
        this.error = '联系电话不能为空'
        return
      }
      if (!/^\d+$/.test(this.addrModel.phone)) {
        this.error = '联系电话必须是数字'
        return
      }
      if (
        !this.addrModel.province ||
        this.addrModel.province === '请选择' ||
        !this.addrModel.city ||
        this.addrModel.city === '请选择'
      ) {
        this.error = '请选择省市区'
        return
      }
      if (!this.addrModel.area || this.addrModel.area === '请选择') {
        if (
          this.addrModel.province !== '北京' &&
          this.addrModel.province !== '上海' &&
          this.addrModel.province !== '天津' &&
          this.addrModel.province !== '重庆'
        ) {
          this.error = '请选择省市区'
          return
        }
      }
      if (!this.addrModel.detailAddr) {
        this.error = '详细地址不能为空'
        return
      }
      // addr 新增字段 moduleId + sn
      let data = Object.assign(
        {},
        { bizId: this.moduleId, sn: this.sn, itemId: this.itemId },
        this.addrModel
      )
      this._updateAddr(data)
    },
    submitPhone() {
      this.dialogVisiblePhone = false
    },
    submitQB() {
      if (!this.qq) {
        this.error = 'QQ号不能为空'
        return
      }
      if (!/^\d+$/.test(this.qq)) {
        this.error = 'QQ号必须为数字'
        return
      }
      // QB 新增字段 moduleId + sn
      let data = {
        bizId: this.moduleId,
        sn: this.sn,
        itemId: this.itemId,
        qq: this.qq
      }
      this.data.prize.some(item => {
        if (item.itemId === this.itemId) {
          item.qq = this.qq
          return true
        }
      })
      this._updateQQ(data)
    },
    submitFlow() {
      if (!this.flowModel.supplier) {
        this.error = '请选择运营商'
        return
      }
      if (!this.flowModel.chargeTime) {
        this.error = '请选择充值时间'
        return
      }
      let data = Object.assign(
        {},
        { bizId: this.moduleId, sn: this.sn },
        this.flowModel
      )
      this._updateFlow(data)
      // this.dialogVisibleFlow = false
    },
    closeDialogPhone() {
      this.dialogVisiblePhone = false
    },
    closeDialogQB() {
      this.dialogVisibleQB = false
    },
    closeDialogFlow() {
      this.dialogVisibleFlow = false
    }
  },
  components: {
    PrizeCard,
    VDialog,
    AddressCascader
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.prize-list
  background $color-bg-body
  .top-bar
    padding-bottom 18px
    background #ffffff
    .radio-label
      display flex
      align-items center
      justify-content flex-end
      .radio-btn
        margin-right 3px
      .text
        font-size 12px
        height 12px
        line-height 12px
        color $color-text-ll
        margin-right 23px
    .radio-input
      display none
      &:checked
        + .radio-btn-core
          &:after
            content ' '
            position absolute
            width 8px
            height 8px
            top 4px
            left 4px
            border-radius 50%
            background #999999
    .radio-btn-core
      display block
      position relative
      width 16px
      height 16px
      border-radius 50%
      background #d6d6d6
  .card-wrapper
    padding 0 16px
    overflow-y auto
  .link-more
    background #ffffff
    margin-top 10px
    border-top 1px solid #c5c5c5
    a
      display block
      text-align center
      font-size 12px
      color $color-text-lll
      height 33.3px
      line-height 33.3px
  .no-data
    color #999999
    text-align center
    font-size 12px
    padding-top 10px
  .label-wrapper
    padding-left 62px
    .text
      color #999999
      font-size 12px
    img
      width 12px
  .input-wrapper
    display flex
    align-items center
    margin-top 10px
    .label
      flex 0 0 62px
      font-size 12px
      color #666666
    .text
      flex 1
      border 1px solid #b8b8b8
      font-size 12px
      color #333333
      height 26.7px
      padding 0 5px
    .text-area
      flex 1
      color #333333
      font-size 12px
      font-family inherit
      height 53.3px
      border 1px solid #b8b8b8
      padding 5px
  .phoneWrapper
    font-size 12px
    color #666666
    margin 10px 0 13px 0
  .phoneTips
    font-size 16px
    color #666666
  .flowWrapper
    display flex
    align-items center
    margin-top 10px
    font-size 12px
    .label
      flex 0 0 72px
      color #666666
    .text, select
      border 1px solid #b8b8b8
      color #333333
      height 26.7px
      padding 0 5px
    label
      padding 0 7px 0 3px
</style>
