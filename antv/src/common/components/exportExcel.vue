<template>
  <div>
    <form method="post" :action="exportAction" style="display:none;" target="_blank" ref="form">
      <input type="hidden" v-for="(value,key) in tempParams" :name="key" :value="value" :key="key" />
    </form>
    <a-button icon="download" :loading="loading" @click="download">
      <span v-if="loading">获取导出数据...</span>
      <span v-else>{{_btnDesc}}</span>
    </a-button>
    <a-modal
      :title="_exportName"
      :visible="visible"
      :footer="null"
      :maskClosable="false"
      :destroyOnClose="true"
      @cancel="visible = false"
      :centered="true"
    >
      <div style="overflow-y:auto;max-height:400px;">
        <a-list item-layout="horizontal" :data-source="dataSource">
          <a-list-item slot="renderItem" slot-scope="item,index">
            <a slot="actions" href="javascript:void(0);" @click="exportExcel(item.exportIndex)">导出</a>
            <a-list-item-meta
              :description="'点击“导出”后导出第'+(index*_exportSize+1)+'-' +((index+1)*_exportSize)+'条数据'"
            >
              <a slot="title" href="javascript:void(0);">{{ item.name }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </a-modal>
  </div>
</template>
<script>
/**
 * excel导出组件
 */
export default {
  /**
   * 组件参数
   * @param {*} btnDesc 导出按钮描述内容
   * @param {*} searchParams 导出时使用的筛选条件
   * @param {*} countAction 获取导出数据表的总数据量action
   * @param {*} exportAction 导出excel的action
   * @param {*} exportSize 最大导出的数据条数
   * @param {*} exportName 导出的文件名称
   */
  props: [
    "btnDesc",
    "searchParams",
    "countAction",
    "exportAction",
    "exportSize",
    "exportName",
  ],
  computed: {
    _btnDesc() {
      return this.btnDesc ? this.btnDesc : "导出excel";
    },
    _exportSize() {
      return this.exportSize ? this.exportSize : 10000;
    },
    _exportName() {
      return this.exportName ? this.exportName : "excel文件";
    },
  },
  data() {
    return {
      loading: false,
      totalCount: 0,
      visible: false,
      dataSource: [],
      tempParams: {},
    };
  },
  methods: {
    exportExcel(exportIndex) {
      var vm = this;
      var tempParams = {
        exportIndex: exportIndex,
        exportSize: vm.exportSize,
        fileName: vm._exportName + exportIndex + ".xlsx",
      };
      for (var key in vm.searchParams) {
        if (Object.prototype.hasOwnProperty.call(vm.searchParams, key)) {
          tempParams[key] = vm.searchParams[key];
        }
      }
      vm.tempParams = tempParams;
      vm.$nextTick(function () {
        vm.$refs.form.submit();
      });
    },
    download() {
      var vm = this;
      vm.loading = true;
      vm.$fetch(vm.countAction, { params: vm.searchParams }).then((res) => {
        vm.loading = false;
        vm.totalCount = res.totalCount;
        if (vm.totalCount > vm._exportSize) {
          var rest = vm.totalCount % vm._exportSize;
          var fileCount = (vm.totalCount - rest) / vm._exportSize + 1;
          vm.dataSource = [];
          for (var i = 0; i < fileCount; i++) {
            vm.dataSource.push({
              name: vm._exportName + (i + 1) + ".xlsx",
              exportIndex: i + 1,
            });
          }
          vm.visible = true;
        } else {
          var tempParams = {
            exportIndex: 1,
            exportSize: vm._exportSize,
            fileName: vm._exportName + ".xlsx",
          };
          for (var key in vm.searchParams) {
            if (Object.prototype.hasOwnProperty.call(vm.searchParams, key)) {
              tempParams[key] = vm.searchParams[key];
            }
          }
          vm.tempParams = tempParams;
          vm.$nextTick(function () {
            vm.$refs.form.submit();
          });
        }
      });
    },
  },
};
</script>