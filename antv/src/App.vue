<template>
  <div>
    <a-layout>
      <a-layout-header class="header">
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="['2']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout>
        <div class="left-menus">
          <div class="left-menus-scroll">
            <a-layout-sider width="200">
              <a-menu
                mode="inline"
                :style="{ height: '100%', borderRight: 0 }"
                :select="leftNavSelect"
              >
                <a-sub-menu v-for="(x) in leftMenus" :key="x.name">
                  <span slot="title">
                    <a-icon type="user" />{{x.title}}
                  </span>
                  <a-menu-item v-for="(y) in x.leftMenus" :key="y">{{y.title}}</a-menu-item>
                </a-sub-menu>
              </a-menu>
            </a-layout-sider>
          </div>
        </div>
        <a-layout style="padding: 0 24px 24px;" class="main-content">
          <a-tabs v-model="menuActive" type="editable-card">
            <a-tab-pane
              v-for="(x) in $store.state.menus"
              :tab="x.title"
              :key="x.name"
              :closable="true"
            >
              <keep-alive>
                <component
                  v-bind:is="x.name" class="inner-container"
                ></component>
              </keep-alive>
            </a-tab-pane>
          </a-tabs>
        </a-layout>
      </a-layout>
    </a-layout>
    <div id="loading-container" v-if="$store.state.loadingStatus" :class="{'logout':$store.state.isLogin===false}">
      <a-spin
        style="position:absolute;left:50%;top:40%;margin-left:-16px;margin-top:-16px;"
        size="large"
      />
    </div>
    <div class="login-content">
      <div class="login-form-content">
        <h2 style="color:white;text-align:center;">测试后台</h2>
        <p style="color:white;text-align:center;">xxxxxxxxx运营商后台</p>
        <a-form :form="loginData" v-on:keyup.enter.native="login">
          <a-form-item>
            <a-input
              v-decorator="[
                'username',
                { rules: [
                  { required: true, message: '请输入账号' },
                  { validator: $myValidators.rangeLength(5,20,'账号长度必须在{0}-{1}个字符之间')}
                  ] }
              ]"
              placeholder="请输入账号"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
              'password',
              { rules: [
                { required: true, message: '请输入密码' },
                { validator: $myValidators.rangeLength(6,20,'密码长度必须在{0}-{1}个字符之间')}
              ] }
            ]"
              type="password"
              placeholder="请输入密码"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-row :gutter="8">
              <a-col :span="15">
                <a-input
                  v-decorator="[
                    'vercode',
                    { rules: [
                      { required: true, message: '验证码' },
                      { len: 4, message: '验证码长度必须是4个字符' }
                    ] }
                  ]"
                  placeholder="验证码"
                ></a-input>
              </a-col>
              <a-col :span="9" style="text-align:right;">
                <img
                  v-bind:src="rVercode"
                  v-on:click="refreshVercode();"
                  style="height:32px;margin-top:-5px;"
                />
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item>
            <a-button style="width:100%;" type="primary" @click="login" class="login-form-button">登陆</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginData: this.$form.createForm(this),
      rVercode: "/api/session/verificationCode?r=" + Math.random(),
      leftMenus: [],
      menuActive: null
    };
  },
  mounted() {
    this.$get("/api/index/loadLoginData", function(result) {
      this.leftMenus = result.data.leftMenus;
      this.$store.state.username = result.data.username;
      this.$store.state.isLogin = true;
    });
  },
  methods: {
    leftNavSelect(name) {
      var menus = this.$store.state.menus;
      var len = menus.length;
      for (var i = 0; i < len; i++) {
        if (menus[i].name === name) {
          this.menuActive = name;
          return;
        }
      }
      var ret = this.findLeftMenuByName(name);
      menus.push({
        title: ret.title,
        name: name
      });
      this.menuActive = name;
    },
    refreshVercode() {
      this.rVercode = "/api/session/verificationCode?r=" + Math.random();
    },
    login() {
      this.loginData.validateFields((err, values) => {
        if (!err) {
          values.password = new this.$Hashes.SHA1().hex(values.password);
          this.$post("/api/session/login", values, function(result) {
            if (result.code === 0) {
              var data = result.data;
              this.$store.state.isLogin = true;
              this.$store.state.username = values.username;
              this.leftMenus = data.leftMenus;

              // this.$regPool('newsAlarm', function () {
              //     this.alarmVisible=true;
              //     this.$refs.alarmTable.refresh();
              // });
            }
            this.loginData.setFieldsValue({
              password: "",
              vercode: ""
            });
            this.refreshVercode();
          });
        }
      });
    }
  }
};
</script>
<style>
.login-form-content {
  width: 320px;
  margin: 130px auto auto;
}
.login-content {
  position: fixed;
  left: 100%;
  width: 100%;
  bottom: 0;
  top: 0;
  background: #2f4056;
  z-index: 99;
  overflow: hidden;
  opacity: 0;
  transition: all 0.4s linear;
}
.login-content.logout {
  opacity: 1;
  left: 0%;
}
#loading-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10086;
}
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.left-menus {
  transition: width 0.3s linear;
  width: 200px;
  position: absolute;
  left: 0;
  top: 64px;
  bottom: 0;
  overflow-x: hidden;
  background: white;
}
.left-menus-scroll {
  width: 220px;
  position: absolute;
  overflow-y: scroll;
  left: 0;
  top: 0;
  bottom: 0;
}
.inner-container {
  transition: left 0.3s linear;
  position: fixed;
  top: 115px;
  right: 0;
  bottom: 0;
  padding: 0 8px;
  overflow: auto;
  animation: fadeIn 0.5s;
}
.main-content {
  transition: left 0.3s linear;
  position: absolute;
  top: 64px;
  right: 0;
  bottom: 0;
  left: 200px;
}
</style>