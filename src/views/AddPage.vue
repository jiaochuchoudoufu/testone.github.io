<template>
    <div class="page">
      <h1>添加记录</h1>
      
      <el-card class="form-card">
      <el-form :model="form" label-width="80px">
        <el-form-item label="类型">
          <el-radio-group v-model="form.type" @change="onTypeChange">
            <el-radio label="支出">支出</el-radio>
            <el-radio label="收入">收入</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="分类">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option
              v-for="cat in categories"
              :key="cat"
              :label="cat"
              :value="cat"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="金额">
          <el-input-number
            v-model="form.amount"
            :min="0"
            :precision="2"
            placeholder="输入金额"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="备注">
          <el-input
            v-model="form.note"
            placeholder="备注（可选）"
            clearable
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="save" :loading="saving">
            保存
          </el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
<!--       <div class="form">
        <div class="form-group">
          <label>类型：</label>
          <select v-model="form.type">
            <option value="支出">支出</option>
            <option value="收入">收入</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>分类：</label>
          <select v-model="form.category">
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>金额：</label>
          <input type="number" v-model.number="form.amount" placeholder="输入金额">
        </div>
        
        <div class="form-group">
          <label>日期：</label>
          <input type="date" v-model="form.date">
        </div>
        
        <div class="form-group">
          <label>备注：</label>
          <input type="text" v-model="form.note" placeholder="备注">
        </div>
        
        <div class="actions">
          <button @click="save" class="btn-save" :disabled="loading">{{ loading ? "保存中" : "保存" }}</button>
          <button @click="goBack" class="btn-back">返回</button>
        </div>
      </div> -->
    </div>
  </template>
  
  <script setup lang="ts">
    import {ref, computed} from 'vue';
    import { useRouter } from 'vue-router';
    import { addRecord } from '@/api/records';
    import { useRecordsStore } from '@/stores/records';
    import { ElMessage } from 'element-plus';
    import type { Record } from '@/types';

    const router = useRouter()
    const store = useRecordsStore()
    const loading = ref(false)

    const saving = ref(false)

    const expenseCategories = ['餐饮', '交通', '购物', '娱乐', '医疗', '其他']
    const incomeCategories = ['工资', '兼职', '理财', '红包', '其他']

    type FormData = Omit<Record, 'id'>

    const form = ref<FormData>({
  type: '支出',
  category: '餐饮',
  amount: 0,
  date: new Date().toISOString().slice(0, 10),
  note: ''
})

const categories = computed(() => {
  return form.value.type === '支出' ? expenseCategories : incomeCategories
})

const onTypeChange = () => {
  return form.value.type === '支出' ? "餐饮" : "工资"
}

const save = async() => {
  if (!form.value.amount || form.value.amount <= 0) {
    ElMessage.warning('请输入有效金额')
    return
  }

  saving.value = true
  try {
    store.addRecord({
      ...form.value,
      amount: Number(form.value.amount)
    })
    ElMessage.success('添加成功')
    router.push('/')
  } catch (error) {
    ElMessage.error('添加失败')
  } finally {
    saving.value = false
  }
}

const goBack = () => {
    router.back()
}
/* const save = () => {
  if (!form.value.amount || form.value.amount <= 0) {
    alert('请输入有效金额')
    return
  }

  // 调用 store 的 addRecord 方法
  store.addRecord({
    ...form.value,
    amount: Number(form.value.amount)
  })
  
  alert('添加成功')
  router.push('/')
} */
/* const save = async() => {
  if (!form.value.amount || form.value.amount <= 0) {
    alert('请输入有效金额')
    return
  }
  
  loading.value = true
  try {
    await addRecord({
      ...form.value,
      amount: Number(form.value.amount)
    })
    alert('添加成功了')
    router.push('/')
  } catch (err) {
    console.error('添加失败', err)
    alert('添加失败，请重试')
  } finally {
    loading.value = false
  }
} */

/*   //获取现有数据
  const records = JSON.parse(localStorage.getItem('records') || '[]')

  //添加新记录
  const newId = records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1
  records.push({
    id: newId,
    ...form.value
  })

  //保存到localStroage
  localStorage.setItem('records', JSON.stringify(records))

  alert('添加成功')
  router.push('/')
} */


</script>
<style scoped>
.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-card {
  padding: 20px;
}
</style>