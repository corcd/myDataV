<template>
  <div class="datatools">
    <div class="btn-fs">
      <el-switch v-model="fsValue" active-text="全屏" active-color="#13ce66" @change="FullScreen()"></el-switch>
    </div>
    <div class="btn-github">
      <a href="https://github.com/corcd/myDataV">View in Github</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "datatools",
  data() {
    return {
      fsValue: false
    };
  },
  methods: {
    FullScreen() {
      if (
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    }
  }
};
</script>


<style lang="scss">
@import "./index";
</style>
