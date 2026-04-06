<template>
  <div class="app">
    <!--导航栏-->
    <nav class="nav">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/add" class="nav-link">添加</router-link>
      <router-link to="/list" class="nav-link">列表</router-link>
      <router-link to="/apitest" class="nav-link">API测试</router-link>
      <router-link to="/element" class="nav-link">Element Plus</router-link>
      <router-link to="/profile" class="nav-link">个人资料卡</router-link>
      <router-link to="/composableDemo" class="nav-link">组合式函数测试</router-link>
      <router-link to="/lifecycleDemo" class="nav-link">生命周期演示</router-link>
      <router-link to="/directiveDemo" class="nav-link">自定义指令演示</router-link>
    </nav>

    <!--页面内容-->
    <router-view />
  </div>
</template>
<script setup>


</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  background: #f5f5f5;
}

.nav {
  background: #2c3e50;
  padding: 15px 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: #42b983;
}

.router-link-active {
  background: #42b983;
}
</style>
