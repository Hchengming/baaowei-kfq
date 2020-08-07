<template>
  <el-dialog
    :modal="false"
    title="技术支持"
    :visible.sync="drawerfeedback"
    width="80%"
    class="feedback"
  >
    <el-tabs v-model="activeName" @tab-click="changeIframe">
      <el-tab-pane label="技术支持" name="first">
        <div id="xixi" style="height:700px;overflow-y: scroll;overflow-x:hidden">
          <div class="secondAPPList" style="font-size: 15px;">
            <div style="padding: 15px;">
              <div>
                <div style="margin:10px;text-align: center;">
                  <div style>
                    <div
                      style="margin:20px;color: #1890ff;font-family: 'Microsoft YaHei';font-weight: bold"
                    >平台维护</div>
                    <div>
                      <el-table
                        header-cell-class-name="cellheadClass"
                        :data="tableData"
                        style="width: 100%;border-radius: 3px"
                        cell-class-name="cellClass"
                        border
                      >
                        <el-table-column prop="whr" label="维护人" width="100" />
                        <el-table-column prop="tel" label="座机电话" />
                        <el-table-column prop="house" label="部门" />
                      </el-table>
                    </div>
                    <div
                      style="margin:20px;color: #1890ff;font-family: 'Microsoft YaHei';font-weight: bold"
                    >自然资源数据维护</div>
                    <div>
                      <el-table
                        header-cell-class-name="cellheadClass"
                        cell-class-name="cellClass"
                        :data="tableData2"
                        border
                        style="width: 100%;border-radius: 3px"
                      >
                        <el-table-column prop="whr" label="维护人" width="100" />
                        <el-table-column prop="tel" label="座机电话" />
                        <el-table-column prop="house" label="单位" />
                      </el-table>
                    </div>
                    <div
                      style="margin:20px;color: #1890ff;font-family: 'Microsoft YaHei';font-weight: bold"
                    >规划和测绘数据维护</div>
                    <div>
                      <el-table
                        header-cell-class-name="cellheadClass"
                        cell-class-name="cellClass"
                        :data="tableData3"
                        style="border-radius: 3px;width: 100%"
                        border
                      >
                        <el-table-column prop="whr" label="维护人" width="100" />
                        <el-table-column prop="tel" label="座机电话" />
                        <el-table-column prop="house" label="单位" />
                      </el-table>
                    </div>
                    <div
                      style="margin:20px;color: #1890ff;font-family: 'Microsoft YaHei';font-weight: bold"
                    >硬件维护</div>
                    <div>
                      <el-table
                        header-cell-class-name="cellheadClass"
                        cell-class-name="cellClass"
                        border
                        :data="tableData4"
                        style="border-radius: 3px;width: 100%"
                      >
                        <el-table-column prop="whr" label="维护人" width="100" />
                        <el-table-column prop="tel" label="座机电话" />
                        <el-table-column prop="house" label="单位" />
                      </el-table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的建议/意见反馈" name="second">
        <iframe
          id="FeedBack"
          ref="FeedBack"
          name="FeedBack"
          :src="feedbackIframeUrl"
          :style="{width: '100%',height:'700px',border:'0'}"
        />
      </el-tab-pane>
      <el-tab-pane label="意见反馈列表" name="third">
        <div style="height: 700px;overflow-y: auto;">
          <div>
            <el-select v-model="ReplyCount" placeholder="请选择回复次数" style="width:15%;">
              <el-option label="所有" value />
              <el-option label="无回复" :value="0" />
              <el-option label="有回复" :value="1" />
            </el-select>
            <el-select v-model="value" placeholder="请选择类型" style="width:15%;">
              <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
            <el-date-picker
              v-model="value1"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-button @click="query(1)">搜索</el-button>
          </div>
          <el-table :data="list" style="width: 100%;margin-top:10px">
            <el-table-column sortable prop="Sm_type" label="业务类型" width="100" />
            <el-table-column sortable label="标题" width="380" prop="Sm_title">
              <template slot-scope="scope">
                <span
                  style="color: rgb(10, 118, 255);"
                  @click="showDetail(scope.row)"
                  v-html="scope.row.Sm_title"
                />
              </template>
            </el-table-column>
            <el-table-column sortable prop="Sm_userid" label="反馈人" width="100" />
            <el-table-column sortable prop="Sm_createtime" label="反馈时间" />
            <el-table-column sortable prop="Sm_readcount" label="阅读次数" width="100" />
            <el-table-column sortable prop="Sm_lastreplytime" label="最后回复时间" />
            <el-table-column sortable prop="Sm_replycount" label="回复次数" width="100" />
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalCount"
              style="margin-top: 20px"
              :page-size="pageSize"
              @current-change="query"
            />
          </el-table>
          <el-footer style="border-radius: 3px;text-align: center">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalCount"
              style="margin-top: 20px"
              :page-size="pageSize"
              @current-change="query"
            />
          </el-footer>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { OldSystemApi } from '@/utils/config'
import { getYjfk } from '@/api/home/ApiHome'

export default {
  name: 'Feedback',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      value1: '',
      ReplyCount: '',
      value: '',
      options: [
        {
          options: [
            {
              value: '',
              label: '所有类别',
            },
          ],
        },
        {
          label: '基础平台',
          options: [
            {
              value: '首页',
              label: '首页',
            },
            {
              value: '邮件',
              label: '邮件',
            },
            {
              value: '待办任务',
              label: '待办任务',
            },
            {
              value: '已办任务',
              label: '已办任务',
            },
          ],
        },
        {
          label: '规划审批',
          options: [
            {
              value: '建管业务',
              label: '建管业务',
            },
            {
              value: '市政业务',
              label: '市政业务',
            },
            {
              value: '违法建设',
              label: '违法建设',
            },
            {
              value: '规划编制',
              label: '规划编制',
            },
          ],
        },
        {
          label: '行政办公',
          options: [
            {
              value: '市局发文',
              label: '市局发文',
            },
            {
              value: '分局发文',
              label: '分局发文',
            },
            {
              value: '城乡规划综合数据库查询',
              label: '城乡规划综合数据库查询',
            },
            {
              value: '其他',
              label: '其他',
            },
          ],
        },
      ],
      list: [],
      title: '',
      checkList: [],
      content: null,
      editorOption: {},
      activeName: 'first',
      tableData: [
        {
          whr: '陈萃',
          tel: '63158940 ',
          house: '重庆市规划和自然资源局信息中心',
        },
        {
          whr: '徐放',
          tel: '63158938',
          house: '重庆市规划和自然资源局信息中心',
        },
        {
          whr: '靳莉君',
          tel: '63158947',
          house: '重庆市规划和自然资源局信息中心',
        },
        {
          whr: '付世娇',
          tel: '63158946 ',
          house: '重庆市规划和自然资源局信息中心',
        },
        {
          whr: '万斯奇',
          tel: '63158941',
          house: '重庆市规划和自然资源局信息中心',
        },
      ],
      tableData2: [
        {
          whr: '江卓',
          tel: '67468552 ',
          house: '重庆市规划和自然资源局信息中心',
        },
        {
          whr: '雷秋霞',
          tel: '67468552',
          house: '重庆市规划和自然资源局信息中心',
        },
      ],
      tableData3: [
        {
          whr: '罗波',
          tel: '63158918 ',
          house: '重庆市规划和自然资源局信息中心',
        },
        {
          whr: '沙漠',
          tel: '63158919',
          house: '重庆市规划和自然资源局信息中心',
        },
      ],
      tableData4: [
        {
          whr: '田云兵',
          tel: '63158937',
          house: '重庆市规划和自然资源局信息中心',
        },
        {
          whr: '张好',
          tel: '15902360692',
          house: '重庆市规划和自然资源局信息中心',
        },
        {
          whr: '洪永文',
          tel: '63158949',
          house: '重庆市规划和自然资源局信息中心',
        },
        {
          whr: '郑翔',
          tel: '63158949',
          house: '重庆市规划和自然资源局信息中心',
        },
      ],
      isDisplay: true,
      feedbackIframeUrl:
        OldSystemApi +
        '/Modules/Suggestion/create/index.htm?flag=' +
        Math.random(),
    }
  },
  computed: {
    drawerfeedback: {
      get() {
        return this.$store.state.user.drawerfeedback
      },
      set(val) {
        this.$store.state.user.drawerfeedback = val
      },
    },
  },
  watch: {},
  mounted() {
    this.query()
  },
  methods: {
    query(pageNum) {
      if (this.value1 == null) {
        this.value1 = ['', '']
      }
      this.pageNum = pageNum || this.pageNum
      var param = {
        ReplyCount: this.ReplyCount,
        bTime: this.value1[0] || '',
        eTime: this.value1[1] || '',
        type: this.value,
        pageNum: this.pageNum,
        limit: this.pageSize,
      }
      getYjfk(param).then((res) => {
        this.list = res.data.list
        this.totalCount = res.data.total
        this.list.map(function (item) {
          var dateee = new Date(item.Sm_createtime).toJSON()
          item.Sm_createtime = new Date(+new Date(dateee) + 8 * 3600 * 1000)
            .toISOString()
            .replace(/T/g, ' ')
            .replace(/\.[\d]{3}Z/, '')
          var dateee2 = new Date(item.Sm_lastreplytime).toJSON()
          item.Sm_lastreplytime = new Date(+new Date(dateee2) + 8 * 3600 * 1000)
            .toISOString()
            .replace(/T/g, ' ')
            .replace(/\.[\d]{3}Z/, '')
        })
      })
    },
    showDetail(row) {
      this.OpenPage(
        row.Sm_title,
        '/Modules/Suggestion/view/index.htm?pid=' + row.Sm_id
      )
    },
    changeIframe(tab) {
      if (tab.name === 'second') {
        this.feedbackIframeUrl =
          this.feedbackIframeUrl.substring(
            0,
            this.feedbackIframeUrl.indexOf('?')
          ) +
          '?flag=' +
          Math.random()
      }
    },
  },
}
</script>

<style lang="scss">
.feedback {
  .cellClass {
    font-size: 15px;
    color: #22334a;
  }
  .cellheadClass {
    font-size: 15px;
    color: #22334a;
    font-weight: normal;
  }
  .el-table td,
  .el-table th.is-leaf {
    // border: 1px solid #c8d2e2;
  }
  .el-table--medium th,
  .el-table--medium td {
    padding: 4px 0;
  }
  .el-table--medium th {
    background-color: #f5f7fa;
  }
  .el-dialog__body {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    overflow-y: auto;
    border: 1px solid #1890ff;
  }
  .el-dialog__title {
    border-radius: 3px;
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
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 8px !important;
    border-bottom: 1px solid #ccc;
    background-color: #399fff;
  }
}
</style>
