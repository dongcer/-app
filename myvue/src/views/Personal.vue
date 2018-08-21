<template>
    <div>
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left" @click="$router.push({name:'video'})">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            个人中心
        </mu-appbar>
        <mu-container style="padding: 16px 0;">
            <!-- <mu-flex>
                <mu-flex>
                    改变大小：
                </mu-flex>
                <mu-flex fill style="padding: 0 16px;">
                    <mu-slider v-model="size" :min="36" :step="1" :max="200" />
                </mu-flex>
            </mu-flex> -->
            <mu-row justify-content="center">
                <mu-avatar :size="size">
                    <img :src="imageurl">
                </mu-avatar>
            </mu-row>
            <mu-container>

                <div class="button-wrapper">
                    <mu-button flat color="primary" @click="camera">
                        <mu-icon left value="camera"></mu-icon>
                        拍照上传
                    </mu-button>
                    <mu-button flat color="secondary" @click="image">
                        <mu-icon left value="image"></mu-icon>
                        选择相册
                    </mu-button>
                    <!-- <input type="file" name="" id="file" @change="change"> -->
                </div>
            </mu-container>

        </mu-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            size: 56,
            userdata: {},
            imageurl: ""
        };
    },
    created() {
        this.userdata = JSON.parse(localStorage.getItem("vueuser"));
        this.imageurl = this.global_.ip + this.userdata.user_img;
    },
    methods: {
        camera() {
            navigator.camera.getPicture(
                async res => {
                    // const dataUrl = "data:image/jpeg;base64," + res;
                    // alert(res);
                    const data = await this.$http({
                        url: this.global_.getApiConfig().upload,
                        method: "post",
                        data: {
                            data: res,
                            name: this.userdata.user_name,
                            id: this.userdata._id
                        }
                    });
                    if (data.data.data) {
                        alert("上传成功");
                        await this.getUser();
                        this.$router.replace({ name: "video" });
                    } else {
                        alert("上传失败");
                        await this.getUser();
                        this.$router.replace({ name: "video" });
                    }
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
                async res => {
                    // const dataUrl = "data:image/jpeg;base64," + res;
                    // alert(res);
                    const data = await this.$http({
                        url: this.global_.getApiConfig().upload,
                        method: "post",
                        data: {
                            data: res,
                            name: this.userdata.user_name,
                            id: this.userdata._id
                        }
                    });
                    if (data.data.data) {
                        alert("上传成功");
                        await this.getUser();
                        this.$router.replace({ name: "video" });
                    } else {
                        alert("上传失败");
                        await this.getUser();
                        this.$router.replace({ name: "video" });
                    }
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
        change(e) {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = e => {
                // console.log(typeof reader.result);
                var a = reader.result;
                // var b = a.split(",");
                var base64Data = a.replace(/^data:image\/\w+;base64,/, "");
                console.log(base64Data);
                this.$http.post(this.global_.getApiConfig().upload, {
                    data: base64Data,
                    name: this.userdata.user_name,
                    id: this.userdata._id
                });
            };
        },
        async getUser() {
            const data = await this.$http({
                url: this.global_.getApiConfig().getUserData,
                method: "post",
                data: {
                    id: this.userdata._id
                }
            });
            console.log(data);
            localStorage.setItem("vueuser", JSON.stringify(data.data.data));
        }
    }
};
</script>
<style scoped>
.button-wrapper {
    text-align: center;
}
.mu-button {
    margin: 8px;
    vertical-align: top;
}
</style>

