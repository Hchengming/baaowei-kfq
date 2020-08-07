<template>
  <el-form ref="form" class="tache-form" :model="localTacheProperty" label-width="150px">
    <el-row>
      <el-col :span="24" class="form-title">
        <h3>基本属性</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="环节名称">
          <el-input v-model="localTacheProperty.WtName" placeholder="请输入环节名称" :disabled="readOnly" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="环节编号">
          <el-input v-model="localTacheProperty.WtId" placeholder="请输入环节编号" disabled="disabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="办理天数">
          <el-input
            v-model="localTacheProperty.WtFate"
            placeholder="请输入办理天数(天:精确到小时)"
            :disabled="readOnly"
          />&nbsp;天(精确到小时)
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="预警天数">
          <el-input
            v-model="localTacheProperty.WtAlert"
            placeholder="请输入预警天数(天:精确到小时)"
            :disabled="readOnly"
          />&nbsp;天(精确到小时)
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <el-checkbox v-model="selfProperty.UnTimeLimit" :disabled="readOnly">该环节不计入审批时限</el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="业务角色">
          <el-select
            v-model="localTacheProperty.WtRole"
            filterable
            placeholder="请选择业务角色"
            :disabled="readOnly"
          >
            <el-option
              v-for="item in WtRoles"
              :key="item.BrId+''"
              :label="item.BrName"
              :value="item.BrId+''"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="可见表单">
          <div class="table-box">
            <el-table :data="FormsData" height="200" border style="width: 100%" class="form-table">
              <el-table-column prop="BfId" label="选择" width="60" align="center">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked" :disabled="readOnly" />
                </template>
              </el-table-column>
              <el-table-column prop="BfName" label="表单" align="left" />
              <el-table-column label="默认" width="60" align="center">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.default"
                    :disabled="readOnly"
                    @change="handleChangeDefault(scope.row)"
                  />
                </template>
              </el-table-column>
              <el-table-column label="生成文号" width="100" align="center">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.mkno"
                    :disabled="readOnly"
                    @change="handleChangeMakNo(scope.row)"
                  />
                </template>
              </el-table-column>
              <el-table-column label="含附件" width="80" align="center">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.up"
                    :disabled="readOnly"
                    @change="handleChangeUpload(scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="form-title">
        <h3>扩展属性</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="意见填写栏目">
          <el-select
            v-model="localTacheProperty.WtSpace"
            placeholder="请选择意见填写栏目"
            :disabled="readOnly"
          >
            <el-option
              v-for="item in WtSpaces"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="环节组名">
          <el-input v-model="selfProperty.sGroup" placeholder="请输入环节组名" :disabled="readOnly" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="原环节办理人">
          <el-select
            v-model="localTacheProperty.LinkTache"
            filterable
            placeholder="请选择原环节办理人"
            :disabled="readOnly"
          >
            <el-option
              v-for="item in LinkTaches"
              :key="item.WtId"
              :label="item.WtName"
              :value="item.WtId"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <el-checkbox v-model="localTacheProperty.WtAutosend" :disabled="readOnly">自动选择办理人</el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="角色节点所属">
          <el-select
            v-model="localTacheProperty.WtDept"
            placeholder="请选择角色节点所属"
            :disabled="readOnly"
          >
            <el-option
              v-for="item in WtDepts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="自动选择按钮名称">
          <el-input v-model="selfProperty.sLabel" placeholder="请输入自动选择按钮名称" :disabled="readOnly" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="发往本环节自动意见">
          <el-input
            v-model="selfProperty.sFormular"
            placeholder="请输入发往本环节自动意见"
            :disabled="readOnly"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <el-checkbox v-model="selfProperty.sloadUser" :disabled="readOnly">按默认人发送</el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="默认意见">
          <el-input
            v-model="selfProperty.sDefaultOpinion"
            placeholder="请输入默认意见"
            :disabled="readOnly"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="可见工具栏">
          <el-input
            v-model="selfProperty.sShowToolbar"
            placeholder="请输入可见工具栏"
            :disabled="readOnly"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="默认接收人">
          <el-input
            v-model="selfProperty.sDefaultUser"
            placeholder="请输入默认接收人"
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
  name: 'TacheProperty',
  props: {
    tacheProperty: {
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
      localTacheProperty: {
        id: '',
        name: '',
        WtName: '',
        WtId: '0',
        WtFate: 0,
        WtAlert: 0,
        WtTerm: null,
        WtDriver: '',
        WtRole: '0',
        WtSpace: 0,
        LinkTache: '',
        WtAutosend: 0,
        WtDept: -1
      },
      selfProperty: {
        UnTimeLimit: '0',
        sGroup: '',
        sloadUser: '0',
        sLabel: '',
        sFormular: '',
        sDefaultOpinion: '',
        sShowToolbar: '',
        sDefaultUser: ''
      },
      // 意见填写栏目
      WtSpaces: [
        { label: '必填意见', value: 2 },
        { label: '选填意见', value: 1 },
        { label: '无意见', value: 0 },
        { label: '传阅', value: -1 },
        { label: '登记', value: -2 }
      ],
      // 角色节点所属
      WtDepts: [
        { label: '请选择角色节点所属', value: -1 },
        { label: '全部', value: 0 },
        { label: '本级及以上', value: 1 },
        { label: '本级及以下', value: 2 },
        { label: '仅本级', value: 3 },
        { label: '未定', value: 8 },
        { label: '所有', value: 9 },
        { label: '本法人单位', value: 10 }
      ],
      WtRoles: [],
      query: {
        bzid: this.wfBizz,
        readtype: 'tacheproperty'
      },
      FormsData: null,
      LinkTaches: []
    }
  },
  created() {
    this.localTacheProperty = {
      ...this.localTacheProperty,
      ...this.tacheProperty
    }
    this.localTacheProperty.WtAutosend =
      this.localTacheProperty.WtAutosend === 1
    var that = this
    // 提取配置数据
    getInfo(this.query).then(response => {
      that.WtRoles = response.data.roles.sort((a, b) => {
        return a.BrOrder - b.BrOrder
      })
      var _formSourceDatas = response.data.forms.sort((a, b) => {
        return b.BrId - a.BrId
      })
      var _WtTerm = that.localTacheProperty.WtTerm
      // 处理公用WtTerm
      if (_WtTerm != null) {
        // 判断选中状态
        if (this.localTacheProperty.WtDriver.length > 0) {
          const _WtDriver = this.localTacheProperty.WtDriver
          _WtDriver
            .split(',')
            .map(Number)
            .forEach(item => {
              if (item > 0) {
                var sourceItem = _formSourceDatas.filter(
                  x => x.BfId === item
                )[0]
                if (sourceItem) {
                  sourceItem.checked = true
                  // 判断默认
                  if (_WtTerm.default && _WtTerm.default.length > 0) {
                    if (
                      _WtTerm.default
                        .split(',')
                        .map(Number)
                        .indexOf(item) > -1
                    ) {
                      sourceItem.default = true
                    }
                  }
                  // 判断生成文号
                  if (_WtTerm.mkno && _WtTerm.mkno.length > 0) {
                    if (
                      _WtTerm.mkno
                        .split(',')
                        .map(Number)
                        .indexOf(item) > -1
                    ) {
                      sourceItem.mkno = true
                    }
                  }
                  // 判断附件
                  if (_WtTerm.up && _WtTerm.up.length > 0) {
                    if (
                      _WtTerm.up
                        .split(',')
                        .map(Number)
                        .indexOf(item) > -1
                    ) {
                      sourceItem.up = true
                    }
                  }
                }
              }
            })
        }

        // 该环节不计入审批时限
        if (_WtTerm.UnTimeLimit) {
          that.selfProperty.UnTimeLimit = _WtTerm.UnTimeLimit === '1'
        }
        // 环节组名
        if (_WtTerm.sGroup) {
          that.selfProperty.sGroup = _WtTerm.sGroup
        }
        // 按默认人发送
        if (_WtTerm.sloadUser) {
          that.selfProperty.sloadUser = _WtTerm.sloadUser === '1'
        }
        // 自动选择按钮名称
        if (_WtTerm.sLabel) {
          that.selfProperty.sLabel = _WtTerm.sLabel
        }
        // 发往本环节自动意见
        if (_WtTerm.sFormular) {
          that.selfProperty.sFormular = _WtTerm.sFormular
        }
        // 默认意见
        if (_WtTerm.sDefaultOpinion) {
          that.selfProperty.sDefaultOpinion = _WtTerm.sDefaultOpinion
        }
        // 可见工具栏
        if (_WtTerm.sShowToolbar) {
          that.selfProperty.sShowToolbar = _WtTerm.sShowToolbar
        }
        // 默认接收人
        if (_WtTerm.sDefaultUser) {
          that.selfProperty.sDefaultUser = _WtTerm.sDefaultUser
        }
      }
      that.FormsData = _formSourceDatas
    })
  },
  mounted() {
    this.LinkTaches = this.$store.state.gooflow.flowNodes.filter(
      item => item.WtId !== this.localTacheProperty.id
    )
  },
  methods: {
    setWtTermVal() {
      if (this.FormsData) {
        // 选中值
        var _checkedVal = ''
        var _isDefaultVal = ''
        var _isMakeNoVal = ''
        var _isUploadVal = ''
        this.FormsData.filter(c => c.checked).forEach(item => {
          _checkedVal += (_checkedVal.length > 0 ? ',' : '') + item.BfId
          if (item.default) {
            _isDefaultVal += (_isDefaultVal.length > 0 ? ',' : '') + item.BfId
          }
          if (item.mkno) {
            _isMakeNoVal += (_isMakeNoVal.length > 0 ? ',' : '') + item.BfId
          }
          if (item.up) {
            _isUploadVal += (_isUploadVal.length > 0 ? ',' : '') + item.BfId
          }
        })
        this.localTacheProperty.WtDriver = _checkedVal
        if (this.localTacheProperty.WtTerm) {
          this.localTacheProperty.WtTerm.default = _isDefaultVal
          this.localTacheProperty.WtTerm.mkno = _isMakeNoVal
          this.localTacheProperty.WtTerm.up = _isUploadVal
        }
      }
      this.localTacheProperty.WtTerm = {
        ...this.localTacheProperty.WtTerm,
        ...this.selfProperty
      }
    },
    handleChangeDefault(val) {
      this.FormsData.filter(item => item.BfId === val.BfId)[0].checked = true
      this.FormsData.filter(
        item => item.BfId !== val.BfId && item.default
      ).forEach(item => {
        item.default = false
      })
    },
    handleChangeMakNo(val) {
      this.FormsData.filter(item => item.BfId === val.BfId)[0].checked = true
    },
    handleChangeUpload(val) {
      this.FormsData.filter(item => item.BfId === val.BfId)[0].checked = true
    }
  },
  destroy() {}
}
</script>

<style scoped>
.tache-form {
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
</style>
