<template>
  <div id="myApp">
    <el-popover placement="right" width="600" trigger="manual" v-model="alarmVisible">
      <h3>
        最新消息提醒
        <button type="button" class="el-dialog__headerbtn" v-on:click="alarmVisible = false">
          <i class="el-icon-close"></i>
        </button>
      </h3>
      <default-page ref="alarmTable" url="/api/index/loadNewsAlarm" v-bind:reduce-height="0" v-bind:table-height="'300px'" v-bind:post-data="alarmPostData">
          <el-table-column prop="title" label="新消息" v-bind:show-overflow-tooltip="true" width="309px"></el-table-column>
          <el-table-column prop="createDate" label="日期" v-bind:show-overflow-tooltip="true" width="145px"></el-table-column>
          <el-table-column label="状态" v-bind:show-overflow-tooltip="true" width="70px">
            <template slot-scope="scope">
              <el-tag type="warning" v-if="scope.row.readState===0">未读</el-tag>
              <el-tag type="success" v-if="scope.row.readState===1">已读</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" v-bind:show-overflow-tooltip="true" width="75px">
            <template slot-scope="scope">
              <el-button size="mini" v-on:click="leftNavSelect(scope.row.menuId)">查看</el-button>
            </template>
          </el-table-column>
      </default-page>
      <el-button slot="reference" class="alarm-btn"></el-button>
    </el-popover>
    <div class="top-menus">
      <el-menu default-active="activeIndex2" class="left-top-menus" mode="horizontal">
        <el-menu-item index="logo" style="width:200px;text-align:center;">某某管理平台</el-menu-item>
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
      <div class="right-top-menus">
        <el-avatar class="head-img" shape="square" v-bind:size="50" v-bind:src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-avatar>
        <el-menu mode="horizontal" v-on:select="rightMenuSelect">
          <el-submenu index="1">
            <template slot="title">用户</template>
            <el-menu-item index="11">基本资料</el-menu-item>
            <el-menu-item index="12">安全设置</el-menu-item>
            <el-menu-item index="newsAlarm">最新消息</el-menu-item>
          </el-submenu>
          <el-menu-item index="logout">退了</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="left-menus">
      <div class="left-menus-scroll">
        <el-menu style="min-height:100%;" default-active="2" class="left-menus-tree" v-on:select="leftNavSelect" v-bind:collapse="isCollapse">
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
    <div class="main-content" v-bind:style="{left:mainContentLeft}">
      <el-tabs v-model="menuActive" v-on:tab-remove="closeNavTab" closable>
        <el-tab-pane v-for="(x) in $store.state.menus"
          v-bind:label="x.title"
          v-bind:name="x.id"
          v-bind:key="x.id">
          <keep-alive>
            <component v-bind:is="x.id" class="inner-container" v-bind:style="{left:mainContentLeft}"></component>
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
            <el-input v-validate="'required|max:20'" data-vv-name="username" placeholder="请输入用户名" v-model.trim="loginData.username" prefix-icon="el-icon-user-solid"></el-input>
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
export default {
  data() {
    return {
      loginData: {
        username: "",
        password: ""
      },
      alarmPostData:{},
      alarmVisible:false,
      leftMenus: [],
      isCollapse: false,
      menuActive: null,
      rVercode: "/api/session/verificationCode?r=" + Math.random(),
      pieData: [],
      mainContentLeft:'201px'
    };
  },
  methods: {

    closeNavTab(targetName) {
      var menus = this.$store.state.menus;
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
    rightMenuSelect(key){
      if(key==='logout'){
        var thiz=this;
        this.$get('/api/session/logout',function(){
          thiz.$store.state.isLogin=false;
          thiz.$store.state.menus=[];
          thiz.alarmVisible=false;
          thiz.$store.menus=[];
          thiz.$cancelAllPools();
        });
      }else if(key==='newsAlarm'){
        this.alarmVisible=true;
        this.$refs.alarmTable.refresh();
      }
    },
    leftNavSelect(key) {
      var menus = this.$store.state.menus;
      var len = menus.length;
      for (var i = 0; i < len; i++) {
        if (menus[i].id === key) {
          this.menuActive = key;
          return;
        }
      }
      var ret = this.findLeftMenuById(key);
      menus.push({
        title: ret.title,
        id: key
      });
      this.menuActive = key;
    },
    login() {
      var thiz = this;
      this.$validateForm(()=>{
        thiz.loginData.password = new this.$Hashes.SHA1().hex(
          thiz.loginData.password
        );
        this.$post("/api/session/login", this.loginData,function(result) {
          if (result.code === 0) {
            var data = result.data;
            thiz.$store.state.isLogin = true;
            thiz.leftMenus = data.leftMenus;
            thiz.$regPool('newsAlarm', function () {
                thiz.alarmVisible=true;
                thiz.$refs.alarmTable.refresh();
            });
          }
          thiz.loginData.password = "";
          thiz.loginData.vercode = "";
          thiz.refreshVercode();
        });
      });
    }
  },
  mounted() {
    var thiz=this;
    var resize=function() {
        thiz.isCollapse=window.innerWidth<=992;
        thiz.mainContentLeft=window.innerWidth<=992?'65px':'201px';
    };
    resize();
    window.addEventListener('resize',resize,false);
    this.$validator.localize('zh_CN',{
      custom:{
        username:{
          required:'用户名不能为空',
          max(fieldName,replaceArray){
            return '用户名最大长度不能大于'+replaceArray[0]+'个字符';
          }
        }
      }
    });
    var thiz=this;
    this.$get("/api/index/loadLoginData",function(result) {
        thiz.leftMenus = result.data.leftMenus;
    });
    this.$regPool('newsAlarm', function () {
        thiz.alarmVisible=true;
        thiz.$refs.alarmTable.refresh();
    });
  }
};
</script>
<style>
.left-menus {
  transition: width .3s linear;
  width: 200px;
  position: absolute;
  left: 0;
  top: 61px;
  bottom: 0;
  overflow-x: hidden;
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
  transition: left .3s linear;
  position: absolute;
  top: 61px;
  right: 0;
  bottom: 0;
}
.inner-container {
  transition: left .3s linear;
  position: fixed;
  top: 115px;
  right: 0;
  bottom: 0;
  padding: 0 8px;
  overflow: auto;
  animation:fadeIn .5s;
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
  line-height:normal;
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
  padding: 3px;
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
.alarm-btn{
  position: fixed;
  left: 100%;
  bottom: 220px;
  z-index:100;
}
.left-top-menus{
  position:absolute;
  left: 0;
  top: 0;
  right: 0;
}
.right-top-menus{
  position:absolute;
  top: 0;
  right: 0;
}
.head-img{
  position:absolute;
  top: 0;
  left: -50px;
  top:5px;
}
.left-menus{
  animation:fadeIn 1s linear;
}
</style>