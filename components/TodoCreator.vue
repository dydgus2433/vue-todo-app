<template>
  <div>
    <button @click="createTodo">추가</button>
    <input
      :placeholder="placeholder"
      :value="title"
      @input="title = $event.target.value"
      @keypress.enter="createTodo"
      type="text"/>

  </div>

</template>
<script>
  export default {
    data() {
      return {
        title: '',
        placeholder: '할 일을 추가하세요!'
      }
    },
    methods: {
      createTodo() {
        console.log('에오');
        const validatedTitle = this.title && this.title.trim()
        if (!validatedTitle) {
          alert('유효하지 않은 제목입니다!')
          this.title = this.title.trim()
          return
        }
        console.log(this.title)
        // 생성

        this.$emit('create-todo', this.title) // create-todo :이벤트의 이름
        this.title = ''
      }
    }
  }

</script>
