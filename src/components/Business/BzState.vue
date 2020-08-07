/**
* 创建人:carlma
* 日  期:2020-02-20
*/
<template>
  <div v-loading="loading" class="bz-state">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态名称" prop="BsName">
            <el-input v-model="form.BsName" maxlength="32" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态编码" prop="BsCode">
            <el-input v-model="form.BsCode" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态ID">
            <el-input v-model="form.BsId" maxlength="10" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序序号" prop="BsOrder">
            <el-input v-model="form.BsOrder" maxlength="10" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.BsRemark" type="textarea" :rows="10" maxlength="64" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getStateInfo, editStateInfo } from '@/api/ApiBusiness'
export default {
  name: 'BzState',
  props: {
    parameter: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: true,
      form: {
        BfBizz: '',
        Id: '',
        ParId: '',
        BsName: 1,
        BsCode: 0,
        BsId: 0,
        BsOrder: 0,
        BsRemark: ''
      },
      query: {
        action: 'Load_BzStateInfo'
      },
      rules: {
        BsName: [{ required: true, message: '请输入状态名称', trigger: 'blur' }, { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }],
        BsCode: [{ required: true, message: '请输入状态编码', trigger: 'blur' }],
        BsOrder: [{ required: true, message: '请输入排序序号', trigger: 'blur' }, { type: 'number', message: '排序序号必须为数字', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loading = true
    this.query = { ...this.query, ...this.parameter }
    getStateInfo(this.query).then(res => {
      this.loading = false
      this.form = { ...res.data.rows[0] }
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
    handleSubmitStateInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            reject('请填写必填项')
          } else {
            this.loading = true
            // eslint-disable-next-line no-unused-vars
            editStateInfo(JSON.stringify(this.form)).then(res => {
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
.bz-state{
    padding:5px 10px;
}
.bz-state .el-form-item{
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
