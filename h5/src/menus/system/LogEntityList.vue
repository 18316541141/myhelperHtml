<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>系统日志</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-form v-bind:inline="true" v-bind:model="postData">
      <el-form-item>
        <el-form-item>
          <el-select
            size="medium"
            v-model="postData.Level"
            placeholder="日志等级"
            clearable
            style="width:120px;"
          >
            <el-option :key="0" :label="'INFO'" :value="'INFO'"></el-option>
            <el-option :key="1" :label="'WARN'" :value="'WARN'"></el-option>
            <el-option :key="2" :label="'ERROR'" :value="'ERROR'"></el-option>
            <el-option :key="3" :label="'FATAL'" :value="'FATAL'"></el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-input
          size="medium"
          v-model="postData.ThreadNoLike"
          placeholder="线程号"
          clearable
          style="width:100px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="medium" v-model="postData.MessageLike" placeholder="日志内容" style="width:150px;" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="medium" v-model="postData.ExceptionLike" placeholder="堆栈信息" style="width:150px;" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          size="medium"
          v-model="postData.ProjectNameLike"
          placeholder="日志发生的命名空间"
          clearable
          style="width:170px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          size="medium"
          v-model="postData.TypeNameLike"
          placeholder="日志发生的类"
          clearable
          style="width:150px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          size="medium"
          v-model="postData.FuncNameLike"
          placeholder="日志发生的方法名"
          clearable
          style="width:170px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          clearable
          size="medium"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="日志起始日期"
          v-model="postData.CreateDateStart"
          style="width:195px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          clearable
          size="medium"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="日志结束日期"
          v-model="postData.CreateDateEnd"
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
      url="/api/LogEntity/page"
      v-bind:post-data="postData"
      v-bind:ret-data.sync="retData"
      v-bind:reduce-height="120"
      excel-title="测试数据.xlsx"
      export-url="/api/LogEntity/export"
    >
      <el-table-column
        prop="CreateDate"
        label="日志日期"
        sortable="custom"
        v-bind:show-overflow-tooltip="true"
        width="150px"
      ></el-table-column>
      <el-table-column
        prop="Level"
        label="日志分级"
        v-bind:show-overflow-tooltip="true"
        width="100px"
      ></el-table-column>
      <el-table-column
        prop="ThreadNo"
        label="线程号"
        width="100px"
        v-bind:show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="Message"
        label="日志内容"
        v-bind:show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="Exception"
        label="堆栈信息"
        v-bind:show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="ProjectName"
        label="日志发生的项目名"
        v-bind:show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="TypeName"
        label="日志发生的类"
        v-bind:show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="FuncName"
        label="日志发生的方法名称"
        v-bind:show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-on:click="edit(scope.row.Id)">查看</el-button>
        </template>
      </el-table-column>
    </default-page>
    <el-dialog
      v-bind:title="'查看系统日志'"
      top="25px"
      width="720px"
      v-bind:visible.sync="editDialog"
      v-bind:modal-append-to-body="true"
      v-bind:append-to-body="true"
    >
      <div style="width:100%;height:730px;overflow-y:auto;">
        <el-form ref="form" v-bind:model="formData" label-width="80px">
          <div class="form-body">
            <el-form-item label="日志日期">
              <el-input
                v-validate="'required|rangeLength:6,20|between:6,20'"
                data-vv-name="formData_CreateDate"
                v-model="formData.CreateDate"
                placeholder="请填写日志日期"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="日志分级">
              <el-input
                v-validate="'required|rangeLength:6,20|between:6,20'"
                data-vv-name="formData_Level"
                v-model="formData.Level"
                placeholder="请填写日志分级"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="线程号">
              <el-input
                v-validate="'required|rangeLength:6,20|between:6,20'"
                data-vv-name="formData_ThreadNo"
                v-model="formData.ThreadNo"
                placeholder="请填写线程号"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input
                v-validate="'required|rangeLength:6,20|between:6,20'"
                data-vv-name="formData_ProjectName"
                v-model="formData.ProjectName"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="类">
              <el-input
                v-validate="'required|rangeLength:6,20|between:6,20'"
                data-vv-name="formData_TypeName"
                v-model="formData.TypeName"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="方法名称">
              <el-input
                v-validate="'required|rangeLength:6,20|between:6,20'"
                data-vv-name="formData_FuncName"
                v-model="formData.FuncName"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="日志内容">
              <el-input
                v-validate="'required|rangeLength:6,20|between:6,20'"
                data-vv-name="formData_Message"
                v-model="formData.Message"
                placeholder="请填写日志内容"
                resize="none"
                readonly
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="堆栈信息">
              <el-input
                v-validate="'required|rangeLength:6,20|between:6,20'"
                data-vv-name="formData_Exception"
                v-model="formData.Exception"
                resize="none"
                readonly
                type="textarea"
                :rows="8"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item class="form-bottom">
            <el-button v-on:click="editDialog=false;">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
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
		                <el-input size="medium" v-model="postData.LevelLike" placeholder="日志分级" clearable></el-input>
		            </el-form-item>            <el-form-item>
		                <el-input size="medium" v-model="postData.ThreadNoLike" placeholder="线程号" clearable></el-input>
		            </el-form-item>            <el-form-item>
		                <el-input size="medium" v-model="postData.MessageLike" placeholder="日志内容" clearable></el-input>
		            </el-form-item>            <el-form-item>
		                <el-input size="medium" v-model="postData.ProjectNameLike" placeholder="日志发生的命名空间" clearable></el-input>
		            </el-form-item>            <el-form-item>
		                <el-input size="medium" v-model="postData.TypeNameLike" placeholder="日志发生的类型" clearable></el-input>
		            </el-form-item>            <el-form-item>
		                <el-input size="medium" v-model="postData.FuncNameLike" placeholder="日志发生的方法名称" clearable></el-input>
		            </el-form-item>            <el-form-item>
		                <el-input size="medium" v-model="postData.USERNAMELike" placeholder="导致该日志的用户" clearable></el-input>
		            </el-form-item>
		            <el-form-item>
		                <el-input size="medium" v-model="postData.CreateDateStart" placeholder="日志日期" clearable></el-input>
		            </el-form-item>
		            <el-form-item>
		                <el-input size="medium" v-model="postData.CreateDateEnd" placeholder="日志日期" clearable></el-input>
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
        <default-page ref="table" url="/api/LogEntity/page" v-bind:post-data="postData" v-bind:ret-data.sync="retData" v-bind:reduce-height="120" v-bind:checked-datas.sync="checkedDatas"
            v-bind:show-checked="true" excel-title="测试数据.xlsx" export-url="/api/LogEntity/export">

                    <el-table-column prop="ID" label="主键id，由分布式雪花id生成" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
                    <el-table-column prop="CreateDate" label="日志日期" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
              
              
                    <el-table-column prop="Level" label="日志分级" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
              
                    <el-table-column prop="ThreadNo" label="线程号" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
              
                    <el-table-column prop="Message" label="日志内容" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
              
                    <el-table-column prop="ProjectName" label="日志发生的命名空间" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
              
                    <el-table-column prop="TypeName" label="日志发生的类型" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
              
                    <el-table-column prop="FuncName" label="日志发生的方法名称" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
              
                    <el-table-column prop="USERNAME" label="导致该日志的用户" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
              
              
			<el-table-column label="操作" fixed="right" width="170px">
              <template slot-scope="scope">
                <el-button size="small" type="primary" v-on:click="edit(scope.row.ID)">编辑</el-button>
                <el-button size="small" type="danger" v-on:click="del(scope.row.ID)">删除</el-button>
              </template>
            </el-table-column>
        </default-page>
------------------------------------------------------------------------------------------------------
		编辑部分：
		<el-dialog v-bind:title="(formData.ID===''?'新增':'编辑')+'***模块'" top="25px" width="300px"
			v-bind:visible.sync="editDialog"
			v-bind:modal-append-to-body="true"
			v-bind:append-to-body="true">
			<div style="width:100%;height:400px;overflow-y:auto;">
				<el-form ref="form" v-bind:model="formData" label-width="80px" v-on:keyup.enter.native="onSubmit">
				<div class="form-body">
							
									<el-form-item label="主键id，由分布式雪花id生成">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_ID" v-model="formData.ID" placeholder="请填写主键id，由分布式雪花id生成"></el-input>
									</el-form-item>			
									<el-form-item label="日志日期">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_CreateDate" v-model="formData.CreateDate" placeholder="请填写日志日期"></el-input>
									</el-form-item>			
									<el-form-item label="日志分级">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_Level" v-model="formData.Level" placeholder="请填写日志分级"></el-input>
									</el-form-item>			
									<el-form-item label="线程号">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_ThreadNo" v-model="formData.ThreadNo" placeholder="请填写线程号"></el-input>
									</el-form-item>			
									<el-form-item label="日志内容">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_Message" v-model="formData.Message" placeholder="请填写日志内容"></el-input>
									</el-form-item>			
									<el-form-item label="日志发生的命名空间">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_ProjectName" v-model="formData.ProjectName" placeholder="请填写日志发生的命名空间"></el-input>
									</el-form-item>			
									<el-form-item label="日志发生的类型">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_TypeName" v-model="formData.TypeName" placeholder="请填写日志发生的类型"></el-input>
									</el-form-item>			
									<el-form-item label="日志发生的方法名称">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_FuncName" v-model="formData.FuncName" placeholder="请填写日志发生的方法名称"></el-input>
									</el-form-item>			
									<el-form-item label="导致该日志的用户">
										<el-input v-validate="'required|rangeLength:6,20|between:6,20'" data-vv-name="formData_USERNAME" v-model="formData.USERNAME" placeholder="请填写导致该日志的用户"></el-input>
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
  //数据部分（和列表部分配合使用）：
  data() {
    return {
      //仅用于存放新增表单、编辑表单的数据
      formData: {
        Level: "",
        ThreadNo: "",
        Message: "",
        ProjectName: "",
        TypeName: "",
        FuncName: ""
      },
      //仅用于存放查询参数的数据
      postData: {
        CreateDateStart: this.$moment()
          .subtract("seconds", 1800)
          .format("YYYY-MM-DD HH:mm:ss"),
        CreateDateEnd: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
        Level: "",
        ThreadNoLike: "",
        MessageLike: "",
        ProjectNameLike: "",
        TypeNameLike: "",
        FuncNameLike: "",
        ExceptionLike: ""
      },
      retData: {}, //仅用于存放分页查询的返回结果
      checkedDatas: [], //仅用于存放当前分页表格勾选项
      editDialog: false //编辑、新增表单的显示和隐藏
    };
  },
  methods: {
    // 编辑一条数据
    edit(key) {
      this.$get("/api/LogEntity/load", { ID: key }, function(result) {
        this.formData = result.data;
        this.editDialog = true;
      });
    }
  }
  /* 抄考代码
------------------------------------------------------------------------------------------------------
		mounted(){
			//校验
			this.$validator.localize('zh_CN',{
				custom:{
									'formData_ID':{
										required:'主键id，由分布式雪花id生成不能为空',
										rangeLength:'主键id，由分布式雪花id生成长度须在6-20个字符之间',
										between:'主键id，由分布式雪花id生成的值须在6-20之间',
									},					'formData_CreateDate':{
										required:'日志日期不能为空',
										rangeLength:'日志日期长度须在6-20个字符之间',
										between:'日志日期的值须在6-20之间',
									},					'formData_Level':{
										required:'日志分级不能为空',
										rangeLength:'日志分级长度须在6-20个字符之间',
										between:'日志分级的值须在6-20之间',
									},					'formData_ThreadNo':{
										required:'线程号不能为空',
										rangeLength:'线程号长度须在6-20个字符之间',
										between:'线程号的值须在6-20之间',
									},					'formData_Message':{
										required:'日志内容不能为空',
										rangeLength:'日志内容长度须在6-20个字符之间',
										between:'日志内容的值须在6-20之间',
									},					'formData_ProjectName':{
										required:'日志发生的命名空间不能为空',
										rangeLength:'日志发生的命名空间长度须在6-20个字符之间',
										between:'日志发生的命名空间的值须在6-20之间',
									},					'formData_TypeName':{
										required:'日志发生的类型不能为空',
										rangeLength:'日志发生的类型长度须在6-20个字符之间',
										between:'日志发生的类型的值须在6-20之间',
									},					'formData_FuncName':{
										required:'日志发生的方法名称不能为空',
										rangeLength:'日志发生的方法名称长度须在6-20个字符之间',
										between:'日志发生的方法名称的值须在6-20之间',
									},					'formData_USERNAME':{
										required:'导致该日志的用户不能为空',
										rangeLength:'导致该日志的用户长度须在6-20个字符之间',
										between:'导致该日志的用户的值须在6-20之间',
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
					if(this.formData.ID===''){
						this.$post('/api/LogEntity/add',this.formData,function(result){
							if(result.code===0){
								this.editDialog=false;
								this.$refs.table.refresh();
							}
						});
					}else{
						this.$post('/api/LogEntity/edit',this.formData,function(result){
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
				this.$get('/api/LogEntity/load',{ID:key},function(result){
					this.formData=result.data;
					this.editDialog = true;
				});
			},
			
			  删除一条数据
			 
			del(key){
				this.$post('/api/LogEntity/del',{ ID:key}, function(result){
					this.$refs.table.refresh();
				});
			},
			
			  点击启用触发
			 
			enable(){
				var postData={};
				var checkedDatas = this.checkedDatas;
				for(var i=0,len=checkedDatas.length;i<len;i++){
					postData['datas['+i+'].ID']=checkedDatas[i];
				}
				this.$post('/api/LogEntity/changeStatus',postData,function(result){
					this.$refs.table.refresh();
				});
			},
			
			 点击禁用触发
			 
			disable(){
				var postData={};
				var checkedDatas = this.checkedDatas;
				for(var i=0,len=checkedDatas.length;i<len;i++){
					postData['datas['+i+'].ID']=checkedDatas[i];
				}
				this.$post('/api/LogEntity/changeStatus',postData,function(result){
					this.$refs.table.refresh();
				});
			},
			
			点击删除用触发
			 
			delBatch(){
				var postData={};
				var checkedDatas = this.checkedDatas;
				for(var i=0,len=checkedDatas.length;i<len;i++){
					postData['datas['+i+'].ID']=checkedDatas[i];
				}
				this.$post('/api/LogEntity/delBatch',postData,function(result){
					this.$refs.table.refresh();
				});
			}
        }
    */
};
</script>