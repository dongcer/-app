<template>
    <div class="content" v-if="videos.length!=0">
        <mu-container ref="container" class="demo-loadmore-content">
            <mu-load-more @refresh="refresh($store.state.videotype)" :refreshing="refreshing">
                <div class="smallvideo" v-for="item in videos" :key="item.fileId" @click="goPlay(item)">
                    <mu-card-media sub-title="">
                        <img :src="item.imageUrl" alt="">
                    </mu-card-media>
                    <strong>{{item.fileName}}</strong>
                    <br>
                    <div class="just">
                        <span>时长：{{item.duration | toTime}}</span>
                        <!-- <mu-icon style="display:inline-block" value="more_vert" @click="operate"></mu-icon> -->
                    </div>
                </div>
            </mu-load-more>
        </mu-container>

    </div>
</template>
<script>
export default {
    name: "movies",
    data() {
        return {
            params: null,
            videos: [],
            refreshing: true
        };
    },
    filters: {
        toTime(s) {
            var t;
            if (s > -1) {
                var hour = Math.floor(s / 3600);
                var min = Math.floor(s / 60) % 60;
                var sec = s % 60;
                if (hour < 10) {
                    t = "0" + hour + ":";
                } else {
                    t = hour + ":";
                }

                if (min < 10) {
                    t += "0";
                }
                t += min + ":";
                if (sec < 10) {
                    t += "0";
                }
                t += sec;
            }
            return t;
        }
    },
    created() {
    },
    mounted() {
        this.refresh(this.$store.state.videotype);
    },
    methods: {
        refresh: function(item) {
            this.refreshing = true;
            // this.$refs.container.scrollTop = 0;
            this.getVideos(item);
        },
        getVideos: async function(item) {
            const url = this.global_.getApiConfig().getVideos;
            // console.log(this.global_.getApiConfig().getVideos);
            const data = await this.$http({
                url: url,
                method: "post",
                data: {
                    Action: "DescribeVodPlayInfo",
                    fileName: item
                },
                headers: {
                    url: "https://vod.api.qcloud.com/v2/index.php"
                }
            });
            this.refreshing = false;
            if (data.data.errno === 0) {
                this.videos = data.data.data.fileSet;
                return true;
            } else {
                return false;
            }
        },
        operate() {
            alert("你不能操作！");
        },
        goPlay(item) {
            this.$router.push({
                name: "videoPlay",
                params: item
            });
        }
    }
};
</script>
<style scoped>
strong,
span {
    margin-left: 10px;
}
span {
    font-size: 24dp;
}
.just {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.mu-card-media-title {
    padding: 0;
}
</style>


