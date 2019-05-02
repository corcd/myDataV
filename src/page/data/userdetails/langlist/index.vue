<template>
  <div class="langlist">
    <ve-ring :data="data" :settings="chartSettings" :extend="chartExtend" :loading="loading"></ve-ring>
  </div>
</template>

<script>
export default {
  name: "langlist",
  props: {
    data: Object
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
      loading: true
    };
  },
  created() {},
  methods: {},
  watch: {}
};
</script>

<style lang="scss">
@import "./index";
</style>
