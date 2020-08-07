<template>
  <div class="widget-base widget-dbrw">
    <div class="widget-content">
      <div class="widget-head">
        <span class="widget-head-title">待办事项</span>
        <span class="widget-head-remark">
          <div class="widget-head-remark-item">
            <span>计时图例：[—]不计时</span>
            <input disabled style="width: 15px;height: 15px;">正常
            <input disabled style="width: 15px;height: 15px;background-color: #FFFF00;">预警
            <input disabled style="width: 15px;height: 15px;background-color: #FF7F27;">警告
            <input disabled style="width: 15px;height: 15px;background-color: #DC143C;">超期
          </div>
          <div class="widget-head-remark-item">
            <span>编号图例：</span>
            <input disabled style="width: 15px;height: 15px;background-color: #FF0000;">加急
            <input disabled style="width: 15px;height: 15px;background-color: #5FBD00;">暂停
            <input disabled style="width: 15px;height: 15px;background-color: #1890ff;">正常
          </div>
        </span>
        <span class="widget-head-more" @click="toMore">更多>></span>
      </div>
      <div class="widget-body">
        <el-table :data="dbsxList" :stripe="true">
          <el-table-column label="计时" width="90" align="center">
            <template slot-scope="scope">
              <div style="display: inline-block" v-html="scope.row.阶段倒计时" />
            </template>
          </el-table-column>
          <el-table-column prop="环节倒计时" label="时限" width="100" align="center" />
          <el-table-column label="编号和名称" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.key1.search(/表单$/g)>-1" class="tips text-overflow-ellipsis table-title" :title="scope.row['报建编号']+scope.row['项目名称']" v-html="getLink(scope.row)" />
              <div v-else class="tips text-overflow-ellipsis table-title" style="color: rgb(10, 118, 255);" :title="scope.row['报建编号']+scope.row['项目名称']" @click="titleClick(scope.row)" v-html="getLink(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column prop="所属阶段" label="事项-环节" align="center">
            <template slot-scope="scope">
              <div class="tips text-overflow-ellipsis table-title" :title="scope.row['所属阶段']">{{ scope.row['所属阶段'] }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <BgSVGBase />
  </div>
</template>

<script>
import { getDbsxDetailList } from '@/api/home/ApiHome'
import BgSVGBase from './BgSVGBase'
export default {
  name: 'WidgetDBRW',
  components: {
    BgSVGBase
  },
  data() {
    return {
      dbrw: {},
      dbsxList: [],
      businessType: 'A',
      pageNum: 1,
      pageSize: 4,
      condition: ''
    }
  },
  computed: {},
  watch: {
    //  iframe 窗口关闭刷新待办
    '$store.state.Iframe.lastCloseTime': function() {
      this.query()
    },
    // 关闭取回窗口刷新数据
    '$store.state.user.quhui': function() {
      if (!this.$store.state.user.quhui) {
        this.query()
      }
    }
  },
  created() {
    this.query()
  },
  mounted() {},
  methods: {
    getLink(row) {
      if (!row.表单名称) {
        const el = document.createElement('div')
        el.innerHTML = row.编号和名称
        row.表单名称 = el.innerText
      }
      return decodeURIComponent(row.编号和名称.replace(`OpenNewForm(`, `OpenOldForm('${row.表单名称}${row.报建编号}',`))
    },
    toMore() {
      this.$router.push('/home/dbsxdetail')
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
    query(pageNum, order) {
      this.pageNum = pageNum || this.pageNum
      var param = {
        bizzType: this.businessType,
        condition: this.condition,
        isStagView: false,
        pageNum: this.pageNum,
        order: order,
        pageSize: this.pageSize
      }
      getDbsxDetailList(param).then(res => {
        var obj = JSON.parse(res.data.Data)
        obj.rows.forEach(x => {
          x.lev = 0
          x.children = []
          x.阶段倒计时 = decodeURIComponent(x.阶段倒计时)
        })
        this.dbsxList = obj.rows
      })
    },
    titleClick(row) {
      if (row.编号和名称.indexOf('OpenNewForm') === -1) {
        this.toMore()
      }
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
            .widget-head-remark{
                text-align: center;
                font-size: 12px;
                flex: 1;
                display: flex;
                flex-direction: row-reverse;
                .widget-head-remark-item{
                  margin: 0px 5px;
                }
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
            height: 220px;
            .table-title{
              text-align: left;
              cursor: pointer;
            }
        }
    }
}
.widget-base:last-child{
    margin-top: 15px;
}
</style>
