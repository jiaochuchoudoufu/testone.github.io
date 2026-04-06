<template>
<div class="add-record">
    <h3>添加记录</h3>
    <div class="form">
        <!--类型选择-->
        <div class="form-group">
            <label>类型：</label>
            <select v-model="form.type">
                <option value="支出">支出</option>
                <option value="收入">收入</option>
            </select>
        </div>

        <!--分类-->
        <div class="from-group">
            <label>分类</label>
            <select v-model="form.category">
                <option v-for="cat in categories" :key="cat" :value="cat">
                    {{ cat }}
                </option>
            </select>
        </div>

        <!--金额-->
        <div class="form-group">
            <label>金额：</label>
            <input
                type="number"
                v-model.number="form.amount"
                placeholder="请输入金额"
                @keyup.enter="submit"
            >
        </div>

        <!--日期-->
        <div class="form-group">
            <label>日期：</label>
            <input type="date" v-model="form.date">
        </div>

        <!-- 备注 -->
      <div class="form-group">
        <label>备注：</label>
        <input 
          type="text" 
          v-model="form.note" 
          placeholder="备注（可选）"
          @keyup.enter="submit"
        >
      </div>

      <!-- 按钮 -->
      <button @click="submit" class="submit-btn">添加记录</button>
    </div>
</div>
</template>

<script setup>
    import {ref, computed} from 'vue'

    //定义事件
    const emit = defineEmits(['add'])

    //分类选项
    const expenseCategories = ['餐饮', '交通', '购物', '娱乐', '医疗', '其他']
    const incomeCategories = ['工资', '兼职', '理财', '红包', '其他']

    //表单数据
    const form = ref({
        type:'支出',
        category:'餐饮',
        amount:'',
        date:new Date().toISOString().slice(0, 10),
        note:''
    })

    //根据类型显示动态分类
    const categories = computed(() => {
        return form.value.type === '支出' ? expenseCategories : incomeCategories
    })

    //类型改变时，重置分类
    const resetCategory = () => {
    form.value.category = form.value.type === '支出' ? '餐饮' : '工资'
}

    //提交表单
    const submit = () => {
        //验证
        if(!form.value.amount || form.value.amount <= 0){
            alert('请输入有效金额')
            return
        }
    

    //触发父组件的add事件
    emit('add', {...form.value})

    //重置表单
    form.value = {
        type:'支出',
        category:"餐饮",
        amount:'',
        date: new Date().toISOString().slice(0, 10),
        note:''
    }
    }
</script>

<style scoped>
.add-record {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
}

.add-record h3 {
  margin: 0 0 15px 0;
  color: #495057;
}

.form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 12px;
  color: #6c757d;
}

.form-group select,
.form-group input {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  min-width: 100px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b983;
}

.submit-btn {
  padding: 8px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  height: 38px;
}

.submit-btn:hover {
  background: #3aa876;
}
</style>