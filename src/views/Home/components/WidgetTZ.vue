<template>
  <div class="widget-base" :style="`height:${config.count==4?240:278}px;`">
    <div class="widget-content">
      <div class="widget-head">
        <span class="item widget-head-title">{{ config.title }}</span>
        <span class="item widget-head-count">{{ xtggTotal>0?`${xtggTotal}`:'' }}</span>
        <span class="item widget-head-more" @click="appClick({name:config.title,url: config.url})">更多>></span>
      </div>
      <div class="widget-body">
        <li v-for="(item,index) in xtgg" :key="index" class="widget-body-item">
          <div class="ioc">●</div>
          <div
            class="title"
            :title="item.subject"
            @click="appClick(item)"
          >{{ item.subject }}</div>
          <div :class="`date ${formatDate(item.publishtime).className}`">{{ formatDate(item.publishtime).name }}</div>
        </li>
      </div>
    </div>
    <BgSVGBase />
  </div>
</template>

<script>
import BgSVGBase from './BgSVGBase'
import { getTz } from '@/api/home/ApiHome'
import { formatDateName } from '@/utils/index'
export default {
  name: 'WidgetTZ',
  components: {
    BgSVGBase
  },
  props: {
    config: {
      type: Object,
      default() {
        return {
          title: '通知',
          count: '5',
          type: 3,
          url: '/home/tzdetail'
        }
      }
    }
  },
  data() {
    return {
      xtgg: [],
      xtggTotal: []
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
      getTz(this.config.type).then(res => {
        this.xtggTotal = res.data.Data.count
        this.xtgg = res.data.Data.data.slice(0, this.config.count)
      }).catch(res => {
        console.log('获取通知 error res', res)
      })
    },
    appClick(item) {
      if (item.MenuId) {
        this.OpenPage(item.MenusName, item.OutUrl)
      } else if (item.subject) {
        this.OpenPage(
          item.subject,
          '/Modules/PublicDocument/view/view.htm?id=' + item.docid
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
                margin-left: 20px;
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
