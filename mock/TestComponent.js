
export default [
  // mock get all routes form server
  {
    url: '/getInfo',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          componentName: 'test',
          template: `<div class="tz" style="width: 270px; margin-top: 20px; margin-left: 10px;">
          <div>
            <div class="box-card" style="margin-left: 10px; margin-top: 20px; height: 220px;">
              <div slot="header" style="position: relative;"><span class="iicon" style="font-size: 16px;">通知</span><span style="margin-left: 10px; color: red;">&nbsp;&nbsp;798&nbsp;&nbsp;</span> <button type="button" class="el-button el-button--text el-button--medium" style="position: absolute; top: 0px; right: -30px;"><!----><!----><span>更多&gt;</span></button></div> <div style="margin-top: 20px;"><div class="text item"><div style="line-height: 40px;"><span style="font-size: 15px; color: rgb(70, 166, 255);">● </span>2019年工作总结的通知
                </div>
                </div>
                <div class="text item">
                  <div style="line-height: 40px;">
                    <span style="font-size: 15px; color: rgb(70, 166, 255);">● </span>测试市局发文6666-10-24
                  </div>
                </div>
                <div class="text item">
                  <div style="line-height: 40px;"><span style="font-size: 15px; color: rgb(70, 166, 255);">● </span>测试市局发文7-1024-通知
                </div>
                </div>
                <div class="text item"><div style="line-height: 40px;"><span style="font-size: 15px; color: rgb(70, 166, 255);">● </span>发文流程带附件点击发布测试1567
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>`,
          methodsFuns: [
            { name: 'addHandler', func: `if(arguments[0]){that.OpenPage(arguments[0].name,arguments[0].path);}` },
            { name: 'getData', func: `request({method: 'get',url: '/component/getData'}).then(res => {this.myData=res.data.data})` }
          ],
          mountedFuns: 'this.getData()',
          createdFuns: ''
        }
      }
    }
  },

  {
    url: '/getData',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: [
          { id: 1, name: '来自API数据-点击跳转-企鹅3', path: 'http://www.qq.com' },
          { id: 2, name: '来自API数据-点击跳转-凤凰4', path: 'http://www.ifeng.com' }
        ]
      }
    }
  }
]
