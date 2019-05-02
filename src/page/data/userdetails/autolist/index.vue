<template>
  <div class="autolist">
    <el-table>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "autolist",
  props: {
    url: String
  },
  created() {},
  methods: {
    getRepoInfo(url) {
      let self = this;
      console.log(this.url);
      this.$axios
        .get(url)
        .then(response => {
          let res = JSON.parse(JSON.stringify(response));
          if (res.status == 200) {
            console.log(res);
          }
          return;
        })
        .catch(err => {
          console.log(err.message);
          this.$message.error("拉取仓库数据遇到错误");
        });
    }
  },
  watch: {
    url(url) {
      if (url) {
        this.getRepoInfo(url);
      }
    }
  }
};
</script>

<style lang="scss">
@import "./index";
</style>
