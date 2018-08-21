<template>
    <div>
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left" @click="$router.replace({name:'video'})">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            注册
        </mu-appbar>
        <mu-container>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form mu-padding">
                <mu-form-item label="用户名" help-text="帮助文字" prop="username" :rules="usernameRules">
                    <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="确认密码" prop="password" :rules="confirmPasswordRules">
                    <mu-text-field type="password" v-model="validateForm.confirmPassword" prop="password"></mu-text-field>
                </mu-form-item>
                <mu-form-item>
                    <mu-button color="primary" @click="submit">提交</mu-button>
                    <mu-button @click="clear">重置</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //验证规则
            usernameRules: [
                { validate: val => !!val, message: "必须填写用户名" },
                { validate: val => val.length >= 3, message: "用户名长度大于3" }
            ],
            passwordRules: [
                { validate: val => !!val, message: "必须填写密码" },
                {
                    validate: val => val.length >= 3 && val.length <= 10,
                    message: "密码长度大于3小于10"
                },
                {
                    validate: val => val == this.validateForm.confirmPassword,
                    message: "两次密码不一致"
                }
            ],
            confirmPasswordRules: [
                { validate: val => !!val, message: "必须填写密码" },
                {
                    validate: val => val.length >= 3 && val.length <= 10,
                    message: "密码长度大于3小于10"
                },
                {
                    validate: val => val == this.validateForm.password,
                    message: "两次密码不一致"
                }
            ],
            //表单数据
            validateForm: {
                username: "",
                password: "",
                confirmPassword: ""
            }
        };
    },
    methods: {
        //注册提交
        submit() {
            this.$refs.form.validate().then(result => {
                if (result) {
                    console.log(this.validateForm);
                    const pwd = this.crypto
                        .createHash("md5")
                        .update(this.validateForm.password)
                        .digest("hex");
                    const name = this.validateForm.username;
                    const url = this.global_.getApiConfig().register;
                    const router = this.$router;
                    this.$http
                        .post(url, {
                            username: name,
                            password: pwd
                        })
                        .then(function(res) {
                            console.log(res.data);
                            if (res.data.data) {
                                alert("注册成功");
                                router.replace({ name: "video" });
                            } else {
                                alert("你的用户名已经被注册，请重试");
                            }
                        })
                        .catch(function(err) {
                            alert(err);
                        });
                }
            });
        },
        // 重置表单
        clear() {
            this.$refs.form.clear();
            this.validateForm = {
                username: "",
                password: "",
                confirmPassword: ""
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