<template>
  <div class="toast">
    <transition>
      <div class="toast_div" v-show="isShow">{{ message }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: "",
      flag: true,
    };
  },
  methods: {
    show(msg, duration = 2000) {
      if (this.flag) {
        this.flag = false;
        this.isShow = true;
        this.message = msg;
        setTimeout(() => {
          this.flag = true;
          this.isShow = false;
          this.message = "";
        }, duration);
      }
    },
  },
};
</script>
<style  scoped>
.toast_div {
  font-size: 0.8rem;
  text-align: center;
  line-height: 2rem;
  height: 2rem;
  width: 10rem;
  background-color: rgba(128, 128, 128, 0.9);
  border-radius: 0.4rem;
  border: 0.04rem solid rgba(0, 0, 0, 0.4);
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.toast-enter,
.toast-leave-to {
  opacity: 0;
}
.toast-enter-active {
  transition: opacity 1s;
}
.toast-leave-active {
  transition: opacity 1s;
}
</style>