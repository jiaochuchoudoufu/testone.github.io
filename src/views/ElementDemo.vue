<template>
    <div class="demo">
      <h1>🎨 Element Plus 组件演示</h1>
      
      <!-- 1. 按钮 -->
      <div class="section">
        <h3>按钮</h3>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </div>
      
      <!-- 2. 输入框 -->
      <div class="section">
        <h3>输入框</h3>
        <el-input 
          v-model="inputValue" 
          placeholder="请输入内容"
          clearable
        />
        <p>你输入的是：{{ inputValue }}</p>
      </div>
      
      <!-- 3. 表格 -->
      <div class="section">
        <h3>表格</h3>
        <el-table :data="tableData" border>
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="name" label="姓名" width="180" />
          <el-table-column prop="address" label="地址" />
        </el-table>
      </div>
      
      <!-- 4. 弹窗 -->
      <div class="section">
        <h3>弹窗</h3>
        <el-button @click="dialogVisible = true">打开弹窗</el-button>
        <el-dialog v-model="dialogVisible" title="提示" width="30%">
          <span>这是一个弹窗</span>
          <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确定</el-button>
          </template>
        </el-dialog>
      </div>
      
      <!-- 5. 消息提示 -->
      <div class="section">
        <h3>消息提示</h3>
        <el-button @click="showMessage">成功消息</el-button>
        <el-button type="warning" @click="showWarning">警告消息</el-button>
        <el-button type="danger" @click="showError">错误消息</el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  
  const inputValue = ref('')
  
  const tableData = ref([
    { date: '2024-03-29', name: '张三', address: '北京市朝阳区' },
    { date: '2024-03-28', name: '李四', address: '上海市浦东新区' },
    { date: '2024-03-27', name: '王五', address: '广州市天河区' }
  ])
  
  const dialogVisible = ref(false)
  
  const showMessage = () => {
    ElMessage.success('操作成功！')
  }
  
  const showWarning = () => {
    ElMessage.warning('请注意！')
  }
  
  const showError = () => {
    ElMessage.error('操作失败！')
  }
  </script>
  
  <style scoped>
  .demo {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .section {
    margin: 30px 0;
    padding: 20px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
  }
  
  .section h3 {
    margin: 0 0 15px 0;
    color: #2c3e50;
  }
  
  .el-button {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  
  .el-input {
    width: 300px;
  }
  </style>