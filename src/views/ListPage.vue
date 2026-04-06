<template>
  <div class="page">
    <h1>记录列表</h1>
    
    <el-card>
      <el-table :data="store.records" stripe border  @row-click="handleRowClick" style="cursor: pointer">
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="category" label="分类" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === '支出' ? 'danger' : 'success'" size="small">
              {{ row.category }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="note" label="备注" min-width="150">
          <template #default="{ row }">
            {{ row.note || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="120" align="right">
          <template #default="{ row }">
            <span :style="{ color: row.type === '支出' ? '#f56c6c' : '#67c23a' }">
              {{ row.type === '支出' ? '-' : '+' }}¥{{ row.amount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template #default="{ row }">
            <el-button 
              type="danger" 
              size="small" 
              @click="handleDelete(row.id)"
              :icon="Delete"
              circle
            />
          </template>
        </el-table-column>
      </el-table>
      
      <div class="empty" v-if="store.records.length === 0">
        <el-empty description="暂无记录，去添加一条吧~" />
      </div>
    </el-card>
    
    <div class="actions">
      <el-button @click="goBack">返回首页</el-button>
    </div>
    <!-- <div v-if="store.records.length === 0" class="empty">
      暂无记录，去添加一条吧~
    </div>
    
    <div v-else class="list">
      <div v-for="record in store.records" :key="record.id" class="record-item" @click="goToDetail(record.id)" >
        <div class="record-info">
          <span class="date">{{ record.date }}</span>
          <span class="category" :class="record.type === '支出' ? 'expense' : 'income'">
            {{ record.category }}
          </span>
          <span class="note">{{ record.note || '-' }}</span>
        </div>
        <div class="record-amount" :class="record.type === '支出' ? 'expense' : 'income'">
          {{ record.type === '支出' ? '-' : '+' }}¥{{ record.amount }}
        </div>
        <button @click.stop="handleDelete(record.id)" class="delete-btn">删除</button>
      </div>
    </div>
    
    <div class="actions">
      <button @click="goBack" class="btn-back">返回首页</button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRecords, deleteRecord } from '../api/records'
import { useRecordsStore } from '@/stores/records'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

const router = useRouter()
const store = useRecordsStore()
const records = ref([])

const handleDelete = (id: number) => {
  ElMessageBox.confirm(
    '确定删除这条记录吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    store.deleteRecord(id)
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

const goToDetail = (id: number) => {
  router.push(`/detail/${id}`)  // 方式1：字符串拼接
  // 或
  // router.push({ name: 'detail', params: { id: id } })  // 方式2：对象
}

const handleRowClick = (row) => {
  goToDetail(row.id)
}

const goBack = () => router.push('/')
/* const loadRecords = async () => {
  loading.value = true
  try {
    records.value = await getRecords()
  } catch (err) {
    console.error('加载失败', err)
    alert('加载数据失败')
  } finally {
    loading.value = false
  }
} */

/* const handleDelete = async (id) => {
  console.log(id)
  if (!confirm('确定删除吗？')) return
  
  try {
    await deleteRecord(id)
    alert('删除成功')
    await loadRecords()  // 刷新列表
  } catch (err) {
    console.error('删除失败', err)
    alert('删除失败，请重试')
  }
} */


/* onMounted(() => {
  loadRecords()
}) */
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.actions {
  margin-top: 20px;
  text-align: center;
}

.empty {
  padding: 40px 0;
}
/* 添加手型光标 */
.record-item {
  cursor: pointer;
  transition: background 0.2s;
}

.record-item:hover {
  background: #e9ecef;
}
</style>