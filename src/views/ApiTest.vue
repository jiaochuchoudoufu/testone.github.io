<template>
    <div class="page">
        <h1>axios测试</h1>
        
        <!--添加文章-->
        <div class="add-from">
          <h3>添加新文章</h3>
          <input v-model="newPost.title" placeholder="标题" class="input">
          <textarea v-model="newPost.body" placeholder="内容" class="textarea"></textarea>
          <button @click="addPost" class="btn-add" :disabled="submiting">{{ submiting ? "提交中" : "提交" }}</button>
        </div>

        <hr>

        <button @click="fetchPosts" class="btn">获取文章列表</button>

        <div v-if="loading" class="loading">加载中...</div>

        <div v-else-if="posts.length > 0" class="posts">
            <div v-for="post in posts" :key="post.id" @click="goToDetail(post.id)" class="post-item">
                <h3>{{ post.title }}</h3>
                <p>{{ post.body }}</p>
                <span class="read-more">点击查看详情</span>
            </div>
        </div>

        <div v-else-if="error" class="error">出错了：{{ error }}</div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';

    const router = useRouter()
    const route = useRoute()
    
    const submiting = ref(false)
    const newPost = ref({
      title: '',
      body: ''
    })
    const posts = ref([])
    const loading = ref(false)
    const error = ref(null)

    //添加新文章
    const addPost = async() => {
      if(!newPost.value.title || !newPost.value.body){
        alert('标题或文章内容不能为空')
        console.log(newPost.title ,newPost.body )
        return
      }

      //设置sub参数，防止重复点击
      if(submiting.value)return
      submiting.value = true
      try{
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts',{
          title: newPost.title,
          body: newPost.body,
          userId: "Unknown Author"
        })

        console.log('添加成功', response.data)
        alert('添加成功，返回文章id：' + response.data.id)

        //清空列表
        newPost.value = {
          title:'',
          body:''
        }

        //重新获取列表
        await fetchPosts()
      } catch (err) {
        alert('添加失败' + err.message)
      } finally {
        submiting.value = false
      }
    }

    const fetchPosts = async() => {
        loading.value = true
        error.value = null

        try{
            //GET请求
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            posts.value = response.data  //数据在response.data里
            console.log("获取成功", posts.value)
        }catch (err) {
            error.value = err.message
            console.log("获取失败", err)
        }finally {
            loading.value = false  //释放提交按钮
        }
    }

    const goToDetail = (id) => {
      router.push(`/postpage/${id}`)
    }
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.post-item {
  background: #f8f9fa;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.post-item h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.post-item p {
  margin: 0;
  color: #666;
}

.error {
  color: #dc3545;
  text-align: center;
  padding: 20px;
}
/* 添加手型光标 */
.post-item {
  cursor: pointer;
  transition: all 0.2s;
}

.post-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.read-more {
  display: inline-block;
  margin-top: 10px;
  color: #42b983;
  font-size: 14px;
}
.add-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.add-form h3 {
  margin: 0 0 15px 0;
}

.input, .textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.textarea {
  min-height: 80px;
  resize: vertical;
}

.btn-add {
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

hr {
  margin: 20px 0;
}

.post-item {
  cursor: pointer;
  background: #f8f9fa;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  transition: all 0.2s;
}

.post-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.read-more {
  display: inline-block;
  margin-top: 10px;
  color: #42b983;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 20px;
}

.error {
  color: #dc3545;
  text-align: center;
  padding: 20px;
}
</style>