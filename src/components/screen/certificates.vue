<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";



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
    <div class="bg-element">
      <img src="/img/background_page/certificates.svg" alt=""/>
    </div>
    <div class="wrapper-block">
        <h1 class="title">
            СЕРТИФИКАТЫ
        </h1>
        <div class="certificates-container">
            <div class="certificates-block">
                <h3 class="titleBlock">
                    сертификат
                </h3>
                <div class="block-img">
                    <img src="/img/certificate.svg" alt="certificate"/>
                </div>
                <button class="download">
                    Скачать сертификат
                </button>
                <span class="text">
                    Уважаемые коллеги, вы можете скачать сертификат участника наградной кампании«Энергия признания СИБУР» 2022.
                </span>
            </div>
            <div class="certificates-block">
                <h3 class="titleBlock">
                    Рамка для соц. сетей
                </h3>
                <div class="block-img">
                    <img src="/img/frame.svg" alt="frame"/>
                </div>
                <button class="download">
                    Скачать рамку
                </button>
                <span class="text">
                    Вы можете скачать рамку для социальных сетей и поделиться своими профессиональными достижениями с друзьями.
                </span>
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
.certificates-block:nth-child(2)::before{
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
    z-index: 0;
}

</style>