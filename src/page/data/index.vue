<template>
  <div class="data-page">
    <transition name="el-fade-in-linear">
      <loading v-if="loadShow"></loading>
    </transition>
    <el-container>
      <div class="data-header">
        <userinfo :img="img" :username="username" :location="location" :url="url"></userinfo>
      </div>
      <div class="data-main">
        <transition name="el-zoom-in-top">
          <repoinfo :data="numberData"></repoinfo>
        </transition>
      </div>
      <div class="data-details">
        <userdetails :data="resData" :rurl="repos_url"></userdetails>
      </div>
    </el-container>
    <copyfooter/>
  </div>
</template>

<script>
import userinfo from "./userinfo";
import repoinfo from "./repoinfo";
import userdetails from "./userdetails";

export default {
  components: {
    userinfo,
    repoinfo,
    userdetails
  },
  data() {
    return {
      loadShow: false,
      resData: {},
      userID: "",
      img: "",
      username: "",
      location: "",
      url: "",
      numberData: {},
      resData: {},
      repos_url: ""
    };
  },
  created() {
    let ID = this.$route.params.id;
    this.getData(ID);
  },
  methods: {
    getData(ID) {
      let self = this;
      this.loadShow = true;
      this.$axios
        .get("https://api.github.com/users/" + ID)
        .then(response => {
          let res = JSON.parse(JSON.stringify(response));
          if (res.status == 200) {
            console.log(res);
            this.resData = res.data;
            this.repos_url = res.data.repos_url;
            this.img = res.data.avatar_url;
            this.username = res.data.name;
            this.location = res.data.location;
            this.url = res.data.html_url;

            let begin = res.data.created_at;
            let end = new Date();
            if (begin) {
              let datePart = begin.substring(0, 10);
              console.log(datePart);
              let sdate = datePart.split("-");
              begin = new Date(sdate[0], sdate[1] - 1, sdate[2]);
            }
            let days = parseInt((end - begin) / (24 * 60 * 60 * 1000));
            console.log(days);
            let objNumber = {
              days: days,
              repos: res.data.public_repos,
              followers: res.data.followers,
              following: res.data.following
            };
            this.numberData = objNumber;
            this.loadShow = false;
          }
          return;
        })
        .catch(err => {
          console.log(err.message);
          this.loadShow = false;
          this.$message.error("拉取数据遇到错误");
        });
    }
  }
};
</script>

<style lang="scss">
@import "./index";
</style>
