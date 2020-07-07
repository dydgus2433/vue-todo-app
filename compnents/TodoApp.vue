<template>
  <div>
    <todo-item/>
    <todo-creator></todo-creator>
  </div>
</template>

<script>
  import TodoCreator from './TodoCreator'
  import TodoItem from './TodoItem'

  export default {
    components: {
      TodoCreator,
      TodoItem
    }

  }

</script>
