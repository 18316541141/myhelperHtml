<template>
  <div>
    <a-modal
      title="导出excel列表"
      :visible="exportDialog"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="500px"
    >
      <a-table :dataSource="exportList">
        <a-table-column data-index="text" title="内容"></a-table-column>
        <a-table-column data-index="index" title="操作">
          <template slot-scope="scope">
            <a-button icon="download" @click="exportExcel(scope.row.index,scope.row.excelType)">导出</a-button>
          </template>
        </a-table-column>
      </a-table>
    </a-modal>
    <a-table
      :change="sortChange"
      :dataSource="retData_.data.pageDataList"
      :rowSelection="rowSelection"
      :pagination="pagination"
    >
      <slot></slot>
    </a-table>
  </div>
</template>
<script>
export default {
  props: [
    "url",
    "postData",
    "retData",
    "reduceHeight",
    "checkedDatas",
    "showChecked",
    "tableHeight",
    "excelTitle",
    "exportUrl",
    "exportCoolingTime"
  ],
  data() {
    return {
      exportList: [],
      exportDialog: false,
      tableHeight_:
        this.tableHeight === undefined
          ? window.innerHeight - 148 - this.reduceHeight + "px"
          : this.tableHeight,
      retData_: {
        data: {
          currentPageIndex: 1,
          totalItemCount: 0,
          totalPageCount: 0,
          pageSize: 20,
          pageDataList: []
        }
      },
      lastExportMillisecond: {},
      pagination: {
        current: 1,
        showSizeChanger: true,
        pageSizeOptions: ["20", "40", "60", "80", "100"],
        pageSize: 20,
        total: 0,
        change(page, pageSize) {
          this.retData_.data.currentPageIndex = page;
          this.search();
        },
        showSizeChange(current, size) {
          this.retData_.data.pageSize = size;
          this.search();
        }
      }
    };
  },
  methods: {
    exportExcel(currentPageIndex, excelType) {
      var exportCoolingTime = this.exportCoolingTime;
      if (this.exportCoolingTime !== undefined) {
        if (this.lastExportMillisecond.hasOwnProperty(this.exportUrl)) {
          if (
            new Date().getTime() - this.lastExportMillisecond[this.exportUrl] <=
            exportCoolingTime
          ) {
            this.$message.warning(
              "禁止频繁导出，" +
                parseInt(exportCoolingTime / 1000) +
                "秒内只能导出一次。"
            );
            return;
          }
        }
      }
      this.lastExportMillisecond[this.exportUrl] = new Date().getTime();
      this.postData.currentPageIndex = currentPageIndex;
      this.postData.pageSize = 10000;
      this.postData.excelType = excelType;
      postOpenWin(this.exportUrl, this.postData);
    },
    export(excelType) {
      var totalItemCount = this.retData_.data.totalItemCount;
      if (totalItemCount <= 10000) {
        this.exportExcel(1, excelType);
      } else {
        this.exportList.splice(0);
        var exportLen = (totalItemCount - (totalItemCount % 10000)) / 10000 + 1;
        for (var i = 0; i < exportLen; i++) {
          this.exportList.push({
            text:
              "“" +
              this.excelTitle +
              "”第" +
              (i * 10000 + 1) +
              "-" +
              Math.min((i + 1) * 10000, totalItemCount) +
              "条数据",
            index: i,
            excelType: excelType
          });
        }
        this.exportDialog = true;
      }
    },
    /**
     * 排序变化监听
     * @param {*} pagination
     * @param {*} filters
     * @param {*} sorter
     */
    sortChange(pagination, filters, sorter) {
      debugger;
      for (var key in this.postData) {
        if (this.postData.hasOwnProperty(key) && key.indexOf("orderBy") === 0) {
          this.postData[key] = false;
        }
      }
      if (sortObj.order === "descending") {
        this.postData["orderByDesc." + sortObj.prop] = true;
      } else if (sortObj.order === "ascending") {
        this.postData["orderByAsc." + sortObj.prop] = true;
      }
      this.search();
    },
    /**
     * 查询列表
     * @param {*} loadAni 刷新时是否显示加载动画，默认是显示
     */
    search(loadAni) {
      if (loadAni === undefined) {
        loadAni = true;
      }
      this.postData.currentPageIndex = this.retData_.data.currentPageIndex;
      this.postData.pageSize = this.retData_.data.pageSize;
      this.$post(
        this.url,
        this.postData,
        function(result) {
          if (result.code === 0) {
            this.retData_ = result;
            this.$emit("update:retData", result);
            this.$emit("finish", result);
            if (this.tableHeight === undefined) {
              this.tableHeight_ =
                window.innerHeight - 148 - this.reduceHeight + "px";
            }
          }
        },
        loadAni
      );
    }
  },
  computed: {
    rowSelection() {
      return this.showChecked
        ? {
            fixed: true,
            onChange(selectedRowKeys, selectedRows) {
              this.$emit("update:checkedDatas", selectedRows);
            }
          }
        : null;
    }
  }
};
</script>