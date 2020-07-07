<template>
  <div>
    <a-auto-complete
      :data-source="dataSource"
      @change="change"
      autocomplete="off"
      :placeholder="placeholder"
      :value="value"
      :defaultValue="defaultValue"
      :allowClear="allowClear"
    />
  </div>
</template>
<script>
/**
 * 自定义的邮箱输入框
 */
export default {
  /**
   * 组件参数
   * @param {*} placeholder 输入框为空时显示的提示
   * @param {*} defaultValue 输入框默认内容
   * @param {*} value 输入框内容
   * @param {*} allowClear 可以点击清除图标删除内容
   */
  props: ["placeholder", "defaultValue", "value", "allowClear"],
  data() {
    return {
      dataSource: [],
      //常见的邮箱后缀，可以根据实际需求进行顺序调整
      emailSuffix: [
        "@qq.com",
        "@foxmail.com",
        "@gmail.com",
        "@163.com",
        "@126.com",
        "@236.com",
        "@sina.com",
        "@vip.sina.com",
        "@yeah.net",
        "@hotmail.com",
        "@gmail.com",
        "@yahoo.com",
        "@msn.com",
        "@aol.com"
      ]
    };
  },
  methods: {
    change(value) {
      this.$emit("change", value);
      var dataSource = [];
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        value.replace(/^\s+$/, "") === ""
      ) {
        this.dataSource = dataSource;
        return;
      }
      var atIndex = value.indexOf("@");
      var emailSuffix = this.emailSuffix;
      var i, len;
      if (atIndex > -1) {
        var prefix = value.substring(atIndex);
        for (
          i = 0, len = emailSuffix.length;
          i < len || dataSource.length === 10;
          i++
        ) {
          if (emailSuffix[i].startsWith(prefix)) {
            dataSource[dataSource.length] =
              value.substring(0, atIndex) + emailSuffix[i];
          }
        }
      } else {
        for (i = 0; i < 10; i++) {
          dataSource[dataSource.length] = value + emailSuffix[i];
        }
      }
      this.dataSource = dataSource;
    }
  }
};
</script>