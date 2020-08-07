<template>
  <div class="quhui">
    <el-dialog title="取回任务" :visible.sync="isShowQuhui" width="60%" center>
      <h4 style="margin: 10px 0px;">双击表格对应行取回任务</h4>
      <el-table :data="quhuiList" border style="width: 100%" @row-dblclick="quhuiClick">
        <el-table-column prop="报建编号" label="报建编号" />
        <el-table-column prop="项目名称" label="项目名称" width="400" />
        <el-table-column prop="现处环节" label="现处环节" />
        <el-table-column prop="接收人" label="接收人" />
        <el-table-column prop="发送时间" label="发送时间" />
        <el-table-column label="操作" header-align="center">
          <template slot-scope="scope">
            <div style="text-align: center">
              <el-button type="text" @click="quhuiClickBtn(scope.row)">取回</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="quhuiTotalCount"
            style="margin-top: 10px"
            :page-size="10"
            @current-change="quhuiHandleCurrentChange"
          />
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getQuhuiList, quHuiOperate } from '@/api/home/ApiHome'

export default {
  name: 'Quhui', // 取回任务,
  data() {
    return {
      quhuiTotalCount: 0,
      quhuiPageNum: 0,
      quhuiList: [],
    }
  },
  computed: {
    isShowQuhui: {
      get() {
        return this.$store.state.user.quhui
      },
      set(val) {
        this.$store.state.user.quhui = val
      },
    },
  },
  watch: {
    isShowQuhui() {
      if (this.isShowQuhui) {
        this.quhui()
      }
    },
  },
  methods: {
    quhuiHandleCurrentChange(val) {
      getQuhuiList(val).then((res) => {
        this.quhuiList = res.data.Data.list
      })
    },
    quhuiClick(row) {
      quHuiOperate(row).then((res) => {
        if (res.data.Status === 1) {
          this.quhui()
          this.$message({
            message: '成功',
            type: 'success',
          })
        } else alert(res.data.Msg)
      })
    },
    quhuiClickBtn(row) {
      quHuiOperate(row).then((res) => {
        if (res.data.Status === 1) {
          this.quhui()
          this.$message({
            message: '成功',
            type: 'success',
          })
        } else alert(res.data.Msg)
      })
    },
    quhui() {
      getQuhuiList(1).then((res) => {
        this.quhuiList = res.data.Data.list
        this.quhuiTotalCount = res.data.Data.count
      })
    },
  },
}
</script>

<style lang="scss">
.quhui {
  .el-table td,
  .el-table th.is-leaf,
  .el-table--border,
  .el-table--group {
    border-color: #c8d2e2;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    border-color: #c8d2e2;
  }
  .el-table--medium th,
  .el-table--medium td {
    padding: 4px 0;
  }
  .el-table--medium th {
    background-color: #f5f7fa;
  }
  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    font-family: 'Microsoft YaHei';
    // color: white;
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
    // color: white;
  }
  .el-dialog__header {
    padding: 8px !important;
    border-bottom: 1px solid #ccc;
    // background-color: #399fff;
  }
}
</style>
