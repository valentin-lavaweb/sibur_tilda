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

      <div class="block-content">
        <h3>ID: {{ editItem.id ?? '---' }}</h3>


        <div class="content">
          <h2>Номинации</h2>
          <TextEdit :item="editItem" editProp="nomination" @updateItem="editItem = $event" />
        </div>

        <div class="content">
          <h2>Описание проекта</h2>
          <TextEdit :item="editItem" editProp="description" @updateItem="editItem = $event" />
        </div>

        <div class="content">
          <h2>Авторы</h2>
          <TextEdit :item="editItem" editProp="authors" @updateItem="editItem = $event"/>
        </div>

        <div class="content">
          <h2>Год</h2>
          <TextEdit :item="editItem" editProp="year" @updateItem="editItem = $event" />
        </div>

        <div class="content-btn">
          <button @click="$emit('cancel')">Отменить</button>
          <button @click="endEdit">Завершить</button>
        </div>
      </div>

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
.block-content{
  width: 90vw;
  max-width: 640px;
  padding: 20px 10px;
  background-color: var(--white);
  justify-content: space-between;
  border-radius: 20px;
}
.content{
  width: 100%;
  flex-direction: row;
  margin: 0 0 20px 0;justify-content: space-between;
}

.content-btn{
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0 0 0;
}

h3{
  color: var(--textColorBlack);
  margin: 0 0 20px 0;
  font-size: 20px;
}
h2{
  width: 30%;
  color: var(--nipigasColorMain);
  margin: 0 20px 0 0;
  font-size: 20px;
  text-align: center;
  font-weight: 500;
}

textarea{
  min-width: 70%;
  max-width: 100%;
  min-height: 80px;
  max-height: 80px;
  resize: none;
  color: var(--textColorBlack);
  font-size: 15px;
  padding: 5px;
}

button{
  border: none;
  padding: 20px 55px;
  border-radius: 10px;
  cursor: pointer;
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s ease;
}
button:first-child{
  background-color: rgb(248, 109, 109);
}
button:first-child:hover{
  background-color: rgb(247, 71, 71);
}
button:last-child{
  background-color: rgb(84, 192, 89);
}
button:last-child:hover{
  background-color: rgb(54, 212, 62);
}


img {
    width: 100px;
    height: 100px;
}
</style>