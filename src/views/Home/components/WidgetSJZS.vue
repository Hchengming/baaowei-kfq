<template>
  <div class="widget-base widget-sjzs">
    <div class="widget-content">
      <div class="widget-head">
        <span class="item widget-head-title">数据中枢<span>(对接部国土空间基础信息平台)</span></span>
        <span class="item widget-head-more" @click="appClick({name:'数据目录',url:'/#/datacenter/catalog/statisticsnew'})">更多>></span>
      </div>
      <div class="widget-body">
        <el-row style="display: flex;font-size: 16px;">
          <el-col :span="4">建</el-col>
          <el-col :span="4">
            <img src="@/assets/home/数据动画2.gif">
          </el-col>
          <el-col :span="4">聚</el-col>
          <el-col :span="4">
            <img src="@/assets/home/数据动画2.gif">
          </el-col>
          <el-col :span="4">管</el-col>
          <el-col :span="4">
            <img src="@/assets/home/数据动画2.gif">
          </el-col>
          <el-col :span="4">用</el-col>
        </el-row>
      </div>

      <div class="widget-footer">
        <el-carousel :interval="10000" arrow="always" class="widget-fotter-carousel" height="190px">
          <el-carousel-item v-for="(item,index) in data" :key="index" :index="index" class="widget-fotter-carousel-item">
            <div v-for="(sub,i) in item.item" :key="i" :index="i" class="widget-fotter-carousel-item-item">
              <div class="widget-fotter-carousel-item-item-title">{{ sub.title }}</div>
              <div class="widget-fotter-carousel-item-item-num">
                {{ sub.nums }}
                <span class="widget-fotter-carousel-item-item-unit">{{ sub.unit }}</span>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <BgSVGBase />
  </div>
</template>

<script>
import { getTotal } from '@/api/oldDataCenter/ApiStatistics'
import BgSVGBase from './BgSVGBase'
export default {
  name: 'WidgetSJZS',
  components: {
    BgSVGBase
  },
  data() {
    return {
      SJJC: [],
      count: 0,
      data: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    appClick(item) {
      if (item.MenuId) {
        this.OpenPage(item.MenusName, item.OutUrl)
      } else if (item.DBLX) {
        this.OpenPage(
          item.DBLX,
          '/Modules/ExecutiveOffice/TaskReportPage.htm?type=1&TaskID=' +
            item.Task_ID
        )
      } else if (item.taskURL) {
        this.OpenPage(
          item.报建编号,
          item.taskURL.substr(13, item.taskURL.search(',') - 14)
        )
      } else {
        this.OpenPage(item.name, item.url)
      }
    },
    init() {
      getTotal().then(res => {
        var tempdata = []
        tempdata.push({ id: 1, item: [{ id: 1, title: '现状数据', nums: res.data.XZSJAllCount, unit: '项' }, { id: 2, title: '规划数据', nums: res.data.GHSJAllCount, unit: '项' }, { id: 3, title: '管理数据', nums: res.data.GLSJAllCount, unit: '项' }, { id: 4, title: '社会经济', nums: res.data.SHJJAllCount, unit: '项' }] })
        tempdata.push({ id: 2, item: [{ id: 1, title: '资源总数', nums: res.data.all, unit: '个' }, { id: 2, title: '数据总量', nums: res.data.allMem, unit: 'MB' }, { id: 3, title: '访问次数', nums: res.data.sumvisit, unit: '次' }, { id: 4, title: '接入单位', nums: res.data.departCount, unit: '个' }] })
        tempdata.push({ id: 3, item: [{ id: 1, title: '矢量数据', nums: res.data.types[0].num, unit: '个' }, { id: 2, title: '栅格数据', nums: res.data.types[1].num, unit: '个' }, { id: 3, title: '三维数据', nums: res.data.types[2].num, unit: '个' }, { id: 4, title: '传感数据', nums: res.data.types[3].num, unit: '个' }] })
        this.data = tempdata
      })
    }
  }
}
</script>

<style scoped lang="scss">
.widget-base {
    width: 100%;
    height: 278px;
    position: relative;
    .widget-content{
        position:absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 10px;
        .widget-head{
            width: 100%;
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            display: flex;
            .widget-head-title {
                text-align: left;
                flex: 1;
                span{
                  font-size: 14px;
                }
            }
            .widget-head-title:before {
                content: '';
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin-right: 5px;
                border: 2px solid #3333ff;
            }
            .widget-head-more{
                width: 80px;
                color: #1890ff;
                text-align: right;
                font-size: 14px;
                cursor: pointer;
            }
            .widget-head-more:hover{
                color: #f00;
            }
        }
        .widget-body {
          margin: 0px 0 10px 0px;
          color: #397aff;
          text-align: center;
        }
        .widget-footer {
          height: 190px;
          overflow: hidden;
          .widget-fotter-carousel{
            height: 100%;
            overflow: hidden;
            .widget-fotter-carousel-item{
              width:100%;
              height:100%;
              background-color: rgba(233,239,255,0.92);
              display: block;
              .widget-fotter-carousel-item-item{
                width: 50%;
                float: left;
                text-align: center;
                padding: 15px 0px;
                .widget-fotter-carousel-item-item-num{
                  font-family: DINCOND;
                  text-align:center;
                  color:#0000ff;
                  font-size:24px;
                  span{
                    font-size:12px;
                  }
                }
                .widget-fotter-carousel-item-item-title{
                  line-height: 30px;
                  font-weight: 600;
                }
              }
            }
          }
        }
    }
}
.widget-base:last-child{
    margin-top: 15px;
}
</style>
