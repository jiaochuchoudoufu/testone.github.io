<template>
    <div class="summary">
        <h3>本月汇总</h3>
        <div class="stats">
            <div class="stat-card income">
                <div class="label">总收入</div>
                <div class="amount">¥{{ totalIncome }}</div>
            </div>
            <div class="stat-card expense">
                <div class="label">总支出</div>
                <div class="amount">¥{{ totalExpense }}</div>
            </div>
            <div class="stat-card balance">
                <div class="label">结余</div>
                <div class="amount" :class="{ positive: balance >= 0, negative: balance < 0 }">
                ¥{{ balance }}
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
    import { computed } from 'vue'
    
    //接收父组件数据
    const props = defineProps(['records'])

    //计算总收入
    const totalIncome = computed(() => {
        return props.records
        .filter(r => r.type === '收入')
        .reduce((sum, r) => sum = r.amount , 0)
    })

    //计算总支出
    const totalExpense = computed(() => {
        return props.records
        .filter(r => r.type === '支出')
        .reduce((sum, r) => sum + r.amount, 0)
    })

    //计算结余
    const balance = computed(() => {
        return totalIncome.value - totalExpense.value
    })
</script>

<style scoped>
.summary {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.summary h3 {
  margin: 0 0 15px 0;
  color: #495057;
}

.stats {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 120px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.stat-card .label {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 8px;
}

.stat-card .amount {
  font-size: 24px;
  font-weight: bold;
}

.income .amount {
  color: #28a745;
}

.expense .amount {
  color: #dc3545;
}

.balance .amount.positive {
  color: #28a745;
}

.balance .amount.negative {
  color: #dc3545;
}
</style>