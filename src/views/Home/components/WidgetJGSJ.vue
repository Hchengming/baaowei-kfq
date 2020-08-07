<template>
  <div class="widget-base widget-jgsj">
    <div class="widget-content">
      <div class="widget-head">
        <span class="item widget-head-title">业务动态数据</span>
        <span
          class="item widget-head-more"
          @click="appClick({name:'业务动态数据',url:'http://23.36.120.41:8001/NewPage/YWJC/Index.html'})"
        >更多>></span>
      </div>
      <div class="widget-body">
        <div class="widget-body-data">
          <li
            v-for="(item,index) in zysjjc"
            :key="index"
            style
            class="widget-body-item"
            @click="showBusiness(index)"
          >
            <div class="widget-body-item-head">
              <span>同比</span>
              <span class="total">{{ item.total==null?'-':item.comper }}</span>
            </div>
            <div class="widget-body-item-body">{{ item.total==null?'-':(item.total+item.unit) }}</div>
            <div class="widget-body-item-footer">{{ item.name==null?'-':item.name }}</div>
          </li>
        </div>
        <iframe :src="iframeUrl+flag" class="widget-body-map" border="0" />
      </div>
    </div>
    <BgSVGBase />

    <el-dialog title="建设用地审批" :visible.sync="dialogVisible" width="450px">
      <div>
        <iframe
          frameborder="no"
          width="100%"
          height="400"
          src="http://23.36.120.111:18460/analystrunner/fd756dfa-c67f-4f8b-b653-e04e70862028"
        />
      </div>
    </el-dialog>
    <el-dialog title="矿产砂石监测" :visible.sync="dialogVisible1" width="450px">
      <div>
        <iframe
          frameborder="no"
          width="100%"
          height="400"
          src="http://23.36.120.111:18460/analystrunner/5b1c9bbd-e2ef-48ac-a326-f4c3b3ee2b89"
        />
      </div>
    </el-dialog>
    <el-dialog title="规划条件" :visible.sync="dialogVisible2" width="450px">
      <div>
        <iframe
          frameborder="no"
          width="100%"
          height="400"
          src="http://23.36.120.111:18460/analystrunner/48ffe202-a3e7-4b80-a3c8-f217483fc1f8"
        />
      </div>
    </el-dialog>
    <el-dialog title="规划许可" :visible.sync="dialogVisible3" width="450px">
      <div>
        <iframe
          frameborder="no"
          width="100%"
          height="400"
          src="http://23.36.120.111:18460/analystrunner/9895090d-36b7-47dd-961b-64089caa0731"
        />
      </div>
    </el-dialog>
    <el-dialog title="土地登记" :visible.sync="dialogVisible4" width="450px">
      <div>
        <iframe
          frameborder="no"
          width="100%"
          height="400"
          src="http://23.36.120.111:18460/analystrunner/!6a2c9c5a-b66b-4c97-8eb6-a2739664d3ef/redirect.jsp#/789eec71-435a-4c67-83e8-1e994d94a9db"
        />
      </div>
    </el-dialog>
    <el-dialog title="房屋登记" :visible.sync="dialogVisible5" width="450px">
      <div>
        <iframe
          frameborder="no"
          width="100%"
          height="400"
          src="http://23.36.120.111:18460/analystrunner/736caa47-a0eb-4388-994f-cc07225ef472"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGhzrzyjcsj } from '@/api/home/ApiHome'
import BgSVGBase from './BgSVGBase'
export default {
  name: 'WidgetJGSJ',
  components: {
    BgSVGBase,
  },
  data() {
    return {
      zysjjc: [],
      mapDataObject: {},
      myChart: {},
      myChartOption: {},
      mapData: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      iframeUrl: 'http://23.36.120.41:8001/NewPage/YWJC/index3.html',
      flag: '?flag=' + Math.random(),
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()
    window.addEventListener(
      'resize',
      () => {
        this.changeSize()
      },
      false
    )
  },
  methods: {
    init() {
      getGhzrzyjcsj().then((res) => {
        this.zysjjc =
          res.data.length > 0
            ? res.data
                .filter((item) => {
                  return (
                    item.name === '砂石销量' ||
                    item.name === '土地登记' ||
                    item.name === '房屋登记'
                  )
                })
                .slice(0, 3)
            : []
        this.mapDataObject = res.data[0]
        this.mapData = res.data[0].data
      })
    },
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
    showBusiness() {
      // switch (index) {
      //   case 0:
      //     this.dialogVisible = true
      //     break
      //   case 1:
      //     this.dialogVisible1 = true
      //     break
      //   case 2:
      //     this.dialogVisible2 = true
      //     break
      //   case 3:
      //     this.dialogVisible3 = true
      //     break
      //   case 4:
      //     this.dialogVisible4 = true
      //     break
      //   case 5:
      //     this.dialogVisible5 = true
      //     break
      // }
    },
    changeSize() {
      this.flag = '?flag=' + Math.random()
    },
  },
}
</script>

<style scoped lang="scss">
.widget-base {
  width: 100%;
  height: 278px;
  position: relative;
  .widget-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 10px;
    .widget-head {
      width: 100%;
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      display: flex;
      .widget-head-title {
        text-align: left;
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
      .widget-head-more {
        width: 80px;
        color: #1890ff;
        text-align: right;
        font-size: 14px;
        cursor: pointer;
      }
      .widget-head-more:hover {
        color: #f00;
      }
    }

    .widget-body {
      list-style: none;
      padding: 0;
      margin: 0;
      height: 218px;
      overflow: hidden;
      position: relative;
      .widget-body-data {
        width: 100%;
        position: absolute;
        left: 0;
        z-index: 2;
        .widget-body-item {
          width: 100%;
          float: left;
          text-align: right;
          padding: 8px 5px;
          // cursor: pointer;
          .widget-body-item-head {
            font-size: 14px;
            text-align: inherit;
            .total {
              color: purple;
              vertical-align: top;
            }
          }
          .widget-body-item-body {
            text-align: inherit;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 20px;
            background-image: -webkit-linear-gradient(bottom, blue, purple);
            font-family: DINCOND;
          }
          .widget-body-item-footer {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
      .widget-body-map {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        z-index: 1;
        border: none;
      }
    }
  }
}
.widget-base:last-child {
  margin-top: 15px;
}
</style>

<style lang="scss">
.widget-base {
  .el-button--small {
    padding: 9px 5px;
    font-size: 12px;
    border-radius: 3px;
  }
  .el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    overflow-y: auto;
    border: 1px solid #1890ff;
  }
  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    font-family: 'Microsoft YaHei';
    color: white;
  }
  .el-dialog__headerbtn {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 0px;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 24px !important;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: white;
  }
  .el-dialog__header {
    padding: 8px !important;
    border-bottom: 1px solid #ccc;
    background-color: #399fff;
  }
}
</style>
