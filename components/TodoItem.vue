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
          @click="editedTodo">완료
        </button>
        <button
          @click="offEditMode">취소
        </button>
      </div>
    </div>
    <div class="item__inner item--normal" v-else>
      <input
        @click="updateTodo"
        type="checkbox"
        v-model="todo.done"
      />
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
          @click="onEditMode">수정
        </button>
        <button
          @click="deleteMode">삭제
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

<style lang="scss" scoped>
  .todo-item {
    margin-bottom: 10px;

    .item__inner {
      display: flex;
    }

    .item__date {
      font-size: 12px;
    }

    &.done { // done이라는 클래스가 있어야지만 나오는 부분
      .item__title {
        text-decoration: line-through;
      }
    }
  }

</style>
