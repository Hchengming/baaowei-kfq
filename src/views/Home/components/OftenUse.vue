<template>
  <div class="application widget-application">
    <div class="application-content">
      <div class="application-head">
        <el-carousel :interval="10000" arrow="always" class="application-carousel">
          <el-carousel-item v-for="(item,index) in lunbo" :key="index" :index="index" class="application-carousel-item">
            <img class="l-img" :src="item.url" :alt="item.alt">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="application-body">
        <OftenUseItem v-for="(item,ii) in application" :key="ii" :data="item" />
      </div>
    </div>
    <BgSVGCenter />
  </div>
</template>

<script>
import BgSVGCenter from './BgSVGCenter'
import OftenUseItem from './OftenUseItem'
import { getApplication, getLunbo } from '@/api/home/ApiHome'
export default {
  name: 'OftenUse',
  components: {
    BgSVGCenter,
    OftenUseItem
  },
  props: {

  },
  data() {
    return {
      lunbo: []
    }
  },
  computed: {
    application: {
      get() {
        return this.$store.state.user.application
      },
      set(val) {
        this.$store.state.user.application = val
      }
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getApplication().then(res => {
        this.$store.commit(
          'user/SET_CYGN',
          res.data.filter(x => x.name === '常用功能')
        )
        this.$store.commit(
          'user/SET_APPLICATION',
          res.data.filter(x => x.name !== '常用功能')
        )
      })
      getLunbo().then(res => {
        this.lunbo = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.application{
    position: relative;
    width: 100%;
    height: 100%;
    .application-content{
      position:absolute;
      top: 20px;
      right: 20px;
      left: 20px;
      bottom: 20px;
      .application-head{
        height: 170px;
        width: 100%;
        border: 1px solid #80baff;
        border-radius:5px;
        .application-carousel{
          height: 100%;
          overflow: hidden;
          .application-carousel-item{
              height: 100%;
              border-radius:5px;
              img{
                  height: 100%;
                  width: 100%;
                }
            }
        }
      }
      .application-body{
        margin: 20px 0px 10px 0px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
      }
  }
}
</style>

<style lang="scss">
.application-carousel{
    .el-carousel__container{
      position:static !important;
      height:auto !important;
    }
}
</style>
