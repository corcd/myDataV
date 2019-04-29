<template>
  <div class="app-page">
    <el-container>
      <el-row class="data-address">
          <h1>我的数据可视化系统</h1>
          <p>从输入的网站获取 JSON 格式数据信息，并将其数据可视化</p>
          <el-row>
            <el-col :span="16">
              <el-input v-model="address" :plain="true" placeholder="请输入数据地址"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button :span="8" type="primary" @click="getdata(address)">获取数据</el-button>
            </el-col>
          </el-row>
      </el-row>
    </el-container>
    <footer>
        <div class="copy-info">
          <h3>@copyright 2019</h3>
        </div>
      </footer>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      address: ""
    };
  },
  created() {},
  methods: {
    getdata(address) {
      let URLaddress = this.address;
      let self = this;
      if (address.length > 0) {
        this.$axios
          .get(address)
          .then(response => {
            let res = JSON.parse(response);
            return;
          })
          .catch(err => {
            console.log(err.message);
          });
      } else {
        this.$message.error("数据地址不能为空");
      }
    }
  }
};
</script>

<style lang="scss">
@import "./index";
</style>

