<template>
    <el-dialog class="tel" title="通讯录" width="280px" :visible.sync="isShowTel" :modal="false">
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
      />
      <div style="height:65%;overflow-y: auto">
        <el-tree
          ref="tree"
          :data="orgTreeList"
          :props="defaultProps"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        >
          <span slot-scope="{ node,data }" class="custom-tree-node">
            <span>
              <span v-if="data.type=='User'"><img :src="data.isOnline<30? userOnline : userOffline"></span>{{ node.label }}
            </span>
          </span>
        </el-tree>
      </div>
      <div class="treefooter" style="margin-left: 20px;margin-top:20px;">
        <p style="margin: 5px 0px">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>{{ userName }}</span></p>
        <p style="margin-bottom: 5px;">登录帐号：<span>{{ loginName }}</span></p>
        <p style="margin-bottom: 5px;">办公电话：<span>{{ officePhone }}</span></p>
        <p style="margin-bottom: 5px;">手机号码：<span>{{ mobilePhone }}</span></p>
        <p style="margin-bottom: 5px;">电子邮件：<span>{{ email }}</span></p>
        <p style="margin-bottom: 5px;">Q&nbsp;Q&nbsp;号码：<span>{{ qq }}</span></p>
        <p style="margin-bottom: 5px;">其他信息：<span>{{ otherInfo }}</span></p>
      </div>
    </el-dialog>
</template>

<script>
import user0 from './user_0.png'
import user1 from './user_1.png'
import { getTel } from '@/api/home/ApiHome'
export default {
  name: 'Tel',
  data() {
    return {
      userOnline: user0,
      userOffline: user1,
      orgTreeList: [],
      userName: '',
      loginName: '',
      officePhone: '',
      mobilePhone: '',
      email: '',
      qq: '',
      otherInfo: '',
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    isShowTel: {
      get() {
        if(this.$store.state.user.tel){
          this.getData()
        }
        return this.$store.state.user.tel
      },
      set(val) {
        this.$store.state.user.tel = val
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted: function() {
    
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    getData() {
      var vueThis = this
      getTel().then(function(res) {
        vueThis.orgTreeList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleNodeClick(data) {
      // 叶子节点
      if (!data.children) {
        this.userName = data.name
        this.loginName = data.loginName
        this.officePhone = data.officePhone
        this.mobilePhone = data.mobilePhone
        this.email = data.email
        this.qq = data.qq
        this.otherInfo = data.otherInfo
      }
    }
  }

}
</script>

<style lang="scss">
  .tel {

    .el-dialog__header {
      padding: 8px !important;
      border-bottom: 1px solid #ccc;
      background-color: #399fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: white;
    }
    .el-dialog__headerbtn {
      background-color: white;
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 0;
      background: 0 0;
      border: none;
      outline: 0;
      cursor: pointer;
      font-size: 24px !important;
    }
    .el-dialog__title {
      line-height: 24px;
      font-size: 18px;
      color: white;
      margin-left: 20px;
    }

    .el-dialog__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
      height: 100%;
      overflow-y: auto;
      border: 1px solid #1890ff;
    }

    .el-dialog {
      -webkit-transform: none;
      transform: none;
      left: 80%;
      top: 80px;
      position: absolute;
      margin: 0 auto;
      height: 90%;
    }

  }
</style>
