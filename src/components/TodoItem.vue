<template>

  <div
    :class="{done }"
    class="todo-item">
    <div class="item__inner item--edit" v-if="isEditMode">
      <input
        :value="editedTitle"
        @input="editedTitle = $event.target.value"
        @keypress.end="offEditMode"
        @keypress.enter="editedTodo"
        ref="titleInput"
        type="text"
      />
      <div class="item__actions">
        <button
          @click="editedTodo">

          <i class="material-icons">done</i>
        </button>
        <button
          @click="offEditMode">

          <i class="material-icons">clear</i>
        </button>
      </div>
    </div>
    <div class="item__inner item--normal" v-else>
      <label>
        <input
          @click="updateTodo"
          type="checkbox"
          v-model="todo.done"
        />
        <span class="icon"><i class="material-icons">check</i></span>
      </label>
      <div class="item__title-wrap">
        <div class="item__title">
          {{todo.title}}
        </div>
        <div class="item_date">
          {{date}}
        </div>
      </div>
      <div class="item_actions">
        <button
          @click="onEditMode"
          class="btn">
          <i class="material-icons">edit</i>
        </button>
        <button
          @click="deleteMode"
          class="btn btn--danger">
          <i class="material-icons">delete</i>
        </button>
      </div>

    </div>

  </div>
</template>

<script>
  import dayjs from 'dayjs'

  export default {
    props: {
      todo: Object
    },
    data() {
      return {
        isEditMode: false,
        editedTitle: ''
      }
    },
    computed: {
      done: {
        get() {
          return this.todo.done
        },
        set(done) { // 들어왔을때 어떻게 처리할지
          this.updateTodo({
            done
          })
        }
      },
      date() {
        const date = dayjs(this.todo.createdAt)
        const isSame = date.isSame(this.todo.updatedAt)
        if (isSame) {
          return date.format('YYYY년 MM월 DD일')
        } else {
          return `${date.format('YYYY년 MM월 DD일')} (edited)`
        }
      }
    },
    methods: {
      editedTodo() {
        if (this.todo.title !== this.editedTitle) {
          this.updateTodo({
            title: this.editedTitle,
            updatedAt: new Date()
          })
        }
        this.offEditMode()
      },
      onEditMode() {
        this.isEditMode = true
        this.editedTitle = this.todo.title

        this.$nextTick(() => {
          this.$refs.titleInput.focus()
        })
      },
      offEditMode() {
        this.isEditMode = false
      },

      updateTodo(value) {
        console.log('updateTodo emit')
        this.$emit('update-todo', this.todo, value)
      },
      deleteMode() {
        console.log('deleteMode emit')
        this.$emit('delete-todo', this.todo)
      }
    }
  }
</script>
