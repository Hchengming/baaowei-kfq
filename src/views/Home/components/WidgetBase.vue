<template>
  <div class="widget-base">
    <div class="widget-content">
      <div class="widget-head">
        <span class="item widget-head-title">通知</span>
        <span class="item widget-head-count">[10]</span>
        <span class="item widget-head-more">更多>></span>
      </div>
      <div class="widget-body">
        <li class="widget-body-item"><div class="ioc">●</div> <div title="关于加快组织开展地质灾害防治项目前期工作的通知" class="title">关于加快组织开展地质灾害防治项目前期工作的通知</div> <div class="date today">7-14</div></li>
        <li class="widget-body-item"><div class="ioc">●</div> <div title="关于征集推荐“我所经历的脱贫攻坚故事”的通知 " class="title">关于征集推荐“我所经历的脱贫攻坚故事”的通知 </div> <div class="date yesterday">7-13</div></li>
        <li class="widget-body-item"><div class="ioc">●</div> <div title="关于农村乱占耕地建房问题整治工作片区座谈会的补充通知" class="title">关于农村乱占耕地建房问题整治工作片区座谈会的补充通知</div> <div class="date otherday">7-8</div></li>
        <li class="widget-body-item"><div class="ioc">●</div> <div title="重庆市矿产资源规划（2021-2025年）编制工作简报 " class="title">重庆市矿产资源规划（2021-2025年）编制工作简报 </div> <div class="date otherday">7-8</div></li>
        <li class="widget-body-item"><div class="ioc">●</div> <div title="重庆市矿产资源规划（2021-2025年）编制工作简报 " class="title">重庆市矿产资源规划（2021-2025年）编制工作简报 </div> <div class="date otherday">7-8</div></li>
      </div>
    </div>
    <BgSVGBase />
  </div>
</template>

<script>
import BgSVGBase from './BgSVGBase'
export default {
  name: '',
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
                width: 80px;
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
