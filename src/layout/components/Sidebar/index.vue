<template>
  <div :class="{'has-logo':showLogo}">
    <!--collapse 影响样式是否折叠-->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!--这居然是一个隐藏组件,官方没放出来-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!--collapse 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）-->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
        <!--<el-menu-item index="2">
                            <i class="el-icon-menu" @click="haha"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>-->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
// sidebar.scss
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    // 测试导航栏点击事件
    haha: function() {
      alert('dd')
    }
  }
}
</script>
