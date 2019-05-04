<template>
  <div class="autolist">
    <el-table height="380" :data="tableData" :highlight-current-row="false" :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column prop="date" label="时间" width="140" sortable></el-table-column>
      <el-table-column prop="repo" label="仓库" width="140" sortable></el-table-column>
      <el-table-column prop="event" label="操作" width="100" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "autolist",
  props: {
    url: String
  },
  data() {
    return {
      tableData: []
    };
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
            for (let i = 0; i < res.data.length; i++) {
              let objE = {
                date: res.data[i].created_at,
                repo: res.data[i].repo.name,
                event: res.data[i].type
              };
              this.tableData.push(objE);
            }
            console.log(this.tableData);
          }
          return;
        })
        .catch(err => {
          console.log(err.message);
          this.$message.error("拉取仓库动态遇到错误");
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
