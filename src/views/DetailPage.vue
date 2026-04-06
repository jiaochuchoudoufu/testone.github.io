<template>
    <div class="page">
        <h1>记录详情</h1>

        <div v-if="record" class="detail-card">
            <div class="detail-item">
                <label>类型:</label>
                <span :class="record.type === '支出' ? 'expense' : 'income'">
            {{ record.type }}
        </span>
            </div>

            <div class="detail-item">
        <label>分类：</label>
        <span>{{ record.category }}</span>
            </div>

            <div class="detail-item">
        <label>金额：</label>
        <span class="amount" :class="record.type === '支出' ? 'expense' : 'income'">
          ¥{{ record.amount }}
        </span>
      </div>

      <div class="detail-item">
        <label>日期：</label>
        <span>{{ record.date }}</span>
      </div>

      <div class="detail-item">
        <label>备注：</label>
        <span>{{ record.note || '无' }}</span>
      </div>
        </div>

        <div v-else class="not-found">
      <p>找不到该记录</p>
    </div>

    <div class="action">
        <button @click="goBack" class="btn-back">返回列表</button>
    </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()

    const record = ref(null)

    onMounted(() => {
        //从url获取id参数
        const id = parseInt(route.params.id)
        //从localstorag读取数据
        const records = JSON.parse(localStorage.getItem('records') || '[]')
        //查找对应记录
        record.value = records.find(r => r.id === id)
    })

    const goBack = () => {
        router.push('/list')
    }
</script>
<style scoped>
.page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.detail-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}

.detail-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #e9ecef;
}

.detail-item label {
  width: 80px;
  font-weight: bold;
  color: #495057;
}

.detail-item span {
  flex: 1;
  color: #212529;
}

.expense {
  color: #dc3545;
}

.income {
  color: #28a745;
}

.amount {
  font-size: 20px;
  font-weight: bold;
}

.not-found {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}

.actions {
  text-align: center;
}

.btn-back {
  padding: 10px 24px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>