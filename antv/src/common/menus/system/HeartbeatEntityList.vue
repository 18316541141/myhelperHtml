<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>系统管理</a-breadcrumb-item>
      <a-breadcrumb-item>心跳监测</a-breadcrumb-item>
    </a-breadcrumb>
    <a-form layout="inline" :form="postData">
        <a-form-item>
            <a-input placeholder="机器人的mac地址" v-decorator="['robotMacLike']"/>
        </a-form-item>
        <a-form-item>
            <a-input placeholder="机器人备注" v-decorator="['remarkLike']"/>
        </a-form-item>
        <a-form-item>
            <a-input placeholder="扩展字段" v-decorator="['extendFieldLike']"/>
        </a-form-item>
        <a-form-item>
            <a-input placeholder="起始心跳时间" v-decorator="['lastHeartbeatTimeStart']"/>
        </a-form-item>
        <a-form-item>
            <a-input placeholder="结束心跳时间" v-decorator="['lastHeartbeatTimeEnd']"/>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" icon="search">查询</a-button>
        </a-form-item>
    </a-form>
    <default-page
      ref="table"
      :url="$store.state.PROXY+'/HeartbeatEntity/page'"
      :post-data="postData"
      :ret-data.sync="retData">
      <p slot="expandedRowRender" slot-scope="scope">{{scope.row.extendField}}</p>
      <a-table-column dataIndex="lastHeartbeatTime" title="最近一次的心跳时间">
        <template slot-scope="scope">
          <a-icon type="clock-circle" />
          {{ scope.row.lastHeartbeatTime }}
        </template>
      </a-table-column>
      <a-table-column dataIndex="robotMac" title="机器人MAC"></a-table-column>
      <a-table-column dataIndex="remark" title="机器人备注"></a-table-column>
      <a-table-column dataIndex="statusDesc" title="运行状态">
        <template slot-scope="scope">
          <a-tag
            :type="scope.row.status===1?'green':'red'"
          >{{ scope.row.statusDesc }}</a-tag>
        </template>
      </a-table-column>
      <el-table-column dataIndex="Id" title="操作">
        <template slot-scope="scope">
          <a-button type="danger" @click="popconfirmKey=scope.row.id;showPopconfirm=true;" icon="delete">删除</a-button>
        </template>
      </el-table-column>
    </default-page>
    <a-popconfirm
      title="该信息删除后无法还原，是否确认删除？"
      :visible="showPopconfirm"
      @confirm="del"
      okText="确定"
      cancelText="取消"
    >
    </a-popconfirm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showPopconfirm:false,
      popconfirmKey:null,
      //仅用于存放查询参数的数据
      postData: {
        lastHeartbeatTimeStart: "",
        lastHeartbeatTimeEnd: "",
        robotMacLike: "",
        remarkLike: "",
        extendFieldLike: ""
      },
      retData: {} //仅用于存放分页查询的返回结果
    };
  },
  methods:{
    //删除一条数据
    del() {
      this.$post(this.$store.state.PROXY+"/HeartbeatEntity/del", { id: this.popconfirmKey }, function(result) {
        this.$refs.table.refresh();
      });
    }
  }
};
</script>