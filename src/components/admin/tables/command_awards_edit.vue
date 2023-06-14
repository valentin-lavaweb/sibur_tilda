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
      editItem: Object.assign({}, this.item)
    }
  },
  components:{
    TextEdit
  },
  methods:{
    endEdit(event){
      this.$emit('done', this.editItem);
    },
    setItem(item){
      this.editItem = Object.assign({}, item);
    }
  },
};
</script>




<template >
    <div class="container">

      <div class="Main_block-content">
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
          <button class="btn" @click="$emit('cancel')">
            <span>Отменить</span>
          </button>
          <button class="btn" @click="endEdit">
            <span>Завершить</span>
          </button>
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
    background: rgba(0, 0, 0, 0.4);
    z-index: 50;
    backdrop-filter: blur(10px);
    transition: all 0.25s ease;
}
.Main_block-content{
  width: 90vw;
  height: 90vh;
  max-width: 650px;
  max-height: 810px;
  padding: 10px 10px 10px 0;
  background-color: var(--white);
  justify-content: flex-start;
  border-radius: 20px;

  border: 1px solid rgba(0, 255, 242, 0.25);
  border-radius: 20px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

  backdrop-filter: blur(15px);

  transition: all 0.25s ease;

}
.block-content{
  width: 90vw;
  height: 90vh;
  max-width: 640px;
  max-height: 800px;
  padding: 20px 10px;
  justify-content: space-between;
  border-radius: 20px;
  overflow-y: auto;
  
}
.content{
  width: 100%;
  margin: 0 0 10px 0;
  justify-content: flex-start;
  align-items: flex-start;
}

.content-btn{
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0 0 0;
}

h3{
  width: 100%;
  color: var(--textColorBlack);
  margin: 0 0 20px 0;
  font-size: 20px;
  padding: 5px 10px;


  background: transparent;
  border: none;
  border-left: 1px solid rgba(255,255,255,0.3);
  border-top: 1px solid rgba(255,255,255,0.3);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 4px 4px 10px rgba(0,0,0,0.2);
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}
h2{
  width: 100%;
  color: var(--nipigasColorMain);
  margin: 0 20px 5px 0;
  padding: 0 0 0 10px;
  font-size: 20px;
  text-align: left;
  font-weight: 500;
  opacity: 0.7;
  font-size: 1.4rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

textarea{
  min-width: 100%;
  max-width: 100%;
  min-height: 80px;
  max-height: 80px;
  resize: none;
  color: var(--textColorBlack);
  font-size: 15px;
  padding: 5px 10px;

  background: transparent;
  border: none;
  border-left: 1px solid rgba(255,255,255,0.3);
  border-top: 1px solid rgba(255,255,255,0.3);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 4px 4px 10px rgba(0,0,0,0.2);
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

button{
  border: none;
  width: 250px;
	height: 50px;
  border-radius: 50px;
  cursor: pointer;
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s ease;
}

.btn:nth-child(1) {
  background: #ff1f7170;
}
.btn:nth-child(2) {
  background: #1eff4570;
}
 .btn:nth-child(1):hover {
	background: #ff1f71;
	box-shadow: 0 0 2px #ff1f71, 0 0 2px #ff1f71, 0 0 5px #ff1f71,
		0 0 10px #ff1f71;
}
.btn:nth-child(2):hover {
	background: #1eff45;
	box-shadow: 0 0 2px #1eff45, 0 0 2px #1eff45, 0 0 5px #1eff45,
		0 0 10px #1eff45;
}


@media (max-width: 600px) {
  .content-btn{
    flex-direction: column;
  }
  button{
    margin: 10px 0 0 0;
    width: 70%;
  }
}











img {
    width: 100px;
    height: 100px;
}
</style>