<template>
  <el-form ref="form" :model="localArrowProperty" class="arrow-form" label-width="150px">
    <el-row>
      <el-col :span="24" class="form-title">
        <h3>基本属性</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="流向名称">
          <el-input v-model="localArrowProperty.WaName" placeholder="请输入流向名称" :disabled="readOnly" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="流向编号">
          <el-input v-model="localArrowProperty.WaId" placeholder="请输入流向编号" disabled="disabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="起始节点">
          <el-input v-model="selfArrowProperty._FromProc" placeholder="请输入起始节点" disabled="disabled" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="终止节点">
          <el-input v-model="selfArrowProperty._ToProc" placeholder="请输入终止节点" disabled="disabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="业务状态">
          <el-select v-model="localArrowProperty.WaState" placeholder="请选择业务状态" :disabled="readOnly">
            <el-option v-for="item in WaStates" :key="item.BsId" :label="item.Name" :value="item.BsId" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="操作类型">
          <el-select v-model="localArrowProperty.WaStyle" placeholder="请选择操作类型" :disabled="readOnly">
            <el-option v-for="item in WaStyles" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="排列顺序">
          <el-input v-model="localArrowProperty.WaOrder" placeholder="请输入排列顺序" :disabled="readOnly" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <el-checkbox v-model="localArrowProperty.WaCanrollback" :disabled="readOnly">允许退回</el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="form-title">
        <h3>分派策略</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="首次分派策略">
          <el-select v-model="localArrowProperty.WaShare" placeholder="请输入首次分派策略" :disabled="readOnly">
            <el-option v-for="item in WaShares" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="其后分派策略">
          <el-select v-model="localArrowProperty.WaShareAfter" placeholder="请输入其后分派策略" :disabled="readOnly">
            <el-option
              v-for="item in WaShares"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="流向逻辑条件">
          <el-input
            v-model="localArrowProperty.WaTerm"
            type="textarea"
            placeholder="请输入流向逻辑条件"
            :rows="4"
            :disabled="readOnly"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="必走流向逻辑条件">
          <el-input
            v-model="localArrowProperty.WaTerm2"
            type="textarea"
            placeholder="请输入必走流向逻辑条件"
            :rows="4"
            :disabled="readOnly"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="事件表达式">
          <div class="table-box">
            <div class="table-box-toolbar">
              <el-button type="primary" size="mini" :disabled="readOnly" @click="handleAddPropex()">新增</el-button>
            </div>
            <el-table
              :data="localArrowProperty.Propex"
              height="250"
              border
              style="width: 100%"
              class="form-table"
            >
              <el-table-column label="表达式">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.表达式"
                    type="textarea"
                    rows="1"
                    class="table-box-input"
                    size="small"
                    :disabled="readOnly"
                  />
                </template>
              </el-table-column>
              <el-table-column label="事件类型" width="180" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.事件类型" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in EventTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="readOnly"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="执行条件" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.执行条件"
                    type="textarea"
                    rows="1"
                    class="table-box-input"
                    size="small"
                    :disabled="readOnly"
                  />
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                  <el-button type="success" size="mini" :disabled="readOnly" @click="handleClonePropex(scope.row)">复制</el-button>
                  <el-button type="danger" size="mini" :disabled="readOnly" @click="handleDeletePropex(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="脚本(SCRIPT)">
          <el-input
            v-model="localArrowProperty.Script"
            type="textarea"
            placeholder="请输入脚本(SCRIPT)"
            :rows="4"
            :disabled="readOnly"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { getInfo } from '@/api/ApiWorkFlow'

export default {
  name: 'ArrowProperty',
  props: {
    arrowProperty: {
      type: Object,
      default: null
    },
    wfBizz: {
      type: String,
      default: null
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localArrowProperty: {
        id: '0',
        name: '',
        WaName: '',
        WaId: '0',
        WaState: 0,
        WaStyle: 0,
        WaOrder: '',
        WaCanrollback: 0,
        WaShare: 1,
        WaShareAfter: 0,
        Propex: [],
        Script: ''
      },
      selfArrowProperty: {
        _FromProc: '',
        _ToProc: ''
      },
      WaStates: null,
      WaStyles: [
        { label: '普通操作', value: 0 },
        { label: '签发操作', value: 1 },
        { label: '自动操作', value: 2 }
      ],
      WaShares: [
        { label: '指派给一特定人', value: 0 },
        { label: '指派给办理过的人', value: 1 },
        { label: '角色内，优先占有', value: 2 },
        { label: '选多人，优先占有', value: 3 },
        { label: '选多人，协同办理', value: 4 },
        { label: '选多人，分别办理', value: 5 }
      ],
      EventTypes: [
        { label: 'OnBeforeSend', value: 'OnBeforeSend' },
        { label: 'OnAfterSend', value: 'OnAfterSend' },
        { label: 'OnRollBack', value: 'OnRollBack' },
        { label: 'OnBeforeStart', value: 'OnBeforeStart' }
      ],
      query: {
        bzid: this.wfBizz,
        readtype: 'arrowproperty'
      }
    }
  },
  created() {
    this.localArrowProperty = { ...this.localArrowProperty, ...this.arrowProperty }
    this.localArrowProperty.WaCanrollback = this.localArrowProperty.WaCanrollback === 1
    this.selfArrowProperty._FromProc = this.$parent.$parent.myFlow.$nodeData[this.localArrowProperty.from].name
    this.selfArrowProperty._ToProc = this.$parent.$parent.myFlow.$nodeData[this.localArrowProperty.to].name
    var that = this
    getInfo(this.query)
      .then(response => {
        that.WaStates = response.data.states
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
  },
  mounted() {},
  methods: {
    handleDeletePropex(val) {
      this.localArrowProperty.Propex.splice(val, 1)
    },
    handleClonePropex(item) {
      this.localArrowProperty.Propex.push({ '表达式': item.表达式, '事件类型': item.事件类型, '执行条件': item.执行条件 })
    },
    handleAddPropex() {
      if (!this.localArrowProperty.Propex) {
        this.localArrowProperty.Propex = []
      }
      this.localArrowProperty.Propex.push({ '表达式': '', '事件类型': '', '执行条件': '' })
    }
  }
}
</script>

<style scoped>
.arrow-form {
  padding: 5px;
}
.el-form-item {
  margin-bottom: 10px;
}
.form-title {
  background: #f1f1f1;
  margin-bottom: 10px;
}
.form-title h3 {
  text-align: center;
}
</style>

<style>
.table-box .el-table--medium th,
.table-box .el-table--medium td {
  padding: 0px;
}
.table-box .el-table__row th,
.table-box .el-table__row td {
  padding: 0px;
}
.table-box .el-textarea__inner,.table-box .el-input__inner {
  border: none !important;
}
.table-box .table-box-toolbar {
  text-align: left;
  border: 1px solid #dfe6ec;
  border-bottom: none;
  padding: 0px 10px;
}
</style>
