<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

import gsap from "gsap";

export default {
  name: "certificates",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
    }
  },
  components:{
    header_comp,
    footer_comp,
  },
  methods: {

  },
  mounted() {
    gsap.from(".img-animate-gsap", {
    opacity: 0,
    scale: 0.5,
    duration: 0.5,
    delay: 0.25,
    ease: "sine",
    });
    gsap.from(".text-animate-gsap", {
    x: -100,
    opacity: 0,
    duration: 0.25,
    stagger: 0.15,
    delay: 0.25,
    });
    gsap.from(".text-subTitle-animate-gsap", {
    opacity: 0,
    duration: 0.5,
    delay: 0.5,
    });
    gsap.from(".text-text-animate-gsap", {
    opacity: 0,
    duration: 0.5,
    delay: 0.75,
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
    <div class="bg-element img-animate-gsap">
      <img src="/img/background_page/certificates.svg" alt=""/>
    </div>
    <div class="wrapper-block">
        <h1 class="title text-animate-gsap">
            СЕРТИФИКАТЫ
        </h1>
        <div class="certificates-container">
            <div class="certificates-block">
                <h3 class="titleBlock text-subTitle-animate-gsap">
                    Сертификат
                </h3>
                <div class="block-img">
                    <img src="/img/certificate.svg" alt="certificate"/>
                </div>
                <button class="download">
                    Скачать сертификат
                </button>
                <span class="text text-text-animate-gsap">
                    Уважаемые коллеги, вы можете скачать сертификат участника наградной кампании«Энергия признания СИБУР» 2022.
                </span>
            </div>
            <div class="certificates-block">
                <h3 class="titleBlock text-subTitle-animate-gsap">
                    Рамка для соц. сетей
                </h3>
                <div class="block-img">
                    <img src="/img/frame.svg" alt="frame"/>
                </div>
                <button class="download">
                    Скачать рамку
                </button>
                <span class="text text-text-animate-gsap">
                    Вы можете скачать рамку для социальных сетей и поделиться своими профессиональными достижениями с друзьями.
                </span>
                <div class="before-text">
                    *Рекомендуем делать фоторамки с личных мобильных устройств и планшетов.С корпоративного ноутбука может некорректно отображаться изображение.
                </div>
            </div>
        </div>
    </div>
    <footer_comp/>
  </div>
</template>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.wrapper-block{
   width: 1160px;
   height: fit-content;
   margin: 130px 0 0 0;
}




.title{
    margin: 66px 0 0 0;
    font-size: 96px;
    font-weight: 700;
    color: var(--nipigasColorAdditional);
}


.certificates-container{
    width: 1120px;
    height: fit-content;
    flex-direction: row;
    justify-content: space-between;
    margin: 50px 0 110px 0;
}
.certificates-block{
    width: 530px;
    height: 610px;
    background-color: rgba(246, 246, 246, 1);
    border-radius: 10px;
    padding: 0 30px;
}
.before-text{
    content: "*Рекомендуем делать фоторамки с личных мобильных устройств и планшетов.С корпоративного ноутбука может некорректно отображаться изображение.";
    width: 100%;
    padding: 0 30px;
    font-size: 12px;
    color: var(--textColorBlack);
    position: absolute;
    width: 100%;
    bottom: 0;
    transform: translateY(60px);
    text-align: center;
}

.titleBlock{
    font-size: 36px;
    font-weight: 600;
    margin: 0 0 25px 0;
    color: var(--nipigasColorMain);
}

.download{
    font-size: 15px;
    font-weight: 600;
    color: var(--white);
    background-color: var(--nipigasColorAdditional);
    border: none;
    padding: 10px;
    margin: 25px 0 20px 0;
    transition: all 0.25s ease;
    cursor: pointer;
}
.download:hover{
    background-color: var(--nipigasColorAdditional-hover);
}
.text{
    font-size: 16px;
    font-weight: 500;
    color: var(--textColorBlack);
}

.bg-element{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}
.bg-element img{
    position: absolute;
}


@media (max-width: 1440px) {
    .wrapper-block{
        width: 70vw;
    }
    .title {
        font-size: 5.8vw;
    }
    .titleBlock {
        font-size: 2.2vw;
    }
    .certificates-container{
        width: 70vw;
    }
    .certificates-block{
        width: 45%;
        padding: 1.5vw;
        justify-content: flex-start;
    }
    .before-text{
        transform: translateY(5vw);
        padding: 0 1.5vw;
    }
}
@media (max-width: 1200px) {
    .before-text{
        transform: translateY(8vw);
        padding: 0 1.5vw;
    }
}
@media (max-width: 1024px) {
    .title {
        font-size: 48px;
    }
    .titleBlock {
        font-size: 36px;
    }
    .certificates-container{
        width: 80vw;
        flex-direction: column;
    }
    .certificates-block{
        width: 100%;
        height: fit-content;
        padding: 20px;
    }
    .certificates-block:nth-child(1){
        margin: 0 0 50px 0;
    }
    .before-text{
        transform: translateY(50px);
        padding: 0 20px;
    }
}
@media (max-width: 980px) {

}
@media (max-width: 768px) {

}
@media (max-width: 640px) {
    .before-text{
        transform: translateY(70px);
    }
    .title {
        font-size: 36px;
    }
    .titleBlock {
        font-size: 24px;
    }
}
@media (max-width: 480px) {
    .before-text{
        transform: translateY(100px);
    }
    .wrapper-block{
        margin: 100px 0 100px 0;
    }
}
@media (max-width: 420px) {

}
@media (max-width: 380px) {

}

</style>