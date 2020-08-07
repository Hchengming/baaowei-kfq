<template>
  <div class="box">
    <el-row>
      <el-col :span="24">
        <FlowWorktop :id="number" :key="radom" ref="myflow" v-loading="loading" :flow-data="flowData" :read-only="isView" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getInfo } from '@/api/ApiWorkFlow'
import FlowWorktop from './components/FlowWorktop'

export default {
  name: 'WorkFlow',
  components: { FlowWorktop },
  data() {
    return {
      // flowId: '0',
      isView: true,
      radom: Math.random(),
      loading: false,
      flowData: null,
      selectId: null,
      number: 1,
      query: {
        // defid: this.$route.params.id,
        defid: '0',
        readtype: 'json'
      },
      form: { value: '' },
      newflowData: {
        title: '新建流程',
        extra: {
          flow: {
            text: '新建',
            WfId: '0',
            // WfBizz: this.$route.params.bizzId,
            WfBizz: this.bizzId,
            WfStyle: 0,
            WfName: '新建',
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
    // defid: this.$route.params.id,
    this.query.defid = this.$route.params.defid
    this.query.bicode = this.$route.params.bicode
    this.query.taskid = this.$route.params.taskid
    this.query.readtype = this.$route.params.readtype
  },
  mounted() {
    if (this.query.defid.length > 0 && this.query.bicode.length > 0 && this.query.taskid.length > 0 && this.query.readtype.length > 0) {
      this.loadInfo()
    }
  },
  methods: {
    loadInfo() {
      const that = this
      // 提取数据
      this.loading = true
      getInfo(this.query).then(response => {
        this.flowNodes = [{ WtId: '-1', WtName: '不选' }]
        that.loading = false
        that.flowData = response.data
        if (that.flowData && that.flowData.nodes) {
          that.getNodes(that.flowData)
        }
        that.radom = Math.random()
        // 存储数据
        this.$store.dispatch('gooflow/setValue', this.flowNodes)
      // eslint-disable-next-line no-unused-vars
      }).catch(res => {
        that.loading = false
        that.radom = Math.random()
        this.$notify({
          title: '失败',
          message: '数据请求失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    getNodes(val) {
      for (var item in val.nodes) {
        if (val.nodes[item].type === 'task') {
          var node = {
            WtId: val.nodes[item].WtId,
            WtName: val.nodes[item].WtName
          }
          this.flowNodes.push(node)
        }
        if (val.nodes[item].type === 'complex mix' && val.nodes[item].subflow) {
          this.getNodes(val.nodes[item].subflow)
        }
      }
    }
  },
  distory() {
    window.onresize = null
  }
}
</script>

<style scoped>
  @import '../../../public/gooflow/GooFlow.css';
.box{padding: 10px;}
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
  .tool-box{width: 570px;}
</style>
