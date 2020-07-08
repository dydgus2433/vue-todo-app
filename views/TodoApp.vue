<template>
  <div class="todo-app">
    <div class="todo-app__actions">
      <div class="filters">

        <router-link tag="button" to="all">
          모든 항목 ({{total}})
        </router-link>
        <router-link tag="button" to="active">해야 할 항목 ({{activeCount}})
        </router-link>
        <router-link tag="button" to="completed">완료된 항목 ({{completedCount}})
        </router-link>
      </div>

      <div class="actions clearfix">
        <div class="float--left ">
          <label>
            <input
              type="checkbox"
              v-model="allDone"/>
            <!--            span.icon>i.material-icons{done_all} 에밋 문법-->
            <span class="icon"><i class="material-icons">done_all</i></span>

          </label>
        </div>
        <div class="float--right clearfix">
          <button @click="scrollToTop" class="btn float--left">
            <span class="icon"><i class="material-icons">expand_less</i></span>

          </button>
          <button @click="scrollToBottom" class="btn float--left">

            <span class="icon"><i class="material-icons">expand_more</i></span>

          </button>

          <button
            @click="clearCompleted"
            class="btn btn--danger  float--left">
            <i class="material-icons">delete_sweep</i>

          </button>
        </div>

      </div>

    </div>

    <div class="todo-app__list">
      <todo-item
        :key="todo.id"
        :todo="todo"
        @delete-todo="deleteTodo"
        @update-todo="updateTodo"
        v-for="todo in filteredTodos"
      />
    </div>
    <div class="todo-app__creator">
      <todo-creator @create-todo="createTodo"/>
    </div>
  </div>
</template>

<script>
  import lowdb from 'lowdb' // 로우디비 자체를 어댑터와 연결을 해줘야함
  import LocalStorage from 'lowdb/adapters/LocalStorage'
  import cryptoRandomString from 'crypto-random-string'
  import _cloneDeep from 'lodash/cloneDeep'
  import _find from 'lodash/find'
  import _assign from 'lodash/assign'
  import _findIndex from 'lodash/findIndex'
  import _forEachRight from 'lodash/forEachRight'
  import scrollTo from 'scroll-to'
  import TodoCreator from '~/components/TodoCreator'
  import TodoItem from '~/components/TodoItem'

  // import _ from 'lodash' //전부다 가져오면 용량이 원하는 기능에 비해 너무 큼
  // _.cloneDeep()

  export default {
    components: {
      TodoCreator,
      TodoItem
    },
    data() {
      return {
        db: null, // 아직 무엇을 넣을지 정해지않을때 null
        todos: []
        // filter: 'all' // 모든 항목
      }
    },
    computed: {
      filteredTodos() {
        switch (this.$route.params.id) {
          case 'all' :
          default :
            return this.todos
          case 'active' :
            return this.todos.filter(todo => !todo.done)
          case 'completed' :
            return this.todos.filter(todo => todo.done)
        }
      },
      total() {
        return this.todos.length
      },
      activeCount() {
        return this.todos.filter(todo => !todo.done).length
      },
      completedCount() {
        return this.total - this.activeCount
      },
      allDone: {
        get() {
          return this.total === this.completedCount && this.total > 0
        },
        set(checked) {
          this.completeAll(checked)
        }
      }
    },
    created() {
      this.initDB()
    },
    methods: {
      initDB() {
        const adapter = new LocalStorage('todo-app') // DB
        this.db = lowdb(adapter) // 연결이 되는 순간 로우디비가 로컬스토리지에 있는 todo-app을 반환합니다

        console.log(this.db) // lodash로 읽고 쓰고 하기 좋게 하는 라이브러리

        const hasTodos = this.db.has('todos').value // value를 붙여야 lodach로 인한 값을 가져올 수 있음
        if (hasTodos) {
          this.todos = _cloneDeep(this.db.getState().todos)
        } else {
          // 로컬 디비 초기화
          this.db // this.db undefined + todos 병합 하는 코드
            .defaults({
              todos: [] // Collection
            })
            .write() // write 작성하겠다.
        }
      },
      createTodo(title) {
        const newTodo = {
          id: cryptoRandomString({length: 10}),
          title, // = title : title,
          createdAt: new Date(),
          updatedAt: new Date(),
          done: false

        }
        // Create DB
        this.db
          .get('todos') // lodash
          .push(newTodo) // lodash
          .write() // lowdb

        // Create Client
        this.todos.push(newTodo)
      },
      updateTodo(todo, value) {
        this.db
          .get('todos')
          .find({id: todo.id})
          .assign(value)
          .write()

        const foundTodo = _find(this.todos, {id: todo.id})
        _assign(foundTodo, value)
      },
      deleteTodo(todo) {
        this.db
          .get('todos')
          .remove({id: todo.id})
          .write()

        // _remove(this.todos, {id : todo.id}) //화면갱신이 안됨
        const fountIndex = _findIndex(this.todos, {id: todo.id})
        this.$delete(this.todos, fountIndex) // 한계를 극복하기위해 사용하지만 거의 사용하지 말아야함
      },
      completeAll(checked) {
        // DB 갱신
        const newTodos = this.db
          .get('todos')
          .forEach(todo => {
            todo.done = checked
          })
          .write()
        // Local Todos 갱신
        // this.todos.forEach(todo => {
        //   todo.done = checked
        // })

        // 실무적으로 api 반환되면
        // 일반적으론 원격에 저장되지만 여기에선 그대로 수정하면 안됨
        // 일반적인 경우에는 그냥 할당하면 됨. 현재는 참조관계가 발생하면 안되는 구조기 때문에 깊은 복사필요
        this.todos = _cloneDeep(newTodos)
      },
      clearCompleted() {
        // 앞에서 지워서 비정상작동
        // this.todos.forEach(todo => {
        //   if(todo.done){
        //     this.deleteTodo(todo)
        //   }
        // })

        // 뒤에서 부터 삭제하면 정상작동(일반론)
        this.todos.reduce((list, todo, index) => {
          if (todo.done) {
            list.push(index)
          }
          return list
        }, [])
          .reverse()
          .forEach(index => {
            this.deleteTodo(this.todos[index])
          })

        _forEachRight(this.todos, todo => {
          if (todo.done) {
            this.deleteTodo(todo)
          }
        })
      },
      scrollToTop() {
        scrollTo(0, 0, {
          ease: 'linear'
        })
      },
      scrollToBottom() {
        scrollTo(0, document.body.scrollHeight, {
          ease: 'linear'
        })
      }
    }

  }

</script>
<style lang="scss">
  @import "scss/style"; // _style.scss 앞에 '_'가 동작하지않음
  .filters button.router-link-exact-active {
    background: royalblue;
    color: white;
  }
</style>
