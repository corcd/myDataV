<template>
  <div class="card">
    <el-card shadow="always">
      <h3>{{title}}</h3>
      <h5>{{sum}}</h5>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    title: String,
    sum: Number
  },
  created() {}
};
</script>

<style lang="scss">
@import "./index";
</style>