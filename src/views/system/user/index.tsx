import { defineComponent, ref,reactive } from "vue";
import { changeUserStatus, listUser, resetUserPwd, delUser, getUser, updateUser, addUser, deptTreeSelect } from "@/api/system/user";
import { usePageTable } from "@/hooks/usePageTable";
export default defineComponent({
  setup(){
    const { proxy } = getCurrentInstance();
    const deptName = ref("");
    const deptOptions = ref(undefined);
    const queryParams = ref({
      userName:'',
      phonenumber:'',
      status:'',
      deptId:'',
      pageNum:1,
      pageSize:10
    })
    const queryRef = ref(null);
    const {  getListFn,tableOrigin:userList,loading,total } =
      usePageTable({apiBaseUrl:'/system/user',params:queryParams});
    function handleNodeClick(data:{id:string}){
        queryParams.value.deptId = data.id;
        getListFn()
    }
    const {sys_normal_disable} = proxy.useDict('sys_normal_disable')
    const dateRange = ref([])

    function getDeptTree() {
      deptTreeSelect().then(response => {
        deptOptions.value = response.data;
      });
    }
    const single = ref(false)
    function handleExport(){

    }
    function resetQuery() {
      queryRef.value?.resetFields();
      queryParams.value.deptId = '';
      getListFn()
    }
    const showSearch = ref()
    function handleQuery(){
      getListFn();
    }
    getDeptTree()
    return ()=>(
      <div class="app-container">
        <el-row gutter={20}>
          <el-col span={4} xs={24}>
            <div>
              <el-input v-model={deptName.value}
                        placeholder="请输入部门名称"
                        clearable
                        prefix-icon="Search"
                        style="margin-bottom: 20px"/>
            </div>
            <div>
              <el-tree
                data={deptOptions.value}
                props="{ label: 'label', children: 'children' }"
                expand-on-click-node={false}
                filter-node-method="filterNode"
                ref="deptTreeRef"
                node-key="id"
                highlight-current
                default-expand-all
                onNodeClick={handleNodeClick}
              />
            </div>
          </el-col>
          <el-col span={20} xs={24}>
            <el-row>
              <el-col span={20} xs={24}>
                <el-form ref={queryRef} model={queryParams.value} inline={true} v-show={showSearch} label-width="68px">
                  <el-form-item label="用户名称" prop="userName">
                    <el-input
                      v-model={queryParams.value.userName}
                      placeholder="请输入用户名称"
                      clearable
                      style="width: 240px"
                      onKeyupEnter={handleQuery}
                    />
                  </el-form-item>
                  <el-form-item label="手机号码" prop="phonenumber">
                    <el-input
                      v-model={queryParams.value.phonenumber}
                      placeholder="请输入手机号码"
                      clearable
                      style="width: 240px"
                      onKeyupEnter={handleQuery}
                    />
                  </el-form-item>
                  <el-form-item label="状态" prop="status">
                    <el-select
                      v-model={queryParams.value.status}
                      placeholder="用户状态"
                      clearable
                      style="width: 240px"
                    >
                      {sys_normal_disable.value.map(dict => {
                        return (
                          <el-option
                            key= {dict.value }
                            label={dict.label}
                            value={dict.value}
                          />
                        )
                      })}
                    </el-select>
                  </el-form-item>
                  <el-form-item label="创建时间" style="width: 308px;">
                    <el-date-picker
                      v-model={dateRange.value}
                      value-format="YYYY-MM-DD"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="Search" onClick={handleQuery}>搜索</el-button>
                    <el-button icon="Refresh" onClick={resetQuery}>重置</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col span={20} xs={24}>
                <el-table v-loading={loading.value} data={userList.value}>
                  <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="用户编号" align="center" key="userId" prop="userId"  />
                  <el-table-column label="用户名称" align="center" key="userName" prop="userName"   />
                  <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName"   />
                  <el-table-column label="部门" align="center" key="deptName" prop="dept.deptName"  />
                  <el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber" width="120" />
                </el-table>
                <pagination
                  total={total}
                  v-model:page={queryParams.value.pageNum}
                  v-model:limit={queryParams.value.pageSize}
                  onPagination={getListFn}
                />
              </el-col>
            </el-row>
          </el-col>
        </el-row>

      </div>


    )
  }

})
