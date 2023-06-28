<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";
import editable_text from '../editable_text.vue';

import gsap from "gsap";

export default {
  name: "main_page",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
    }
  },
  components:{
    header_comp,
    footer_comp,
    editable_text
  },
  methods: {

  },
  mounted() {
    gsap.from(".img-animate-gsap", { 
    x: 240,
    opacity: 0, 
    duration: 0.5,
    ease: "sine",
   });
   gsap.from(".text-animate-gsap", {
    x: -100,
    opacity: 0,
    duration: 0.25,
    stagger: 0.15,
    delay: 0.25,
    });
  },
  computed:{
    
  },
  watch:{

  },
};
</script>


<template>
  <div class="wrapper">
    <header_comp/>
    <div class="wrapper-block">
      <div class="content-block">
        <h2 class="subTitle text-animate-gsap">
          <editable_text dictionary_key="main_subtitle"/>
        </h2>
        <h1 class="title text-animate-gsap">
          ЭНЕРГИЯ <br> 
          ПРИЗНАНИЯ
        </h1>
        <span class="text text-animate-gsap ">  
          <editable_text dictionary_key="main_desc"/>
        </span>
        <span class="nigascol text-animate-gsap">
          <editable_text dictionary_key="main_subdesc"/>
        </span>
      </div>
      <div class="img-bg img-animate-gsap">
        <!-- <img src="/img/background_page/bg-main.svg" alt="bg-main"/> -->
        <img src="/img/background_page/bg-main_men.svg" alt="bg-main_men"/>
      </div>
      <div class="img-block img-animate-gsap">
        <!-- <img src="/img/bg-men.svg" class="men" alt="bg-men"/> -->
        <!-- <img src="/img/the_energy_of_recognition.svg" class="men" alt="the_energy_of_recognition"/>
        <img src="/img/wreath.svg" class="wreath left" alt="wreath"/>
        <img src="/img/wreath_right.svg" class="wreath right" alt="wreath"/> -->
      </div>
    </div>
    <footer_comp/>
  </div>
</template>

<style scoped>

.wrapper{
  width: 100%;
  height: 100%;
}
.wrapper-block{
   width: 1160px;
   height: fit-content;
   margin: 130px 0 300px 0;
}


.content-block{
  margin: 200px 0 0 0;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 2;
}
.subTitle{
  font-size: 1.9vw;
  color: var(--white);
}
.title{
  font-size: 4.8vw;
  font-weight: 700;
  color: var(--nipigasColorMainv2);
  line-height: 100%;
}
.text{
  font-size: 0.8vw;
  color: var(--nipigasColorMainv2);
  margin: 14px 0;
  white-space: pre-line;
  font-weight: 700;
}
.pinata{
  font-size: 0.9vw;
  font-weight: 700;
  color: var(--nipigasColorAdditional);
}
.nigascol{
  margin: 7vw 0 0 0;
  font-size: 1.7vw;
  font-weight: 700;
  white-space: pre-line;
  color: var(--nipigasColorAdditional);
}


.img-block{
  position: absolute;
  top: 0;
  right: 0;
  margin: 50px 0 0 0;
  transform: translateX(120px);
  z-index: 1;
}
.men{
  width: 635px;
}
.wreath{
  position: absolute;
  bottom: 200px;
  left: 35%;
  width: 180px;
  animation: wreathMove 3s ease infinite;
}
.wreath.right{
  left: unset;
  right: 12%;
  animation: wreathMove2 3s ease infinite;
}

@keyframes wreathMove {
  0% {
    transform: translateX(0px)translateY(0px)rotate(0deg);
    animation-timing-function: ease-out;
  }
  50% {
      transform: translateX(-30px)translateY(-10px)rotate(-10deg);
      animation-timing-function: ease-in;
  }
  100% {
      transform: translateX(1px)translateY(0px)rotate(0deg);
  }
}
@keyframes wreathMove2 {
  0% {
    transform: translateX(0px)translateY(0px)rotate(0deg);
    animation-timing-function: ease-out;
  }
  50% {
      transform: translateX(30px)translateY(-10px)rotate(10deg);
      animation-timing-function: ease-in;
  }
  100% {
      transform: translateX(1px)translateY(0px)rotate(0deg);
  }
}

.img-bg{
  position: absolute;
  top: 80px;
  width: 100vw;
  height: 39vw;
  /* overflow: hidden; */
}


@media (max-width: 1440px) {
    .wrapper-block{
        width: 80vw;
    }
    .img-block {
      margin: 5vw 0 0 0;
    }
    .img-block img:first-child{
      width: 50vw;
    }
    .wreath{
      width: 11vw;
      bottom: 9vw;
    }
    .content-block{
      margin: 16vw 0 0 0;
    }
    .subTitle{
      font-size: 1.8vw;
    }
    .title{
      font-size: 5.0vw;
    }
    .text{
      font-size: 1.1vw;
    }
    .nigascol {
      margin: 3vw 0 0 0;
    }
    .img-bg{
      height: 50vw;
    }
}
@media (max-width: 1060px) {
    .subTitle{
      color: var(--nipigasColorAdditional);
      font-size: 36px;
    }
    .title{
      font-size: 96px;
    }
    .text{
      font-size: 16px;
    }
    .nigascol{
      font-size: 20px;
    }
    .img-block {
      display: none;
    }
    .img-bg{
      display: none;
    }
}
@media (max-width: 980px) {

}
@media (max-width: 768px) {
  .subTitle{
      font-size: 24px;
    }
    .title{
      font-size: 66px;
    }
    .text{
      font-size: 16px;
    }
}
@media (max-width: 640px) {

}
@media (max-width: 480px) {
  .wrapper-block{
    margin: 120px 0 50px 0;
  }
  .subTitle{
    font-size: 20px;
  }
  .title{
    font-size: 44px;
  }
  .text{
    font-size: 16px;
  }
}
@media (max-width: 420px) {

}
@media (max-width: 380px) {

}
</style>