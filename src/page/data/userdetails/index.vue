<template>
  <el-row class="userdetails">
    <el-col :span="8" class="lang">
      <ve-ring
        :data="languageData"
        :settings="langChartSettings"
        :extend="langChartExtend"
        :loading="loading"
      ></ve-ring>
    </el-col>
    <el-col :span="8" class="repo">
      <ve-histogram
        :data="repoData"
        :settings="repoChartSettings"
        :extend="repoChartExtend"
        :loading="loading"
      ></ve-histogram>
    </el-col>
    <el-col :span="8" class="auto">
      <autolist :url="message_url"></autolist>
    </el-col>
  </el-row>
</template>

<script>
import autolist from "./autolist";

export default {
  components: {
    autolist
  },
  name: "userdetails",
  props: {
    eurl: String,
    rurl: String
  },
  data() {
    this.langChartSettings = {
      roseType: "radius",
      selectedMode: "single",
      hoverAnimation: true
    };
    this.repoChartSettings = {
      metrics: ["stars", "commits"],
      dimension: ["repo"]
    };
    this.langChartExtend = {
      series: {
        radius: ["0", "40%"],
        center: ["50%", "50%"],
        label: {
          formatter: "{b} {d}"
        }
      },
      title: {
        text: "语言分布",
        textStyle: { color: "#FFFFFF" }
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        width: 250,
        textStyle: { color: "#FFFFFF" }
      },
      grid: {
        textStyle: { color: "#FFFFFF" }
      }
    };
    this.repoChartExtend = {
      color: ["#C23431", "#1BD4AE"],
      series: {
        type: "bar",
        label: {
          normal: {
            show: true,
            //rotate: 90,
            fontsize: 12,
            color: "#FFFFFF",
            align: "center",
            verticalAlign: "middle",
            position: "top",
            //formatter: "{a} : {c}",
            distance: 15
          }
        },
        itemStyle: {
          //color: "#C23431"
        }
      },
      title: {
        text: "仓库数据",
        textStyle: { color: "#FFFFFF" }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        data: ["repo", "stars", "commits"],
        itemGap: 3,
        textStyle: { color: "#FFFFFF" }
      },
      grid: {
        top: "12%",
        left: "1%",
        right: "10%",
        containLabel: true,
        textStyle: { color: "#FFFFFF" }
      },
      calculable: true,
      xAxis: {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#FFFFFF"
          }
        },
        axisLabel: {
          show: true,
          interval: 0,
          rotate: 0,
          fontsize: 12,
          verticalAlign: "middle",
          textStyle: {
            color: "#FFFFFF"
          }
        }
      },
      yAxis: {
        position: "left",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#FFFFFF"
          }
        },
        axisLabel: { color: "#FFFFFF" },
        splitLine: {
          show: false
        }
      },
      dataZoom: [
        {
          show: true,
          showDataShadow: true,
          dataBackground: {
            lineStyle: {
              color: "#FFFFFF",
              width: 1
            },
            areaStyle: {
              color: "#FFFFFF"
            }
          },
          start: 0,
          end: 10,
          textStyle: {
            color: "#FFFFFF"
          }
        },
        {
          type: "inside",
          start: 50,
          end: 100
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: "empty",
          width: 15,
          height: "70%",
          showDataShadow: false,
          left: "93%",
          textStyle: {
            color: "#FFFFFF"
          }
        }
      ]
    };
    return {
      languageData: {
        columns: ["lang", "sum"],
        rows: []
      },
      repoData: {
        columns: ["repo", "stars", "commits"],
        rows: []
      },
      loading: true,
      message_url: ""
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
              console.log(res.data);
              let rowData = [];
              let languages = {};
              for (let i = 0; i < res.data.length; i++) {
                let reposName = res.data[i].name;
                let getStars = res.data[i].stargazers_count;
                let objR = {
                  repo: reposName,
                  stars: getStars,
                  commits: 1
                };
                rowData.push(objR);
                this.repoData.rows = rowData;

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
          this.$message.error("拉取语言数据遇到错误");
        });
    },
    getEventUrl(eurl) {
      this.message_url = eurl;
      return;
    }
  },
  watch: {
    rurl(rurl) {
      if (rurl) {
        this.getRepoInfo(rurl);
      }
    },
    eurl(eurl) {
      if (eurl) {
        this.getEventUrl(eurl);
      }
    }
  }
};
</script>

<style lang="scss">
@import "./index";
</style>
