<template>
  <div ref="componentbox" style="width:100%;position: relative;" class="list">
    <!-- <div style="width:100%;margin-top: 20px;position: relative;" class="list"> -->
    <div style="padding:20px;height: 220px;overflow: hidden;position: absolute;width: 100%;">
      <div slot="header" style="position: relative">
        <span style="font-size:16px;" class="iicon" />
        {{ config.title=='@title'? content.name:config.title }}
        <span style="margin-left:10px;color:red">&nbsp;&nbsp;{{ count }}&nbsp;&nbsp;</span>
        <el-button
          style="position: absolute;right:20px;"
          type="text"
          @click="showAll(config)"
        >更多></el-button>
      </div>
      <div style="margin:20px 20px 0px -10px;">
        <el-table :data="list" :show-header="false" @row-click="row=>showDetail(row,config)">
          <el-table-column v-if="list[0]" width="20">
            <span style="font-size: 15px; color: rgb(70, 166, 255);">● </span>
          </el-table-column>
          <el-table-column v-for="(col,i) in config.fields" :key="i" :prop="col.name" :label="col.title" :width="col.width">
            <template slot-scope="scope">
              <a :class="{link:(scope.row[col.name]||'').length>14}">{{ scope.row[col.name] }}</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <svg
      x="0px"
      y="0px"
      :width="`${localwidth}px`"
      :height="`${localheight}px`"
      :viewBox="`0 0 ${localwidth} ${localheight}`"
      xml:space="preserve"
    >
      <polygon
        fill="#FFFFFF"
        stroke="#1890FF"
        :points="`10,0 ${localwidth-100},0 ${localwidth-90},10 ${localwidth-10},10 ${localwidth},20 ${localwidth},${localheight-10} ${localwidth-10},${localheight} 10,${localheight} 0,${localheight-10} 0,10`"
      />
    </svg>
  </div>
</template>

<script>
import axios from 'axios'
import { getOldSystemUrlBy, OldSystemApi } from '@/utils/config'

export default {
  name: 'ListWidget',
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
    },
    config: {
      type: Object,
      default: null
    }
  },
  data() {
    const data = {
      list: [],
      count: '',
      localheight: this.height,
      localwidth: this.width
    }
    return data
  },
  mounted() {
    const config = this.config
    const params = {
      ticket: localStorage.ticket,
      uip: localStorage.ip,
      action: 'GetPortalLetData',
      serviceName: config.getDataService,
      getCount: false,
      guid: config.parentID + '_' + config.id,
      intTypeId: config.typeId,
      strBizType: ''
    }
    axios({
      url: OldSystemApi + '/Api/PortalLet.ashx',
      params: params
    }).then(res => {
      var data = res.data.Data.data
      this.list = data && data.length ? data.slice(0, 4) : []
      this.count = config.hasCount ? res.data.Data.count : ''
    })
    var that = this
    window.addEventListener('resize', function() {
      that.changeSize()
    })
  },
  methods: {
    // 显示更多
    showAll(config) {
      // eslint-disable-next-line no-eval
      eval(config.onClick)
    },
    // 显示详细
    showDetail(row, config) {
      if (row.docid && row.subject) {
        const url = '/Modules/PublicDocument/view/view.htm?id=' + row.docid
        this.OpenPage(row.subject, getOldSystemUrlBy(url))
      } else if (config.rowClick) {
        config.rowClick(row)
      }
    },
    changeSize() {
      this.localwidth = (this.$refs.componentbox.clientWidth - 10)
      this.localheigh = this.$refs.componentbox.clientHeight
    }
  }
}
</script>

<style lang="scss" scoped>
  .link {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    // color: #1890ff;
  }
  .list {
    font-family: "microsoft yahei";
  }
  .el-button--medium{
    padding:0;
  }
  .dynamic-component-body{
    ul{
      padding-right: 5%;
    }
  }
  .iicon{
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    border: 2px solid #3333ff;
  }
</style>
