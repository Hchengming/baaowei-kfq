<template>
  <div ref="flowbox" class="flow-box">
    <div
      class="pannel-tool"
      title="展开属性"
      :style="`right:${position}px`"
      @click="handleToglePannel()"
    >
      <i :class="icon" />
    </div>
    <el-row :ref="`canvas_${id}`" type="flex">
      <el-col class="canvas">
        <div :id="`myFlow_${id}`" :ref="`myFlow_${id}`" :style="{height:`${windowHeight}px`}" />
      </el-col>
      <el-col v-show="pannelStatus" class="pannel">
        <el-tabs v-show="pannelProperty===0" v-model="activeName">
          <el-tab-pane label="流程属性" name="first">
            <el-form
              :ref="`flowPropertyForm_${id}`"
              :rules="rules"
              :model="flowProperty"
              label-width="100px"
            >
              <el-form-item label="流程名称" :prop="WfNameRule">
                <el-input v-model="flowProperty.WfName" :style="inputStyle" :disabled="readOnly" />
              </el-form-item>
              <el-form-item label="流程代码" :prop="WfCodeRule">
                <el-input
                  v-model="flowProperty.WfCode"
                  :style="inputStyle"
                  :disabled="readOnly"
                  @input.native="handleInputWfCode($event)"
                />
              </el-form-item>
              <el-form-item label="红绿灯提示">
                <el-radio v-model="flowProperty.WfStyle" label="1" :disabled="readOnly">按环节</el-radio>
                <el-radio v-model="flowProperty.WfStyle" label="2" :disabled="readOnly">按结束时间</el-radio>
              </el-form-item>
              <el-form-item label="办理天数">
                <el-input v-model="flowProperty.WcFate" style="width:190px;" :disabled="readOnly" />&nbsp;&nbsp;天
              </el-form-item>
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="flowProperty.WcRgtime"
                  type="datetime"
                  placeholder="请选择日期"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :readonly="true"
                  :disabled="readOnly"
                />
              </el-form-item>
              <el-form-item label="编号规则">
                <el-select
                  v-model="flowProperty.WfCounterCode"
                  placeholder="请选择编号规则(默认自动生成)"
                  filterable
                  :style="inputStyle"
                  :disabled="readOnly"
                >
                  <el-option
                    v-for="item in RuleOptions"
                    :key="item.CcNameid"
                    :label="item.CcName"
                    :value="item.CcNameid"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="排序">
                <el-input v-model="flowProperty.WfOrder" :style="inputStyle" :disabled="readOnly" />
              </el-form-item>
              <el-form-item label="编号">
                <el-input v-model="flowProperty.WfId" :style="inputStyle" :disabled="true" />
              </el-form-item>
              <el-form-item label="创建方式">
                <el-checkbox-group v-model="flowProperty.WfCreateType">
                  <el-checkbox
                    v-for="item in WfCreateTypes"
                    :key="item.value"
                    :label="item.value"
                    :disabled="readOnly"
                  >{{ item.title }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="聚合类型">
                <el-radio v-model="flowProperty.WfJoinstyle" :label="1" :disabled="readOnly">单分单聚</el-radio>
                <el-radio v-model="flowProperty.WfJoinstyle" :label="2" :disabled="readOnly">多分一聚</el-radio>
              </el-form-item>
              <el-form-item label="分支发送规则">
                <el-radio
                  v-model="flowProperty.WfMutisendstyle"
                  :label="1"
                  :disabled="readOnly"
                >多环节多人</el-radio>
                <el-radio
                  v-model="flowProperty.WfMutisendstyle"
                  :label="2"
                  :disabled="readOnly"
                >多环节一人</el-radio>
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  v-model="flowProperty.WcRemark"
                  type="textarea"
                  :rows="3"
                  :style="inputStyle"
                  :disabled="readOnly"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-show="pannelProperty===1" v-model="activeName">
          <el-tab-pane label="环节属性" name="first">
            <el-form ref="form" :model="flowProperty" label-width="100px">
              <el-form-item label="环节名称">
                <el-input
                  v-model="selectNode.WtName"
                  :style="inputStyle"
                  :disabled="readOnly"
                  @change="changeNodeName()"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-show="pannelProperty===2" v-model="activeName">
          <el-tab-pane label="流程线属性" name="first">
            <el-form ref="form" :model="flowProperty" label-width="100px">
              <el-form-item label="流程线名称">
                <el-input
                  v-model="selectLine.WaName"
                  :style="inputStyle"
                  :disabled="readOnly"
                  @change="changeLineName()"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-show="pannelProperty===3" v-model="activeName">
          <el-tab-pane label="节点日志" name="first">
            <el-form ref="form" :model="flowProperty" label-width="100px">
              <el-form-item label="日志内容">
                <el-input
                  v-model="selectNode.LogView"
                  type="textarea"
                  :rows="10"
                  :style="inputStyle"
                  :disabled="readOnly"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog
      :key="'arrow'+number"
      v-drag
      :title="`子流程${readOnly?`查看`:`设计`}`"
      :visible.sync="dialogFormVisible"
      :lock-scroll="true"
      :fullscreen="true"
      :append-to-body="true"
      width="80%"
    >
      <FlowWorktop
        :id="number"
        :key="radom"
        :ref="`myflow_${number}`"
        :flow-data="subflow"
        :read-only="readOnly"
        @changeData="updateFlowData"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelFlow()">取消</el-button>
        <el-button type="primary" @click="handleSaveFlow()">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :key="radom+'arrow'"
      v-drag
      :title="`${readOnly?`查看`:`设计`}流程线属性`"
      :visible.sync="arrowPropertyVisible"
      :lock-scroll="true"
      :modal="false"
      :append-to-body="false"
      width="80%"
    >
      <ArrowProperty
        ref="ArrowProperty"
        :arrow-property="selectLine"
        :wf-bizz="query.bzid"
        :read-only="readOnly"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="arrowPropertyVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSetArrowProperty()">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :key="radom+'tache'"
      v-drag
      :title="`${readOnly?`查看`:`设计`}环节属性`"
      :visible.sync="tachePropertyVisible"
      :lock-scroll="true"
      :modal="false"
      :append-to-body="false"
      width="80%"
    >
      <TacheProperty
        ref="TacheProperty"
        :tache-property="selectNode"
        :wf-bizz="query.bzid"
        :read-only="readOnly"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="tachePropertyVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSetTacheProperty()">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :key="radom+'import'"
      v-drag
      title="导入流程"
      :visible.sync="importVisible"
      :modal="false"
      width="800"
    >
      <div>
        <el-input v-model="importJSON" type="textarea" rows="20" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="importJSON='';importVisible = false">取消</el-button>
        <el-button type="primary" @click="handleImportJSON()">确定导入</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :key="radom+'export'"
      v-drag
      title="导出流程"
      :visible.sync="exportVisible"
      :modal="false"
      width="800"
    >
      <div>
        <el-input v-model="exportJSON" type="textarea" rows="20" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exportJSON='';exportVisible = false">取消</el-button>
        <el-button
          v-clipboard:copy="exportJSON"
          v-clipboard:success="handleExportJSON"
          type="primary"
        >复制内容</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getInfo, delLine } from '@/api/ApiWorkFlow'
import clipboard from '@/directive/clipboard/index.js'
import { getInfo } from '@/api/ApiWorkFlow'
import ArrowProperty from './ArrowProperty'
import TacheProperty from './TacheProperty'

export default {
  name: 'FlowWorktop',
  directives: {
    clipboard
  },
  components: { ArrowProperty, TacheProperty },
  props: {
    id: {
      type: Number,
      default: 0
    },
    flowData: {
      type: Object,
      default: null
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // demo
      radom: Math.random(),
      pannelStatus: true,
      icon: 'el-icon-d-arrow-right',
      position: 340,
      myFlow: null,
      property: {
        auth: 'auth',
        toolBtns: [
          'start round mix',
          'end round',
          'task',
          // 'node',
          // 'chat',
          // 'state',
          // 'plug',
          'join',
          'fork',
          'complex mix'
        ],
        haveHead: true,
        headLabel: true,
        // headBtns: ['new', 'open', 'save', 'undo', 'redo', 'reload', 'print'], // 如果haveHead=true，则定义HEAD区的按钮
        headBtns: ['import', 'export'], // 如果haveHead=true，则定义HEAD区的按钮
        haveTool: !this.readOnly,
        toolTextWidth: 60,
        haveDirDashed: false,
        haveSegment: false,
        haveSegDashed: false,
        haveGroup: false,
        useOperStack: true
      },
      dialogFormVisible: false,
      tachePropertyVisible: false,
      arrowPropertyVisible: false,
      subflow: null,
      selectId: null,
      number: this.id + 1,
      flowProperty: {
        id: 0,
        name: '',
        WfName: '',
        WfCode: '',
        WfStyle: 0,
        WcFate: 0,
        WcRgtime: '',
        WfCounterCode: '',
        WfOrder: 0,
        WfId: 0,
        WfCreateType: [0],
        WcRemark: '',
        WfJoinstyle: 0,
        WfMutisendstyle: 0,
        candelete: 1
      },
      WfCreateTypes: [
        { value: 1, title: '新增' },
        { value: 2, title: '续办' },
        { value: 3, title: '自动执行' }
      ],
      RuleOptions: null,
      activeName: 'first',
      inputStyle: {
        width: '215px'
      },
      selectNode: { WtName: '' },
      selectLine: { WaName: '' },
      addItemId: 0,
      addItemType: '',
      query: {
        bzid: 6,
        readtype: 'flowproperty'
      },
      temp: {
        lineData: {
          WaId: '0',
          WaOwner: 0,
          WaSuber: 0,
          WaStyle: 0,
          WaStart: 0,
          WaClose: 0,
          WaState: 0,
          WaShare: 0,
          WaName: '',
          WaTerm: null,
          WaOrder: 0,
          WaCanrollback: 1,
          Propex: null,
          candelete: 1
        },
        nodeData: {
          WtId: '0',
          WtOwner: 0,
          WtSuber: 0,
          WtStyle: 1,
          WtRole: '0',
          WtFate: 0,
          WtSpace: 0,
          WtName: '',
          WtTerm: null,
          WtDriver: '',
          WtAlert: 0,
          WtLinkTache: '-1',
          WtAutosend: 0,
          WtDept: 0,
          WtUserstyle: 0,
          WtGroup: 0,
          WtFategroup: '',
          candelete: 1
        }
      },
      localFlowData: this.flowData,
      pannelProperty: 0,
      windowHeight: 700,
      importJSON: '',
      importVisible: false,
      exportJSON: '',
      exportVisible: false,
      inputTimeout: null,
      rules: {
        WfName: [
          { required: true, message: '请输入流程名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        WfCode: [
          { required: true, message: '请输入流程代码', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ]
      },
      WfNameRule: 'WfName',
      WfCodeRule: 'WfCode'
    }
  },
  watch: {
    'flowProperty.WfName': {
      // eslint-disable-next-line no-unused-vars
      handler: function(newValue, oldValue) {
        this.flowProperty.name = newValue
        this.flowProperty.text = newValue
        this.myFlow.setTitle(newValue)
      }
    },
    // eslint-disable-next-line no-unused-vars
    addItemId: function(newValue, oldValue) {
      var addData
      if (this.addItemType === 'line') {
        // 4550155
        // this.temp.lineData.WaOwner = this.flowProperty.WcId
        addData = { ...this.myFlow.$lineData[newValue], ...this.temp.lineData }
        addData.id = newValue
        this.myFlow.$lineData[newValue] = addData
        this.localFlowData.lines[addData.id] = addData
      } else if (this.addItemType === 'node') {
        // 4550155
        // this.temp.nodeData.WtOwner = this.flowProperty.WcId
        addData = { ...this.myFlow.$nodeData[newValue], ...this.temp.nodeData }
        addData.id = newValue
        if (addData.type === 'task') {
          this.$store.state.gooflow.flowNodes.push({
            WtId: addData.id + '',
            WtName: addData.WtName
          })
        }
        this.myFlow.$nodeData[newValue] = addData
        this.localFlowData.nodes[addData.id] = addData
      }
    }
  },
  created() {
    this.dialogFormVisible = false
    this.tachePropertyVisible = false
    this.arrowPropertyVisible = false
    if (this.readOnly) {
      this.property.headBtns = []
    }

    this.WfNameRule = this.number > 2 ? '' : 'WfName'
    this.WfCodeRule = this.number > 2 ? '' : 'WfCode'
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.myFlow = GooFlow.init('#myFlow_' + this.id, this.property)
    if (this.localFlowData) {
      this.flowProperty = {
        ...this.flowProperty,
        ...this.localFlowData.extra.flow
      }
      this.flowProperty.id = this.flowProperty.WcId
      this.query.bzid = this.flowProperty.WfBizz
      // 初始化查看数据
      if (this.readOnly) {
        this.initViewDatas(this.localFlowData)
      }
      this.myFlow.loadData(this.localFlowData)
    }
    const that = this
    // 提取规则数据
    getInfo(that.query)
      .then(response => {
        that.RuleOptions = response.data.counters
      })
      // eslint-disable-next-line no-unused-vars
      .catch(res => {
        this.$notify({
          title: '失败',
          message: '数据请求失败',
          type: 'error',
          duration: 2000
        })
      })

    // 导入
    this.myFlow.onImportClick = function() {
      if (that.readOnly) {
        return false
      }
      that.radom = Math.random()
      that.importJSON = ''
      that.importVisible = true
      return true
    }

    // 导出
    this.myFlow.onExportClick = function() {
      if (that.readOnly) {
        return false
      }
      that.radom = Math.random()
      that.exportJSON = JSON.stringify(this.exportData())
      that.exportVisible = true
      return true
    }

    // 节点获取焦点
    this.myFlow.onItemFocus = function(id, type) {
      if (type === 'node') {
        that.selectNode = that.localFlowData.nodes[id]
        that.selectNode.id = id
        // 显示node属性
        if (that.readOnly) {
          that.pannelProperty = 3
        } else {
          that.pannelProperty = 1
        }
      } else if (type === 'line') {
        that.selectLine = that.localFlowData.lines[id]
        that.selectLine.id = id
        // 显示line属性
        that.pannelProperty = 2
      }
      return true
    }

    // 节点失去焦点
    // eslint-disable-next-line no-unused-vars
    this.myFlow.onItemBlur = function(id, type) {
      that.pannelProperty = 0
      return true
    }

    // 双击查看基本信息
    this.myFlow.onItemDbClick = function(id, model) {
      that.radom = Math.random()
      if (that.readOnly) {
        return false
      }
      that.selectId = id
      if (model === 'line') {
        that.selectLine = that.localFlowData.lines[id]
        // 这里需要指定线的名称以便更新指定的线
        that.selectLine.stepName = id
        that.tachePropertyVisible = false
        that.arrowPropertyVisible = true
      } else if (model === 'node') {
        const type = that.localFlowData.nodes[id].type
        if (type === 'complex mix') {
          that.subflow = that.localFlowData.nodes[id].subflow
          that.dialogFormVisible = true
          that.$nextTick(() => {
            this.dialogFormVisible = false
          })
          that.tachePropertyVisible = false
        } else {
          that.selectNode = that.localFlowData.nodes[id]
          // 这里需要指节点名称以便更新指定的节点
          that.selectNode.procName = this.$nodeDom[id][0].id
          that.tachePropertyVisible = true
        }
        that.arrowPropertyVisible = false
      }
      return false
    }

    // 添加节点时
    this.myFlow.onItemAdd = function(id, type, json) {
      if (that.readOnly) {
        return false
      }
      that.addItemId = id
      that.addItemType = type
      if (type === 'line') {
        // 4550155
        // that.temp.lineData.WaId = id + ''
        that.temp.lineData.WaName = json.name
        that.temp.lineData.candelete = 1
      } else if (type === 'node') {
        switch (json.type) {
          case 'start round mix':
            json.name = '开始'
            break
          case 'end round':
            json.name = '结束'
            break
        }
        // 4550155
        // that.temp.nodeData.WtId = id + ''
        that.temp.nodeData.id = id + ''
        that.temp.nodeData.WtName = json.name
        that.temp.nodeData.candelete = 1
        if (json.type === 'complex mix') {
          that.temp.nodeData.subflow = {
            title: '新建子流程',
            extra: {
              flow: {
                text: '新建',
                WfId: '0',
                WfBizz: that.flowProperty.WfBizz,
                WfStyle: 0,
                WfName: '新建子流程',
                WfCode: '',
                WfCounterCode: '',
                WfCreateType: [0],
                WfOrder: 0,
                WcId: '0',
                WcOwner: 0,
                WcRgtime: '',
                WcRemark: '',
                candelete: 1
              }
            },
            nodes: {},
            lines: {}
          }
        }
      }
      return true
    }

    // 删除节点
    this.myFlow.onItemDel = function(id, type) {
      if (that.readOnly) {
        return false
      }
      that.pannelProperty = 0
      if (type === 'node') {
        if (that.localFlowData.nodes[id].candelete === 1) {
          delete that.localFlowData.nodes[id]
          var nodeDatas = that.$store.state.gooflow.flowNodes
          nodeDatas.splice(
            nodeDatas.findIndex(item => item.WtId === id + ''),
            1
          )
          that.$store.state.gooflow.flowNodes = nodeDatas
          return true
        } else {
          that.$notify({
            title: '失败',
            message: '该环节不能删除!',
            type: 'error',
            duration: 2000
          })
          return false
        }
      } else if (type === 'line') {
        if (that.localFlowData.lines[id].candelete === 1) {
          delete that.localFlowData.lines[id]
          return true
        } else {
          that.$notify({
            title: '失败',
            message: '该流程线不能删除!',
            type: 'error',
            duration: 2000
          })
          return false
        }
      }
    }

    // 窗体大小变化
    this.windowResize()
  },
  updated() {
    if (this.localFlowData) {
      this.localFlowData.extra.flow = this.flowProperty
    }
  },
  methods: {
    saveFlowInfo() {
      const that = this
      return new Promise((resolve, reject) => {
        const form = `flowPropertyForm_${this.id}`
        this.$refs[form].validate(valid => {
          if (valid) {
            window.onresize = null
            resolve(this.myFlow.exportData())
          } else {
            that.pannelProperty = 0
            reject('')
          }
        })
      })
    },
    cancelFlowInfo() {
      window.onresize = null
    },
    handleSetArrowProperty() {
      this.selectLine = this.$refs.ArrowProperty.localArrowProperty
      this.selectLine.name = this.selectLine.WaName
      this.selectLine.WaCanrollback = this.selectLine.WaCanrollback ? 1 : 0
      this.localFlowData.lines[this.selectLine.stepName] = this.selectLine
      this.myFlow.loadData(this.localFlowData)
      this.arrowPropertyVisible = false
    },
    handleSetTacheProperty() {
      this.$refs.TacheProperty.setWtTermVal()
      this.selectNode = this.$refs.TacheProperty.localTacheProperty
      this.selectNode.id = this.selectNode.WtId
      this.selectNode.name = this.selectNode.WtName
      this.selectNode.WtAutosend = this.selectNode.WtAutosend ? 1 : 0
      if (this.selectNode.WtTerm) {
        if (this.selectNode.WtTerm.sloadUser) {
          this.selectNode.WtTerm.sloadUser = this.selectNode.WtTerm.sloadUser
            ? '1'
            : '0'
        }
        if (this.selectNode.WtTerm.UnTimeLimit) {
          this.selectNode.WtTerm.UnTimeLimit = this.selectNode.WtTerm
            .UnTimeLimit
            ? '1'
            : '0'
        }
      }
      // 更新flowNodesName
      this.changeFlowNodesName(this.selectNode)
      this.localFlowData.nodes[this.selectNode.procName] = this.selectNode
      this.myFlow.loadData(this.localFlowData)
      this.tachePropertyVisible = false
    },
    handleSaveFlow() {
      this.$refs[`myflow_${this.number}`]
        .saveFlowInfo()
        .then(res => {
          this.myFlow.$nodeData[this.selectId].subflow = res
          this.windowResize()
          this.dialogFormVisible = false
        })
        // eslint-disable-next-line no-unused-vars
        .catch(re => {
          this.$notify({
            title: '操作失败',
            message: `抱歉，请检查是否有未完成的必填项！`,
            type: 'error',
            duration: 2000
          })
        })
    },
    handleCancelFlow() {
      this.windowResize()
      this.dialogFormVisible = false
    },
    changeFlowNodesName(selectNode) {
      var flowNodes = this.$store.state.gooflow.flowNodes
      var item = flowNodes.filter(item => item.WtId === selectNode.id + '')[0]
      if (item) {
        item.WtName = this.selectNode.WtName
      }
      this.$store.state.gooflow.flowNodes = flowNodes
    },
    updateFlowData(data) {
      this.show = false
      setTimeout(() => {
        this.subflow = data
      }, 300)
      this.show = true
    },
    handleToglePannel() {
      this.pannelStatus = !this.pannelStatus
      this._changeWindow()
    },
    windowResize() {
      this._changeWindow()
      const that = this
      window.onresize = () => {
        that._changeWindow()
      }
    },
    _changeWindow() {
      const height = window.innerHeight - (this.readOnly ? 40 : 190)
      this.windowHeight = height < 700 ? 700 : height
      if (this.pannelStatus) {
        this.icon = 'el-icon-d-arrow-right'
        this.position = 340
        this.myFlow.reinitSize(
          this.$refs[`canvas_${this.id}`].$el.clientWidth - 365,
          height < 700 ? 700 : height
        )
      } else {
        this.icon = 'el-icon-d-arrow-left'
        this.position = -10
        this.myFlow.reinitSize(
          this.$refs[`canvas_${this.id}`].$el.clientWidth - 10,
          height < 700 ? 700 : height
        )
      }
    },
    changeNodeName() {
      this.myFlow.setName(this.selectNode.id, this.selectNode.WtName, 'node')
      this.changeFlowNodesName(this.selectNode)
    },
    changeLineName() {
      this.myFlow.setName(this.selectLine.id, this.selectLine.WaName, 'line')
    },
    handleImportJSON() {
      // if (this.importJSON.length > 0) {
        try {
          this.localFlowData = JSON.parse(this.importJSON)
          this.flowProperty = {
            ...this.flowProperty,
            ...this.localFlowData.extra.flow
          }
          this.flowProperty.id = this.flowProperty.WcId = '0'
          this.flowProperty.WfId = '0'
          this.flowProperty.WcOwner = '0'
          this.flowProperty.WfBizz = this.query.bzid
          this._initAllIds(this.localFlowData)
          this.myFlow.loadData(this.localFlowData)
          this.importVisible = false
        }catch{
          this.$message({
            message: '数据格式错误,请调整后重试!',
            type: 'error',
            duration: 1500
          })
        }
      // } else {
      //   this.$message({
      //     message: '请输入要导入的内容!',
      //     type: 'error',
      //     duration: 1500
      //   })
      // }
    },
    _initAllIds(data) {
      data.extra.flow.id = '0'
      data.extra.flow.WfCode = '0'
      data.extra.flow.WcId = '0'
      data.extra.flow.WfId = '0'
      data.extra.flow.WcOwner = '0'
      // 遍历line
      for (const item in data.lines) {
        data.lines[item].WaId = '0'
        data.lines[item].WaOwner = '0'
        data.lines[item].WaStart = '0'
        data.lines[item].WaClose = '0'
        // 重新设置线编号
        const newLineId =
          parseInt(new Date().getTime()) + Math.ceil(Math.random() * 1000000)
        data.lines[newLineId] = data.lines[item]
        data.lines[newLineId].id = newLineId
        delete data.lines[item]
      }
      // 遍历node
      for (const item in data.nodes) {
        data.nodes[item].WtId = '0'
        data.nodes[item].WtOwner = '0'
        data.nodes[item].WtSuber = '0'
        // 重新设置节点编号
        const newNodeId =
          parseInt(new Date().getTime()) + Math.ceil(Math.random() * 1000000)
        data.nodes[newNodeId] = data.nodes[item]
        data.nodes[item].LinkTache = newNodeId
        delete data.nodes[item]
        // 替换线所使用的节点名称
        for (const lineItem in data.lines) {
          if (data.lines[lineItem].from === item) {
            data.lines[lineItem].from = `${newNodeId}`
          }
          if (data.lines[lineItem].to === item) {
            data.lines[lineItem].to = `${newNodeId}`
          }
        }
        // 递归子节点
        if (
          data.nodes[newNodeId].type === 'complex mix' &&
          data.nodes[newNodeId].subflow
        ) {
          this._initAllIds(data.nodes[newNodeId].subflow)
        }
      }
    },
    handleExportJSON() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
      this.exportVisible = false
    },
    initViewDatas(data) {
      if (data.nodes) {
        for (const item in data.nodes) {
          if (data.nodes[item].IsCurrent === '1') {
            data.nodes[item].color = '#ff0000'
          } else {
            data.nodes[item].color =
              data.nodes[item].Passed === '1' ? '#46f905' : '#cccccc'
          }
        }
      }
      if (data.lines) {
        for (const item in data.lines) {
          data.lines[item].color =
            data.lines[item].Passed === '1' ? '#46f905' : '#cccccc'
        }
      }
    },
    handleInputWfCode(e) {
      if (this.localFlowData.id !== '') {
        if (this.inputTimeout != null) {
          window.clearTimeout(this.inputTimeout)
        }
        this.inputTimeout = window.setTimeout(() => {
          getInfo({
            defid: this.flowProperty.WfId,
            readtype: 'checkflowcode',
            flowcode: e.target.value
          })
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.flowProperty.WfCode = e.target.value
            })
            // eslint-disable-next-line no-unused-vars
            .catch(res => {
              this.flowProperty.WfCode = ''
              this.$notify({
                title: '失败',
                message: '流程代码不允许重复!',
                type: 'error',
                duration: 2000
              })
            })
        }, 500)
      }
    }
  },
  distory() {
    this.dialogFormVisible = false
    this.tachePropertyVisible = false
    this.arrowPropertyVisible = false
    window.onresize = null
  }
}
</script>

<style scoped>
.el-row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-row:first-child {
  margin-top: 0;
}

.el-row:last-child {
  margin-top: 0;
}
.el-col {
  border-radius: 4px;
}
.el-form-item {
  margin-bottom: 16px;
}
.el-dialog__header,
.el-dialog__body {
  border-bottom: 1px solid #ccc;
}
.flow-box {
  width: 100%;
  position: relative;
}
.pannel {
  width: 400px;
  padding: 0px 10px 0px 10px;
  border: 1px solid #ccc;
  margin-left: 20px;
}
.pannel-tool {
  position: absolute;
  top: 340px;
  right: -20px;
  line-height: 40px;
  font-size: 25px;
  color: #1890ff;
  z-index: 2;
}
</style>

<style>
.GooFlow_head {
  height: 40px !important;
}
.GooFlow_head label {
  width: auto !important;
  min-width: 95px;
  padding: 0px 10px;
}
.el-checkbox {
  margin-right: 10px;
}
.el-radio {
  margin-right: 20px;
}
</style>
