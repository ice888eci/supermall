import { debounce } from "@/common/utils";
import BackTop from "@/components/content/backtop/BackTop.vue";
import { TOP_DISTANCE } from "@/common/const";
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

export const backTopMixins = {
    components: {
        BackTop
    },
    data() {
        return {
            isTopShow: false,
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scroll.scrollTo(0, 0, 1000);
        },
        back_top_show(positionY) {
            this.isTopShow = positionY > TOP_DISTANCE;
        },
    },
}