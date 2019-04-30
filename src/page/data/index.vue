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
        <userdetails></userdetails>
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
      userID: "",
      img: "",
      username: "",
      location: "",
      url: "",
      numberData: {}
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
            this.img = res.data.avatar_url;
            this.username = res.data.name;
            this.location = res.data.location;
            this.url = res.data.html_url;

            let repos = res.data.public_repos;
            let followers = res.data.followers;
            let following = res.data.following;
            let objNumber  = {
          	    	repos: repos,
          	    	followers: followers,
          	    	following: following
            }   
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
