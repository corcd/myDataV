<template>
  <div class="fullscreen">
    <el-row>
      <el-col :span="8">
        <button class="red"></button>
      </el-col>
      <el-col :span="8">
        <button class="yellow"></button>
      </el-col>
      <el-col :span="8">
        <button class="green"></button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "fullscreen"
};
</script>

<style lang="scss">
@import "./index";
</style>
