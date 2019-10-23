<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>系统全局变量</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-form ref="form" v-bind:model="formData" label-width="80px" @keyup.enter.native="save">
      <div
        class="global-variable-scroll"
        :style="{'maxHeight':formMaxHeight+'px'}"
        style="overflow-y: auto;"
      >
        <template v-for="(globalVariable,index) in formData.globalVariableList">
          <el-form-item :label="'变量'+(index+1)" :key="''+index">
            <el-input
              v-validate="'required|max:30'"
              :data-vv-name="'varName'+index"
              v-model="globalVariable.varName"
              :placeholder="'变量名'+(index+1)"
              style="width:200px;margin-right:10px;"
            ></el-input>
            <el-input
              v-validate="'required|max:50'"
              :data-vv-name="'varValue'+index"
              v-model="globalVariable.varValue"
              :placeholder="'变量值'+(index+1)"
              style="width:250px;margin-right:10px;"
            ></el-input>
            <el-button
              v-if="formData.globalVariableList.length>1"
              @click="del(index)"
              type="danger"
              icon="el-icon-delete"
            >删除</el-button>
          </el-form-item>
          <el-form-item :label="'备注'+(index+1)" :key="'-'+index">
            <el-input
              style="width:460px;"
              type="textarea"
              v-validate="'max:200'"
              :data-vv-name="'varRemark'+index"
              v-model="globalVariable.varRemark"
              :placeholder="'变量备注'+(index+1)"
              resize="none"
              :rows="4"
            ></el-input>
          </el-form-item>
        </template>
      </div>
      <el-form-item>
        <el-button @click="add" icon="el-icon-plus">新增</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formMaxHeight: window.innerHeight - 235,
      formData: {
        globalVariableList: [{ varName: "", varValue: "", varRemark: "" }]
      },
      custom: {
        varName0: {
          required: "变量名1不能为空",
          max: "变量名1长度不能大于30个字符"
        },
        varValue0: {
          required: "变量值1不能为空",
          max: "变量值1长度不能大于50个字符"
        },
        varRemark0: {
          max: "变量备注1长度不能大于200个字符"
        }
      }
    };
  },
  methods: {
    save() {
      this.$validateForm(function() {
        var postData = {};
        var globalVariableList = this.formData.globalVariableList;
        for (var i = 0, len = globalVariableList.length; i < len; i++) {
          postData["globalVariableList[" + i + "].varName"] =
            globalVariableList[i].varName;
          postData["globalVariableList[" + i + "].varValue"] =
            globalVariableList[i].varValue;
          postData["globalVariableList[" + i + "].varRemark"] =
            globalVariableList[i].varRemark;
        }
        this.$post(
          this.$store.state.PROXY + "/GlobalVariable/saveAllGlobalVariable",
          postData
        );
      });
    },
    add() {
      this.formData.globalVariableList.push({
        varName: "",
        varValue: "",
        varRemark: ""
      });
      var index = this.formData.globalVariableList.length - 1;
      this.custom["varName" + index] = {
        required: "变量名" + (index + 1) + "不能为空",
        max: "变量名" + (index + 1) + "长度不能大于30个字符"
      };
      this.custom["varValue" + index] = {
        required: "变量值" + (index + 1) + "不能为空",
        max: "变量值" + (index + 1) + "长度不能大于50个字符"
      };
      this.custom["varRemark" + index] = {
        max: "变量备注" + (index + 1) + "长度不能大于200个字符"
      };
      this.$validator.localize("zh_CN", { custom: this.custom });
      setTimeout(function() {
        var scroll = document.querySelector(".global-variable-scroll");
        scroll.scrollTop = scroll.scrollHeight;
      }, 0);
    },
    del(index) {
      this.formData.globalVariableList.splice(index, 1);
      var index = this.formData.globalVariableList.length;
      delete this.custom["varName" + index];
      delete this.custom["varValue" + index];
      delete this.custom["varRemark" + index];
      this.$validator.localize("zh_CN", { custom: this.custom });
    }
  },
  mounted() {
    this.$validator.localize("zh_CN", { custom: this.custom });
    this.$get(
      this.$store.state.PROXY + "/GlobalVariable/showAllGlobalVariable",
      function(result) {
        if (result.code === 0) {
          this.formData.globalVariableList.splice(0);
          if (result.data.length === 0) {
            this.formData.globalVariableList.push({
              varName: "",
              varValue: "",
              varRemark: ""
            });
          } else {
            this.formData.globalVariableList.push(...result.data);
          }
          this.custom = {};
          for (
            var i = 0, len = this.formData.globalVariableList.length;
            i < len;
            i++
          ) {
            this.custom["varName" + i] = {
              required: "变量名" + (i + 1) + "不能为空",
              max: "变量名" + (i + 1) + "长度不能大于30个字符"
            };
            this.custom["varValue" + i] = {
              required: "变量值" + (i + 1) + "不能为空",
              max: "变量值" + (i + 1) + "长度不能大于50个字符"
            };
            this.custom["varRemark" + i] = {
              max: "变量备注" + (i + 1) + "长度不能大于200个字符"
            };
          }
          this.$validator.localize("zh_CN", { custom: this.custom });
        }
      }
    );
  }
};
</script>