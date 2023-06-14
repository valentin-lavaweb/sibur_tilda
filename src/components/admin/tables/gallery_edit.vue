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
    async updateImage(event) {

        let files = event.target.files || event.dataTransfer.files;
        if (!files.length){
            this.editItem.image = null;
        }else{
            this.editItem.image = files[0];
        }
    },
    setItem(item){
      this.editItem = Object.assign({}, item);
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
          return new URL('storage/default_men.svg', import.meta.env.VITE_VUE_APP_API_URL);
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
            <div class="photoDownlouad-box">            
                <div class="input__wrapper">
                  <input name="file" type="file" :id="`input_edit_${editItem.id}`" class="input input__file" multiple="false"
                    @change="updateImage($event)">
                  <label :for="`input_edit_${editItem.id}`" class="input__file-button">
                      <span class="input__file-icon-wrapper">
                        <img class="input__file-icon" src="/download.png" alt="Выбрать файл">
                      </span>
                      <span class="input__file-button-text">Выберите файл</span>
                  </label>
                </div>
                <div class="img-block">
                  <img :src="imagePath" :alt="editItem.name">
                </div>
            </div>
          </div>

          <div class="content">
            <h2>Год</h2>
            <TextEdit :item="editItem" editProp="year" @updateItem="editItem = $event" />
          </div>


          <div class="content-btn">
            <button class="btn" @click="$emit('cancel')">Отменить</button>
            <button class="btn" @click="endEdit">Завершить</button>
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
.content.row-content{
  flex-direction: row;
  align-items: center;
}

.content-btn{
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0 0 0;
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

select {
  position: relative;
  display: flex;
  width: 100%;
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
  width: 100%;
  align-items: flex-start;
}
.inpu_gender span{
  position: absolute;
  top: 0;
  width: 100%;
  transform: translateY(-120%);
  padding: 5px 30px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  transition: all 0.25s ease;
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.2);
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
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
    width: 150px;
    height: auto;
}








.photoDownlouad-box{
  width: 100%;
  padding: 0 0 0 10px;
  flex-direction: row;
  justify-content: flex-start;
}
.input__wrapper {
  width: fit-content;
  position: relative;
  margin: 0px 20px 0px 0px;
}
 
.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
 
.input__file-icon-wrapper {
  height: 40px;
  width: 40px;
  margin-right: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  border-right: 1px solid #fff;
}
.input__file-icon-wrapper img{
  width: 20px;
  height: 20px;
}
 
.input__file-button-text {
  line-height: 1;
  margin-top: 1px;
}
 
.input__file-button {
  width: 100%;
  max-width: 290px;
  height: 40px;
  background: #1bbc9b;
  color: #fff;
  padding: 0 5px 0 0;
  font-size: 1.125rem;
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
}

</style>