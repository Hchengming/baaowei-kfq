<template>
  <div class="application-item">
    <div class="application-item-box">
      <div class="application-item-head">
        <div class="application-item-head-title">
          {{ data.name }}
        </div>
      </div>
      <div class="application-item-content">
        <el-carousel v-if="data.apps.length>6" :autoplay="false" class="application-item-content-row">
          <el-carousel-item v-for="it in Math.ceil(data.apps.length/6)" :key="it">
            <el-row>
              <el-col v-for="(i) in data.apps.slice(6*(it-1),6*(it-1)+6)" :key="i.id" :span="12" class="application-item-content-col" :title="i.abbreviation||i.name">
                <el-badge :value="i.remind" :hidden="!i.remind" class="application-item-content-col-box">
                  <div class="application-item-content-col-icon" @click="appClick(i)">
                    <img :src="i.icon||'/appDefaultIcon.png'" class="img">
                    <img :src="i.lighticon||'/appDefaultIconLight.png'" class="img-hover">
                  </div>
                  <div class="application-item-content-col-title text-overflow-hidden" @click="appClick(i)">{{ i.abbreviation||i.name }}</div>
                </el-badge>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
        <el-row v-if="data.apps.length<7" class="application-item-content-row">
          <el-col v-for="i in data.apps" :key="i.id" :span="12" class="application-item-content-col" :title="i.abbreviation||i.name">
            <el-badge :value="i.remind" :hidden="!i.remind" class="application-item-content-col-box">
              <div class="application-item-content-col-icon" @click="appClick(i)">
                <img :src="i.icon||'/appDefaultIcon.png'" class="img">
                <img :src="i.lighticon||'/appDefaultIconLight.png'" class="img-hover">
              </div>
              <div class="application-item-content-col-title text-overflow-hidden" @click="appClick(i)">{{ i.abbreviation||i.name }}</div>
            </el-badge>
          </el-col>
        </el-row>
      </div>
    </div>
    <BgSVGCenterItem />
  </div>
</template>

<script>
import BgSVGCenterItem from './BgSVGCenterItem'
export default {
  name: 'OftenUseItem',
  components: {
    BgSVGCenterItem
  },
  props: {
    index: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: null
    }
  },
  methods: {
    appClick(item) {
      console.log('item', item)
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
    }
  }
}
</script>

<style scoped lang="scss">
.application-item{
  width: 32%;
  position: relative;
  .application-item-box{
    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .application-item-head{
      line-height: 22px;
      height: 35px;
      text-align: center;
      .application-item-head-title{
        font-size: 16px;
      }
      .application-item-head-title:before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #3333ff;
        }
      .application-item-head-title::after {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #3333ff;
      }
    }
    .application-item-content{
      list-style: none;
      margin: 6px 0px;
      padding: 0px 15px;
      display: block;
      .application-item-content-row{
        .application-item-content-col{
          width: 50%;
          margin: 10px 0px;
          float: left;
          text-align: center;
          padding: 0px 4px;
          .application-item-content-col-box{
            width: 100%;
            .application-item-content-col-icon{
              height: 50px;
              cursor: pointer;
            }
            .application-item-content-col-icon img.img{
              display: inline;
            }
            .application-item-content-col-icon img.img-hover{
              display:none;
            }
            .application-item-content-col-title{
              padding:5px 0px;
              cursor: pointer;
            }
          }
          .application-item-content-col-box:hover{
            .application-item-content-col-icon img.img{
              display: none;
            }
            .application-item-content-col-icon img.img-hover{
              display:inline;
            }
            .application-item-content-col-title{
              color:#46a6ff;
            }
          }
        }
      }
      .application-item-content-item{
        width: 50%;
        float: left;
        text-align: center;
        margin: 10px 0px;
        .icon-box{
          width: 100%;
        }
        .icon-box img{
          height:45px ;
          width: 45px;
        }
        .title{
          width: 100%;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
