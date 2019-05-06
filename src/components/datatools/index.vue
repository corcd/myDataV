<template>
  <div class="datatools">
    <div class="btn-fs">
      <el-switch v-model="fsValue" active-color="#13ce66" @change="FullScreen()"></el-switch>
    </div>
    <div>
        <p class="btn-tips" :style="fontColor">FullScreen</p>
    </div>
    <div class="btn-github">
      <a :style="fontColor" href="https://github.com/corcd/myDataV">View in Github</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "datatools",
  props: {
    color: String
  },
  data() {
    return {
      fsValue: false,
      fontColor: {
        color: this.color + " !important"
      }
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
        this.fsValue = true;
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        this.fsValue = false;
      }
    }
  }
};
</script>


<style lang="scss">
@import "./index";
</style>
