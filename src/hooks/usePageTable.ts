import { reactive, ref, UnwrapRef } from "vue";
import useBoolean from '@/hooks/userBoolean';
import request from '@/utils/request'
import type {Ref} from 'vue'
/** 接收的查询接口参数,默认有pageSize和pageNum */
interface PageFormOptions {
  pageSize?: number;
  pageNum?: number;
  [options: string]: any;
}

type PromiseResult<T = any> = Promise<any>;

interface PageTableParams<T> {
  apiBaseUrl: string
  params?: PageTableParams<T>
}

/**
 * table表格的hook封装, 默认pageNum=1， pageSize=10
 */
export function usePageTable<T>(p: { apiBaseUrl: string; params: Ref<UnwrapRef<{ any:any }>> }) {
  const { setFalse: stopLoading, setTrue: startLoading, bool: loading } = useBoolean();
  const { setFalse: modalHide, setTrue: modalShow, bool: modalVisile } = useBoolean();
  const GetApiFn = (args:any) => request({
    url: p.apiBaseUrl + '/list',method:'get',params:args
  })
  const apiFnParams = reactive({
    pageNum: 1,
    pageSize: 10
  });
  const params = ref({})

  // 表单数据源
  const tableOrigin = ref<T>();
  const total = ref<number>(0)
  async function getListFn() {
    startLoading();
    const { rows:data,totalq } = await GetApiFn(p.params?.value);
    stopLoading();
    // if (!error) {
      tableOrigin.value = data;
      total.value = totalq
    // }
  }

  // async function addListFn(args: unknown) {
  //   if (!params.AddApiFn) return;
  //   const { error } = await params.AddApiFn(args);
  //   if (!error) {
  //     modalHide();
  //     await getListFn();
  //     // window.$message?.success('添加成功');
  //   }
  // }
  //
  // async function editListFn(args: unknown) {
  //   if (!params.EditApiFn) return;
  //   const { error } = await params.EditApiFn(args);
  //   if (!error) {
  //     modalHide();
  //     await getListFn();
  //     // window.$message?.success('修改成功');
  //   }
  // }
  //
  // async function deleteListFn(args: unknown) {
  //   if (!params.DeleteApiFn) return;
  //   const { error } = await params.DeleteApiFn(args);
  //   if (!error) {
  //     await getListFn();
  //     // window.$message?.success('删除成功');
  //   }
  // }

  return {
    getListFn,
    apiFnParams,
    tableOrigin,
    loading,
    modalVisile,
    modalHide,
    modalShow,
    total
  };
}

