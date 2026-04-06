<template>
    <div class="demo">
        <h1>组合式函数测试</h1>

        <div class="card">
            <h3>计数器1</h3>
            <p>当前值：{{ counter1.count }}</p>
            <p>两倍值: {{ counter1.doubleCount }}</p>
            <el-button @click="counter1.decrement">-1</el-button>
            <el-button @click="counter1.increment">+1</el-button>
            <el-button @click="counter1.reset">重置</el-button>
        </div>

        <div class="card">
            <h3>计数器2（初始值10）</h3>
            <p>当前值: {{ counter2.count }}</p>
            <p>两倍值: {{ counter2.doubleCount }}</p>
            <el-button @click="counter2.decrement">-1</el-button>
            <el-button @click="counter2.increment">+1</el-button>
            <el-button @click="counter2.reset">重置</el-button>
        </div>

        <div>
            <input v-model="username" placeholder="输入用户名">
            <p>刷新页面后，用户名还在！</p>
        </div>
    </div>
</template>
<script setup>
    import { useCounter } from '@/composables/useCounter';
    import { useLocalStorage } from '@/composables/useLocalStorage';

    const counter1 = useCounter(0)
    const counter2 = useCounter(10)

    const username = useLocalStorage('username', '')
</script>
<style scoped>
.demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: #f8f9fa;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

h3 {
  margin: 0 0 15px 0;
}

p {
  margin: 10px 0;
}
</style>