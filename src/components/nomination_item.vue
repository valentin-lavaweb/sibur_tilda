<script>
import { useGameStore } from '@/stores/interface-interaction.js';

export default {
  props:{
    item: Object,
  },
  name: "nomination_item",
  computed:{
    imagePath(){
        if(this.item.image){
            try{
                let url = new URL(this.item.image);
                return url;
            }catch{
                let url = new URL('files/' + this.item.image, import.meta.env.VITE_VUE_APP_API_URL);
                return url;
            }
        }else{
                return new URL('storage/default_command.jpg', import.meta.env.VITE_VUE_APP_API_URL);
          
            
        }
        
    }
  }
};
</script>

<template>
    <div class="nomination-item">
      <div class="front-item-content">
        <div class="item-content">
          <h3 class="subTitle">
            <span>
              <img src="/img/degree_left.svg" alt="degree">
            </span>  
            {{ item.nomination }}
            <span>
              <img src="/img/degree_right.svg" alt="degree">
            </span>  
          </h3>
          <span class="text">
            {{ item.description }}
          </span>
          <span class="autorText">
              <span class="autorBlock">
                  Авторы:
              </span>
              {{ item.authors }}
          </span>  
          <!-- <button class="show_winers">
            Показать победителей
          </button> -->
        </div>
      </div>
      <div class="back-item-content">
        <img :src="imagePath" alt="backImage">
      </div>
    </div>
</template>

<style scoped>
/* .show_winers{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 30px 0 0 0;
  padding: 5px 35px;
  font-weight: 600;
  border-radius: 5px;
  background-color: var(--nipigasColorMain);
  color: var(--white);
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}
.show_winers:hover{
  background-color: var(--nipigasColorMain-hover);
} */

.front-item-content{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 2;
  border-radius: 10px;
  background-color: rgba(246, 246, 246, 1);
  padding: 25px 15px;
  transition: all 0.5s ease;
}
.back-item-content{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
  border-radius: 10px;
  background-color: rgba(246, 246, 246, 1);
  transition: all 0.5s ease;
  opacity: 0;
}
.back-item-content img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.front-item-content:hover{
  opacity: 0;
}
.front-item-content:hover~.back-item-content{
  opacity: 1;
}


.nomination-item{
  width: 545px;
  height: 240px;
  background-color: rgba(246, 246, 246, 1);
  border: 1px solid rgba(0, 140, 149, 0.0);
  border-radius: 10px;
  padding: 25px 15px;
  margin: 0 0 30px 0;
  justify-content: flex-start;
  transition: all 0.25s ease;
}

.subTitle > span{
  display: flex;
}
span img{
  width: 20px;
  transform-origin: bottom;
  transition: all 0.25s ease;
}
.nomination-item:hover{
  border: 1px solid rgba(252, 194, 23, 0);
}
.nomination-item:hover span:first-child img{
  animation: wreathMove 3s ease infinite;
}
.nomination-item:hover span:last-child img{
  animation: wreathMove2 3s ease infinite;
}

/* @keyframes wreathMove {
  0% {
    animation-timing-function: ease-out;
  }
  50% {
      transform: rotate(-10deg);
      animation-timing-function: ease-in;
  }
  100% {
  }
}
@keyframes wreathMove2 {
  0% {
    animation-timing-function: ease-out;
  }
  50% {
      transform: rotate(10deg);
      animation-timing-function: ease-in;
  }
  100% {

  }
} */


.item-content{
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  overflow-y: auto;
  z-index: 2;
}
.subTitle{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: var(--nipigasColorAdditional);
  margin: 0 0 25px 0;
}
.text{
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: var(--textColorBlack);
  margin: 0 0 20px 0;
  line-height: 110%;
}
.autorText{
  width: 100%;
  height: fit-content;
  font-size: 16px;
  font-weight: 500;
  color: var(--textColorBlack);
  text-align: center;
}
.autorBlock{
  font-size: 16px;
  font-weight: 700;
  color: var(--nipigasColorMain);
}



@media (max-width: 1440px) {
  .subTitle{
    font-size: 1.2vw;
  }
  .text{
    font-size: 1.1vw;
  }
  .autorText{
    font-size: 1vw;
  }
  .autorBlock{
    font-size: 1vw;
  }
}
@media (max-width: 1024px) {
  .subTitle{
    font-size: 20px;
  }
  .text{
    font-size: 18px;
  }
  .autorText{
    font-size: 16px;
  }
  .autorBlock{
    font-size: 16px;
  }

}
@media (max-width: 980px) {

}
@media (max-width: 768px) {

}
@media (max-width: 640px) {

}
@media (max-width: 480px) {


}
@media (max-width: 420px) {

}
@media (max-width: 380px) {

}
</style>