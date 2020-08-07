<template>
  <div>
    <div class="consult-concat" :class="dispear===1?'consult-dispear':''" @click="showDialog">
      <div class="consult-wrap">
        <a href="javascript:void(0);" class="robotStyle">
          <img src="@/assets/home/bg_0.png" class="staff_img" alt="">
        </a>
      </div>
    </div>
    <el-drawer
      title="您好! 信息中心 小信 竭诚为您服务"
      :visible.sync="dialog"
      :direction="direction"
      :modal="false"
    >
      <div class="demo-drawer__content">
        <ul ref="dialog" class="content_robot">
          <li v-for="(item,index) in messageList" :key="index">
            <img :src="item.isSelf?me:robot" :class="'img'+(item.isSelf?'Right':'Left')">
            <span v-if="item.list&&item.list[0]" class="spanLeft">
              <div>小信为您找到以下{{ item.list.length }}个结果。</div>
              <div v-for="(n,i) in item.list" :key="i">
                {{ (i+1)+'、' }}
                <a @click="openAnswer(n)" v-html="n.Title" />
              </div>
            </span>
            <span v-else-if="item.list" class="spanLeft">
              <div>非常抱歉，小信暂不知道怎么回答。</div>
              <div>小信已将您的问题记录。</div>
              <div>您还可以直接<a @click="showContact">联系我们</a>。</div>
            </span>
            <span v-else :class="'span'+(item.isSelf?'Right':'Left')" v-html="item.message" />
          </li>
        </ul>
        <el-button-group class="categorys">
          <el-button class="borderNone borderType" :class="{active:''==currCategory}" @click="selectCategory('')">对话分类：</el-button>
          <el-button v-for="n in categorys" :key="n" class="borderNone" :class="{active:n==currCategory}" @click="selectCategory(n)" v-html="n" />
        </el-button-group>
        <el-form :model="{}">
          <el-form-item label="" style="margin: 0;height: 74px;">
            <el-input v-model="question" type="textarea" class="textarea-box" autocomplete="off" @keyup.enter.native="closeDrawer()" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">关 闭</el-button>
          <!-- <el-tooltip class="item" effect="dark" content="请输入内容....." placement="top-end"> -->
          <el-button type="primary" :loading="loading" @click="closeDrawer()">发 送</el-button>
        <!-- </el-tooltip> -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { question } from '@/api/home/ApiHome'
import { MeetingSystemApi } from '@/utils/config'
export default {
  props: {
    dispear: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialog: false,
      loading: false,
      direction: 'rtl',
      question: '',
      messageList: [],
      currCategory: '',
      categorys: '法律法规 知识库 应用 业务 政务 地图'.split(' '),
      isSelf: true,
      // eslint-disable-next-line no-undef
      me: require('@/assets/home/message_0.png'),
      // eslint-disable-next-line no-undef
      robot: require('@/assets/home/bg_0.png')
    }
  },
  methods: {
    cancelForm() {
      this.dialog = false
      this.messageList = []
    },
    showDialog() {
      this.dialog = true
      if (!this.messageList[0]) {
        this.messageList.push({
          message: `您好呀！小信很高兴为您服务，你可以尝试问
          <br/>1、<a style='color:#3366ff;' onclick='OpenNewForm("http://23.36.123.101:9527/TestFBS/down/new_file.html?key=FastDFS1234567890&type=html&articleid=&file=&filetoken=%u65b0%u5e73%u53f0%u9996%u9875%u4ecb%u7ecd&action=download&filename=new_file.html","新平台怎么用")'>新平台怎么用？</a>
          <br/>2、<a style='color:#3366ff;' onclick="OpenNewForm('/home/ImgIntroduce?imgsrc=新平台变化.png','新平台有什么新功能新变化')">新平台有什么新功能新变化？</a>
          <br/>3、<a style='color:#3366ff;' onclick="OpenNewForm('/home/ImgIntroduce?imgsrc=新建任务.png','新平台怎么怎么添加新的任务')">新平台怎么怎么添加新的任务？</a>`,
          isSelf: false
        })
      }
    },
    closeDrawer() {
      if (!this.question) {
        return false
      }
      if (this.currCategory === '业务') {
        this.OpenPage('智能搜索', '/NModules/Search/Index.html?key=' + this.question.replace(/\n/g, ''))
        this.question = ''
        return
      }
      this.messageList.push({
        message: this.question,
        isSelf: true
      })
      if (this.question.search(/[A-Z]\d+(-\d+){0,3}(\/\d+)?/g) > -1) {
        var code = this.question.match(/[A-Z]\d+(-\d+){0,3}(\/\d+)?/g)[0]
        var url = `http://23.36.123.64:8080/views/citymap.html?hideres=1&hideseach=1&hidbgchange=1&hidemenu=1&hidmaptools=1&hidemyfov=1&hidetipinfo=1&operate=query&querykey=%u5730%u5757%u7F16%u53F7&queryvalue=${code}&querymodel=like&queryres=konggui`
        return this.showAnswer([{ Title: `点此看${code}地块控规情况`, Tag1: '地图', Str2: `OpenNewForm("${url}","${code}地块控规")` }])
      }
      question(this.question, this.currCategory).then(res => { this.showAnswer(res.data.Data.List) })
    },
    showAnswer(answers) {
      this.question = ''
      this.messageList.push({
        list: answers,
        isSelf: false
      })
      // 当前分类只有一个结果时直接打开结果
      if (this.currCategory && answers.length === 1 && answers[0].Tag1.indexOf(this.currCategory) > -1) {
        this.openAnswer(answers[0])
      }
      this.$nextTick(function() {
        this.$refs.dialog.scrollTop = 9999999
      })
    },
    openAnswer(row) {
      this.dialog = false
      row.Tag2 = row.Tag2 || ''
      if (row.Tag1 === '法律法规') {
        this.OpenPage(row.Title, '/nmodules/DailyEvaluate/TestDetail.html?id=' + row.RowId)
      } else if (row.Tag1 === '知识库') {
        this.OpenPage(row.Title, '/Modules/Suggestion/view/index.htm?pid=' + row.RowId)
      } else if (row.Tag1.indexOf('地图') > -1 && row.Tag2.indexOf('村标点') > -1) {
        this.OpenPage(row.Title, 'http://23.36.123.64:88/views/ShowMapCZ.html?callsys=1080e327-f95f-4340-876a-b1aecca1350d&callid=85&configid=55380&hideres=1&villagecode=' + row.Str2)
      } else if (row.Tag1 === '政务' && row.Tag2 === '一周工作安排') {
        this.OpenPage(row.Title, MeetingSystemApi + '/DatePlanTable/PrintWeek?search={"Leader_List":[],"Lead_Department":[],"In_Conferee":[],"Title":["' + row.Tag3 + '"]}')
      } else {
        if (row.Tag1 === '应用' && !this.$store.state.user.allMenus.find(x => x.BcrId.toString() === row.Tag2)) {
          this.$notify({
            title: '权限不足',
            message: '对不起，您暂时没有权限打开该应用！请联系管理员处理。',
            type: 'error',
            duration: 5000
          })
          return
        }
        // eslint-disable-next-line no-eval
        eval(row.Str2)
      }
    },
    showContact() {
      this.dialog = false
      this.$store.commit('user/SET_DRAWERFEEDBACK', true)
    },
    selectCategory(cateogry) {
      this.currCategory = cateogry
    }
  }
}
</script>
<style lang="scss">
.demo-drawer__footer{
    position: absolute;
    bottom: 0;right: 20px;
}

.textarea-box{
  .el-textarea__inner{
      min-height:74px  !important;
      resize: none;
      overflow-y: auto;
      border: none !important;
  }
}
:focus{outline: 0;}
.layout .app-wrapper .el-drawer.ltr, .layout .app-wrapper .el-drawer.rtl{width:auto !important;}
.layout .app-wrapper .el-drawer.ltr .el-drawer__header, .layout .app-wrapper .el-drawer.rtl .el-drawer__header{
    width: auto !important;
    position: static !important;
}
</style>
<style lang="scss" scoped>
/* 对话框样式 */
@keyframes bg2Animation{
    0%{transform:rotate(0);}
    100%{transform:rotate(360deg);}
}
@keyframes ballRotate{
    0%{opacity:0;}
    50%{opacity:1;}
    100%{opacity:0;}
}
.el-drawer__wrapper{
  width: 30%;
  height: 500px;
  bottom: 18px;
  right: 16px;
  top: auto;
  left: auto;
  .el-drawer__container{
    position: absolute;
    left: auto;
    right: 0;
    top:auto;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
}
.consult-dispear{right: -30px !important;transition:all 2s linear;}
.consult-concat{
    position: fixed;
    top: 40px;
    right: -86px;
    width:80px;
    height: 34px;
    z-index: 999;
    cursor: pointer;transition: all 1s ease-in;
    .staff_img{
            z-index:999;width:20px;height:20px;
        }
        img{
          position:absolute;
          left:22%;
          top:50%;
          width:auto;
          -webkit-transform:translate3d(-50%, -50%, 0);
          transform:translate3d(-50%, -50%, 0)
       }
       .consult-wrap{
            width: 80px;
            height: 34px;
            background: #409EFF;
            border-radius: 26px;
            .robotStyle{
                display: inline-block;
                width: 28px;
                height: 28px;
                background: #fff;
                border-radius: 50%;
               margin-left: 4px;
               margin-top:3px;
            }
      }
      &:hover{
         .tip{display:block;}
      }

}
.content_robot{
       list-style: none;
       margin: 10px 0 0 0;
       padding:0;
       height:300px;overflow-y:auto;
       li{
            list-style: none;
            overflow: hidden;
            margin:0;
            padding:0;
            .spanLeft{
               float: left;
               background: #f5f7fa;
               padding: 10px;
               border-radius: 10px;
               margin-left: 8px;
               margin-bottom: 20px;
               line-height: 24px;
               font-size: 14px;
               a{
                 color: #3366ff;
               }
           }
           .spanRight{
               float: right;
               background: #7cfc00;
               display: block;
               padding: 10px;
               border-radius: 10px;
               margin-bottom:20px;
               max-width: 362px;
           }
           img{
               width: 60px;
               height:60px;
           }
           .imgRight{
               float: right;
               margin-right: 10px;
           }
           .imgLeft{
               float: left;
               margin-left: 10px;
           }

       }
   }
   .el-input{width: 80%;margin: 20px auto 0;justify-content: center;display: flex;}
   .categorys{
      display: flex;
      .active{background: #1890ff;color:white;border-radius: 0; }
      .borderNone{border-top: 1px solid #DCDFE6;border-bottom: none;border-left: none;border-right: none;}
      .borderType{padding-left: 8px !important;}
      .el-button{width:20%;}
      .el-button--medium{padding:10px 0;font-size:14px;}
   }
</style>
