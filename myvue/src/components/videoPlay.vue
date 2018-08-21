<template>
    <div>
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left" @click="$router.back(-1)">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            <span>{{params.fileName}}</span>
        </mu-appbar>
        <div class="sticky">
            <video class="player-size tcplayer" id="video" src="" controls="" x5-playsinline="" playsinline="" webkit-playsinline="" poster="" preload="auto">
            </video>
            <div ref="refOffset" id="refOffset"></div>
            <mu-tabs :value.sync="active1" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" full-width>
                <mu-tab>简介</mu-tab>
                <mu-tab>评论</mu-tab>
            </mu-tabs>
        </div>
        <!-- 模态框 -->
        <div>
            <modeldialog ref="child" :evaluateid.sync="evaluateid" :cssstyle.sync="cssstyle" :show.sync="isShowLog" v-on:touser="touser" v-on:changeshow="onResultChange"></modeldialog>

            <!-- <button @click="isShowLog=true">ww</button> -->
        </div>
        <mu-container>
            <div class="demo-text" v-if="active1 === 0">
                <div>
                    <h3>{{params.fileName}}</h3>
                    <p v-if="getDetailData!==null">{{(getDetailData.updateTime)*1000 | formatDate}}</p>
                </div>
            </div>
            <div class="demo-text" v-if="active1 === 1" ref="scroll">
                <mu-list textline="three-line" class="scroll">
                    <div v-for="(item ,index) in evalist" :key="index" @click="openDialog(item)">
                        <mu-list-item avatar :ripple="false" button>
                            <mu-list-item-action>
                                <mu-avatar>
                                    <img :src="imageurl+item.user_img">
                                </mu-avatar>
                            </mu-list-item-action>
                            <mu-list-item-content>
                                <span>{{item.eval_name}}</span><span style="float:right">{{item.evaluate_detail.length}}</span><mu-icon style="float:right" size="20" right value="chat"></mu-icon>
                                <mu-list-item-sub-title>
                                    <span style="font-size:0.5em">#{{item.eval_time | formatDate}}</span> <br/>
                                    <span style="font-size:1em;color: rgba(0, 0, 0, .87)">{{item.eval_content}}</span><br/>
                                </mu-list-item-sub-title>
                            </mu-list-item-content>
                        </mu-list-item>
                        <mu-divider></mu-divider>
                    </div>
                    <br>
                    <div style="display: none">
                        <input type="text">
                    </div>
                </mu-list>
                <mu-tooltip style="z-index:9000000000000000000000000000000000000000000000000" placement="top" :open="open" :content="content">
                    <div style="z-index:9000000000000000000000000000000000000000000000000"> </div>
                </mu-tooltip>
                <div class="floatinput">
                    <mu-avatar size="35" color="rgb(33, 150, 243)">
                        <mu-icon value="person"></mu-icon>
                    </mu-avatar>
                    <div>
                        <span>{{beevaluateuser?beevaluateuser:'回复：'}}</span>
                    </div>
                    <!-- <input type="text" placeholder="请说点什么"> -->
                    <input type="text" v-model="evaluateContent" placeholder="请说点什么">
                    <mu-avatar v-if="isShowLog==false" size="35" color="rgb(33,150,243)" @click="send(evaluateContent,params.fileId)">
                        <mu-icon value="send"></mu-icon>
                    </mu-avatar>
                    <mu-avatar v-else size="35" color="rgb(33,150,243)" @click="reply(evaluateid,userinfo._id,replyuserinfo._id,evaluateContent)">
                        <mu-icon value="send"></mu-icon>
                    </mu-avatar>
                </div>

            </div>
        </mu-container>

    </div>

</template>
<script>
import modeldialog from "./modeldialog";
export default {
    name: "videoPlay",
    data() {
        return {
            open: false,
            content: "请输入",
            active1: 0,
            params: null,
            player: null,
            getDetailData: null,
            evalist: [],
            evaluateContent: "",
            userinfo: null,
            replyuserinfo: {},
            isShowLog: false,
            cssstyle: {},
            evaluateid: "",
            beevaluateuser: "",
            imageurl: this.global_.ip
        };
    },
    components: {
        modeldialog
    },
    filters: {
        formatDate(t) {
            const date = new Date(t);
            let month = date.getMonth() + 1;
            let day = date.getDate();
            return `${month}-${day}`;
        }
    },
    beforeDestroy() {
        this.player.dispose();
    },
    created() {
        this.params = this.$route.params;
        this.getVideoDetail(this.params.fileId);
        console.log(this.params);
        this.userinfo = JSON.parse(localStorage.getItem("vueuser"));
    },
    async mounted() {
        this.evalist = await this.getEvaluate(this.params.fileId);
        console.log(this.evalist);
        this.getDetailData = await this.getVideoDetail(this.params.fileId);
        console.log(this.getDetailData);
        const playdata = await this.videoPlay();
        var player = (this.player = TCPlayer("video", {
            fileID: this.params.fileId, // 请传入需要播放的视频 filID 必须
            appID: this.global_.APPID, //getFocusList 请传入点播账号的 appID 必须
            plugins: {
                ContinuePlay: {
                    // auto: true, //[可选] 是否在视频播放后自动续播
                    text: "上次播放至 ", //[可选] 提示文案
                    btnText: "恢复播放" //[可选] 按钮文案
                }
            },
            t: playdata.t,
            us: playdata.us,
            sign: playdata.sign,
            exper: playdata.exper
        }));
    },
    methods: {
        //改变评论人
        touser(val) {
            console.log(val);
            this.replyuserinfo = val;
            this.beevaluateuser = "@" + val.user_name;
        },
        //子组件调用方法（模态框）
        onResultChange(val) {
            // console.log(this.$refs.refOffset.offsetTop);
            this.cssstyle.margin = this.$refs.refOffset.offsetTop + "px";
            this.cssstyle.minheight =
                window.innerHeight - this.$refs.refOffset.offsetTop - 60 + "px";
            this.isShowLog = val;
            if (!val) {
                this.beevaluateuser = "";
                this.evaluateContent = "";
            }
        },
        //打开详细评论
        openDialog(item) {
            console.log(item);

            //模拟@某人，选择发送人
            this.beevaluateuser = "@" + item.eval_name;
            this.isShowLog = true;
            this.evaluateid = item._id;
            this.replyuserinfo._id = item.user_id;
        },
        //获取视频详细信息
        getVideoDetail: async function(fileId) {
            const data = await this.$http({
                url: this.global_.getApiConfig().getVideos,
                method: "post",
                data: {
                    Action: "GetVideoInfo",
                    fileId: fileId
                },
                headers: {
                    url: "https://vod.api.qcloud.com/v2/index.php"
                }
            });
            console.log(data);
            if (data.data.errno === 0) {
                this.getDetailData = data.data.data.basicInfo;
                return data.data.data.basicInfo;
            }
        },

        //视频播放
        videoPlay: async function() {
            const res = await this.$http({
                url: this.global_.getApiConfig().playVideos,
                method: "post",
                data: {
                    KEY: this.global_.KEY,
                    isFree: true,
                    appId: this.global_.APPID,
                    fileId: this.params.fileId,
                    payStatus: true
                    // exper: item.exper
                }
            });
            if (res.data.errno === 0) {
                return res.data.data;
            }
        },
        // 获得评论
        getEvaluate: async function(fileId) {
            const res = await this.$http({
                url: this.global_.getApiConfig().getEvaluate,
                method: "post",
                data: {
                    fileId: fileId
                }
            });
            if (res.data.errno === 0) {
                return res.data.data;
            }
        },
        //发送视频消息
        send: async function(word, fileId) {
            console.log("a");
            if (word.length < 3) {
                this.content = "内容太短";
                this.open = true;
                setTimeout(() => {
                    this.open = false;
                }, 1000);
                return false;
            }
            const res = await this.$http({
                url: this.global_.getApiConfig().sendWord,
                method: "post",
                data: {
                    userinfo: this.userinfo,
                    fileId: fileId,
                    word: word
                }
            });
            if (res.data.errno == 0) {
                this.content = "发送成功";
                this.open = true;
                this.evalist = await this.getEvaluate(this.params.fileId);
                this.evaluateContent = "";
                this.$nextTick(() => {
                    window.scrollTo(0, this.$refs.scroll.scrollHeight);
                });
                setTimeout(() => {
                    this.open = false;
                }, 1000);
            } else {
                this.content = "发送失败,请先登陆";
                this.open = true;
                this.evalist = await this.getEvaluate(this.params.fileId);
                setTimeout(() => {
                    this.open = false;
                }, 1000);
            }
        },
        //发送回复
        reply: async function(
            from_evaluateId,
            send_userId,
            accept_userId,
            send_content
        ) {
            if (this.evaluateContent.length < 3) {
                this.content = "内容太短";
                this.open = true;
                setTimeout(() => {
                    this.open = false;
                }, 1000);
                return false;
            }
            const res = await this.$http({
                url: this.global_.getApiConfig().sendWordDetail,
                method: "post",
                data: {
                    from_evaluateId: from_evaluateId,
                    send_userId: send_userId,
                    accept_userId: accept_userId,
                    send_content: send_content
                }
            });
            console.log(res);
            if (res.data.errno == 0) {
                this.$refs.child.getEvaluateDetail2();
            } else {
                alert("请先登陆");
            }
        }
    }
};
</script>
<style scoped>
span {
    font-size: 15px;
}
h3,
p {
    margin-left: 12px;
}
.tcplayer {
    margin: 0 auto;
}
/* 通过 css 设置播放器尺寸 这时<video>中的宽高属性将被覆盖*/
.player-size {
    width: 640px;
    height: 360px;
}
@media screen and (max-width: 640px) {
    .player-size {
        width: 100%;
        height: 270px;
    }
}
/* 设置logo在高分屏的显示样式 */
@media only screen and (min-device-pixel-ratio: 2),
    only screen and (-webkit-min-device-pixel-ratio: 2) {
    .tcp-logo-img {
        width: 50%;
    }
}
.mu-tabs-inverse {
    height: 40px;
}
/* .mu-ripple-wrapper{
width: 50%;
} */
.floatinput {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: rgb(33, 150, 243);
    z-index: 100000;
}

.floatinput input {
    padding-left: 10px;
    width: 66%;
    border-radius: 20px;
    border: 0px;
    outline: none;
}
/* input:nth-of-type(2){
    width: 20%;
} */
.container {
    padding-left: 0;
    padding-right: 0;
    max-width: 100%;
}
.sticky {
    z-index: 10000;
    position: sticky;
    top: 0;
}
.mu-appbar {
    height: 40px;
}
</style>


