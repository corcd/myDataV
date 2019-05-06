<template>
  <div class="app-page">
    <transition name="el-fade-in-linear">
      <loading v-if="loadShow"></loading>
    </transition>
    <div class="toolbar">
      <datatools :color="'#000000'"></datatools>
    </div>
    <el-container>
      <el-row class="data-user">
        <h1>Github 数据可视化系统</h1>
        <p>从目标用户 ID 获取相关数据信息，并将其数据可视化</p>
        <el-row>
          <el-col :span="20">
            <el-input v-model="userID" :plain="true" placeholder="请输入用户 ID" clearable></el-input>
          </el-col>
          <el-col :span="4">
            <el-button :span="8" type="primary" @click="getdata(userID)">获取数据</el-button>
          </el-col>
        </el-row>
      </el-row>
    </el-container>
    <copyfooter/>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loadShow: false,
      userID: ""
    };
  },
  created() {},
  methods: {
    getdata(userID) {
      let ID = this.userID;
      let self = this;
      if (ID.length > 0) {
        this.loadShow = true;
        this.$axios
          .get("https://api.github.com/users/" + ID)
          .then(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.status == 200) {
              this.$router.push({
                name: "data",
                params: { id: ID }
              });
            }
            return;
          })
          .catch(err => {
            console.log(err.message);
            this.loadShow = false;
            this.$message.error("没有 ID = " + ID + " 用户的相关信息");
          });
      } else {
        this.$message.error("ID 字段不能为空");
      }
    }
  }
};
</script>

<style lang="scss">
@import "./index";
</style>

