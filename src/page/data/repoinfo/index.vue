<template>
  <div class="repoinfo">
    <el-row>
      <el-col :span="6">
        <card title="时长" :sum="data.days"></card>
      </el-col>
      <el-col :span="6">
        <card title="仓库" :sum="data.repos"></card>
      </el-col>
      <el-col :span="6">
        <card title="粉丝" :sum="data.followers"></card>
      </el-col>
      <el-col :span="6">
        <card title="跟随" :sum="data.following"></card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "repoinfo",
  props: {
    data: Object
  },
  data() {
    return {
      days: 0
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss">
@import "./index";
</style>
