<template>
  <div>
      <h2 class="h2">请输入账号密码登陆</h2>
      <form v-on:keyup.enter.native="login">
        <van-cell-group>
          <van-field label="用户名" v-model="username" placeholder="请输入用户名" clearable required/>
          <van-field type="password" label="密码" v-model="password" placeholder="请输入密码" clearable required/>
        </van-cell-group>
        <br/>
        <van-button type="primary" size="large" v-on:click="login">登陆</van-button>
      </form>
  </div>
</template>
<script>
export default {
  data(){
    return {loginData:{username:'',password:''}};
  },
  methods:{
    login(){
      this.$post("/api/session/login", this.loginData,function(result) {
        if (result.code === 0) {
          var data = result.data;
        }
        thiz.loginData.password = "";
      });
    }
  }
}
</script>
<style>
body {
    color: #323233;
    font-family: 'PingFang SC', Helvetica, 'STHeiti STXihei', 'Microsoft YaHei', Tohoma, Arial, sans-serif;
    line-height: 1;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
}
.h2{
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  color: rgba(69,90,100,.6);
  padding: 35px 15px 15px;
}
</style>
