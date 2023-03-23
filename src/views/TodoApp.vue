<template>
  <div class="todo-app">
    <div class="todo-app__actions">
      <div class="filters">
        <router-link
          tag="button"
          to="all"
        >
          모든 항목 ({{ total }})
        </router-link>
        <router-link
          tag="button"
          to="active"
        >
          해야 할 항목 ({{ activeCount }})
        </router-link>
        <router-link
          tag="button"
          to="completed"
        >
          완료된 항목 ({{ completedCount }})
        </router-link>
      </div>

      <div class="actions clearfix">
        <div class="float--left">
          <label>
            <input
              v-model="allDone"
              type="checkbox"
            >
            <span class="icon"><i class="material-icons">done_all</i></span>
          </label>
        </div>
        <div class="float--right clearfix">
          <button
            class="btn float--left"
            @click="scrollToTop"
          >
            <span class="icon"><i class="material-icons">expand_less</i></span>
          </button>
          <button
            class="btn float--left"
            @click="scrollToBottom"
          >
            <span class="icon"><i class="material-icons">expand_more</i></span>
          </button>

          <button
            class="btn btn--danger float--left"
            @click="clearCompleted"
          >
            <i class="material-icons">delete_sweep</i>
          </button>
        </div>
      </div>
    </div>

    <div class="todo-app__list">
      <todo-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @delete-todo="deleteTodo"
        @update-todo="updateTodo"
      />
    </div>
    <div class="todo-app__creator">
      <todo-creator @create-todo="createTodo" />
    </div>
  </div>
</template>

<script>
import lowdb from "lowdb"; // 로우디비 자체를 어댑터와 연결을 해줘야함
import LocalStorage from "lowdb/adapters/LocalStorage";
import cryptoRandomString from "crypto-random-string";
import _cloneDeep from "lodash/cloneDeep";
import _find from "lodash/find";
import _assign from "lodash/assign";
import _findIndex from "lodash/findIndex";
import _forEachRight from "lodash/forEachRight";
import scrollTo from "scroll-to";
import TodoCreator from "@/components/TodoCreator";
import TodoItem from "@/components/TodoItem";
import { objectMethod } from "@babel/types";

// import _ from 'lodash' //전부다 가져오면 용량이 원하는 기능에 비해 너무 큼
// _.cloneDeep()

export default {
  components: {
    TodoCreator,
    TodoItem,
  },
  data() {
    return {
      db: null, // 아직 무엇을 넣을지 정해지않을때 null
      todos: [],
    };
  },
  computed: {
    filteredTodos() {
      switch (this.$route.params.id) {
        case "all":
        default:
          return this.todos;
        case "active":
          return this.todos.filter((todo) => !todo.done);
        case "completed":
          return this.todos.filter((todo) => todo.done);
      }
    },
    total() {
      return this.todos.length;
    },
    activeCount() {
      return this.todos.filter((todo) => !todo.done).length;
    },
    completedCount() {
      return this.total - this.activeCount;
    },
    allDone: {
      get() {
        return this.total === this.completedCount && this.total > 0;
      },
      set(checked) {
        this.completeAll(checked);
      },
    },
  },
  created() {
    this.initDB();
  },
  methods: {
    initDB() {
      /**  작동하는코드
      const adapter = new LocalStorage("todo-app"); // DB
      this.db = lowdb(adapter); // 연결이 되는 순간 로우디비가 로컬스토리지에 있는 todo-app을 반환합니다

      console.log(this.db); // lodash로 읽고 쓰고 하기 좋게 하는 라이브러리

      const hasTodos = this.db.has("todos").value(); // value를 붙여야 lodach로 인한 값을 가져올 수 있음
      if (hasTodos) {
        this.todos = this.db.get("todos").value();
      } else {
        // 로컬 디비 초기화
        this.db // this.db undefined + todos 병합 하는 코드
          .defaults({
            todos: [], // Collection
          })
          .write(); // write 작성하겠다.
      }
       */
      this.todos = [];
    },
    createTodo(title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }),
        title, // = title : title,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false,
      };
      this.todos.push(newTodo);
      // Create DB
      // this.db
      //   .get("todos") // lodash
      //   .push(newTodo) // lodash
      //   .write(); // lowdb
    },
    updateTodo(todo, value) {
      const index = this.todos.findIndex((item) => {
        return item.id === todo.id;
      });
      const obj = this.todos[index];
      obj.title = value.title ? value.title : obj.title;
      obj.updatedAt = value.updatedAt ? value.updatedAt : obj.updatedAt;
      this.todos[index] = obj;
    },
    deleteTodo(todo) {
      debugger;
      const index = this.todos.findIndex((item) => {
        return item.id === todo.id;
      });
      if (index > -1) this.todos.splice(index, 1);
      // this.db.get("todos").remove({ id: todo.id }).write();
    },
    completeAll(checked) {
      const newTodos = this.todos.forEach((todo) => {
        todo.done = checked;
      });
      // DB 갱신
      // const newTodos = this.db
      //   .get("todos")
      //   .forEach((todo) => {
      //     todo.done = checked;
      //   })
      //   .write();
    },
    clearCompleted() {
      _forEachRight(this.todos, (todo) => {
        if (todo.done) {
          this.deleteTodo(todo);
        }
      });
    },
    scrollToTop() {
      scrollTo(0, 0, {
        ease: "linear",
      });
    },
    scrollToBottom() {
      scrollTo(0, document.body.scrollHeight, {
        ease: "linear",
      });
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/style"; // _style.scss 앞에 '_'가 동작하지않음
.filters button.router-link-exact-active {
  background: royalblue;
  color: white;
}
</style>
