<template>
  <div class="home-recommend">
    <section v-for="item in recommend" :key="item.sort">
      <img :src="item.image" />
      <span>{{ item.title }}</span>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    recommend: {
      type: Array,
      require: true,
    },
  },
};
</script>
<style  scoped>
.home-recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 5px;
}
section {
  padding: 10px;
  flex: 1;
  border-bottom: 8px solid #eee;
  font-size: 9px;
}
section > span {
  text-align: center;
}
section img {
  width: 100%;
}
</style>
