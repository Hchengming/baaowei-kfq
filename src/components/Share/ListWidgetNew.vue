<template>
  <div ref="componentbox" class="list">
    <div class="widget-content">
      <div class="widget-head">
        <span class="item widget-head-title">
          {{ config.title=='@title'? content.name:config.title }}
        </span>
        <span class="widget-head-count">&nbsp;&nbsp;{{ count }}&nbsp;&nbsp;</span>
        <el-button class="item widget-head-more" type="text" @click="showAll(config)">更多></el-button>
      </div>
      <div class="widget-body">
        <el-table :data="list" :show-header="false" :stripe="true" @row-click="row=>showDetail(row,config)">
          <el-table-column v-if="list[0]" width="20">
            <span style="font-size: 15px; color: rgb(70, 166, 255);">●</span>
          </el-table-column>
          <el-table-column v-for="(col,i) in config.fields" :key="i" :prop="col.name" :label="col.title" :width="col.width">
            <template slot-scope="scope">
              <a :class="`${{link:(scope.row[col.name]||'').length>14}} dbrw-title`" :title="scope.row[col.name]">{{ scope.row[col.name] }}</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <BgSVGBase />
  </div>
</template>

<script>
import axios from 'axios'
import BgSVGBase from '@/views/Home/components/BgSVGBase'
import { getOldSystemUrlBy, OldSystemApi } from '@/utils/config'

export default {
  name: 'ListWidgetNew',
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
        .widget-head{
            width: 100%;
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            display: flex;
            .widget-head-title {
                text-align: left;
                width: 80px;
            }
            .widget-head-title:before {
                content: '';
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin-right: 5px;
                border: 2px solid #3333ff;
            }
            .widget-head-count{
                color: #f00;
                text-align: left;
                flex: 1;
            }
            .widget-head-more{
                width: 80px;
                color: #1890ff;
                text-align: right;
                font-size: 14px;
                cursor: pointer;
            }
            .widget-head-more:hover{
                color: #f00;
            }
        }

        .widget-body {
            list-style: none;
            padding: 0;
            margin: 0;
            display: contents;
            .widget-body-item {
                line-height: 40px;
                display: flex;
                .ioc{
                    font-size:15px;
                    color:  #46a6ff;
                    width: 20px;
                    text-align: center;
                }
                .title{
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                }
                .title:hover{
                    color:#46a6ff;
                }
                .date{
                    width: 50px;
                    text-align: center;
                    height: 22px;
                    line-height: 22px;
                    border-radius: 5px 5px;
                    font-size: 12px;
                    margin-top: 8px;
                }
            }
        }
    }
}
.widget-base:last-child{
    margin-top: 15px;
}

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

  .dbrw-title{
  -webkit-line-clamp: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: nowrap;
}
</style>
