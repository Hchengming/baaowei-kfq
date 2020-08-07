<template>
  <div ref="componentbox">
    <div v-if="contents" class="widget-content">
      <div id="dynamic-component" />
    </div>
    <BgSVGBase />
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import BgSVGBase from '@/views/Home/components/BgSVGBase'

export default {
  name: 'DynamicComponentNew',
  components: {
    BgSVGBase
  },
  props: {
    height: {
      type: Number,
      default: 240
    },
    width: {
      type: Number,
      default: 600
    },
    content: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      random: Math.random(),
      contents: this.content,
      localheight: this.height,
      localwidth: this.width
    }
  },
  watch: {
    content: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$set(this, 'contents', val)
        this.$set(this.content, 'param1', val.param1)
      }
    }
  },

  mounted() {
    this.pageGetWidget()
  },
  methods: {
    pageGetWidget() {
      const that = this
      // eslint-disable-next-line no-unused-vars
      const request = axios // 供组件里面异步调用API
      if (that.contents && that.contents.param1 && that.contents.param2) {
        // 这个组件结构是先定义好,动态组件的template  methods以及其他
        // eslint-disable-next-line no-eval
        const componentContent = eval('{var temp=' + that.contents.param2 + ';temp}')
        componentContent.template = that.contents.param1 || ''
        // 注册动态组件内容
        const DynamicComponent = Vue.extend(componentContent)
        // 将组成的组件挂载到指定的DOM
        new DynamicComponent().$mount('#dynamic-component')
      }
    }
  }
}
</script>
<style scoped lang="scss">
.widget-base {
    width: 100%;
    height: 240px;
    position: relative;
    .widget-content{
        position:absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 10px;
    }
}
.widget-base:last-child{
    margin-top: 15px;
}
</style>

<style lang="scss">
.dynamic-component-content{
  width: 100%;
  .dynamic-component-header {
    width: 100%;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    display: flex;
    span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      font-size:14px;
    }
    .iicon {
      font-size:15px;
      color:  #46a6ff;
      width: 20px;
      text-align: left;
    }
    .iicon:before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 5px;
      border: 2px solid #3333ff;
    }
    .total {
      color: #f00;
      text-align: left;
      flex: 1;
    }
    .more {
      width: 60px;
      color: #1890ff;
      text-align: right;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .dynamic-component-body {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        line-height: 40px;
        list-style: none;
        margin: 0;
        padding: 0;
        cursor: pointer;
      }
      li:before {
          content: '';
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #46a6ff;
          margin-right: 5px;
      }
      li:hover {
        color:#46a6ff;
      }
    }
  }
}
</style>
