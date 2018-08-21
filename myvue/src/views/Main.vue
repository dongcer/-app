<template>
	<div>
		<mu-paper :z-depth="1" class="demo-loadmore-wrap">
			<mu-appbar color="primary">
				<mu-button icon slot="left" @click="open = !open">
					<mu-icon value="menu"></mu-icon>
				</mu-button>
				{{shift}}
				<mu-button icon slot="right" @click="refresh()">
					<mu-icon value="refresh"></mu-icon>
				</mu-button>
				<!-- <mu-button flat color="primary" @click="camera">
					<mu-icon left value="camera"></mu-icon>
					拍照上传
				</mu-button>
				<mu-button flat color="secondary" @click="image">
					<mu-icon left value="image"></mu-icon>
					选择相册
				</mu-button> -->
			</mu-appbar>
			<router-view ref="child"></router-view>

		</mu-paper>
		<mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
			<mu-row justify-content="center">
				<mu-avatar v-if="$store.state.islogin==false" :size="100" @click="$router.replace({name:'Login'})">
					<img src="../assets/logo.png">
				</mu-avatar>
				<mu-avatar v-else-if="$store.state.islogin==true" :size="100" @click="$router.push({name:'Personal'})">
					<img :src="imageurl">
				</mu-avatar>
			</mu-row>
			<mu-divider></mu-divider>

			<mu-list>
				<mu-list-item button :ripple="true" @click="open = false;emitfun('f-')">
					<mu-list-item-action>
						<mu-icon value="movie"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>电影</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button :ripple="true" @click="open = false;emitfun('a-')">
					<mu-list-item-action>
						<mu-icon value="video_library"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>动画</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button :ripple="true" @click="open = false;emitfun('m-')">
					<mu-list-item-action>
						<mu-icon value="music_video"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>音乐</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button :ripple="true" @click="open = false;emitfun('n-')">
					<mu-list-item-action>
						<mu-icon value="fiber_new"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>新闻</mu-list-item-title>
				</mu-list-item>
			</mu-list>
			<mu-divider></mu-divider>
			<mu-list>
				<!-- <mu-list-item button :ripple="true" @click="open = false">
					<mu-list-item-title>消息</mu-list-item-title>
					<mu-list-item-action>
						<mu-icon value="info"></mu-icon>
					</mu-list-item-action>
				</mu-list-item> -->
				<mu-list-item button :ripple="true" @click="open = false;$router.push({name:'comment'})">
					<mu-list-item-title>评论</mu-list-item-title>
					<mu-list-item-action>
						<mu-icon value="info"></mu-icon>
					</mu-list-item-action>
				</mu-list-item>
				<mu-list-item button :ripple="true">
					<mu-list-item-title>夜间模式</mu-list-item-title>
					<mu-list-item-action>
						<!-- <mu-icon value="info"></mu-icon> -->
						<mu-switch v-model="Switch"></mu-switch>
					</mu-list-item-action>
				</mu-list-item>
				<mu-list-item button :ripple="true" @click="loginout">
					<mu-list-item-title>退出登录</mu-list-item-title>
					<mu-list-item-action>
						<mu-icon value="info"></mu-icon>
					</mu-list-item-action>
				</mu-list-item>
			</mu-list>

		</mu-drawer>

		<mu-container>
			<mu-bottom-nav :value.sync="shift" shift>
				<div @click="emitfun('f-')" style="display:inline;">
					<mu-bottom-nav-item value="电影" title="电影" icon="movie"></mu-bottom-nav-item>
				</div>
				<div @click="emitfun('a-')">
					<mu-bottom-nav-item value="动画" title="动画" icon="video_library"></mu-bottom-nav-item>
				</div>
				<div @click="emitfun('m-')">
					<mu-bottom-nav-item value="音乐" title="音乐" icon="music_video"></mu-bottom-nav-item>
				</div>
				<div @click="emitfun('n-')">
					<mu-bottom-nav-item value="新闻" title="新闻" icon="fiber_new"></mu-bottom-nav-item>
				</div>
			</mu-bottom-nav>
		</mu-container>
	</div>
</template>

<script>
export default {
    name: "HelloWorld",
    data() {
        return {
            imageurl: "",
            shift: "电影",
            docked: false,
            open: false,
            position: "left",
            userdata: {},
            Switch: false
        };
    },
    created() {
        this.ifLogin();
    },
    methods: {
        loginout() {
            this.$store.commit("switch_isout");
            localStorage.removeItem("vueuser");
            localStorage.removeItem("vuetoken");
        },
        refresh() {
            this.$refs.child.refresh(this.$store.state.videotype);
        },
        ifLogin() {
            const userdata = JSON.parse(localStorage.getItem("vueuser"));
            const usertoken = localStorage.getItem("vuetoken");
            if (userdata && usertoken) {
                this.$store.commit("switch_islogin");
                this.userdata = JSON.parse(localStorage.getItem("vueuser"));
                this.imageurl = this.global_.ip + this.userdata.user_img;
                console.log(this.userdata);
            }
        },
        emitfun(item) {
            this.$store.commit("switch_videotype", item);
            this.$refs.child.refresh(item);
        },
        camera() {
            navigator.camera.getPicture(
                res => {
                    var dataUrl = "data:image/jpeg;base64," + res;
                    this.upload(res);
                },
                function(err) {
                    alert(err);
                },
                {
                    quality: 50,
                    targetWidth: 300,
                    targetHeight: 300,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA
                }
            );
        },
        image() {
            navigator.camera.getPicture(
                res => {
                    var dataUrl = "data:image/jpeg;base64," + res;
                    alert(dataUrl);
                    this.upload(res);
                },
                function(err) {
                    alert(err);
                },
                {
                    quality: 50,
                    targetWidth: 300,
                    targetHeight: 300,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                }
            );
        },
        upload(data) {
            this.$http.post(this.global_.getApiConfig().upload, {
                data: data,
                type: "image"
            });
        }
    },
    watch: {
        Switch: function(val) {
            if (val) {
                this.theme.use("dark");
            } else {
                this.theme.use("light");
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .demo-loadmore-wrap {
    width: 100%;
    max-width: 360px;
    height: 420px;
    display: flex;
    flex-direction: column;
} */
.mu-appbar {
    position: fixed;
    top: 0;
    width: 100%;
}
.container {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 100%;
    padding-left: 0px;
    padding-right: 0px;
}

a {
    color: #fff;
}
.blackcolor {
    background-color: black;
}
</style>
