<template>
  <div class="pop-layer">
    <el-dialog
      title="未读通知及公文"
      :visible.sync="isShow"
      width="1000px"
      left
    >
      <table class="pop-layer-table">
        <thead>
          <tr class="pop-layer-table-head">
            <th>标题</th>
            <th style="width: 80px;">类型</th>
            <th style="width: 150px;">发布人</th>
            <th style="width: 150px;">发布时间</th>
            <th style="width: 150px;">发布部门</th>
            <th style="width: 100px;">
              <el-button type="danger" @click="markPopUpNotice()">全阅</el-button>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(category,index1) in list">
            <tr v-if="category.list[0]" :key="index1+Math.random()" class="pop-layer-table-type">
              <th colspan="6" style="font-size: 18px;">{{ category.type }}</th>
            </tr>
            <tr v-for="(item,index2) in category.list" :key="index2+Math.random()">
              <td>{{ item.Subject }}</td>
              <td style="text-align: center;">{{ item.type }}</td>
              <td style="text-align: center;">{{ item.Publisher }}</td>
              <td style="text-align: center;">{{ item.PublishTime }}</td>
              <td style="text-align: center;">{{ item.createdepartment }}</td>
              <td style="text-align: center;">
                <el-button type="primary" size="mini" @click="open(item)">阅读</el-button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import { getPopUpNotice, markPopUpNotice } from '@/api/home/ApiHome'

export default {
  name: 'PopUpNotice',
  data() {
    return {
      list: [],
      isShow: false,
      allNotices: []
    }
  },
  mounted: function() {
    this.loadData()
    //  setInterval(this.loadData, 60 * 1000 * 5) //杜康说先屏蔽
  },
  methods: {
    open(row) {
      this.OpenPage(row.Subject, '/Modules/PublicDocument/view/view.htm?id=' + row.DocID)
    },
    markPopUpNotice() {
      const ids = this.allNotices.map(x => x.DocID).join(',')
      // eslint-disable-next-line no-unused-vars
      markPopUpNotice(ids).then(res => {
        // this.loadData() //杜康说先屏蔽
        this.isShow = false
        this.$message({
          message: '成功',
          type: 'success'
        })
      })
    },
    loadData() {
      getPopUpNotice().then(res => {
        this.isShow = (res.data.Data || []).length > 0
        if (!this.isShow) return
        this.allNotices = res.data.Data
        this.list = [{
          type: '一周工作通报',
          list: res.data.Data.filter(x => x.type === '一周工作通报')
        }, {
          type: '公文',
          list: res.data.Data.filter(x => x.type === '公文')
        }, {
          type: '通知',
          list: res.data.Data.filter(x => x.type === '通知')
        }]
      })
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  tr:hover{
    background: #f5f7fa;
    }
  .pop-layer{
    width: 100%;
  }

  .pop-layer-table{
    width: 100%;
    thead tr.pop-layer-table-head{
      background: #1890ff;
      color: white;
      line-height: 40px;
    }
    tbody tr.pop-layer-table-type{
      background: #e9efff;
      color: #1890ff;
      line-height: 40px;
    }
  }

  .pop-layer-table,.pop-layer-table tr th, .pop-layer-table tr td {
    border:1px solid #ccc;
  }
  .pop-layer-table {
    width: 100%;
    min-height: 30px;
    line-height: 30px;
    text-align: center;
    border-collapse: collapse;
  }
</style>
