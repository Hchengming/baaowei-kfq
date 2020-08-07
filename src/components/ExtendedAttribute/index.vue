<template>
  <el-dialog title="扩展信息" :visible.sync="getShow">
    <el-form ref="form" :model="form">
      <el-form-item v-for="(item, index) of list" :key="index" :label="item.Label" :label-width="labelWidth">
        <div v-if="item.Comm === 'SelectList'">
          <el-col :span="12">
            <el-select v-model="form[item.Name]" class="select">
              <el-option v-for="(v, k) of item.Data" :key="k" :value="v" />
            </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-input v-model="form[item.Name + '_attach']" />
          </el-col>
        </div>
        <div v-else-if="item.Comm === 'Text'">
          <el-col :span="12">
            <el-input v-model="form[item.Name]" autocomplete="off" />
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-input v-model="form[item.Name + '_attach']" />
          </el-col>
        </div>
        <div v-else-if="item.Comm === 'TextArea'">
          <el-col :span="12">
            <el-input v-model="form[item.Name]" type="textarea" />
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-input v-model="form[item.Name + '_attach']" />
          </el-col>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="getShow = false">取 消</el-button>
      <el-button v-loading="loading" type="primary" @click="submitClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createExtendedAttribute } from '@/api/ApiExtendedAttribute'

export default {
  name: 'ExtendedAttribute',
  props: {
    labelWidth: {
      type: String,
      default: '120px'
    },
    dialogFormVisible: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      form: {},
      loading: false
    }
  },
  computed: {
    getShow: {
      get() { return this.dialogFormVisible },
      set(val) { this.$emit('close', val) }
    }
  },
  created() {
    this.resolveList()
  },
  methods: {
    // 解析列表i
    resolveList() {
      for (const i in this.list) {
        this.$set(this.form, this.list[i].Name, '')
        this.$set(this.form, this.list[i].Name + '_attach', '')
      }
    },
    submitClick() {
      // eslint-disable-next-line no-console
      console.log(this.form)
      this.loading = true
      createExtendedAttribute(this.form).then(res => {
        if (res.code === 20000) {
          this.getShow = false
          this.$notify({
            title: 'Success',
            message: '新增成功',
            type: 'success',
            duration: 2000
          })
        }
      })
      this.loading = false
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.select {
  width: 100%;
}
</style>
