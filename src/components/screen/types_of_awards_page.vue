<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

export default {
  name: "types_of_awards_page",
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
    <div class="bg-element">
      <img src="/img/hand_with_cup.svg" alt=""/>
    </div>
    <header_comp/>
    <div class="wrapper-block">
      <h1 class="title">
        ВИДЫ НАГРАД
      </h1>
      <span class="text description_title">
        Каждая награда — это способ выразить благодарность за ключевые достижения и мотивировать вас на дальнейшее развитие,
        профессиональный рост. СИБУР поощряет сотрудников сразу на нескольких уровнях.
      </span>
      <video 
        class="videoBlock" 
        src="/video/video.mp4"
        poster="https://static.tildacdn.com/tild3264-6339-4339-a463-323162643665/photo.jpg"
        controls
      >

      </video>
      <h2 class="subTitle">
        ВЕДОМСТВЕННЫЕ
      </h2>
      <span class="text description_subTitle">
        Награды вручаются за весомый вклад в развитие компании и индустрии в целом. Достижения подчеркиваются 
        орденами, благодарностями и дипломами от Минпромторга, Минэнерго, Российского союза химиков, 
        а также органов местного самоуправления.
      </span>
      <h2 class="subTitle m_top-60">
        КОРПОРАТИВНЫЕ
      </h2>
      <div class="text-container">
        <div class="text-block">
          <h3 class="miniTitle">
            Командные
          </h3>
          <span class="text">
            Поощрение значимых командных достижений
            и вклад участников в развитие отрасли.
          </span>
          <span class="text nipigas">
            Номинация «Производственное решение года»
          </span>
          <span class="text nipigas">
            Номинация «Решение в области по работе 
            с клиентами»
          </span>
          <span class="text nipigas">
            Номинация «Организационное решение»
          </span>
        </div>
        <div class="text-block">
          <h3 class="miniTitle">
            Индивидуальные
          </h3>
          <span class="text">
            За личные достижения и высокую квалификацию.
          </span>
          <span class="text">
            1 степень. Супергерои СИБУРа! Ежегодно награду получают 3 лучших сотрудника, которые сделали уникальный вклад в развитие компании и отрасли, продемонстрировали достижения, выходящие за рамки занимаемой должности.
          </span>
          <span class="text">
            2 степень. Значительный личный вклад в развитие СИБУРа и результаты «выше ожиданий» – отличительные особенности лауреатов корпоративной награды2 степени.
          </span>
          <span class="text">
            3 степень. Награду получают как опытные специалисты, так и новички – те сотрудники, которые внесли значимый вклад в развитие своего предприятия и получили признание в коллективе.
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
  font-size: 96px;
  font-weight: 700;
  color: var(--nipigasColorAdditional);
  margin: 0 0 20px 0;
}
.text{
  font-size: 16px;
  color: var(--textColorBlack);
  text-align: center;
}
.subTitle{
  font-size: 36px;
  font-weight: 700;
  color: var(--nipigasColorAdditional);
  margin: 0 0 20px 0;
}
.m_top-60{
  margin: 60px 0 20px 0;
}
.miniTitle{
  font-size: 24px;
  font-weight: 700;
  color: var(--nipigasColorMain);
}
.nipigas{
  font-weight: 700;
  color: var(--nipigasColorMain);
}



.description_title{
  width: 960px;
}
.description_subTitle{
  width: 840px;
}




.text-container{
  width: 840px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 0 225px 0;
}
.text-block:first-child{
  width: calc(50% - 60px);
  align-items: flex-start;
  margin: 0 30px 0 0;
}
.text-block:last-child{
  width: calc(50% - 60px);
  align-items: flex-start;
  margin: 0 0 0 30px;
}
.text-block h3:first-child{
  margin: 0 0 20px 0;
}
.text-block span{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
}
.text-block span.text{
  margin: 0 0 20px 0;
}

.videoBlock{
  width: 700px;
  margin: 40px 0;
}


.bg-element{
  position: absolute;
  width: 600px;
  height: 900px;
  transform: translateX(300px);
  top: 0;
  right: 0;
  background-image: url(/img/bg_hand_with_cup.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.bg-element img{
  position: absolute;
  bottom: 70px;
  width: 500px;
  transform: translateX(-50px);
  animation: moves 3s infinite ease;
}
@keyframes moves{
  50%{
    transform: translateX(-30px) rotate(10deg);
  }
}
</style>