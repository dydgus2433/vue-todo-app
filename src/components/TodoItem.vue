<template>
  <div
    :class="{ done }"
    class="todo-item"
  >
    <div
      v-if="isEditMode"
      class="item__inner item--edit"
    >
      <input
        ref="titleInput"
        :value="editedTitle"
        type="text"
        @input="editedTitle = $event.target.value"
        @keypress.end="offEditMode"
        @keypress.enter="editedTodo"
      >
      <div class="item__actions">
        <button @click="editedTodo">
          <i class="material-icons">done</i>
        </button>
        <button @click="offEditMode">
          <i class="material-icons">clear</i>
        </button>
      </div>
    </div>
    <div
      v-else
      class="item__inner item--normal"
    >
      <label>
        <input
          v-model="todo.done"
          type="checkbox"
          @click="updateTodo"
        >
        <span class="icon"><i class="material-icons">check</i></span>
      </label>
      <div class="item__title-wrap">
        <div class="item__title">
          {{ todo.title }}
        </div>
        <div class="item_date">
          {{ date }}
        </div>
      </div>
      <div class="item_actions">
        <button
          class="btn"
          @click="onEditMode"
        >
          <i class="material-icons">edit</i>
        </button>
        <button
          class="btn btn--danger"
          @click="deleteMode"
        >
          <i class="material-icons">delete</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditMode: false,
      editedTitle: "",
    };
  },
  computed: {
    done: {
      get() {
        return this.todo.done;
      },
      set(done) {
        this.updateTodo({
          done,
        });
      },
    },
    date() {
      const date = dayjs(this.todo.createdAt);
      const isSame = date.isSame(this.todo.updatedAt);
      if (isSame) {
        return date.format("YYYY년 MM월 DD일");
      } else {
        return `${date.format("YYYY년 MM월 DD일")} (edited)`;
      }
    },
  },
  methods: {
    editedTodo() {
      if (this.todo.title !== this.editedTitle) {
        this.updateTodo({
          title: this.editedTitle,
          updatedAt: new Date(),
        });
      }
      this.offEditMode();
    },
    onEditMode() {
      this.isEditMode = true;
      this.editedTitle = this.todo.title;

      this.$nextTick(() => {
        this.$refs.titleInput.focus();
      });
    },
    offEditMode() {
      this.isEditMode = false;
    },

    updateTodo(value) {
      console.log("updateTodo emit");
      this.$emit("update-todo", this.todo, value);
    },
    deleteMode() {
      console.log("deleteMode emit");
      this.$emit("delete-todo", this.todo);
    },
  },
};
</script>
