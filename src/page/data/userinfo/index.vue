<template>
  <div class="userinfo">
    <img :src="img" @click="linkToGithub(url)">
    <p class="username" @click="linkToGithub(url)">{{username}}</p>
    <p class="location">{{location}}</p>
  </div>
</template>

<script>
export default {
  name: "userinfo",
  props: {
    img: String,
    username: String,
    location: String,
    url: String
  },
  created() {},
  methods: {
    linkToGithub(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style lang="scss">
@import "./index";
</style>
