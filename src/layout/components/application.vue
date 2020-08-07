<template>
  <div
    class="applicationPage"
    width="90%"
    visible.sync="true"
    style="width:1300px;height:700px;overflow-y: auto"
    :modal="false"
  >
    <div>
      <div
        class="dialogBody"
        style=" display: flex;
    flex-flow: column wrap;"
      >
        <div class="search">
          <div class="searchDiv" style="width: 100%;text-align: center">
            <el-input v-model="searchKey" class="searchInput" placeholder="请输入应用名称" style="width:500px;" @keyup.enter.stop="searchApp">
              <el-button slot="append" icon="el-icon-search" type="primary" style="color:white;background-color: rgb(24,144,255)" class="searchicon" @click="searchApp()" />
            </el-input>
          </div>
          <div
            class="firstAPPList"
            style="margin-right:10px;margin-bottom:50px;position:relative;display: flex;justify-content:space-around;font-size: 15px;font-color:#22334a;"
          >
            <div v-for="item in category" :key="item.id" class="firstAPPListItem" :title="item.BcrName" @click="showCategory(item)">
              <div style="cursor:pointer;font-size: 50px" class="hovericonparent">
                <div class="hovericon"><img :src="currCategory!=item?(item.BcrIconpath||'/appDefaultIcon.png'):(item.BcrIconpathLight||'/appDefaultIconLight.png')"></div>
                <div class="hoverlighticon"><img :src="item.BcrIconpathLight||'/appDefaultIconLight.png'"></div>
              </div>
              <div class="wordwrap" style="text-overflow:ellipsis;cursor:pointer;word-break: break-all">
                {{ item.BcrAbbreviation }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="secondAPPList" style="margin:80px 40px;font-size: 14px;padding-left: 0px; display: flex;flex-wrap: wrap">
        <template v-for="i in searchApps||currCategory.children||[]">
          <el-card
            v-if="i.children[0]"
            :key="i.id"
            style="margin-top:10px;width:100%;height:auto;"
            :header="i.BcrName"
          >
            <el-dropdown v-for="p in i.children||[]" :key="p.id" placement="top-end" @command="handleCommand">
              <div style="display: inline-block;" :title="p.BcrName">
                <div style="margin-left: 10px;margin-top: 0px;margin-top:10px;margin-bottom:10px;cursor:pointer;" class="hovericonparent" @click="openApp(p)">
                  <!-- <img src="./0139ae55490d4b0000019ae962a15e.jpg@1280w_1l_2o_100sh.jpg" class="image"> -->
                  <div class="hovericon"><img :src="p.BcrIconpath||'/appDefaultIcon.png'"></div>
                  <div class="hoverlighticon"><img :src="p.BcrIconpathLight||'/appDefaultIconLight.png'"></div>
                  <!--<img :src="p.BcrIconpath||'/appDefaultIcon.png'" style="margin: 10px 10px;">-->
                  <div style="padding: 0px;color: #22334a;">
                    <div class="wordwrap" style="margin: 0px 0px;text-overflow:ellipsis;word-break: break-all">{{ p.BcrAbbreviation }}</div>
                  </div>
                </div>
              </div>
              <el-dropdown-menu slot="dropdown" />
            </el-dropdown>
          </el-card>
          <el-dropdown v-if="!i.children[0]" :key="i.id" placement="top-end" style="margin-left:10px;" @command="handleCommand">
            <div style="display: inline-block;" :title="i.BcrName">
              <div style="margin-right: 10px;margin-top: 10px;cursor:pointer;" @click="openApp(i)">
                <img :src="i.BcrIconpath||'/appDefaultIcon.png'" style="margin: 10px 0px;">
                <div style="padding: 0px;color: #22334a;">
                  <div class="wordwrap" style="text-overflow:ellipsis;word-break: break-all">{{ i.BcrAbbreviation }}</div>
                </div>
              </div>
            </div>
            <el-dropdown-menu slot="dropdown" />
          </el-dropdown>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllApplication } from '@/api/home/ApiHome'

const getTreeNode = function(list, pid) {
  var nodes = list.filter(x => x.BcrParentid === (pid || 0))
  nodes.forEach(x => {
    x.children = getTreeNode(list, x.BcrId)
    x.BcrAbbreviation = x.BcrAbbreviation || x.BcrName
    if (x.BcrAbbreviation.length > 7) {
      x.BcrAbbreviation = x.BcrAbbreviation.slice(0, 7) + '…'
    }
  })
  nodes = nodes.sort((a, b) => a.BcrOrder - b.BcrOrder)
  return nodes
}
export default {
  name: 'Application',
  data() {
    return {
      category: [],
      searchApps: null,
      currCategory: {},
      searchKey: ''
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.user.drawer
      },
      set(val) {
        this.$store.state.user.drawer = val
      }
    }
  },
  created: function() {
    this.getData()
  },
  methods: {
    getData() {
      getAllApplication().then(res => {
        // 屏蔽老平台菜单
        var allMenus = res.data.filter(x => x.BcrRequest !== 'ViewAction')
        // 屏蔽分组菜单和未配置链接菜单
          .filter(x => x.BcrParam2 || res.data.find(xx => x.BcrId === xx.BcrParentid))

        // 一次加载菜单，后面都从该地读取,只存子节点数据就行
        this.$store.state.user.allMenus = allMenus.filter(x => !res.data.find(xx => x.BcrId === xx.BcrParentid))
        // 显示那些顶级菜单根据配置
        if (allMenus.length > 0) {
          var data = getTreeNode(allMenus).filter(x =>
            // eslint-disable-next-line no-undef
            (!process.env.VUE_APP_ShowTopLevMenus || process.env.VUE_APP_ShowTopLevMenus.indexOf(x.BcrName) > -1) && x.children[0] && x.BcrName)
          this.category = data
          this.currCategory = data[0]
        }
      })
    },
    // eslint-disable-next-line no-unused-vars
    handleCommand: function(item) {

    },
    showCategory(item) {
      this.searchApp()
      this.currCategory = item
    },
    searchApp() {
      // eslint-disable-next-line no-console
      console.log('2222222')
      if (!this.searchKey) {
        this.searchApps = null
        return
      }
      var apps = []
      this.category.forEach(x => {
        apps = apps.concat(x.children)
        x.children.forEach(xx => {
          apps = apps.concat(xx.children)
        })
      })
      this.searchApps = apps.filter(x => x.BcrAbbreviation.indexOf(this.searchKey) > -1 && x.children.length === 0)
    },
    openApp(item) {
      this.OpenPage(item.BcrName, item.BcrParam2)
    }
  }

}
</script>

<style lang="scss">
  .applicationPage {

  .hoverlighticon {
      text-align: center;
    }
    .hovericon {
        text-align: center;
    }

    .hovericonparent:hover {
      .hoverlighticon {
        text-align: center;
        display: block;
      }
      .hovericon {
        text-align: center;
        display: none;
      }
    }
    .hoverlighticon {
        text-align: center;
      display: none;
    }
    .dialogBody {
      height: 178px;
    }

    .search {
      height: 250px;
      border-bottom: solid 1px #a3d3ff;
    }

    .searchDiv {
      height: 105px;
    }

    .searchInput {
      padding-top: 26px !important;
      padding-bottom: 40px !important;

    }

    .el-card__header {
      padding: 8px 20px;
      border-bottom: 1px solid #a3d3ff;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #e7f4ff;
    }
    .el-card {
      border-radius: 4px;
      border: 1px solid #c8d2e2;
      background-color: #fff;
      overflow: hidden;
      color: #303133;
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
    .el-dialog__header {
      padding: 8px !important;
      border-bottom: 1px solid #ccc;
    }
    .el-card.is-always-shadow {
      box-shadow: 0 0px 0px 0 rgba(0,0,0,0.1);
    }
    .el-dialog__title {
      line-height: 24px;
      font-size: 18px;
      color: #303133;
      margin-left: 20px;
    }

    .el-dialog__headerbtn {
      position: absolute;
      top: 10px;
      right: 20px;
      padding: 0;
      border: none;
      outline: 0;
      cursor: pointer;
      font-size: 24px !important;
    }

    .wordwrap {
      width: 60px;
      height: 40px;
      line-height: 18px;
      font: 400 12px/1.5;
      font-family: "Microsoft YaHei";
      overflow: hidden;
      word-break: break-all;
      word-wrap: break-word;
    }

    .el-dialog__body {
      padding: 0px 0px !important;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      overflow: auto;
      height:800px;
    }

  }
</style>
