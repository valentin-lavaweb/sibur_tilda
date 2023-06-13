<script>
import TextEdit from '../cells/textEdit.vue';

export default {
  name: "command_awards_edit",
  emits:['done', 'cancel'],
  props:{
    item: Object,
  },
  data() {
    return{
      editItem: this.item,

    }
  },
  components:{
    TextEdit
  },
  methods:{
    endEdit(event){
      this.$emit('done', this.editItem);
    },
  },
};
</script>




<template >
    <div class="container">

        <div>ID: {{ editItem.id ?? '---' }}</div>


        <TextEdit :item="editItem" editProp="nomination" @updateItem="editItem = $event" />

        <TextEdit :item="editItem" editProp="description" @updateItem="editItem = $event" />

        <TextEdit :item="editItem" editProp="authors" @updateItem="editItem = $event"/>

        <TextEdit :item="editItem" editProp="year" @updateItem="editItem = $event" />
        

        <button @click="$emit('cancel')">Отменить</button>
        <button @click="endEdit">Завершить</button>
    </div>
  </template>


<style scoped>
.container{
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 50;
}

img {
    width: 100px;
    height: 100px;
}
</style>