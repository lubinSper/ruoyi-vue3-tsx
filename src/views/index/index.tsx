import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return ()=>(
      <div>
        <el-row gutter={20}>
          <el-col sm={24} lg={12} style="padding-left: 20px">
            <h2>若依后台管理框架</h2>
            <p>
              感谢老大哥ruoyi
              <el-link
                href="https://gitee.com/y_project/RuoYi-Vue"
                type="primary"
                target="_blank"
              >https://gitee.com/y_project/RuoYi-Vue</el-link>
              提供的技术模版，
              因为最近对vue3的tsx语法很感兴趣，
              虽然vue3组合式api代码代码已经很简便，但是对于react技术栈转型过来的小伙伴来说，
              使用tsx语法更符合原来react的习惯，故将vue3的改为了tsx，
              感谢大哥提供的模版
              <el-link
                href="https://github.com/yangzongzhuan/RuoYi-Vue3"
                type="primary"
                target="_blank"
              >https://github.com/yangzongzhuan/RuoYi-Vue3</el-link>
            </p>
            <p>
              <el-tag >免费开源</el-tag>
            </p>
          </el-col>
        </el-row>
        <el-row sm={24} lg={12} style="padding-left: 50px">
            <el-col span={12}>
              <h2>技术选型</h2>
            </el-col>
            <el-col span={6}>
              <h4>后端技术</h4>
              <ul>
                <li>SpringBoot</li>
                <li>Spring Security</li>
                <li>JWT</li>
                <li>MyBatis</li>
                <li>Druid</li>
                <li>Fastjson</li>
                <li>...</li>
              </ul>
            </el-col>
            <el-col span={6}>
              <h4>前端技术</h4>
              <ul>
                <li>Vue</li>
                <li>Vuex</li>
                <li>babel-plugin-jsx</li>
                <li>Element-ui</li>
                <li>Axios</li>
                <li>Sass</li>
                <li>Quill</li>
                <li>...</li>
              </ul>
            </el-col>
          </el-row>
      </div>
    )
  }
})
