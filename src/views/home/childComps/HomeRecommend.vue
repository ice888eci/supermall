<template>
  <div class="home-recommend">
    <section v-for="item in recommend" :key="item.sort">
      <img :src="item.image" />
      <p>{{ item.title }}</p>
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
}
section {
  padding: 10px;
  flex: 1;
  border-bottom: 8px solid #eee;
}
section > p {
  text-align: center;
  font-size: 1rem;
}
section img {
  width: 100%;
}
</style>
