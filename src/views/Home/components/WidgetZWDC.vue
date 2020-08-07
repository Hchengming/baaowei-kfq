<template>
  <div class="widget-base widget-zwdc">
    <div class="widget-content">
      <div class="widget-head">
        <span class="item widget-head-title">政务督查</span>
        <span class="item widget-head-count">{{ zwdc.count }}</span>
        <span class="item widget-head-more" @click="appClick({name:'政务督查',url:'/Modules/ExecutiveOffice/NewExecutive.htm'})">更多>></span>
      </div>
      <div class="widget-body">
        <li v-for="(item,index) in zwdcdata" :key="index" class="widget-body-item">
          <div class="ioc">●</div>
          <div
            class="title"
            :title="item.SXMC"
            @click="appClick(item)"
          >{{ item.SXMC }}</div>
          <div :class="`date ${formatDate(item.JBSJ).className}`">{{ formatDate(item.JBSJ).name }}</div>
        </li>
      </div>
    </div>
    <BgSVGBase />
  </div>
</template>

<script>
import { getZwdc } from '@/api/home/ApiHome'
import { formatDateName } from '@/utils/index'
import BgSVGBase from './BgSVGBase'
export default {
  name: 'WidgetZWDC',
  components: {
    BgSVGBase
  },
  data() {
    return {
      zwdc: {},
      zwdcdata: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getZwdc().then(res => {
        this.zwdc = res.data.Data
        this.zwdcdata = res.data.Data.data.slice(0, 4)
      })
    },
    appClick(item) {
      if (item.MenuId) {
        this.OpenPage(item.MenusName, item.OutUrl)
      } else if (item.DBLX) {
        this.OpenPage(
          item.SXMC,
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
    formatDate(time) {
      return formatDateName(time)
    }
  }

}
</script>

<style scoped lang="scss">
.widget-base {
    width: 100%;
    height: 240px;
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
                width: 100px;
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
            .widget-head-count{
                color: #f00;
                text-align: left;
                flex: 1;
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
            list-style: none;
            padding: 0;
            margin: 0;
            display: contents;
            .widget-body-item {
                line-height: 45px;
                display: flex;
                .ioc{
                    font-size:15px;
                    color:  #46a6ff;
                    width: 20px;
                    text-align: center;
                }
                .title{
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                    font-size:14px;
                }
                .title:hover{
                    color:#46a6ff;
                }
                .date{
                    width: 50px;
                    text-align: center;
                    height: 22px;
                    line-height: 22px;
                    border-radius: 5px 5px;
                    font-size: 12px;
                    margin-top: 8px;
                }
            }
        }
    }
}
.widget-base:last-child{
    margin-top: 15px;
}
</style>
