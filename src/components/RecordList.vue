<template>
    <div class="record-list">
        <h3>记录列表</h3>

        <div v-if="records.length === 0" class="empty">
            暂无记录，添加第一条吧~
        </div>
        
        <!--渲染列表-->
        <div v-else class="list">
            <div 
                v-for="record in records"
                :key="record.id"
                class="record-item"
                :class="{  editing: editingId === record.id }"
                >
                <!-- 正常显示模式 -->
        <template v-if="editingId !== record.id">
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
          <div class="record-actions">
            <button class="edit-btn" @click="startEdit(record)">编辑</button>
            <button class="delete-btn" @click="$emit('delete', record.id)">删除</button>
          </div>
        </template>
        
        <!-- 编辑模式 -->
        <template v-else>
          <div class="edit-form">
            <select v-model="editForm.type">
              <option value="支出">支出</option>
              <option value="收入">收入</option>
            </select>
            <select v-model="editForm.category">
              <option v-for="cat in getCategories(editForm.type)" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
            <input type="number" v-model.number="editForm.amount" placeholder="金额">
            <input type="date" v-model="editForm.date">
            <input type="text" v-model="editForm.note" placeholder="备注">
          </div>
          <div class="record-actions">
            <button class="save-btn" @click="saveEdit">保存</button>
            <button class="cancel-btn" @click="cancelEdit">取消</button>
          </div>
        </template>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'

    const props = defineProps(['records'])
    const emit = defineEmits(['delete', 'edit'])

    //编辑状态
    const editingId = ref(null)
    const editForm = ref({})

    //获取分类选项
    const getCategories = (type) => {
      const expenseCategories = ['餐饮', '交通', '购物', '娱乐', '医疗', '其他']
      const incomeCategories = ['工资', '兼职', '理财', '红包', '其他']
      return type === '支出' ? expenseCategories : incomeCategories
    }

    //开始编辑
    const startEdit = (record) => {
      editingId.value = record.id
      editForm.value = {...record}
    }

    //保存编辑
    const saveEdit = () => {
  if (!editForm.value.amount || editForm.value.amount <= 0) {
    alert('请输入有效金额')
    return
  }
  emit('edit', editingId.value, editForm.value)
  cancelEdit()
}

    //取消编辑
    const cancelEdit = () => {
      editingId.value = null
      editForm.value = {}
    }
</script>

<style scoped>
.record-list {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e9ecef;
}

.record-list h3 {
  margin: 0 0 15px 0;
  color: #495057;
}

.empty {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s;
}

.record-item.editing {
  flex-direction: column;
  gap: 10px;
  background: #e8f4fd;
}

.record-info {
  display: flex;
  gap: 15px;
  align-items: center;
  flex: 1;
}

.date {
  font-size: 12px;
  color: #6c757d;
  min-width: 90px;
}

.category {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.category.expense {
  background: #ffe5e5;
  color: #dc3545;
}

.category.income {
  background: #e5ffe5;
  color: #28a745;
}

.note {
  font-size: 14px;
  color: #495057;
}

.record-amount {
  font-size: 16px;
  font-weight: bold;
  min-width: 100px;
  text-align: right;
}

.record-amount.expense {
  color: #dc3545;
}

.record-amount.income {
  color: #28a745;
}

.record-actions {
  display: flex;
  gap: 8px;
}

.edit-btn, .delete-btn, .save-btn, .cancel-btn {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.edit-btn {
  background: #ffc107;
  color: #212529;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.save-btn {
  background: #28a745;
  color: white;
}

.cancel-btn {
  background: #6c757d;
  color: white;
}

.edit-form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
}

.edit-form select,
.edit-form input {
  padding: 6px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}
</style>