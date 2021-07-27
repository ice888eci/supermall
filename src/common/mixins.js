import { debounce } from "@/common/utils";
export const busMixins = {
    data() {
        return {
            busHandle: null,
        }
    },
    mounted() {
        // 挂载后 图片load加载就会监听到并防抖节流函数
        this.busHandle = () => {
            if (this.$refs.scroll) {
                debounce(this.$refs.scroll.refresh, 200).call(this);
            }
        };
        this.$bus.$on("imgLoad", this.busHandle);
    },
}