import { ref  } from 'vue';
import type { Ref } from 'vue'
interface UseBoolean {
  bool: Ref<boolean>;
  setTrue: () => void;
  setFalse: () => void;
}
export default function useBoolean(initialValue: boolean = false): UseBoolean {
  const value: Ref<boolean> = ref(initialValue);

  function setFalse():void{
    value.value = false;
  }
  function setTrue():void{
    value.value = true;
  }

  return {bool:value, setFalse,setTrue};
}
