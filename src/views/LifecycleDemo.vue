<template>
    <div class="demo">
        <h1>生命周期演示</h1>

        <el-card>
            <p>计数器：{{ count }}</p>
            <el-button @click="count++">+1</el-button>
        </el-card>

        <el-card>
            <h3>执行顺序</h3>
            <div class="log">
                <div v-for="(log, index) in logs" :key="index" class="log-item">
                    {{ log }}
                </div>
            </div>
        </el-card>

        <el-button @click="fun">打印logs</el-button>

        <el-button v-if="showChild" type="danger" @click="showChild = false">销毁子组件</el-button>
        <el-button v-else type="success" @click="showChild = true">添加子组件</el-button>

        <ChildComponent v-if="showChild" />
    </div>
</template>

<script setup>
    import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
    import ChildComponent from '@/components/ChildComponent.vue'

    const count = ref(0)
    const logs = ref([])

    const showChild = ref(true)

    //添加日志函数
    const addLog = (msg) => {
        logs.value.push(`${new Date().toLocaleString()} - ${msg}`)
    }

    //生命周期钩子（按执行顺序）
    console.log('setup 执行') //setup 是最先执行
    addLog('setup 执行')

    onBeforeMount(() => {
      console.log('onBeforeMount 执行')
      addLog('onBeforeMount 执行 - 组件即将挂载到页面')
    })

    onMounted(() => {
      console.log('onMounted 执行')
      addLog('onMounted 执行 - 组件已挂载到页面 ✅')
    })

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate 执行')
      addLog('onBeforeUpdate 执行 - 数据更新，即将重新渲染')
    })

    onUpdated(() => {
      console.log('onUpdated 执行')
      addLog('onUpdated 执行 - 组件已重新渲染')
    })

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount 执行')
      addLog('onBeforeUnmount 执行 - 组件即将销毁')
    })

    onUnmounted(() => {
      console.log('onUnmounted 执行')
      addLog('onUnmounted 执行 - 组件已销毁')
    })
    
    const fun = () => {
      console.log(logs.value)
    }
</script>

<style scoped>
.demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}

.log {
  max-height: 300px;
  overflow-y: auto;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
}

.log-item {
  font-size: 12px;
  font-family: monospace;
  padding: 4px 0;
  border-bottom: 1px solid #ddd;
}
</style>