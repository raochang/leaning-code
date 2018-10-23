<template>
  <div id="app" class="app">
    <css></css>
  </div>
</template>

<script type="text/ecmascript-6">
import Css from 'components/csslesson/lesson1'

export default {
  components: {
    Css
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.app
  max-width 1080px
  margin 5px auto 0 auto
</style>
