import { ref, computed } from "vue";

//组合式函数以use开头
export function useCounter (initialValue = 0) {
    //state
    const count = ref(initialValue)

    //getter
    const doubleCount = computed(() => count.value * 2)

    //action
    const increment = () => {
        count.value ++
    }

    const decrement = () => {
        count.value --
    }

    const reset = () => {
        count.value = initialValue
    }


    return {
        count,
        doubleCount,
        increment,
        decrement,
        reset
    }
}