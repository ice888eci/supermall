<template>
  <div class="param-info" v-if="Object.keys(paramsInfo).length !== 0">
    <table name="info-size">
      <tr v-for="(list, x) in paramsInfo.sizes" :key="x">
        <td v-for="(item, y) in list" :key="y">
          {{ item }}
        </td>
      </tr>
    </table>

    <table>
      <tr v-for="(info, index) in paramsInfo.infos" :key="index">
        <td class="info-param-key">{{ info.key }}</td>
        <td class="param-value">{{ info.value }}</td>
      </tr>
    </table>

    <section class="info-img" v-if="paramsInfo.image.length !== 0">
      <img :src="paramsInfo.image" />
    </section>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style  scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.param-info table {
  width: 100%;
  border-collapse: collapse;
}

.param-info table tr {
  display: flex;
  height: 42px;
}

.param-info table tr td {
  flex: 1;
  line-height: 42px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}

.info-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.param-value {
  color: #eb4868;
}

.info-img img {
  width: 100%;
}
</style>