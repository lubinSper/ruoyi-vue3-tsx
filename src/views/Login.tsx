import { defineComponent, ref } from 'vue'
import style from './Login.module.scss'

export default defineComponent({
  setup() {
    const loginForm = ref({
      username: "admin",
      password: "admin123",
      rememberMe: false,
      code: "",
      uuid: ""
    })
    const captchaEnabled = ref(true)
    const loginRules = ref({

    })
    const loading = ref(false)
    const codeUrl = ref('')
    const inputSlot = {
      prefix:() => <svg-icon icon-class="user" className="input-icon" />
    }
    const passwordSlot = {
      prefix:() => <svg-icon icon-class="password" className="input-icon" />
    }
    const captchaSlot = {
      prefix:() => <svg-icon icon-class="validCode" className="input-icon" />
    }
    function handleLogin() {

    }
    function getCode() {

    }
    return () => (
      <div class={style.login}>
        <el-form ref="loginRef" model={loginForm} rules={loginRules} class={style.loginForm}>
          <h3 class={style.title}>后台管理系统</h3>
          <el-form-item props="username">
            <el-input v-model={loginForm.value.username} type="text" size="large"
                      autocomplete="off" placeholder="账号" v-slots={inputSlot}/>
          </el-form-item>
          <el-form-item props="password">
            <el-input v-model={loginForm.value.password} type="password" size="large"
                      autocomplete="off" placeholder="密码" v-slots={passwordSlot}/>
          </el-form-item>
          {
            captchaEnabled.value && <el-form-item props="captcha">
              <el-input v-model={loginForm.value.code} size="large"
                        autocomplete="off" placeholder="验证码" style="width:63%"
                        onEnter={handleLogin} v-slots={captchaSlot}></el-input>
              <div class={style.loginCode}>
                <img src={codeUrl.value} onClick={getCode} class={style.loginCodeImg}/>
              </div>
            </el-form-item>
          }
          <el-checkbox v-model={loginForm.value.rememberMe} style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
          <el-form-item style="width:100%">
            <el-button loading={loading.value}
                       size="large" type="primary"
                       style="width:100%" onclick={handleLogin}>
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
