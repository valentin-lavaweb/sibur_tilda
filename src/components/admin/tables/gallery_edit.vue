<script>
import TextEdit from '../cells/textEdit.vue';

export default {
  name: "gallery_edit",
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
    async updateImage(event) {

        let files = event.target.files || event.dataTransfer.files;
        if (!files.length){
            this.editItem.image = null;
        }else{
            this.editItem.image = files[0];
        }
    }

  },
  computed:{
    imagePath(){
        if(typeof this.editItem.image === 'string'){
            try{
                let url = new URL(this.editItem.image);
                return url;
            }catch{
                let url = new URL('storage/' + this.editItem.image, import.meta.env.VITE_VUE_APP_API_URL);
                return url;
            }
        }else if(this.editItem.image === null){
            if (this.editItem.gender) {
                return new URL('storage/default_men.svg', import.meta.env.VITE_VUE_APP_API_URL);
            } else {
                return new URL('storage/default_women.svg', import.meta.env.VITE_VUE_APP_API_URL);
            }
        }
        else{
            return URL.createObjectURL(this.editItem.image);
        }
    }

  }
};
</script>




<template >
      <div class="container">

        <div class="block-content">
          <h3>ID: {{ editItem.id ?? '---' }}</h3>

          <div class="content">
            <h2>Фото</h2>
            <img :src="imagePath" :alt="editItem.name">
            <input type="file" accept="image/*" multiple="false" @change="updateImage($event)">
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
  height: 90vh;
  max-width: 640px;
  max-height: 800px;
  padding: 20px 15px 20px 10px;
  background-color: var(--white);
  justify-content: flex-start;
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
  width: 200px;
  color: var(--nipigasColorMain);
  margin: 0 20px 0 0;
  font-size: 20px;
  text-align: center;
  font-weight: 500;
}

textarea{
  min-width: calc(100% - 200px);
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

select {
  position: relative;
  display: flex;
  width: calc(100% - 200px);
  height: 100%;
  border-radius: 5px;
  background-color: var(--white);
  font-size: 16px;
  font-weight: 500;
  color: var(--textColorBlack);
  border: 1px solid var(--nipigasColorMain);
  padding: 5px 10px 5px 10px;
  cursor: pointer;
}

option {
  padding: 5px;
  cursor: pointer;
}

.inpu_gender{
  width: calc(100% - 200px);
}
.inpu_gender span{
  position: absolute;
  top: 0;
  transform: translateY(-120%);
  padding: 5px 30px;
  border-radius: 10px;
  background-color: rgb(233, 233, 233);
  transition: all 0.25s ease;
  opacity: 0;
  pointer-events: none;
}
.inpu_gender span div{
  color: var(--textColorBlack);
  flex-direction: row;
}
.inpu_gender span div input{
  pointer-events: none;
}
.inpu_gender:hover span{
  opacity: 1;
}

input{
  color: var(--textColorBlack);
}

img {
    width: 100px;
    height: 100px;
}
</style>