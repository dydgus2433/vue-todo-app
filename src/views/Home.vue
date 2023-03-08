<template>
  <section class="home">
    <div>
      <h1>용현's Home Page!</h1>
      <h2 @click="$router.push('/about')">About</h2>
      <router-link tag="h2" to="/todos">Todo App</router-link>
      <!--      <h2 @click="$router.push('/todos')">Todo App</h2>-->
    </div>
  </section>

</template>

<script>
  // export default {
  //   methods : {
  //     toAbout(){
  //       this.$router.push('/about')
  //     },
  //     toTodoApp(){
  //       this.$router.push('/todos')
  //     }
  //   }
  //
  // }
</script>
