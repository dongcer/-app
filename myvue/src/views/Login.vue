<template>
    <div>
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left" @click="$router.replace({name:'video'})">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            登陆
        </mu-appbar>
        <mu-container>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form mu-padding">
                <mu-form-item label="用户名" help-text="帮助文字" prop="username" :rules="usernameRules">
                    <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>
                <!-- <mu-form-item prop="isAgree" :rules="argeeRules">
                <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
            </mu-form-item> -->
                <mu-form-item>
                    <mu-button color="primary" @click="submit">提交</mu-button>
                    <mu-button @click="clear">重置</mu-button>
                </mu-form-item>
                <router-link :to="{name:'Register'}" replace> 还没有账户？注册 </router-link>

            </mu-form>

        </mu-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //验证
            usernameRules: [
                { validate: val => !!val, message: "必须填写用户名" },
                { validate: val => val.length >= 3, message: "用户名长度大于3" }
            ],
            passwordRules: [
                { validate: val => !!val, message: "必须填写密码" },
                {
                    validate: val => val.length >= 3 && val.length <= 10,
                    message: "密码长度大于3小于10"
                }
            ],
            argeeRules: [
                { validate: val => !!val, message: "必须同意用户协议" }
            ],

            //表单数据
            validateForm: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        //登陆函数
        submit() {
            const pwd = this.crypto
                .createHash("md5")
                .update(this.validateForm.password)
                .digest("hex");
            const name = this.validateForm.username;
            const url = this.global_.getApiConfig().loginAuth;
            const router = this.$router;
            const store = this.$store;
            this.$refs.form.validate().then(result => {
                if (result) {
                    this.$http
                        .post(url, {
                            username: name,
                            password: pwd
                        })
                        .then(function(res) {
                            console.log(res.data);
                            if (res.data.errno === 0) {
                                localStorage.setItem(
                                    "vuetoken",
                                    res.data.data.token
                                );
                                localStorage.setItem(
                                    "vueuser",
                                    JSON.stringify(res.data.data.user)
                                );
                                alert("登陆成功");
                                store.commit("switch_islogin");
                                router.replace({ name: "video" });
                            } else {
                                alert("账号或密码错误");
                            }
                        })
                        .catch(function(err) {
                            console.log(err);
                            alert(err);
                        });
                }
                // else {
                //     alert("这种错！");
                // }
            });
        },
        //重置表单
        clear() {
            this.$refs.form.clear();
            this.validateForm = {
                username: "",
                password: ""
            };
        }
    }
};
</script>
<style scoped>
.mu-demo-form {
    width: 100%;
    max-width: 460px;
}
.mu-padding {
    padding-top: 120px;
    padding-right: 40px;
    padding-left: 40px;
}
</style>