<template>
  <div class="flow-create">
    <iframe :src="url" />
  </div>
</template>

<script>
import { getInfo } from '@/api/ApiWorkFlow'
import { getOldSystemUrlBy } from '@/utils/config'
export default {
  name: 'WorkFlowCreate',
  props: {
    wfcode: {
      type: String,
      default: ''
    },
    formJson: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      url: '',
      query: {
        wcid: 100991,
        btid: 100262,
        createtype: 15
      }
    }
  },
  created() {
    this.getIframeUrl()
  },
  methods: {
    // 获取创建流程表单地址
    getIframeUrl() {
      this.query = {
        flowcode: this.wfcode,
        readtype: 'getflowinfo'
      }
      getInfo(this.query).then(res => {
        this.query = {
          wcid: res.data.wcid,
          btid: res.data.btid,
          createtype: res.data.createtype,
          readtype: 'createproject'
        }
        getInfo(this.query).then(res => {
          if (res.data) {
            // eslint-disable-next-line no-useless-escape
            this.url = getOldSystemUrlBy(`${res.data + '&AutoFillForm=' + this.formJson.replace(/\:/g, '：')}`)
          }
        }).catch(res => {
          console.log('createproject catch', res)
        })
      }).catch(res => {
        console.log('getflowinfo catch', res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.flow-create{
    min-height: 760px;
    iframe{
        height: 758px;
        width: 100%;
    }
}
</style>
