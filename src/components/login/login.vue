<template>
  <div>
    <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" ref="userName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" ref="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input @click="checkLogin" id="btnSubmit" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
// 导入公共的vue实例
    import bus from '../../common/common.js'
    import {ISLOGIN} from '../../common/common.js'

    export default{
        methods:{
            checkLogin(){
                const url='site/account/login';
                const params={'user_name':this.$refs.userName.value,'password':this.$refs.password.value};
                this.$axios.post(url,params).then(response=>{
                    console.log(response.data);
                    if(response.data.status===0){
                        // 登录成功 把true的状态传过去给layout
                        bus.$emit(ISLOGIN,true);
                        // 回到上一个页面
                        let goToPath = localStorage.getItem('visitPath');
                        console.log(goToPath);
                        this.$router.push({path:`${goToPath}`});
                    }else{
                        this.$message.error(response.data.message);
                    }
                })
            }
        }
    }
</script>