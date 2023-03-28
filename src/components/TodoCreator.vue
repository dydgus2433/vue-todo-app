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
      @keypress.enter="emitTodo"
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
    emitTodo() {
      const validatedTitle = this.title && this.title.trim();
      if (!validatedTitle) return alert("유효하지 않은 제목입니다!");
      this.$emit("create-todo", this.title);
      this.title = "";
    },
  },
};
</script>
<style>
.input-div {
  width: 100%;
}
</style>
