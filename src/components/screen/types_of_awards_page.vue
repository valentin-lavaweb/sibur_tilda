<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

import gsap from "gsap";
import editable_text from '../editable_text.vue';


export default {
  name: "types_of_awards_page",
  data() {
    let interaction = useGameStore();
    return{
        arrayDegree:[
          {
            id: 1,
            title: '1 Степень',
            description: 'Супергерои СИБУРа! Ежегодно награду получают 3 лучших сотрудника, которые сделали уникальный вклад в развитие компании и отрасли, продемонстрировали достижения, выходящие за рамки занимаемой должности.',
          },
          {
            id: 2,
            title: '2 Степень',
            description: 'Значительный личный вклад в развитие СИБУРа и результаты «выше ожиданий» – отличительные особенности лауреатов корпоративной награды 2 степени.',
          },
          {
            id: 3,
            title: '3 Степень',
            description: 'Значительный личный вклад в развитие СИБУРа и результаты «выше ожиданий» – отличительные особенности лауреатов корпоративной награды 2 степени.',
          }
        ],
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
    gsap.from(".text-animate-gsap", {
      x: -100,
      opacity: 0,
      duration: 0.25,
      stagger: 0.15,
      delay: 0.25,
    }),
    gsap.from(".video-animate-gsap", {
      y: -50,
      opacity: 0,
      duration: 0.5,
      delay: 0.35,
    });
  },
  computed:{
    availableNominations(){
      return this.interaction.availableNominations.filter(({nomination}) => nomination != "Приз зрительских симпатий");
    }
  },
  async beforeRouteEnter(to, from, next){
    let interaction = useGameStore();
    if(!interaction.commandAwards){
        await interaction.loadCommandAwards();
    }
    next();
  }
};
</script>


<template>
  <div class="wrapper">
    <div class="bg-element">
      <img src="/img/hand_with_cup.svg" alt=""/>
    </div>
    <header_comp/>
    <div class="wrapper-block">
      <h1 class="title text-animate-gsap">
        <editable_text dictionary_key="awards_title"/>
      </h1>
      <span class="text description_title text-animate-gsap">
        <editable_text dictionary_key="awards_desc"/>
      </span>
      <!-- <video 
        class="videoBlock video-animate-gsap" 
        src="/video/video.mp4"
        poster="https://static.tildacdn.com/tild3264-6339-4339-a463-323162643665/photo.jpg"
        controls
      >
      </video> -->
      <h2 class="subTitle  m_top-60 text-animate-gsap">
        <editable_text dictionary_key="department_title"/>
      </h2>
      <span class="text description_subTitle text-animate-gsap">
        <editable_text dictionary_key="department_desc"/>
      </span>
      <h2 class="subTitle m_top-60 text-animate-gsap">
        <editable_text dictionary_key="corporate_title"/>
      </h2>
      <span class="text description_subTitle text-animate-gsap">
        <editable_text dictionary_key="corporate_desc"/>
      </span>
      <div class="text-container">
        <!-- <div class="text-block">
          <h3 class="miniTitle text-animate-gsap">
            <editable_text dictionary_key="command_title"/>
          </h3>
          <span class="text text-animate-gsap">
            <editable_text dictionary_key="command_desc"/>
          </span>
          <span class="text nipigas text-animate-gsap nominations"
          v-for="nomination in availableNominations"
          :key="nomination"
          >
            Номинация «{{nomination}}»
          </span>
        </div> -->
        
        <!-- <div class="text-block">
          <h3 class="miniTitle text-animate-gsap">
            <editable_text dictionary_key="individual_title"/>
          </h3>
          <span class="text text-animate-gsap">
            <editable_text dictionary_key="individual_desc"/>
          </span>
          <span class="text text-animate-gsap">
            <b>Степень 1.</b><editable_text dictionary_key="individual_desc_grade_1"/>
          </span>
          <span class="text text-animate-gsap">
            <b>Степень 2.</b><editable_text dictionary_key="individual_desc_grade_2"/>
          </span>
          <span class="text text-animate-gsap">
            <b>Степень 3.</b><editable_text dictionary_key="individual_desc_grade_3"/>
          </span>
        </div> -->
        <!-- <div class="text-block">
          <h3 class="miniTitle text-animate-gsap">
            <editable_text dictionary_key="individual_title"/>
          </h3>
          <div class="awards-container">
            <div class="block-awards text-animate-gsap">
              <div class="awards-title">
                <span>
                  <img src="/img/degree_left.svg" alt="degree">
                </span>
                1
                <span>
                  <img src="/img/degree_right.svg" alt="degree">
                </span>
              </div>
              <div class="awards-text">
                <b>Степень 1.</b><editable_text dictionary_key="individual_desc_grade_1"/>
              </div>
            </div>
            <div class="block-awards text-animate-gsap">
              <div class="awards-title">
                <span>
                  <img src="/img/degree_left.svg" alt="degree">
                </span>
                  2
                <span>
                  <img src="/img/degree_right.svg" alt="degree">
                </span>
              </div>
              <div class="awards-text">
                <b>Степень 2.</b><editable_text dictionary_key="individual_desc_grade_2"/>
              </div>
            </div>
            <div class="block-awards text-animate-gsap">
              <div class="awards-title">
                <span>
                  <img src="/img/degree_left.svg" alt="degree">
                </span>
                  3
                <span>
                  <img src="/img/degree_right.svg" alt="degree">
                </span>
              </div>
              <div class="awards-text">
                <b>Степень 3.</b><editable_text dictionary_key="individual_desc_grade_3"/>
              </div>
            </div>
          </div>
          <h3 class="miniTitle mar-30 text-animate-gsap">
            <editable_text dictionary_key="command_title"/>
          </h3>
          <div class="awards-container column">
            <span class="text centerline text-animate-gsap">
              <editable_text dictionary_key="command_desc"/>
            </span>
            <span class="text nipigasAprivel text-animate-gsap nominations"
              v-for="nomination in availableNominations"
              :key="nomination"
              >
              <span class="degree">
                <img src="/img/degree_left.svg" alt="degree">
              </span>
               «{{nomination}}»
              <span class="degree">
                <img src="/img/degree_right.svg" alt="degree">
              </span>
            </span>
          </div>
        </div> -->
        <div class="bottom_block text-animate-gsap">
          <div class="bottom_block-left">
            <h3 class="bottom_block-title">Индивидуальные награды</h3>
            <div class="bottom_block-main">


              <div class="bottom_block-main-item"
              v-for="degree in arrayDegree"
              :key="degree.id">
                <div class="awards-title">
                  <span>
                    <img src="/img/degree_left.svg" alt="degree">
                  </span>
                    {{ degree.title }}
                  <span>
                    <img src="/img/degree_right.svg" alt="degree">
                  </span>
                </div>
                <div class="awards-content_block">
                    {{ degree.description }}
                </div>
              </div>

              <!-- <div class="bottom_block-main-item">
                <div class="awards-title">
                  <span>
                    <img src="/img/degree_left.svg" alt="degree">
                  </span>
                    2 Степень
                  <span>
                    <img src="/img/degree_right.svg" alt="degree">
                  </span>
                </div>
                <div class="awards-content_block">
                  Значительный личный вклад в развитие СИБУРа и результаты «выше ожиданий» – отличительные особенности лауреатов корпоративной награды 2 степени.
                </div>
              </div>

              <div class="bottom_block-main-item">
                <div class="awards-title">
                  <span>
                    <img src="/img/degree_left.svg" alt="degree">
                  </span>
                    3 Степень
                  <span>
                    <img src="/img/degree_right.svg" alt="degree">
                  </span>
                </div>
                <div class="awards-content_block">
                  Награду получают как опытные специалисты, так и новички – те сотрудники, которые внесли значимый вклад в развитие своего предприятия и получили признание в коллективе.
                </div>
              </div> -->


            </div>
          </div>
          <div class="bottom_block-right">
            <h3 class="bottom_block-title">Командные номинации</h3>
            <div class="bottom_block-main">


            <div class="bottom_block-main-item" 
              v-for="nomination in availableNominations"
              :key="nomination">
              <div class="awards-title mini">
                  {{ nomination.nomination }}
              </div>
              <div class="awards-content_block">
                  {{ nomination.description }}
              </div>
            </div>

            </div>
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
   margin: 200px 0 0 0;
}


.title{
  font-size: 64px;
  font-weight: 700;
  color: var(--nipigasColorAdditional);
  margin: 0 0 20px 0;
}
.text{
  font-size: 16px;
  font-weight: 500;
  color: var(--textColorBlack);
  text-align: center;
}
.text-block span.text.nominations.nipigasAprivel{
  width: fit-content;
  margin: 0 0 35px 0;
  color: var(--nipigasColorMain);
  font-size: 20px;
  font-weight: 700;
  align-items: center;
}
.text-block span.degree{
  width: fit-content;
  margin: 0 10px;
}
.nipigasAprivel span img{
  width: 20px;
}
.subTitle{
  font-size: 36px;
  font-weight: 700;
  color: var(--nipigasColorAdditional);
  margin: 0 0 20px 0;
}
.m_top-60{
  margin: 60px 0 0px 0;
}
.miniTitle{
  font-size: 24px;
  font-weight: 700;
  color: var(--nipigasColorMain);
}
.mar-30{
  margin: 30px 0 0 0;
}
.text-block span.text.centerline{
  width: 100%;
  text-align: center;
  margin: 0 0 40px 0;
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
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: 10px 0 225px 0;
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
  display: block;
  word-wrap: break-word;
  word-break: normal;
  text-align: left;
  
}

b{
  width: fit-content;
  word-wrap: break-word;
  word-break: normal;
  text-align: left;
  color: var(--nipigasColorMain);
  font-weight: 600;
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





.awards-container{
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: 20px 0 0 0;
}
.awards-container.column{
  flex-direction: column;
  margin: 16px 0 0 0;
  justify-content: center;
  align-items: center;
}
.block-awards{
  width: 30%;
}
.awards-title.mini{
  font-size: 16px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 0 5px 0;
}
.awards-title{
  flex-direction: row;
  align-items: center;
  color: var(--nipigasColorAdditional);
  font-size: 20px;
  font-weight: 700;
  padding: 0 0 25px 0;
  width: 100%;
}
.awards-title span{
    width: 12px;
    margin: 0 5px;
    display: flex;
}

.awards-text{
  display: block;
  color: var(--textColorBlack);
  text-align: center;
}







.text-block span.text.nominations{
  display: flex;
  width: fit-content;
}



.nominations:last-child:after{
  content: "Новая номинация";
  position: absolute;
  width: 100%;
  top: 0;
  color: var(--nipigasColorAdditional);
  font-size: 10px;
  font-weight: 600;
  transform: translateY(-30%);
  padding: 0 0 0 0;
  text-align: center;
}


.description_title {
  font-size: 24px;
  font-weight: 700;
  color: var(--nipigasColorMainv2);
}

.subTitle {
  font-size: 36px;
  font-weight: 700;
  color: var(--nipigasColorMainv2);
}





.bottom_block{
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  margin: 30px 0 0 0;
}
.bottom_block-left{
  width: 50%;
  justify-content: flex-start;
}
.bottom_block-right{
  width: 50%;
  justify-content: flex-start;
}
.bottom_block-title{
  width: 100%;
  color: var(--nipigasColorMain);
  font-size: 24px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bottom_block-title::after{
  content: "";
  display: flex;
  width: 12px;
  height: 12px;
  background-image: url(/img/mini_arrow_btm.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}




.bottom_block-main{
  width: 100%;
  max-width: 450px;
  min-height: 210px;
  height: fit-content;
  border-radius: 6px;
  background: #F6F6F6;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  padding: 15px 50px;
  justify-content: flex-start;
}
.bottom_block-main-item{
  width: 100%;
  height: auto;
}
.awards-title.mini::before{
  content: "";
  position: absolute;
  top: 8px;
  left: -20px;
  display: block;
  height: 0;
  width: 0;
  border: 5px solid transparent;
  border-top-color: var(--nipigasColorAdditional);
  transform: rotate(-90deg);
  opacity: 0;
  transition: all 0.15s ease;
}
.awards-title::before{
  content: "";
    position: absolute;
    top: 13px;
    left: -20px;
    display: block;
    height: 0;
    width: 0;
    border: 5px solid transparent;
    border-top-color: var(--nipigasColorAdditional);
    transform: rotate(-90deg);
    opacity: 0;
    transition: all 0.15s ease;
}
.awards-content_block{
  height: 0;
  padding: 0px 0 0px 0;
  color: var(--textColorBlack);
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  opacity: 0;
  pointer-events: none;
  transition: all 0.25s 0.0s, opacity 0.0s 0.0s ease;
  cursor: auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.awards-title:hover~.awards-content_block{
  height: fit-content;
  padding: 0px 0 15px 0;
  opacity: 1;
  pointer-events: auto;
  transition: all 0.25s, opacity 0.25s 0.25s ease;
}
.awards-title:hover::before{
  opacity: 1;
}




@media (max-width: 1440px) {
  .wrapper-block, .text-container, .description_subTitle, .description_title {
    width: 70vw;
  }
  .bg-element{
    width: 40vw;
    height: 55vw;
    transform: translateX(25vw);
  }
  .bg-element img{
    width: 30vw;
  }
  .videoBlock{
    width: 45vw;
  }
  .title{
    font-size: 4vw;
  }
  .subTitle, .miniTitle{
    font-size: 1.8vw;
  }
  .text, .awards-text{
    font-size: 1vw;
  }
  .text-block span.text.nominations.nipigasAprivel{
    font-size: 1.2vw;
  }
  .awards-title{
    font-size: 1.6vw;
  }
  .awards-title span, .nipigasAprivel span img{
    width: 1vw;
  }
}
@media (max-width: 1024px) {
  .wrapper-block, .text-container, .description_subTitle, .description_title {
    width: 80vw;
  }
  .bg-element{
    display: none;
  }
  .videoBlock{
    width: 65vw;
  }
  .title{
    font-size: 48px;
  }
  .subTitle, .miniTitle{
    font-size: 32px;
  }
  .text, .awards-text{
    font-size: 16px;
  }
  .text-block span.text.nominations.nipigasAprivel{
    font-size: 20px;
  }
  .awards-title{
    font-size: 24px;
  }
  .awards-title span, .nipigasAprivel span img{
    width: 16px;
  }
  .awards-container{
    flex-direction: column;
  }
  .block-awards{
    width: 100%;
    margin: 0 0 40px 0;
  }
}
@media (max-width: 980px) {

}
@media (max-width: 768px) {

}
@media (max-width: 640px) {
  .text-container{
    flex-direction: row;
    flex-wrap: wrap;
  }
  .text-block:first-child{
    width: 100%;
    margin: 0 0 50px 0;
  } 
  .text-block:last-child{
    width: 100%;
    margin: 0;
  }
  .text-block span.text.nominations.nipigasAprivel{
    font-size: 15px;
  }
}
@media (max-width: 480px) {
  .text-container{
    margin: 40px 0 50px 0;
  }
  .videoBlock{
    width: 80vw;
  }
  .title{
    font-size: 32px;
  }
  .subTitle{
    font-size: 20px;
  } 
  .miniTitle{
    font-size: 18px;
  }
  .text{
    font-size: 16px;
  }
  .text-block span.text.nominations.nipigasAprivel{
    font-size: 3.1vw;
  }
  .nipigasAprivel span img{
    width: 3.3vw;
  }
}
@media (max-width: 420px) {

}
@media (max-width: 340px) {
  .text-block span.text.nominations.nipigasAprivel{
    font-size: 3.0vw;
  }
  .nipigasAprivel span img{
    width: 3.0vw;
  }
}
</style>