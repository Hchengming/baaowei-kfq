/**
* 创建人:carlma
* 日  期:2020-02-20
*/
<template>
  <div v-loading="loading" class="bz-form">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="表单名称" prop="BfName">
                <el-input v-model="form.BfName" maxlength="64" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="表单代码" prop="BfCode">
                <el-input v-model="form.BfCode" maxlength="256" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="表单类型" prop="BfStyle">
                <el-select v-model="form.BfStyle" placeholder="请选择表单类型">
                  <el-option v-for="(item,index) in BfStyles" :key="item.Id+'_'+index" :label="item.Name" :value="item.Id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单实例">
                <el-radio v-for="(item,index) in BfSingleinsts" :key="item.Id+'_'+index" v-model="form.BfSingleinst" :label="item.Id">{{ item.Name }}</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="表单ID">
                <el-input v-model="form.BfId" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序号">
                <el-input v-model="form.BfOrder" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="文号生成器">
                <el-select v-model="form.FcDocnocode" filterable placeholder="请选择文号生成器">
                  <el-option v-for="(item,index) in FcDocnocodes" :key="item.Id+'_'+index" :label="item.Name" :value="item.Id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文号字段">
                <el-input v-model="form.FcDocnofield" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="扩展窗口">
                <el-select v-model="form.BfExtendwindow" placeholder="请选择扩展窗口">
                  <el-option v-for="(item,index) in BfExtendwindows" :key="item.value+'_'+index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" />
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="文号生成参数">
                <el-input v-model="form.FcDocnoparam" type="textarea" rows="1" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="表单输入参数">
                <el-input v-model="form.BfParams" type="textarea" rows="1" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="JS代码">
                <el-input v-model="form.BfJsscript" type="textarea" rows="10" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.FcRemark" type="textarea" rows="5" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="表达式配置" name="second">
        <div class="expression">
          <el-row>
            <el-col :span="24" class="expression-toolbar">
              <el-button type="primary" size="mini" @click="handleAddExpression()">新增表达式配置</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :key="ExpressionsKey" :data="form.Expressions" height="500" border style="width: 100%" class="expression-table">
                <el-table-column label="表达式">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.BfseExpression" type="textarea" rows="1" maxlength="4000" class="table-box-input" size="small" />
                  </template>
                </el-table-column>
                <el-table-column label="事件类型" width="180" align="center">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.BfseType" placeholder="请选择" size="small">
                      <el-option v-for="(item,index) in EventTypes" :key="item.value+'_'+index" :label="item.label" :value="item.value" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="执行条件" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.BfseContion" type="textarea" rows="1" maxlength="4000" class="table-box-input" size="small" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="60">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleDeleteExp(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="表单浏览" name="third">
        <div class="preview">
          <el-row>
            <el-col :span="24" class="preview-toolbar">
              <input ref="select-file" class="preview-select-file" type="file" accept=".xsn" @change="handleFileChange">
              <el-button icon="el-icon-document" type="primary" size="mini" @click="handleSelectFile()">选择文件</el-button>
              <a ref="download" style="display:none;" />
              <el-button icon="el-icon-download" type="success" size="mini" @click="handleDownloadFile()">下载表单模板</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <iframe ref="preview" class="preview-iframe" :src="publicPath+'preview.html'" height="500" border="0" />
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getFormInfo, editFormInfo, getFormTemplate, uploadFormPageFile, downloadFormPageFile } from '@/api/ApiBusiness'
export default {
  name: 'BzForm',
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
      form: {
        BfBizz: '',
        EncryptBizz: '',
        BfName: '',
        BfCode: '',
        BfStyle: 1,
        BfSingleinst: '0',
        BfId: '',
        BfOrder: '',
        FcDocnocode: 0,
        FcDocnofield: '',
        BfExtendwindow: 0,
        FcDocnoparam: '',
        BfParams: '',
        BfJsscript: '',
        FcRemark: '',
        Expressions: null,
        FormGuid: ''
      },
      BfStyles: [],
      BfSingleinsts: [],
      FcDocnocodes: [],
      BfExtendwindows: [
        { value: '0', label: '不显示' },
        { value: '1', label: 'GIS展示' },
        { value: '2', label: '只分屏显示收文PDF' },
        { value: '3', label: 'PDF分屏和全部显示' }
      ],
      EventTypes: [
        { label: 'OnBeforeSend', value: 'OnBeforeSend' },
        { label: 'OnAfterSend', value: 'OnAfterSend' },
        { label: 'OnRollBack', value: 'OnRollBack' },
        { label: 'OnBeforeStart', value: 'OnBeforeStart' }
      ],
      formInfoQuery: {
        action: 'Load_BzFormInfo'
      },
      formTemplateQuery: {
        action: 'Load_BzFormPageInfo'
      },
      ExpressionsKey: 1,
      // eslint-disable-next-line no-undef
      publicPath: process.env.BASE_URL,
      xdoc: null,
      rules: {
        BfName: [{ required: true, message: '请输入表单名称', trigger: 'blur' }, { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }],
        BfCode: [{ required: true, message: '请输入表单代码', trigger: 'blur' }],
        BfStyle: [{ required: true, message: '请选择表单类型', trigger: 'change' }]
      }
    }
  },
  created() {
    this.loading = true
    this.formInfoQuery = { ...this.formInfoQuery, ...this.parameter }
    // 提取表单数据
    getFormInfo(this.formInfoQuery).then(res => {
      this.form = { ...res.data.rows[0] }
      this.BfStyles = { ...res.data.BoxFromType }
      this.BfSingleinsts = { ...res.data.BoxSingleInst }
      this.FcDocnocodes = { ...res.data.BoxFcDocnocode }

      this.formTemplateQuery = { ...this.formTemplateQuery, ...this.parameter }
      // 如果是新增就提取默认表单模版
      if (this.form.IsNew) {
        this.formTemplateQuery = { action: 'Load_BzFormPageInfo', id: 0, FormGuid: this.form.FormGuid, random: Math.random() }
      }
      getFormTemplate(this.formTemplateQuery).then(res => {
        this._bindIframeInfo(res.data)
      }).catch(res => {
        this._bindIframeInfo(res)
      })

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
    // 删除表达式
    handleDeleteExp(index) {
      this.form.Expressions.splice(index, 1)
    },
    // 添加表达式
    handleAddExpression() {
      if (!this.form.Expressions) {
        this.form.Expressions = []
      }
      this.form.Expressions.push({ 'BfseExpression': '', 'BfseType': '', 'BfseContion': '' })
      this.ExpressionsKey = Math.random()
    },
    // 上传文件
    handleFileChange(e) {
      const files = e.target.files
      const rawFile = files[0]
      if (!rawFile) return
      var ext = rawFile.name.substr(rawFile.name.lastIndexOf('.') + 1).toUpperCase()
      if (ext === 'XSN') {
        const formData = new FormData()
        formData.append('FormGuid', this.form.FormGuid)
        formData.append('file', rawFile)
        uploadFormPageFile(formData).then(res => {
          this.form.FormGuid = res.data.FormGuid
          this._bindIframeInfo(res.data)
        }).catch(res => {
          this._bindIframeInfo(res)
        })
      } else {
        this.$notify({
          title: '失败',
          message: '抱歉,请上传xsn文件!',
          type: 'error',
          duration: 2000
        })
      }
    },
    _bindIframeInfo(data) {
      if (this.$refs.preview && this.$refs.preview.contentWindow) {
        if (data.Xhtml) {
          this.xdoc = data.Xhtml
          this.$refs.preview.contentWindow.document.body.innerHTML = this.xdoc
        } else {
          this.xdoc = ''
          this.$refs.preview.contentWindow.document.body.innerHTML = this.xdoc
        }
      }
    },
    handleSelectFile() {
      this.$refs['select-file'].click()
    },
    // 下载文件
    handleDownloadFile() {
      this.loading = true
      if (this.form.FormGuid && this.form.FormGuid.length === 0) {
        this.$notify({
          title: '失败',
          message: '抱歉,您还没上传表单模板!',
          type: 'error',
          duration: 2000
        })
        return false
      }
      downloadFormPageFile({ FormGuid: this.form.FormGuid, id: this.formInfoQuery.id ? this.formInfoQuery.id : 0, FileName: this.form.BfName }).then(res => {
        this.loading = false
        const content = res
        const fileName = `${this.form.BfName}.xsn`
        const blob = new Blob([content])
        const link = this.$refs.download
        // 下载
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
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
    // 提交表单数据
    handleSubmitFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            // eslint-disable-next-line no-unused-vars
            editFormInfo(JSON.stringify(this.form)).then(res => {
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
          } else {
            reject('error')
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bz-form{
    padding:5px 10px;
}
.bz-form .el-form-item{
    margin-bottom: 20px !important;
}
.expression{
    padding: 5px 10px;
}
.expression-toolbar{
    padding:10px 0px;
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
</style>
