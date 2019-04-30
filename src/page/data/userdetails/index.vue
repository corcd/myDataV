<template>
  <el-row class="userdetails">
    <el-col :span="8" class="langdata">
      <ve-ring :data="chartData1" :settings="chartSettings1"></ve-ring>
    </el-col>
    <el-col :span="8" class>
      <ve-histogram :data="chartData2" :settings="chartSettings2"></ve-histogram>
    </el-col>
    <el-col :span="8" class></el-col>
  </el-row>
</template>

<script>
export default {
  name: "userdetails",
  props: {
    langData: Array,
    repoData: Array
  },
  data() {
    this.chartSettings1 = {
      roseType: "radius"
    };
    this.chartSettings2 = {
      metrics: ["访问用户", "下单用户"],
      dimension: ["日期"]
    };
    return {
      chartData1: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      },
      chartData2: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss">
@import "./index";
</style>
