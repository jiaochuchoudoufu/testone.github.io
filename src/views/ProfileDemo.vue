<template>
    <div class="profile-demo">
        <h1>个人资料卡</h1>

        <!--1.展示模式-->
        <el-card v-if="!isEditing" class="profile-card">
            <template #header>
                <div class="card-header">
                    <span>个人信息</span>
                    <el-button type="primary" size="small" @click="isEditing = true">编辑</el-button>
                </div>
            </template>

            <el-descriptions :column="1" border>
                <el-descriptions-item label="姓名">
                    {{ userInfo.name }}
                </el-descriptions-item>
                <el-descriptions-item label="年龄">
                    {{ userInfo.age }}
                </el-descriptions-item>
                <el-descriptions-item label="性别">
                    <el-tag :type="userInfo.gender === '男' ? 'primary' : 'success'">
                        {{ userInfo.gender }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="城市">
                    {{ userInfo.city }}
                </el-descriptions-item>
                <el-descriptions-item label="爱好">
                    <el-tag 
                    v-for="hobby in userInfo.hobbies" 
                    :key="hobby"
                    size="small"
                    style="margin-right: 5px"
                    >
                        {{ hobby }}
                    </el-tag>
        </el-descriptions-item>
            </el-descriptions>
        </el-card>

        <!--编辑模式-->
        <el-card v-else class="profile-card" style="height:500px">
            <template #header>
                <div class="card-header">
                    <span>编辑资料</span>
                    <div>
                        <el-button size="small" @click="cancelEdit">取消</el-button>
                        <el-button type="primary" size="small" @click="saveEdit">保存</el-button> 
                    </div>
                </div>
            </template>

            <el-form :model="editForm" label-width="80">
                <el-form-item label="姓名">
                    <el-input v-model="editForm.name" style="width:200px"/>
                </el-form-item>

                <el-form-item label="年龄">
                    <el-input-number v-model="editForm.age" :min="0" :max="150"/>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.gender">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="城市">
                    <el-select v-model="editForm.city" placeholder="请选择城市" style="width:80px">
                        <el-option label="北京" value="北京" />
                        <el-option label="上海" value="上海" />
                        <el-option label="广州" value="广州" />
                        <el-option label="深圳" value="深圳" />
                    </el-select>
                </el-form-item>

                <el-form-item label="爱好">
                    <el-checkbox-group v-model="editForm.hobbies">
                        <el-checkbox label="阅读">阅读</el-checkbox>
                        <el-checkbox label="音乐">音乐</el-checkbox>
                        <el-checkbox label="运动">运动</el-checkbox>
                        <el-checkbox label="游戏">游戏</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 3. 提示信息 -->
        <div class="actions">
          <el-button @click="showMessage">显示当前信息</el-button>
          <el-button type="danger" @click="resetData">重置数据</el-button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

//原始数据
const originaUserInfo = {
    name: '张三',
  age: 25,
  gender: '男',
  city: '北京',
  hobbies: ['阅读', '运动']
}

//当前显示的数据
const userInfo = ref({...originaUserInfo})

//编辑模式开关
const isEditing = ref(false)

//编辑表单（临时数据）
const editForm = ref({...userInfo.value})

//保存编辑
const saveEdit = () => {
    userInfo.value = {...editForm.value}
    isEditing.value = false
    ElMessage.success('保存成功')
}

//取消编辑
const cancelEdit = () => {
    editForm.value = { ...userInfo.value }
    isEditing.value = false
    ElMessage.info('已取消编辑')
}

//显示当前信息
const showMessage = () => {
    ElMessage.success(`姓名:${userInfo.value.name},年龄:${userInfo.value.age}岁`)
}

//重置数据
const resetData = () => {
    userInfo.value = {...originaUserInfo}
    editForm.value = {...originaUserInfo}
    ElMessage.warning('已重置为默认数据')
}
</script>

<style scoped>
.profile-demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.profile-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>