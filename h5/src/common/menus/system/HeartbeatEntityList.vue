﻿<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>心跳监测</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-form v-bind:inline="true" v-bind:model="postData">
      <el-form-item>
        <el-input
          size="medium"
          style="width:170px;"
          v-model="postData.robotMacLike"
          placeholder="机器人的mac地址"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          size="medium"
          style="width:150px;"
          v-model="postData.remarkLike"
          placeholder="机器人备注"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          size="medium"
          style="width:150px;"
          v-model="postData.extendFieldLike"
          placeholder="扩展字段"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          clearable
          size="medium"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="起始心跳时间"
          v-model="postData.lastHeartbeatTimeStart"
          style="width:195px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          clearable
          size="medium"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="结束心跳时间"
          v-model="postData.lastHeartbeatTimeEnd"
          style="width:195px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          size="medium"
          type="primary"
          v-on:click="$refs.table.search()"
          icon="el-icon-search"
        >查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" v-on:click="$refs.table.refresh()" icon="el-icon-refresh">刷新</el-button>
      </el-form-item>
    </el-form>
    <default-page
      ref="table"
      :url="$store.state.PROXY+'/HeartbeatEntity/page'"
      v-bind:post-data="postData"
      v-bind:ret-data.sync="retData"
      v-bind:reduce-height="120"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="扩展内容">
              <code v-text="props.row.extendField"></code>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="最近一次的心跳时间" sortable="custom" v-bind:show-overflow-tooltip="true">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          {{ scope.row.lastHeartbeatTime }}
        </template>
      </el-table-column>
      <el-table-column prop="robotMac" label="机器人MAC"></el-table-column>
      <el-table-column prop="remark" label="机器人备注" width="150px"></el-table-column>
      <el-table-column label="运行状态">
        <template slot-scope="scope">
          <el-tag
            size="medium"
            :type="scope.row.status===1?'success':'danger'"
          >{{ scope.row.statusDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" type="danger" v-on:click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </default-page>

    <!-- 抄考代码
        标题部分：
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>一级菜单</el-breadcrumb-item>
            <el-breadcrumb-item>二级菜单</el-breadcrumb-item>
            <el-breadcrumb-item>三级菜单</el-breadcrumb-item>
            <el-breadcrumb-item>....</el-breadcrumb-item>
        </el-breadcrumb>
------------------------------------------------------------------------------------------------------
        查询参数表单：
		<br>
        <el-form v-bind:inline="true" v-bind:model="postData">
            <el-form-item>
              <el-date-picker size="medium" value-format="yyyy-MM-dd" type="date" placeholder="日期提取框" v-model="postData.日期字段"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select size="medium" v-model="postData.下拉框字段" placeholder="下拉框" clearable>
                <el-option :key="0" :label="'选项1'" :value="0"></el-option>
                <el-option :key="1" :label="'选项2'" :value="1"></el-option>
                <el-option :key="2" :label="'选项3'" :value="2"></el-option>
                ....
              </el-select>
            </el-form-item>
		            <el-form-item>
		                <el-input size="medium" v-model="postData.RobotIdLike" placeholder="机器人id" clearable></el-input>
		            </el-form-item>
		            <el-form-item>
		                <el-input size="medium" v-model="postData.LastHeartbeatTimeStart" placeholder="最近一次的心跳时间" clearable></el-input>
		            </el-form-item>
		            <el-form-item>
		                <el-input size="medium" v-model="postData.LastHeartbeatTimeEnd" placeholder="最近一次的心跳时间" clearable></el-input>
		            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" v-on:click="$refs.table.search()" icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" v-on:click="$refs.table.refresh()" icon="el-icon-refresh">刷新</el-button>
            </el-form-item>
            <el-form-item>
                <el-dropdown v-on:command="exportExcel">
                    <el-button size="medium" type="success" icon="el-icon-download">导出excel</el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="xlsx">xlsx格式</el-dropdown-item>
                        <el-dropdown-item command="xls">xls格式</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
			<el-form-item>
                <el-button size="medium" type="primary" v-on:click="add" icon="el-icon-plus">新增</el-button>
            </el-form-item>
			<transition name="fade">
                <el-form-item v-show="checkedDatas.length>0">
                    <el-button size="medium" type="primary" v-on:click="enable" icon="el-icon-check">启用</el-button>
                </el-form-item>
            </transition>
            <transition name="fade">
                <el-form-item v-show="checkedDatas.length>0">
                    <el-button size="medium" v-on:click="disable" icon="el-icon-close">禁用</el-button>
                </el-form-item>
            </transition>
            <transition name="fade">
                <el-form-item v-show="checkedDatas.length>0">
                    <el-button size="medium" type="danger" v-on:click="delBatch" icon="el-icon-delete">删除</el-button>
                </el-form-item>
            </transition>
        </el-form>
------------------------------------------------------------------------------------------------------
        列表部分：
        <default-page ref="table" url="/HeartbeatEntity/page" v-bind:post-data="postData" v-bind:ret-data.sync="retData" v-bind:reduce-height="120" v-bind:checked-datas.sync="checkedDatas"
            v-bind:show-checked="true" excel-title="测试数据.xlsx" export-url="/HeartbeatEntity/export">

                    <el-table-column prop="Id" label="主键id" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
                    <el-table-column prop="LastHeartbeatTime" label="最近一次的心跳时间" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
              
              
                    <el-table-column prop="RobotId" label="机器人id" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
              
			<el-table-column label="操作" fixed="right" width="170px">
              <template slot-scope="scope">
                <el-button size="small" type="primary" v-on:click="edit(scope.row.Id)">编辑</el-button>
                <el-button size="small" type="danger" v-on:click="del(scope.row.Id)">删除</el-button>
              </template>
            </el-table-column>
        </default-page>
------------------------------------------------------------------------------------------------------
		编辑部分：
		<el-dialog v-bind:title="(formData.Id===''?'新增':'编辑')+'***模块'" top="25px" width="300px"
			v-bind:visible.sync="editDialog"
			v-bind:modal-append-to-body="true"
			v-bind:append-to-body="true">
			<div style="width:100%;height:400px;overflow-y:auto;">
				<el-form ref="form" v-bind:model="formData" label-width="80px" v-on:keyup.enter.native="onSubmit">
				<div class="form-body">
							
									<el-form-item label="主键id">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_Id" v-model="formData.Id" placeholder="请填写主键id"></el-input>
									</el-form-item>			
									<el-form-item label="最近一次的心跳时间">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_LastHeartbeatTime" v-model="formData.LastHeartbeatTime" placeholder="请填写最近一次的心跳时间"></el-input>
									</el-form-item>			
									<el-form-item label="机器人id">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_RobotId" v-model="formData.RobotId" placeholder="请填写机器人id"></el-input>
									</el-form-item>
				</div>		
				  <el-form-item class="form-bottom">
					  <el-button type="primary" v-on:click="onSubmit">保存</el-button>
					  <el-button v-on:click="editDialog=false;">取消</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</el-dialog>
    -->
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  methods: {
    //删除一条数据
    del(key) {
      var thiz=this;
      this.$prompt('该信息删除后无法还原，是否确认删除？如果是请输入“确认删除”。', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^确认删除$/,
        inputErrorMessage: '请输入“确认删除”',
      }).then(({ value }) => {;
        thiz.$post(thiz.$store.state.PROXY+"/HeartbeatEntity/del", { id: key }, function(result) {
          thiz.$refs.table.refresh();
        });
      });
    }
  }
  /* 抄考代码
        数据部分（和列表部分配合使用）：
        data(){
            return {
		//仅用于存放新增表单、编辑表单的数据
		formData:{
					Id:'',LastHeartbeatTime:'',RobotId:'',
		},
		//仅用于存放查询参数的数据
                postData:{

					Id:'',
				
					LastHeartbeatTime:'',
				
					LastHeartbeatTimeStart:'',
				
					LastHeartbeatTimeEnd:'',
				
					RobotId:'',
				
					RobotIdLike:'',
				
		},
                retData:{},		//仅用于存放分页查询的返回结果
                checkedDatas:[],	//仅用于存放当前分页表格勾选项
				editDialog:false,	//编辑、新增表单的显示和隐藏
            };
        }
------------------------------------------------------------------------------------------------------
		mounted(){
			//校验
			this.$validator.localize('zh_CN',{
				custom:{
									'formData_Id':{
										required:'主键id不能为空',
										rangeLength:'主键id长度须在6-20个字符之间',
										between:'主键id的值须在6-20之间',
									},					'formData_LastHeartbeatTime':{
										required:'最近一次的心跳时间不能为空',
										rangeLength:'最近一次的心跳时间长度须在6-20个字符之间',
										between:'最近一次的心跳时间的值须在6-20之间',
									},					'formData_RobotId':{
										required:'机器人id不能为空',
										rangeLength:'机器人id长度须在6-20个字符之间',
										between:'机器人id的值须在6-20之间',
									},
				}
			});
		},
------------------------------------------------------------------------------------------------------
        methods:{
        
        导出excel
        
			exportExcel(command){
				this.$refs.table.export(command);
			}
			  保存表单
			 
			onSubmit(){
				//校验
				this.$validateForm(()=>{
					if(this.formData.Id===''){
						this.$post('/api/HeartbeatEntity/add',this.formData,function(result){
							if(result.code===0){
								this.editDialog=false;
								this.$refs.table.refresh();
							}
						});
					}else{
						this.$post('/api/HeartbeatEntity/edit',this.formData,function(result){
							if(result.code===0){
								this.editDialog=false;
								this.$refs.table.refresh();
							}
						});
					}
				});
			},
			
			  新增一条数据
			 
			add(){
				for(var key in this.formData){
					if(this.formData.hasOwnProperty(key)){
						this.formData[key]='';
					}
				}
				this.editDialog = true;
			},
			
			 编辑一条数据
			 
			edit(key){
				this.$get('/api/HeartbeatEntity/load',{Id:key},function(result){
					this.formData=result.data;
					this.editDialog = true;
				});
			},
			
			  删除一条数据
			 
			del(key){
				this.$post('/api/HeartbeatEntity/del',{ Id:key}, function(result){
					this.$refs.table.refresh();
				});
			},
			
			  点击启用触发
			 
			enable(){
				var postData={};
				var checkedDatas = this.checkedDatas;
				for(var i=0,len=checkedDatas.length;i<len;i++){
					postData['datas['+i+'].Id']=checkedDatas[i];
				}
				this.$post('/api/HeartbeatEntity/changeStatus',postData,function(result){
					this.$refs.table.refresh();
				});
			},
			
			 点击禁用触发
			 
			disable(){
				var postData={};
				var checkedDatas = this.checkedDatas;
				for(var i=0,len=checkedDatas.length;i<len;i++){
					postData['datas['+i+'].Id']=checkedDatas[i];
				}
				this.$post('/api/HeartbeatEntity/changeStatus',postData,function(result){
					this.$refs.table.refresh();
				});
			},
			
			点击删除用触发
			 
			delBatch(){
				var postData={};
				var checkedDatas = this.checkedDatas;
				for(var i=0,len=checkedDatas.length;i<len;i++){
					postData['datas['+i+'].Id']=checkedDatas[i];
				}
				this.$post('/api/HeartbeatEntity/delBatch',postData,function(result){
					this.$refs.table.refresh();
				});
			}
        }
    */
};
</script>