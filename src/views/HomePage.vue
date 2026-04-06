<template>
    <div class="page">
        <h1>记账本</h1>

        <!--用Element Plus的卡片和统计组件-->

        <el-row :gutter="20" class="stats">
          <el-col :span="8">
            <el-card shadow="hover">
              <div class="stat-content">
                <div class="stat-label">总收入</div>
                <div class="stat-value income">{{ store.totalIncome }}</div>
              </div>
            </el-card>
          </el-col> 
          <el-col :span="8">
            <el-card shadou="hover">
              <div class="stat-content">
                <div class="stat-label">总支出</div>
                <div class="stat-value expense">{{ store.totalExpense }}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
        <el-card shadow="hover">
          <div class="stat-content">
            <div class="stat-label">结余</div>
            <div class="stat-value" :class="store.balance >= 0 ? 'income' : 'expense'">
              ¥{{ store.balance }}
            </div>
          </div>
        </el-card>
      </el-col>
        </el-row>

        <div class="action">
          <el-button type="primary" size="large" @click="goToAdd">添加记录</el-button>
          <el-button type="info" size="large" @click="goToList">查看列表</el-button>
        </div>
      </div>
        <!-- <Summary :records="records" /> -->
        
        <!-- <div v-if="loading" class="loading">加载中...</div>
    
    <div v-else>
      <div class="stats">
        <div class="stat-card">
          <div class="label">总收入</div>
          <div class="amount income">¥{{ totalIncome }}</div>
        </div>
        <div class="stat-card">
          <div class="label">总支出</div>
          <div class="amount expense">¥{{ totalExpense }}</div>
        </div>
        <div class="stat-card">
          <div class="label">结余</div>
          <div class="amount" :class="balance >= 0 ? 'income' : 'expense'">
            ¥{{ balance }}
          </div>
        </div>
      </div>
    </div>
-->

        <!-- <div class="stats">
          <div class="stat-card">
            <div class="label">总收入</div>
            <div class="amount income">{{ store.totalIncome }}</div>
          </div>
          <div class="stat-card">
            <div class="label">总支出</div>
            <div class="amount expense">{{ store.totalExpense }}</div>
          </div>
          <div class="stat-card">
            <div class="label">结余</div>
            <div class="amount" :class="store.balance >= 0 ? 'income' : 'expense'">{{ store.balance }}</div>
          </div>
        </div>

        <div class="actions">
            <button @click="goToAdd" class="btn-add">添加记录</button>
            <button @click="goToList" class="btn-list">查看列表</button>
        </div> -->
</template>
<script setup lang="ts">
    import {ref, computed, onMounted} from 'vue';
    import { useRouter } from 'vue-router';
    import Summary from '@/components/Summary.vue';
    import { getRecords } from '@/api/records';
    import { useRecordsStore } from '@/stores/records';

    const router = useRouter()
    const store = useRecordsStore()
    const records = ref([])
    const loading = ref(true)
    
    const goToAdd = () => {
        router.push('/add')
    }
    
    const goToList = () => {
        router.push('/list')
    }
    
    /* //从 localStorage 读数据
    const records = ref(JSON.parse(localStorage.getItem('records') || '[]')) */

    /* const totalIncome = computed(() => {
  return records.value
    .filter(r => r.type === '收入')
    .reduce((sum, r) => sum + r.amount, 0)
})

    const totalExpense = computed(() => {
  return records.value
    .filter(r => r.type === '支出')
    .reduce((sum, r) => sum + r.amount, 0)
})

const balance = computed(() => totalIncome.value - totalExpense.value)

    const loadRecords = async() => {
      loading.value = true

      try {
        records.value = await getRecords()
      } catch (err) {
        console.error('加载失败', err)
        alert('加载失败')
      } finally {
        loading.value = false
      }
    } */


    /* onMounted(() => {
      loadRecords()
    }) */
</script>
<style scoped>
.page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.stats {
  margin-bottom: 40px;
}

.stat-content {
  text-align: center;
  padding: 10px 0;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
}

.income {
  color: #67c23a;
}

.expense {
  color: #f56c6c;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

</style>