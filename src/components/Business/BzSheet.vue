/**
* 创建人:carlma
* 日  期:2020-02-20
*/
<template>
  <div v-loading="loading" class="bz-sheet">
    <el-tabs v-model="activeName">
      <el-tab-pane label="打印报表属性" name="first">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="报表名称" prop="RsName">
                <el-input v-model="form.RsName" maxlength="64" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报表编码" prop="RsCode">
                <el-input v-model="form.RsCode" maxlength="256" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="报表类型" prop="RsStyle">
                <el-select v-model="form.RsStyle" placeholder="请选择报表类型">
                  <el-option v-for="(item,index) in RsStyles" :key="item.Id+'_'+index" :label="item.Name" :value="item.Id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否打印意见栏" prop="RcShow">
                <el-radio v-model="form.RcShow" label="是">是</el-radio>
                <el-radio v-model="form.RcShow" label="否">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="从属报表">
                <el-select v-model="form.RsBzform" placeholder="请选择从属报表" @change="handleRsBzformChange">
                  <el-option v-for="(item,index) in RsBzforms" :key="item.Id+'_'+index" :label="item.Name" :value="item.Id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="表单视图">
                <el-select v-model="form.RcView" placeholder="请选择表单视图">
                  <el-option v-for="(item,index) in RcViews" :key="item.Id+'_'+index" :label="item.Name" :value="item.Name" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="数据库表">
                <el-input v-model="form.RcTable" type="textarea" rows="5" maxlength="500" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="排序字段">
                <el-input v-model="form.RcOrder" maxlength="500" />
              </el-form-item>
            </el-col>
            <el-col :span="12" />
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="取数语句">
                <el-input v-model="form.RcSql" type="textarea" rows="5" maxlength="2500" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.RcRemark" type="textarea" rows="5" maxlength="64" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="业务ID">
                <el-input v-model="form.RsId" :disabled="true" maxlength="10" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序序号">
                <el-input v-model="form.NumRsOrder" maxlength="10" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="关联角色" name="second">
        <div class="related-user">
          <el-row>
            <el-col :span="24" class="related-user-toolbar">
              <el-button type="primary" size="mini" @click="handleSelectRoles()">选择角色</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="RelatedUser" height="500" border style="width: 100%" class="related-user-table">
                <el-table-column label="角色名称" prop="ROLENAME" align="center" width="300" />
                <el-table-column label="备注" prop="ROLEREMARK" align="center" />
                <el-table-column label="操作" align="center" width="60">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleDeleteRoles(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="报表导入和预览" name="third">
        <div class="preview">
          <el-row>
            <el-col :span="24" class="preview-toolbar">
              <input ref="select-file" class="preview-select-file" type="file" accept="*" @change="handleFileChange">
              <el-button icon="el-icon-document" type="primary" size="mini" @click="handleSelectFile()">选择文件</el-button>
              <el-button icon="el-icon-download" type="success" size="mini" @click="handleDownloadFile()">导出报表模板</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <iframe ref="preview" class="preview-iframe" :src="publicPath+'preview.html'" height="500" border="0" />
            </el-col>
          </el-row>
        </div>
      </el-tab-pane> -->
    </el-tabs>

    <el-dialog v-drag title="选择角色" :visible.sync="selectRoles" :append-to-body="true" :close-on-click-modal="false" width="80%">
      <el-row>
        <el-col :span="10" class="toobar">
          <el-input v-model="listQuery.keyword" placeholder="请输入关键字" class="input-with-select" clearable width="200" maxlength="10">
            <el-button slot="append" icon="el-icon-search" @click="handleSelectRoles" />
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table ref="AllRelatedUser" :data="AllRelatedUser" height="500" border style="width: 100%" class="related-user-table">
            <el-table-column width="55" label="选择" align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.CHECKED" @change="handleItemChange(scope.row)" />
              </template>
            </el-table-column>
            <el-table-column label="角色名称" width="300" prop="ROLENAME" align="center" />
            <el-table-column label="备注" prop="ROLEREMARK" align="center" />
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="handleSelectRoles" />
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelSelectRoles">
          取消
        </el-button>
        <el-button type="primary" @click="handleSaveSelectRoles()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSheetInfo, editSheetInfo, getAllRoles, getViews } from '@/api/ApiBusiness'
import Pagination from '@/components/Pagination'
export default {
  name: 'BzSheet',
  components: { Pagination },
  props: {
    parameter: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: true,
      activeName: 'first',
      selectRoles: false,
      form: {
        ParId: '',
        EncryptParId: '',
        RsName: '',
        RsCode: '',
        RsStyle: 1,
        RcShow: '',
        RsBzform: 0,
        RcView: '',
        RcTable: '',
        RcOrder: '1',
        RcSql: '',
        RcRemark: '',
        RsId: '',
        NumRsOrder: '',
        RelatedUserIds: ''
      },
      RsStyles: [],
      RsBzforms: [],
      RcViews: [],
      RelatedUser: [],
      AllRelatedUser: [],
      query: {
        action: 'Load_BzSheetInfo'
      },
      listQuery: {
        action: 'GetAllRoles',
        keyword: '',
        page: 1,
        pagesize: 20
      },
      total: 0,
      tempSelectRoles: [],
      // eslint-disable-next-line no-undef
      publicPath: process.env.BASE_URL,
      rules: {
        RsName: [{ required: true, message: '请输入报表名称', trigger: 'blur' }, { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }],
        RsCode: [{ required: true, message: '请输入报表编码', trigger: 'blur' }],
        RsStyle: [],
        RcShow: []
      }
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    RelatedUser: function(newValue, oldValue) {
      this.form.RelatedUserIds = (newValue && newValue.length > 0) ? (newValue.map(item => { return item.ROLEID }) + '') : ''
    },
    // eslint-disable-next-line no-unused-vars
    selectRoles: function(newValue, oldValue) {
      this.listQuery = { action: 'GetAllRoles', keyword: '', page: 1, pagesize: 20 }
    }
  },
  created() {
    // 打印信息
    this.loading = true
    this.query.action = 'Load_BzSheetInfo'
    this.query = { ...this.query, ...this.parameter }
    getSheetInfo(this.query).then(res => {
      this.form = { ...this.form, ...res.data.rows[0] }
      this.RsStyles = { ...res.data.BoxFromType }
      this.RcViews = { ...res.data.BoxFormView }
      this.RsBzforms = { ...res.data.BoxBelongingForm }
      this.RelatedUser = res.data.RelatedRoles

      // getSheetTemplate(this.query).then(res => {
      // // this.$refs.preview.contentWindow.document.write(res.data)
      // }).catch(res => {
      // // this.$refs.preview.contentWindow.document.write(res.data)
      // })

      this.loading = false
    }).catch(res => {
      this.loading = false
      this.$notify({
        title: '失败',
        message: res.message,
        type: 'error',
        duration: 2000
      })
    })
  },
  mounted() {
  },
  methods: {
    // 选择角色
    handleSelectRoles() {
      this.listQuery.action = 'GetAllRoles'
      getAllRoles(this.listQuery).then(res => {
        this.AllRelatedUser = res.data.Data
        this.total = res.data.IntTotalRecord ? res.data.IntTotalRecord : 0
        if (this.AllRelatedUser) {
          // eslint-disable-next-line no-unused-vars
          this.AllRelatedUser.map((item, index) => {
            if (this.form.RelatedUserIds && this.form.RelatedUserIds.length > 0 && this.form.RelatedUserIds.split(',').map(Number).indexOf(item.ROLEID) > -1) {
              item.CHECKED = true
              this.handleItemChange(item)
            }
          })
        }
      }).catch(res => {
        this.$notify({
          title: '失败',
          message: res.message,
          type: 'error',
          duration: 2000
        })
      })
      this.selectRoles = true
    },
    handleItemChange(item) {
      if (item.CHECKED) {
        this.tempSelectRoles.push(item)
      } else {
        this.tempSelectRoles.splice(this.tempSelectRoles.filter(c => { return c.ROLEID === item.ROLEID }), 1)
      }
    },
    // 分页时触发
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.handleSelectRoles()
    },
    // 保存选择角色
    handleSaveSelectRoles() {
      var _temp = []
      if (this.tempSelectRoles && this.tempSelectRoles.length > 0) {
        this.tempSelectRoles.map(item => {
          _temp.push(item)
        })
      }
      this.RelatedUser = _temp
      this.selectRoles = false
    },
    // 取消选择
    handleCancelSelectRoles() {
      this.tempSelectRoles = []
      this.selectRoles = false
    },
    handleDeleteRoles(val) {
      this.RelatedUser.splice(val, 1)
    },
    handleRsBzformChange(val) {
      getViews({ action: 'ChangeView', formId: val, random: Math.random() }).then(res => {
        this.RcViews = { ...res.data.BoxFormView }
      }).catch(res => {
        this.$notify({
          title: '失败',
          message: res.message,
          type: 'error',
          duration: 2000
        })
      })
    },
    // // 选择文件
    // handleFileChange(e) {
    //   const files = e.target.files
    //   const rawFile = files[0] // only use files[0]
    //   if (!rawFile) return
    //   console.log(rawFile)
    // },
    // handleSelectFile() {
    //   this.$refs['select-file'].click()
    // },
    // handleDownloadFile() {
    //   console.log('下载模板')
    // },
    handleSubmitSheetInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            reject('请填写必填项')
          } else {
            this.loading = true
            // eslint-disable-next-line no-unused-vars
            editSheetInfo(JSON.stringify(this.form)).then(res => {
              this.loading = false
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              resolve()
            }).catch(res => {
              this.loading = false
              this.$notify({
                title: '失败',
                message: res.message,
                type: 'error',
                duration: 2000
              })
              reject(res.message)
            })
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bz-sheet{
    padding:5px 10px;
}
.bz-sheet .el-form-item{
    margin-bottom: 20px !important;
}
.related-user{
    padding: 5px 10px;
}
.related-user-toolbar{
    padding:0px 0px 10px 0px;
}
.preview{
    padding: 5px 10px;
}
.preview-toolbar{
    padding:10px 0px;
}
.preview-iframe{
    width: 100%;
    height: 500px;
}
.preview-select-file{
    display: none;
}
.toobar{
  padding: 10px 0px;
}
</style>
