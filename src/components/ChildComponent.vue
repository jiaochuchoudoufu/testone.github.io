<template>
    <div class="child">
        <el-card>
            <h3>我是子组件</h3>
        <p>子组件的生命周期也会触发</p>
        </el-card>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
    console.log('子组件 onMounted')
})

onUnmounted(() => {
    console.log('子组件 onUnmounted')
})
</script>