<template>
    <div>
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left" @click="$router.push({name:'video'})">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            查看评论
        </mu-appbar>
        <mu-list textline="two-line">
            <div v-for="(item ,key) in comment" :key="key">
                <mu-list-item avatar :ripple="false" button>
                    <mu-list-item-content>
                        <mu-list-item-title>{{item.senduserdata[0].user_name}}</mu-list-item-title>
                        <!-- <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)">Brunch this weekend?</mu-list-item-sub-title> -->
                        <mu-list-item-sub-title>
                            {{item.send_content}}
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                    <!-- <mu-list-item-action>
                        <mu-list-item-after-text>15 min</mu-list-item-after-text>
                        <mu-checkbox color="yellow700" v-model="selects" value="value1" uncheck-icon="star_border" checked-icon="star"></mu-checkbox>
                    </mu-list-item-action> -->
                </mu-list-item>
                <mu-divider></mu-divider>
            </div>

        </mu-list>

    </div>
</template>
<script>
export default {
    data() {
        return {
            selects: [],
            comment: [],
            userdata: {}
        };
    },
    created() {
        this.userdata = JSON.parse(localStorage.getItem("vueuser"));
        this.getComment();
    },
    methods: {
        async getComment() {
            const data = await this.$http({
                url: this.global_.getApiConfig().getComment,
                method: "post",
                data: {
                    id: this.userdata._id
                }
            });
            if (data.data.errno === 0) {
                this.comment = data.data.data;
            }
        }
    }
};
</script>
<style>
.demo-list-wrap {
    width: 100%;
    max-width: 360px;
    overflow: hidden;
}
</style>