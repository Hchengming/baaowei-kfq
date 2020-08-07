<template>
  <div class="widget-base">
    <div class="widget-content">
      <div class="widget-head">
        <span class="item widget-head-title">规资动态</span>
        <span class="item widget-head-count">[10]</span>
        <span class="item widget-head-more">更多>></span>
      </div>
      <div class="widget-body">
        <li class="widget-body-item"><div class="ioc">●</div> <div title="《成渝地区双城经济圈国土空间规划》第二次联席会议召开" class="title">《成渝地区双城经济圈国土空间规划》第二次联席会议召开</div> <div class="date otherday">7-21</div></li>
        <li class="widget-body-item"><div class="ioc">●</div> <div title="我市召开2020年高温汛期灾害防治新闻发布会" class="title">我市召开2020年高温汛期灾害防治新闻发布会</div> <div class="date otherday">7-13</div></li>
        <li class="widget-body-item"><div class="ioc">●</div> <div title="我市10个新建社区体育文化公园即将开放" class="title">我市10个新建社区体育文化公园即将开放</div> <div class="date otherday">7-7</div></li>
        <li class="widget-body-item"><div class="ioc">●</div> <div title="市规划自然资源调查监测院员工获“全国青年岗位能手”称号" class="title">市规划自然资源调查监测院员工获“全国青年岗位能手”称号</div> <div class="date otherday">7-6</div></li>
        <li class="widget-body-item"><div class="ioc">●</div> <div title="我市2020年历史文化保护工作培训会顺利召开" class="title">我市2020年历史文化保护工作培训会顺利召开</div> <div class="date otherday">7-6</div></li>
      </div>
    </div>
    <BgSVGBase />
  </div>
</template>

<script>
import BgSVGBase from './BgSVGBase'
export default {
  name: 'WidgetGZDT',
  components: {
    BgSVGBase
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
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
