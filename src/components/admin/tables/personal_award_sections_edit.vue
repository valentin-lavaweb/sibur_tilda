<script>
import TextEdit from '../cells/textEdit.vue';

export default {
  name: "personal_award_sections_edit",
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

      <div class="Main_block-content">
        <div class="block-content">
        <h3>ID: {{ editItem.id ?? '---' }}</h3>


        <div class="content">
          <h2>Название раздела</h2>
          <TextEdit :item="editItem" editProp="title" @updateItem="editItem = $event" />
        </div>

        <div class="content">
          <h2>Фильтр по выдавшему</h2>
          <div class="inpu_gender">
            <input type="checkbox" v-model="editItem.issuer_filter" />  
          </div>
        </div>

        <div class="content">
          <h2>Фильтр по компании</h2>
          <div class="inpu_gender">
            <input type="checkbox" v-model="editItem.company_filter" />  
          </div>
        </div>

        <div class="content">
          <h2>Фильтр по степени</h2>
          <div class="inpu_gender">
            <input type="checkbox" v-model="editItem.grade_filter" />  
          </div>
        </div>

        <div class="content-btn">
          <button @click="$emit('cancel')">Отменить</button>
          <button @click="endEdit">Завершить</button>
        </div>
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
.Main_block-content{
  width: 90vw;
  height: 90vh;
  max-width: 650px;
  max-height: 810px;
  padding: 10px 0px 10px 0;
  background-color: var(--white);
  justify-content: flex-start;
  border-radius: 20px;
}
.block-content{
  width: 90vw;
  max-width: 640px;
  padding: 20px 10px;
  background-color: var(--white);
  justify-content: space-between;
  border-radius: 20px;
  overflow-y: auto;
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
  text-align: left;
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

.inpu_gender{
  width: calc(100% - 200px);
}

img {
    width: 100px;
    height: 100px;
}
</style>