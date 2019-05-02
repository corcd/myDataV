<template>
  <el-row class="userdetails">
    <el-col :span="8" class="lang">
      <ve-ring :data="languageData" :settings="chartSettings" :extend="chartExtend" :loading="loading"></ve-ring>
    </el-col>
    <el-col :span="8" class="repo">
      <repolist></repolist>
    </el-col>
    <el-col :span="8" class="auto">
      <autolist></autolist>
    </el-col>
  </el-row>
</template>

<script>
import langlist from "./langlist";
import repolist from "./repolist";
import autolist from "./autolist";

export default {
  components: {
    langlist,
    repolist,
    autolist
  },
  name: "userdetails",
  props: {
    data: Object,
    rurl: String
  },
  data() {
    this.chartSettings = {
      roseType: "radius",
      selectedMode: "single",
      hoverAnimation: false
    };
    this.chartExtend = {
      legend: {
        textStyle: { color: "#FFFFFF" }
      },
      grid: {
        textStyle: { color: "#FFFFFF" }
      },
      xAxis: { axisLabel: { color: "#FFFFFF" } },
      yAxis: { axisLabel: { color: "#FFFFFF" } },
      series: {
        label: { show: true, position: "top" },
        radius: ["0", "40%"],
        center: ["50%", "50%"]
      },
      series(v) {
        v.forEach(i => {
          i.barWidth = 10;
        });
        return v;
      }
    };
    return {
      languageData: {
        columns: ["lang", "sum"],
        rows: []
      },
      loading: true
    };
  },
  created() {},
  mounted() {},
  methods: {
    getRepoInfo(url) {
      let self = this;
      console.log(url);
      this.$axios
        .get(url)
        .then(response => {
          let res = JSON.parse(JSON.stringify(response));
          if (res.status == 200) {
            if (res.data) {
              let rowData = [];
              let languages = {};
              for (let i = 0; i < res.data.length; i++) {
                let langData = res.data[i].language;
                if (langData) {
                  if (langData in languages) {
                    languages[langData]++;
                  } else {
                    languages[langData] = 1;
                  }
                }
              }
              let objL = JSON.parse(JSON.stringify(languages));
              let dataL = [];
              for (let key in objL) {
                dataL.push({ lang: key, sum: objL[key] });
              }
              this.languageData.rows = dataL;
              console.log(this.languageData);
            } else {
              //无数据
            }
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
    rurl(rurl) {
      if (rurl) {
        this.getRepoInfo(rurl);
      }
    }
  }
};
</script>

<style lang="scss">
@import "./index";
</style>
