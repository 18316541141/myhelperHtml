<template>
  <div id="myApp">
    <el-menu
      default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="21">选项1</el-menu-item>
        <el-menu-item index="22">选项2</el-menu-item>
        <el-menu-item index="23">选项3</el-menu-item>
        <el-submenu index="24">
          <template slot="title">选项4</template>
          <el-menu-item index="241">选项1</el-menu-item>
          <el-menu-item index="242">选项2</el-menu-item>
          <el-menu-item index="243">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4">
        <a href="https://www.ele.me" target="_blank">订单管理</a>
      </el-menu-item>
    </el-menu>
    <div class="left-menus">
      <div class="left-menus-scroll">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          v-on:select="leftNavSelect"
          v-bind:collapse="isCollapse"
        >
          <el-submenu v-for="(x) in leftMenus" v-bind:index="x.id" v-bind:key="x.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span v-text="x.title"></span>
            </template>
            <el-menu-item v-for="(y) in x.leftMenus" v-bind:index="y.id" v-bind:key="y.id">
              <i class="el-icon-setting"></i>
              <span slot="title" v-text="y.title"></span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="main-content">
      <el-tabs v-model="menuActive" v-on:tab-remove="closeNavTab" closable>
        <el-tab-pane
          v-for="(x) in menus"
          v-bind:label="x.title"
          v-bind:name="x.id"
          v-bind:key="x.id"
        >
          <keep-alive>
            <component v-bind:is="x.id" class="inner-container"></component>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="login-content" v-bind:class="{'logout':$store.state.isLogin===false}">
      <div class="login-form-content">
        <h2 style="color:white;text-align:center;">测试后台</h2>
        <p style="color:white;text-align:center;">xxxxxxxxx运营商后台</p>
        <el-form v-bind:model="loginData" label-width="0" v-on:keyup.enter.native="login();">
          <el-form-item>
            <el-input
              placeholder="请输入用户名"
              v-model="loginData.username"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入密码"
              v-model="loginData.password"
              show-password
              prefix-icon="el-icon-unlock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col v-bind:span="12">
                <el-input placeholder="验证码" v-model="loginData.vercode"></el-input>
              </el-col>
              <el-col v-bind:span="12" style="text-align:right;">
                <img v-bind:src="rVercode" v-on:click="refreshVercode();" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-button type="primary" style="width:100%" v-on:click="login();">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import jshashes from "jshashes";
import m15 from "./menus/testMenus1/areaSelect.vue";
import m312 from "./menus/testMenus1/charts.vue";
import m12 from "./menus/testMenus1/uploadImage.vue";
import m14 from "./menus/testMenus1/uploadFiles.vue";
import m17 from "./menus/testMenus1/pageTable.vue";
import m101 from "./menus/testMenus1/aaa-treeForm.vue";
import m13 from "./menus/testMenus1/bigPic.vue";
import m18 from "./menus/testMenus1/uexcel.vue";
export default {
  components: {
      m15,m312,m12,m14,m17,m101,m13,m18
  },
  data() {
    return {
      loginData: {
        username: "",
        password: ""
      },
      leftMenus: [],
      menus: [],
      isCollapse: false,
      menuActive: null,
      rVercode: "/api/session/verificationCode?r=" + Math.random(),
      pieData: []
    };
  },
  methods: {
    closeNavTab(targetName) {
      var menus = this.menus;
      for (var i = 0, len = menus.length; i < len; i++) {
        if (menus[i].id === targetName) {
          menus.splice(i, 1);
          break;
        }
      }
    },
    refreshVercode() {
      this.rVercode = "/api/session/verificationCode?r=" + Math.random();
    },
    findLeftMenuById(id) {
      var leftMenus = this.leftMenus;
      var len_i = leftMenus.length;
      for (var i = 0; i < len_i; i++) {
        var childMenus = leftMenus[i].leftMenus;
        var len_j = childMenus.length;
        for (var j = 0; j < len_j; j++) {
          if (childMenus[j].id === id) {
            return childMenus[j];
          }
        }
      }
      return null;
    },
    leftNavSelect(key) {
      var menus = this.menus;
      var len = menus.length;
      for (var i = 0; i < len; i++) {
        if (menus[i].id === key) {
          this.menuActive = key;
          return;
        }
      }
      var ret = this.findLeftMenuById(key);
      menus[menus.length] = {
        title: ret.title,
        id: key
      };
      this.menuActive = key;
    },
    login() {
      this.loginData.password = new jshashes.SHA1().hex(
        this.loginData.password
      );
      var thiz = this;
      this.$post("/api/session/login", this.loginData,function(result) {
        if (result.code === 0) {
          var data = result.data;
          thiz.$store.state.isLogin = true;
          thiz.leftMenus = data.leftMenus;
        } else {
          thiz.loginData.password = "";
          thiz.loginData.vercode = "";
          thiz.refreshVercode();
        }
      });
    }
  },
  name: "myApp",
  mounted() {
    var thiz=this;
    this.$get("/api/index/loadLoginData",function(result) {
        thiz.leftMenus = result.data.leftMenus;
    });
  }
};
</script>

<style>
body {
  margin: 0;
}
.left-menus {
  width: 200px;
  position: absolute;
  left: 0;
  top: 61px;
  bottom: 0;
  overflow-x: hidden;
  background-color: rgb(84, 92, 100);
}
.left-menus-scroll {
  width: 220px;
  position: absolute;
  overflow-y: scroll;
  left: 0;
  top: 0;
  bottom: 0;
}
.main-content {
  position: absolute;
  left: 201px;
  top: 61px;
  right: 0;
  bottom: 0;
}
.inner-container {
  position: fixed;
  left: 200px;
  top: 115px;
  right: 0;
  bottom: 0;
  padding: 0 8px;
  overflow: auto;
}
.el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
.el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 20px;
}
.login-content {
  position: fixed;
  left: 100%;
  width: 100%;
  bottom: 0;
  top: 0;
  background: #909399;
  z-index: 99;
  overflow: hidden;
  opacity: 0;
  transition: all 0.4s linear;
}
.login-content.logout {
  opacity: 1;
  left: 0%;
}
.login-form-content {
  width: 320px;
  margin: 130px auto auto;
}
.webuploader-pick {
  line-height: initial;
}
.webuploader-container {
  height: 40px;
}
.el-dialog {
  margin: 0 auto;
}
/*缩略图的外边框装饰样式*/
.thumbnail-img {
  box-sizing: border-box;
  border: 1px solid #ddd;
  padding: 4px;
  border-radius: 4px;
  -webkit-transition: border-color 0.3s linear;
  -o-transition: border-color 0.3s linear;
  transition: border-color 0.3s linear;
}

.thumbnail-img:hover {
  border-color: #5fb878;
}

.thumbnail-img:active {
  border-color: #009688;
  border-width: 1.4px;
}
</style>
