<template>
  <div class="input-div">
    <button @click="createTodo">
      <i
        class="material-icons"
        data-test="add"
      >add</i>
    </button>
    <input
      data-test="new-todo"
      :placeholder="placeholder"
      :value="title"
      type="text"
      @input="title = $event.target.value"
      @keypress.enter="createTodo"
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      placeholder: "할 일을 추가하세요!",
    };
  },
  methods: {
    createTodo() {
      const validatedTitle = this.title && this.title.trim();
      if (!validatedTitle) {
        alert("유효하지 않은 제목입니다!");
        this.title = this.title.trim();
        return;
      }
      console.log(this.title);
      // 생성

      this.$emit("create-todo", this.title); // create-todo :이벤트의 이름
      this.title = "";

      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    },
  },
};
</script>
<style>
.input-div {
  width: 100%;
}
</style>
