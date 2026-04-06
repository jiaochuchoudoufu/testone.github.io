import { ref, watch } from 'vue';

export function useLocalStorage(key, defaultValue){
    //从localStorage读取初始值
    const storedValue = localStorage.getItem(key)
    const data = ref(storedValue ? JSON.parse(storedValue) : defaultValue)

    //监听数据变化，自动保存到localStorage
    watch(data, (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
    }, {deep: true})

    return data
}