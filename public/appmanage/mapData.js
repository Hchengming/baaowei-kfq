import axios from 'axios'


const mapStr = '{"d":"{ \"total\":3454,\"rows\":[ { \"id\":\"42870\",\"name\":\"测试父图层\",\"parentid\":\"-1\",\"mainid\":\"\"},{ \"id\":\"42871\",\"name\":\"测试子图层\",\"parentid\":\"42870\",\"mainid\":\"\"}]}"}'

// export default mapStr
const mapJson = function () {
  const data = JSON.parse(mapStr.substring(6, mapStr.length - 2))
  return data.rows
}

export function mapNodesToTree (nodes = [], pid = -1) {
  let branch = []
  if (Array.isArray(nodes) && nodes.length === 0) {
    nodes = mapJson()
  }

  nodes.forEach(node => {
    if (node.parentid == pid) {
      let children = mapNodesToTree(nodes, node.id)
      if (children.length > 0) {
        node['children'] = children
      }
      branch.push(node)
    }
  })

  return branch
}

const Api = process.env.VUE_APP_MAP_API

export function getMapNodes(appId) {
  return axios({
    url: `${Api}/NWCF/ConfigResourcesService.svc/GetConfigResourcesClassBysysname?callsysname=${appId}`
  })
}
