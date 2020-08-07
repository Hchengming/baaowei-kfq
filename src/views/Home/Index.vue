<template>
  <div class="home-new">
    <el-row class="item-row">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="item-column">
        <WidgetCYGN />
        <WidgetTZ :config="{title:'通知',count:4,type:3,url:'/home/tzdetail'}" />
        <!-- <WidgetZWDC /> -->
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="item-column">
        <OftenUse />
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="item-column">
        <WidgetSJZS />
        <WidgetJGSJ />
      </el-col>
    </el-row>
    <el-row class="item-row">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="item-column">
        <WidgetTZ :config="{title:'公文',count:5,type:8,url:'/home/tzdetail?request=DocumentList&request_type=2'}" />
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="item-column">
        <WidgetDBRW />
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="item-column">
        <WidgetTZ :config="{title:'规划自然资源智库',count:5,type:68,url:'/home/tzdetail?request=ZhiKuDocumentList&request_type=2'}" />
      </el-col>
    </el-row>
    <!-- 动态渲染组件 -->
    <el-row class="item-row">
      <el-col v-for="(item,index) in myComponents" :key="index" :xs="Math.round(item.sizeArr[1]*6*1.3333)" :sm="Math.round(item.sizeArr[1]*6*1.3333)" :md="Math.round(item.sizeArr[1]*6*1.3333)" :lg="Math.round(item.sizeArr[1]*6*1.3333)" :xl="Math.round(item.sizeArr[1]*6*1.3333)" class="item-column">
        <DynamicComponentNew
          v-if="item.type==2"
          :key="item.order"
          class="widget-base"
          :content="item"
        />
        <!-- 老模板 -->
        <ListWidgetNew
          v-if="item.type==1"
          :key="item.order"
          class="widget-base"
          :content="item"
          :config="item.param3"
        />
      </el-col>
    </el-row>
    <PopUpNotice />
  </div>
</template>

<script>
import { getTheWidgetList } from '@/api/home/ApiHome'
import DynamicComponentNew from '@/components/DynamicComponent/IndexNew'
import ListWidgetNew from '@/components/Share/ListWidgetNew'

// import WidgetGZDT from './components/WidgetGZDT'
import PopUpNotice from './components/PopUpNotice'
// import WidgetZWDC from './components/WidgetZWDC'
import WidgetDBRW from './components/WidgetDBRW'
import WidgetSJZS from './components/WidgetSJZS'
import WidgetJGSJ from './components/WidgetJGSJ'
import WidgetTZ from './components/WidgetTZ'
import WidgetCYGN from './components/WidgetCYGN'
import OftenUse from './components/OftenUse'
export default {
  name: 'Home',
  components: {
    WidgetCYGN,
    WidgetTZ,
    WidgetJGSJ,
    WidgetSJZS,
    WidgetDBRW,
    PopUpNotice,
    // WidgetGZDT,
    // WidgetZWDC,
    OftenUse,
    DynamicComponentNew,
    ListWidgetNew
  },
  data() {
    return {
      myComponents: []
    }
  },
  computed: {
    // 分辨率
    resolution() {
      return this.$store.state.user.resolution
    },
    applicationData() {
      return this.$store.state.user.applicationData
    }
  },
  watch: {

  },
  created: function() {
    this.dynamicComponentFun()
  },
  activated() {
    this.dynamicComponentFun()
  },
  methods: {
    dynamicComponentFun() {
      getTheWidgetList().then(res => {
        if (res.success === true) {
          const list = res.data
          list.forEach(ele => {
            if (ele.type === 1) {
              // 老数据
              ele.apeKey = 'c1442e8a-1e7a-4699-89fb-90504501c97c'
              ele.apeName = ele.name
              ele.size = '1*1'
              ele.sizeArr = [1, 1]
              // eslint-disable-next-line
              ele.param3 = eval(`(${ele.param3})`)
            } else {
              ele.sizeArr = ele.size.split('*')
            }
          })
          this.myComponents = list
        }
      })
    },
    widthCalc(size) {
      let addWidth = [12, 50]
      if (document.body.clientWidth >= 1915) {
        addWidth = [12, 24]
      }
      if (+size === 2) {
        return size * this.myWidth + addWidth[0]
      }
      if (+size === 3) {
        return size * this.myWidth + addWidth[1]
      } else {
        return size * this.myWidth
      }
    }
  }
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'DINCOND';
  src: url('../../assets/home/DINCOND-MEDIUM.OTF');
}
.home-new{
    width: 100%;
    min-width: 1430px;
    margin: 0 auto;
    padding: 20px 20px;
    font-size: 14px;
    .item-row{
        .item-column{
            padding:0px 5px;
        }
    }
}
</style>
<style lang="scss">
@media screen and (min-width: 1915px) {
  .home-new {
    width: 1920px;
  }
}
@media screen and (max-width: 1915px) {
  .home-new {
    font-size: 14px;
    width: 1410px;
  }
}
</style>
