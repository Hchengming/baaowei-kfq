<template>
  <div class="widget-base widget-cygn">
    <div class="widget-content">
      <div class="widget-head">
        <span class="widget-head-title">常用功能</span>
        <span class="widget-head-more" @click="toApplicationSetting">更多>></span>
      </div>
      <div class="widget-body">
        <div v-if="cygn.length !== 0" class="widget-body-box">
          <el-carousel v-if="cygn[0].apps.length>showNums" height="160px" :interval="3000" indicator-position="none" :autoplay="false">
            <el-carousel-item v-for="it in Math.ceil(cygn[0].apps.length/showNums)" :key="it">
              <el-row class="widget-body-carousel-row">
                <el-col
                  v-for="(i,index) in cygn[0].apps.slice(showNums*(it-1),showNums*(it-1)+showNums)"
                  :key="index"
                  :span="showNums==8?6:8"
                  class="widget-body-carousel-col"
                  :style="`width:${showNums==8?25:33.333}%`"
                >
                  <div class="widget-body-carousel-col-item" :title="i.abbreviation||i.name" @click="appClick(i)">
                    <div class="widget-body-carousel-col-icon">
                      <img :src="i.icon||'/appDefaultIcon.png'">
                      <img style="display:none;" :src="i.lighticon||'/appDefaultIconLight.png'">
                    </div>
                    <div class="widget-body-carousel-col-title text-overflow-hidden">{{ i.abbreviation||i.name }}</div>
                  </div>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
          <el-row v-if="cygn[0].apps.length<=showNums" class="widget-body-carousel-row">
            <el-col
              v-for="(i,index) in cygn[0].apps"
              :key="index"
              :span="showNums==8?6:8"
              class="widget-body-carousel-col"
              :style="`width:${showNums==8?25:33.333}%`"
            >
              <div class="widget-body-carousel-col-item" :title="i.abbreviation||i.name" @click="appClick(i)">
                <div class="widget-body-carousel-col-icon">
                  <img :src="i.icon||'/appDefaultIcon.png'" class="img">
                  <img :src="i.lighticon||'/appDefaultIconLight.png'" class="img-hover">
                </div>
                <div class="widget-body-carousel-col-title text-overflow-hidden">{{ i.abbreviation||i.name }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-else class="widget-body-box" />
        <el-divider class="widget-body-divider-line" />
        <el-row :gutter="20" class="line-row">
          <el-col :span="6" style="text-align: center">
            <div @click="openMetting('局领导一周工作安排','/print.html?leadercurrweek')">
              <div style="cursor:pointer;" class="icon-item-icon">
                <img src="@/assets/home/未标题-1_03.png">
              </div>
              <div class="line-content">
                <div>局领导</div>
                <div>一周安排</div>
              </div>
            </div>
          </el-col>
          <el-col :span="6" style="text-align: center">
            <div @click="openMetting('全局一周工作安排','/print.html?currweek')">
              <div style="cursor:pointer;" class="icon-item-icon">
                <img src="@/assets/home/未标题-1_05.png">
              </div>
              <div class="line-content">
                <div>全局</div>
                <div>一周安排</div>
              </div>
            </div>
          </el-col>
          <el-col :span="6" style="text-align: center">
            <div @click="openMetting('处室一周工作安排','/DatePlanTable/Month?show=org')">
              <div class="icon-item-icon" style="cursor:pointer;">
                <img src="@/assets/home/未标题-1_07.png">
              </div>
              <div class="line-content">
                <div>处室</div>
                <div>一周安排</div>
              </div>
            </div>
          </el-col>
          <el-col :span="6" style="text-align: center">
            <div @click="openMetting('我的一周工作安排','/DatePlanTable/Month?show=my')">
              <div class="icon-item-icon">
                <img src="@/assets/home/我的一周.png">
              </div>
              <div class="line-content">
                <div>我的</div>
                <div>一周安排</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <BgSVGBase />
  </div>
</template>

<script>
import { MeetingSystemApi } from '@/utils/config'
import BgSVGBase from './BgSVGBase'
export default {
  name: 'WidgetCYGN',
  components: {
    BgSVGBase
  },
  data() {
    return {
      showNums: 6
    }
  },
  computed: {
    cygn: {
      get() {
        return this.$store.state.user.cygn
      },
      set(val) {
        this.$store.state.user.cygn = val
      }
    }
  },
  watch: {},
  created() {
    this.showNums = document.body.clientWidth > 1430 ? 8 : 6
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.changeSize()
    }, false)
  },
  methods: {
    toApplicationSetting() {
      this.$router.push('home/setting')
    },
    openMetting(title, url) {
      this.OpenPage(title, `${MeetingSystemApi}/AssistDataBaseApi/login?ticket=${localStorage.ticket}&userip=${localStorage.ip}&redirect=${encodeURIComponent(url)}`)
    },
    appClick(item) {
      if (item.MenuId) {
        this.OpenPage(item.MenusName, item.OutUrl)
      } else if (item.name === '取回任务') {
        this.$store.commit('user/SET_QUHUI', true)
      } else if (item.name === '未结任务') {
        this.$router.push('/home/wjdetail')
      } else if (item.name === '已办任务') {
        this.$router.push('/home/ybdetail')
      } else if (item.name === '待办任务') {
        this.$router.push('/home/dbsxdetail')
      } else {
        this.OpenPage(item.name, item.url)
      }
    },
    changeSize() {
      this.showNums = document.body.clientWidth > 1440 ? 8 : 6
    }
  }
}
</script>

<style scoped lang="scss">
.widget-base {
    width: 100%;
    height: 320px;
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
            display: flex;
            line-height: 40px;
            height: 40px;
            font-size: 16px;
            .widget-head-title {
                text-align: left;
                width: 80px;
                flex: 1;
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
          .widget-body-box{
            height: 160px;
          }

            .widget-body-carousel-row{
              display: block;
              .widget-body-carousel-col{
                padding: 0px 4px;
                .widget-body-carousel-col-item{
                  padding:5px 10px;
                  width: 100%;
                  cursor: pointer;
                  text-align: center;
                  .widget-body-carousel-col-icon{
                    height: 50px;
                    width: 100%;
                    float: left;
                  }
                  .widget-body-carousel-col-icon img.img{
                    display: inline;
                  }
                  .widget-body-carousel-col-icon img.img-hover{
                    display: none;
                  }
                  .widget-body-carousel-col-title{
                    width: 100%;
                    float: left;
                    text-align: center;
                    line-height: 20px;
                  }
                }
              }
              .widget-body-carousel-col-item:hover{
                .widget-body-carousel-col-icon img.img{
                  display: none;
                }
                .widget-body-carousel-col-icon img.img-hover{
                  display: inline;
                }
                .widget-body-carousel-col-title{
                  color:#46a6ff;
                }
              }
            }
            .hovericonparent:hover {
              .hoverlighticon {
                  text-align: center;
                display: block;
              }
              .hovericon {
                  text-align: center;
                display: none;
              }
            }
            .hoverlighticon {
              display: none;
            }
        }
        .widget-body-divider-line{
          margin: 10px 0px;
          background: #99ceff;
        }
    }
}
.widget-base:last-child{
    margin-top: 15px;
}
</style>
