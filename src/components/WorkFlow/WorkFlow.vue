<template>
  <div class="box">
    <el-row>
      <el-col :span="24">
        <FlowWorktop
          :id="number"
          :key="radom"
          ref="myFlowWorkTop"
          v-loading="loading"
          :flow-data="flowData"
          :read-only="isView"
        />
      </el-col>
    </el-row>
    <!-- <el-row v-show="number===1">
      <el-col :span="24" style="text-align: right;">
        <el-button type="primary" @click="saveInfo()">保存</el-button>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import { getInfo, editInfo } from '@/api/ApiWorkFlow'
import FlowWorktop from './components/FlowWorktop'

export default {
  name: 'WorkFlow',
  components: { FlowWorktop },
  props: {
    flowId: {
      type: String,
      default: '0'
    },
    bizzId: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      // flowId: '0',
      isView: false,
      radom: Math.random(),
      loading: false,
      flowData: null,
      selectId: null,
      number: 1,
      query: {
        // defid: this.$route.params.id,
        defid: this.flowId,
        readtype: 'json'
      },
      form: { value: '' },
      newflowData: {
        title: '新建流程',
        extra: {
          flow: {
            text: '新建流程',
            WfId: '0',
            // WfBizz: this.$route.params.bizzId,
            WfBizz: this.bizzId,
            WfStyle: 0,
            WfName: '新建流程',
            WfCode: '',
            WfCounterCode: '',
            WfCreateType: [0],
            WfOrder: 0,
            WcId: '0',
            WcOwner: 0,
            WcRgtime: '',
            WcRemark: ''
          }
        },
        nodes: {},
        lines: {}
      },
      flowNodes: [{ WtId: '-1', WtName: '不选' }]
    }
  },
  created() {
    if (this.flowId === '0') {
      this.create()
    } else {
      this.loadInfo()
    }
  },
  methods: {
    create() {
      this.radom = Math.random()
      this.flowNodes = [{ WtId: '-1', WtName: '不选' }]
      this.flowData = JSON.parse(JSON.stringify(this.newflowData))
      // 存储数据
      this.$store.dispatch('gooflow/setValue', this.flowNodes)
    },
    loadInfo() {
      const that = this
      // 提取数据
      this.loading = true
      getInfo(this.query)
        .then(response => {
          this.flowNodes = [{ WtId: '-1', WtName: '不选' }]
          that.loading = false
          that.flowData = response.data
          if (that.flowData && that.flowData.nodes) {
            that.getNodes(that.flowData)
          }
          that.radom = Math.random()
          // 存储数据
          this.$store.dispatch('gooflow/setValue', this.flowNodes)
        })
        // eslint-disable-next-line no-unused-vars
        .catch(res => {
          that.loading = false
          that.radom = Math.random()
          this.$notify({
            title: '失败',
            message: '抱歉，数据请求失败。',
            type: 'error',
            duration: 2000
          })
        })
    },
    saveInfo() {
      return new Promise((resolve, reject) => {
        this.loading = true
        const opType = this.flowId === '0' ? '添加' : '修改'
        this.$refs.myFlowWorkTop
          .saveFlowInfo()
          .then(res => {
            const flowData = res

            editInfo(flowData)
              // eslint-disable-next-line no-unused-vars
              .then(response => {
                this.loading = false
                this.$notify({
                  title: '成功',
                  message: `${opType}成功！`,
                  type: 'success',
                  duration: 2000
                })
                resolve(`${opType}成功`)
              })
              // eslint-disable-next-line no-unused-vars
              .catch(res => {
                this.loading = false
                this.$notify({
                  title: '失败',
                  message: `${opType}失败！`,
                  type: 'error',
                  duration: 2000
                })
                reject(`${opType}失败`)
              })
          })
          // eslint-disable-next-line no-unused-vars
          .catch(res => {
            this.loading = false
            this.$notify({
              title: '操作失败',
              message: `抱歉，${opType}失败，请检查是否有未完成的必填项！`,
              type: 'error',
              duration: 2000
            })
            reject(`${opType}失败`)
          })
      })
    },
    getNodes(val) {
      for (var item in val.nodes) {
        if (val.nodes[item].type === 'task') {
          var node = {
            WtId: item,
            WtName: val.nodes[item].WtName
          }
          this.flowNodes.push(node)
        }
        if (val.nodes[item].type === 'complex mix' && val.nodes[item].subflow) {
          this.getNodes(val.nodes[item].subflow)
        }
      }
    },
    cancel() {
      this.$refs.myFlowWorkTop.cancelFlowInfo()
    }
  },
  distory() {
    window.onresize = null
  }
}
</script>

<style scoped>
@import '../../../public/gooflow/GooFlow.css';
.box {
  padding: 10px;
}
.el-row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-row:first-child {
  margin-top: 0;
}

.el-row:last-child {
  margin-bottom: 0;
}
.tool-box {
  width: 570px;
}
</style>
