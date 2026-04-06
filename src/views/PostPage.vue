<template>
    <div class="page">
        <button @click="goBack" class="btn-back">返回列表</button>

        <div v-if="loading" class="loading">加载中...</div>

        <div v-else-if="post" class="post-detail">
            <h1>{{ post.title }}</h1>
            <div class="meta">
                <span>文章ID:{{ post.id }}</span>
                <span>用户ID:{{ post.userId }}</span>
            </div>
            <p class="content">{{ post.body }}</p>
        </div>
        
        <div v-else-if="error" classs="error">出错了:{{ error }}</div>
    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';

    const route = useRoute()
    const router = useRouter()
    
    const post = ref(null)
    const loading = ref(false)
    const error = ref(null)

    //获取文章详情
    const fetchPost = async() => {
        const id = route.params.id
        console.log(typeof(id),id)
        loading.value = true
        error.value = null

    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        post.value = response.data
    } catch (err) {
        error.value = err.message
        console.log("获取失败",err)
    } finally {
        loading.value = false
    }
    }
    
    const goBack = () => {
        router.back()
    }

    onMounted(() => {
        fetchPost()
    })
</script>
<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.btn-back {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.post-detail {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
}

.post-detail h1 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.meta {
  display: flex;
  gap: 20px;
  padding-bottom: 15px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
  color: #6c757d;
  font-size: 14px;
}

.content {
  line-height: 1.6;
  color: #495057;
}

.error {
  color: #dc3545;
  text-align: center;
  padding: 40px;
}
</style>