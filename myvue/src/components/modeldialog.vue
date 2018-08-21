<template>
    <div class="modal-mask" v-show="show" transition="modal" @click="showel = false">
        <div :style="{'margin-top':cssstyle.margin}" class="modal-wrapper" @click="stop($event)">
            <div class="modal-container">
                <!-- <div class="modal-header">
                    <slot name="header">
                        <strong>所有评论</strong>
                        <button class="modal-default-button" @click="showel = false">
                            关闭
                        </button>
                    </slot>
                </div> -->
                <!-- <div class="modal-body" @click="senduser(item.senduserdata[0])" v-for="(item,index) in evaluateDetailData" :key="index">
                    <div>评论人:{{item.senduserdata[0].user_name}}</div>
                    <div>被评论人:{{item.acceptuserdata[0].user_name}}</div>
                    <div>评论内容:{{item.send_content}}</div>
                </div> -->
                    <mu-paper :z-depth="10" class="demo-list-wrap">
                        <mu-appbar color="rgb(33, 150, 243)">
                            <!-- <mu-button icon slot="left">
                                <mu-icon value="menu"></mu-icon>
                            </mu-button> -->
                            <span style="font-size:14px;">评论详情</span>
                            <mu-button icon slot="right" @click="showel = false">
                                <mu-icon value="close"></mu-icon>
                            </mu-button>
                        </mu-appbar>
                        <mu-list id="list" textline="three-line" :style="{'height':cssstyle.minheight}">
                            <!-- <mu-sub-header>今天</mu-sub-header> -->
                            <div @click="senduser(item.senduserdata[0])" v-for="(item,index) in evaluateDetailData" :key="index">
                                <mu-list-item avatar :ripple="false" button>
                                    <mu-list-item-action>
                                        <mu-avatar>
                                            <img :src="imageurl+item.senduserdata[0].user_img">
                                        </mu-avatar>
                                    </mu-list-item-action>
                                    <mu-list-item-content>
                                        <mu-list-item-title>{{item.senduserdata[0].user_name}}</mu-list-item-title>
                                        <mu-list-item-sub-title>
                                            <span style="color: rgb(33, 150, 243)">回复：{{item.acceptuserdata[0].user_name}}</span> {{item.send_content}}
                                        </mu-list-item-sub-title>
                                    </mu-list-item-content>
                                </mu-list-item>
                                <mu-divider></mu-divider>
                            </div>

                        </mu-list>
                    </mu-paper>

                <!-- <div class="modal-footer">
                    <slot name="footer">
                        default footer
                        <button class="modal-default-button" @click="showel = false">
                            OK
                        </button>
                    </slot>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "modeldialog",
    props: {
        show: {
            type: Boolean
            // default: false,
            // required: true, // 必需且是bool类型的
            // twoWay: true // 双向绑定
        },
        cssstyle: {
            type: Object
        },
        evaluateid: {
            type: String
        }
    },
    data() {
        return {
            showel: this.show,
            evaluateDetailData: [],
            imageurl: this.global_.ip
        };
    },
    watch: {
        show(val) {
            // console.log(val);
            this.showel = val;
            //获取评论数据
            if (val) {
                this.getEvaluateDetail();
            } else {
                this.evaluateDetailData = [];
            }
        },
        showel(val) {
            // console.log(val);
            this.$emit("changeshow", val);
        }
    },
    methods: {
        //阻止冒泡事件
        stop: function(e) {
            e.stopPropagation();
        },
        //获取评论详细信息
        getEvaluateDetail: function(fn) {
            this.$http
                .post(this.global_.getApiConfig().getEvaluateDetail, {
                    evaluateId: this.evaluateid
                })
                .then(res => {
                    if (res.data.errno === 0) {
                        this.evaluateDetailData = res.data.data;
                        if (typeof fn == "function") {
                            fn();
                        }
                    } else {
                        alert("请先登陆");
                    }
                })
                .catch(function(err) {
                    alert(err);
                });
        },
        getEvaluateDetail2: function() {
            this.getEvaluateDetail(() => {
                this.$nextTick(() => {
                    // window.scrollTo(0, this.$refs.list.scrollHeight);
                    // console.log(this.$refs.list.scrollTop);
                    const line = document.getElementById("list").scrollHeight;
                    document.getElementById("list").scrollTo(0, line);
                });
            });
        },
        senduser: function(item) {
            // console.log(item);
            this.$emit("touser", item);
        }
    }
};
</script>
<style scoped>
.mu-appbar {
    height: 35px;
}
.mu-appbar-title {
    font-size: 14px !important;
}
.modal-mask {
    position: fixed;
    z-index: 11111;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-container {
    overflow: scroll;
    width: 100%;
    margin: 0px auto;
    /* padding: 0px 0px 30px 0px; */
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}
.modal-wrapper{
    width: 100%;
}

</style>


