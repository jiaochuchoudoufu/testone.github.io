<template>
    <div class="demo">
        <h1>自定义指令演示</h1>

        <el-card>
            <h3>v-focus指令</h3>
            <p>页面加载后，输入框自动获得焦点</p>
            <input v-focus type="text" placeholder="我会自动聚焦" class="my-input">
        </el-card>

        <el-card>
            <h3>v-color指令</h3>
            <p v-color="'red'">这段文字是红色的</p>
            <p v-color="'blue'">这段文字是蓝色的</p>
            <p v-color="'green'">这段文字是绿色的</p>
        </el-card>

        <el-card>
            <h3>v-permission</h3>
            <p v-permission="'admin'">只有 admin 能看到我</p>
            <p v-permission="'user'">只有 user 能看到我</p>
            <el-button @click="toggleRole(); console.log(role)">切换角色(当前:{{ role }})</el-button>

        </el-card>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const role = ref('admin')

    const toggleRole = () => {
        role.value = role.value === 'admin' ? 'user' : 'admin'
        setRole(role.value)
    }

    //--------1. v-focus 自动聚焦 --------------
    const vFocus = {
        mounted(el){
            el.focus()
        }
    }

    //--------2. v-color 设置文字颜色 -----------
    const vColor = {
        mounted(el, binding) {
            el.style.color = binding.value
        },
        updated(el, binding) {
            el.style.color = binding.value
        }
    }

    //----------3. v-permission 权限控制 -------
    const vPermission = {
        mounted(el, binding) {
            if(!checkPermission(binding.value)){
                el.parentNode?.removeChild(el)
            }
        }
    }

    //检查权限
    const checkPermission = (requiredRole) => {
        return role.value === requiredRole
    }

    //存储role和读取role的值
    const setRole = (role) => {
        localStorage.setItem('role', role)
    }

    const getRole = () => {
        role.value = localStorage.getItem('role')
    }

    onMounted(() => {
        getRole()
    })
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

.my-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>