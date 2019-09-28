<template>
  <div v-bind:id="'imgViewer'+id">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$UUID(),
      viewerList: []
    };
  },
  methods: {
    render() {
      var thiz = this;
      setTimeout(function() {
        for (var i = 0, len = thiz.viewerList.length; i < len; i++) {
          thiz.viewerList[i].destroy();
        }
        thiz.viewerList.length = 0;
        thiz.viewerList[thiz.viewerList.length] = new Viewer(
          document.getElementById("imgViewer" + thiz.id),
          {
            url: "data-original"
          }
        );
      }, 1000);
    }
  }
};
</script>