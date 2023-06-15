<script>
import TextEdit from '../cells/textEdit.vue';

export default {
  name: "gallery_edit_many",
  emits:['cancel'],
  props:{
    initialYear: Number,
    createItem: Function
  },
  data() {
    return{
      editItem: {year: this.initialYear},
      images: [],
      loading: false
    }
  },
  components:{
    TextEdit
  },
  methods:{
    async startLoad(){
      this.loading = true;

      let allImages = this.images;

      while(allImages.length > 0 && this.loading){
        let image = allImages[0];

        let ok = await this.createItem({...this.editItem, image: image.img});
        if(!ok){
          break;
        }
        allImages.shift();
      }


      this.loading = false;

    },
    endEdit(event){
      this.$emit('done', this.editItem);
    },
    async updateImages(event) {

        let files = event.target.files || event.dataTransfer.files;
        if (!files.length){
            this.images = [];
        }else{
            this.images = [...files].map((img, idx) => {return {img, idx}});
        }
    },
    // setItem(item){
    //   this.editItem = Object.assign({}, item);
    // }

  },
  computed:{
    imagesToLoad(){

        return this.images.map(i => {return {...i, src: URL.createObjectURL(i.img)}});


        // if(typeof this.editItem.image === 'string'){
        //     try{
        //         let url = new URL(this.editItem.image);
        //         return url;
        //     }catch{
        //         let url = new URL('files/' + this.editItem.image + '/400', import.meta.env.VITE_VUE_APP_API_URL);
        //         return url;
        //     }
        // }else if(this.editItem.image === null){
        //   return new URL('storage/default_men.svg', import.meta.env.VITE_VUE_APP_API_URL);
        // }
        // else{
        //     return URL.createObjectURL(this.editItem.image);
        // }
    }

  }
};
</script>




<template >
      <div class="container" @click.self="$emit('cancel')">

        <div class="Main_block-content">
          <div class="block-content">

          <div class="content">
            <h2>Фото</h2>
            <div class="photoDownlouad-box">            
                <div class="input__wrapper">
                  <input name="file" type="file" id="input_edit_many" class="input input__file" :multiple="true"
                    @change="updateImages($event)">
                  <label for="input_edit_many" class="input__file-button">
                      <span class="input__file-icon-wrapper">
                        <img class="input__file-icon" src="/download.png" alt="Выбрать файл">
                      </span>
                      <span class="input__file-button-text">Выберите файлы</span>
                  </label>
                </div>
                <div class="container_img-block">
                  <transition-group name="imgAnimation_Admin" appear >
                    <div class="img-block"
                    v-for="img of imagesToLoad"
                    :key="img.idx"
                    >
                        <img :src="img.src">
                    </div>
                  </transition-group>
                    
                </div>
            </div>
          </div>

          <div class="content">
            <h2>Год</h2>
            <TextEdit :item="editItem" editProp="year" @updateItem="editItem = $event" />
          </div>


          <div class="content-btn">
            <button class="btn" @click="$emit('cancel')" :class="{active: !loading}">Отменить</button>
            <button class="btn" @click="startLoad" :class="{active: !loading}">Загрузить</button>
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

  pointer-events: none;
  filter: grayscale(1);
}

button.active{
  pointer-events: all;
  filter: none;
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
  flex-direction: column;
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


.container_img-block{
    margin: 20px 0 0 0;
    width: 100%;
    height: fit-content;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-x: hidden;
}
.img-block{
    width: 140px;
    height: 140px;
    margin: 0 5px 10px 0;
    overflow: hidden;
    transition: all 0.5s ease;
}
.img-block img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
}




</style>