import { defineComponent, ref } from 'vue'
import style from './Login.module.scss'
// @ts-ignore
import {getCodeImg} from '@/api/login'
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { useRouter } from "vue-router";
import {useUserStore} from '@/store';

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const router = useRouter();
    const loginForm = ref({
      username: "admin",
      password: "admin123",
      rememberMe: false,
      code: "",
      uuid: ""
    })
    const loginRef = ref()
    const captchaEnabled = ref(true)
    const loginRules = ref({
      username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
      password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
      code: [{ required: true, trigger: "change", message: "请输入验证码" }]
    })
    const loading = ref(false)
    const codeUrl = ref('')
    const redirect = ref(undefined);
    const inputSlot = {
      prefix:() => {
        return (
          <el-icon style="vertical-align: middle">
             <UserFilled />
          </el-icon>
        )
      }
    }
    const passwordSlot = {
      prefix:() => {
        return (
          <el-icon style="vertical-align: middle">
            <View />
          </el-icon>
        )
      }
    }
    const captchaSlot = {
      prefix:() => {
        return (
          <el-icon style="vertical-align: middle">
            <More />
          </el-icon>
        )
      }
    }
    async function handleLogin() {
      const valid:boolean = await loginRef.value.validate()
      if (valid){
        loading.value = true;
        if (loginForm.value.rememberMe){
          Cookies.set("username", loginForm.value.username, { expires: 30 });
          Cookies.set("password", encrypt(loginForm.value.password), { expires: 30 });
          Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 });
        }else {
          // 否则移除
          Cookies.remove("username");
          Cookies.remove("password");
          Cookies.remove("rememberMe");
        }
        // 调用action的登录方法
        userStore.login(loginForm.value).then(() => {
          router.push({ path: redirect.value || "/" });
        }).catch(() => {
          loading.value = false;
          // 重新获取验证码
          if (captchaEnabled.value) {
            getCode();
          }
        });
      }
    }
    async function getCode() {
      const res = await getCodeImg();
      captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
      if (captchaEnabled.value) {
        codeUrl.value = "data:image/gif;base64," + res.img;
        loginForm.value.uuid = res.uuid;
      }
    }
    getCode()
    return () => (
      <div class={style.login}>
        <el-form ref={loginRef} model={loginForm} rules={loginRules} class={style.loginForm}>
          <h3 class={style.title}>后台管理系统</h3>
          <el-form-item prop="username">
            <el-input v-model={loginForm.value.username} type="text" size="large"
                      autocomplete="off" placeholder="账号" v-slots={inputSlot}/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model={loginForm.value.password} type="password" size="large"
                      autocomplete="off" placeholder="密码" v-slots={passwordSlot}/>
          </el-form-item>
          {
            captchaEnabled.value && <el-form-item prop="captcha">
              <el-input v-model={loginForm.value.code} size="large"
                        autocomplete="off" placeholder="验证码" style="width:63%"
                        onKeyupEnter={handleLogin} v-slots={captchaSlot}></el-input>
              <div class={style.loginCode}>
                <img src={codeUrl.value} onClick={getCode} class={style.loginCodeImg}/>
              </div>
            </el-form-item>
          }
          <el-checkbox v-model={loginForm.value.rememberMe} style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
          <el-form-item style="width:100%">
            <el-button loading={loading.value}
                       size="large" type="primary"
                       style="width:100%" onClick={handleLogin}>
              <span>{loading.value ? "登 录 中..." : "登 录"}</span>
            </el-button>
          </el-form-item>
        </el-form>
        <div class={style.elLoginFooter}>
          <span>Copyright © 2018-2023 ruoyi.vip All Rights Reserved.</span>
        </div>
      </div>
    )
  }
})
