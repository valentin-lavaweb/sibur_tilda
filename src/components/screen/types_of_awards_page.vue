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
            description: 'Награду получают как опытные специалисты, так и новички – те сотрудники, которые внесли значимый вклад в развитие своего предприятия и получили признание в коллективе.',
          }
        ],
        interaction: interaction,

        command_nomination_1: [
          {
            nomination: 'Производственное решение года',
            description: 'Команды представляют инициативы, повышающие эффективность и результативность производственного процесса'
          },
          {
            nomination: 'Лучшее организационное решение',
            description: 'В номинацию входит широкий перечень проектов, которые помогают СИБУРу трансформироваться и достигать поставленных бизнес-целей'
          },
          {
            nomination: 'Решение в области работы с клиентами',
            description: 'Команды предлагают проекты, которые повышают эффективность взаимодействия с партнерами и клиентами'
          },
          {
            nomination: 'Организационный проект',
            description: 'Номинация объединяет любые инициативы по повышению эффективности и автоматизации сквозных бизнес-процессов'
          },
        ],
        command_nomination_2: [
          {
            nomination: 'Производственное решение',
            description: 'Катализатор тетраизобутират циркония (ТИБЦ) для ЛАО НКНХ'
          },
          {
            nomination: 'Организационное решение',
            description: 'Управление рисками обеспеченности ХП в условиях санкционных ограничений и проработка аналогов химической продукции'
          },
          {
            nomination: 'Решение в области работы с клиентами',
            description: 'Продуктовые решения для отрасли Транспорт'
          },
          {
            nomination: 'Организационный проект',
            description: 'RTO, APC, Хроматограф на ЭП-60 АО «Сибур-Химпром»'
          },
        ],
        command_nomination_3: [
        {
            nomination: 'Лидерство в коммуникациях',
            description: 'Проекты, направленные на продвижение имиджа и бренда отрасли и компании, укрепление репутации во внешней среде. А также поддержку ценностного предложения для сотрудников компании, укрепление наших ключевых ценностей и смыслов'
          },
          {
            nomination: 'Производственное решение',
            description: 'Проекты, направленные на развитие производственных мощностей СИБУРа, повышение эффективности существующих технологий или на разработку новых решений для производства'
          },
          {
            nomination: 'Инфраструктурное развитие и устойчивость',
            description: 'Проекты, направленные на развитие регионов присутствия и инфраструктурные проекты'
          },
          {
            nomination: 'Цифровая трансформация',
            description: 'Проекты, направленные на автоматизацию текущих рабочих процессов, создание цифровых инструментов, помогающих повысить эффективность и прозрачность работы с данными'
          },
        ],
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
    });
    gsap.from(".img-animate-gsap", {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      delay: 0.25,
      ease: "sine",
    });
    // gsap.from(".video-animate-gsap", {
    //   y: -50,
    //   opacity: 0,
    //   duration: 0.5,
    //   delay: 0.35,
    // });


    // let arrayelToggle = document.querySelectorAll('.bottom_block-main-item');
    // let arrayelBlock = document.querySelectorAll('.awards-content_block');


    // for (const elToggle of arrayelToggle) {

    //   for (const elBlock of arrayelBlock) {
        
    //       elToggle.addEventListener("click", () => {
    //           if (elBlock.style.height === "0px") {
    //               elBlock.style.height = `${ elBlock.scrollHeight }px`
    //           } else {
    //               elBlock.style.height = `${ elBlock.scrollHeight }px`;
    //               window.getComputedStyle(elBlock, null).getPropertyValue("height");
    //               elBlock.style.height = "0";
    //           }
    //       });

    //       elBlock.addEventListener("transitionend", () => {
    //         if (elBlock.style.height !== "0px") {
    //             elBlock.style.height = "auto"
    //         }
    //       });

    //     }
    // }





    // elToggle.addEventListener("click", () => {
    //           if (elBlock.style.height === "0px") {
    //               elBlock.style.height = `${ elBlock.scrollHeight }px`
    //           } else {
    //               elBlock.style.height = `${ elBlock.scrollHeight }px`;
    //               window.getComputedStyle(elBlock, null).getPropertyValue("height");
    //               elBlock.style.height = "0";
    //           }
    //       });

    //       elBlock.addEventListener("transitionend", () => {
    //         if (elBlock.style.height !== "0px") {
    //             elBlock.style.height = "auto"
    //         }
    //       });

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
    <div class="bg-element-two img-animate-gsap">
      <img src="/img/background_page/team_track_winners.svg" alt=""/>
    </div>
    <header_comp/>
    <div class="wrapper-block">
      <h1 class="title text-animate-gsap">
        <editable_text dictionary_key="awards_title"/>
      </h1>
      <span class="text description_title text-animate-gsap">
        <editable_text dictionary_key="awards_desc"/>
      </span>

      <!-- ! Не работает -->
      <!-- <video 
        class="videoBlock video-animate-gsap" 
        src="/video/video.mp4"
        poster="https://static.tildacdn.com/tild3264-6339-4339-a463-323162643665/photo.jpg"
        controls
      >
      </video> -->
      <!-- <h2 class="subTitle  m_top-60 text-animate-gsap">
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
      </span> -->


      <div class="text-container">

        <!-- ! Не работает -->
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
        </div>  -->
        
        <!-- ! Не работает -->
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
        
        
        <div class="text-block">
          <!-- <h3 class="miniTitle text-animate-gsap">
            <editable_text dictionary_key="individual_title"/>
          </h3> -->
          <div class="awards-container">
            <div class="block-awards text-animate-gsap">
              <div class="awards-title">
                <span>
                  <img src="/img/degree_left.svg" alt="degree">
                </span>
                1 Степень
                <span>
                  <img src="/img/degree_right.svg" alt="degree">
                </span>
              </div>
              <div class="awards-text">
                <editable_text dictionary_key="individual_desc_grade_1"/>
              </div>
            </div>
            <div class="block-awards text-animate-gsap">
              <div class="awards-title">
                <span>
                  <img src="/img/degree_left.svg" alt="degree">
                </span>
                2 Степень
                <span>
                  <img src="/img/degree_right.svg" alt="degree">
                </span>
              </div>
              <div class="awards-text">
                <editable_text dictionary_key="individual_desc_grade_2"/>
              </div>
            </div>
            <div class="block-awards text-animate-gsap">
              <div class="awards-title">
                <span>
                  <img src="/img/degree_left.svg" alt="degree">
                </span>
                3 Степень
                <span>
                  <img src="/img/degree_right.svg" alt="degree">
                </span>
              </div>
              <div class="awards-text">
                <editable_text dictionary_key="individual_desc_grade_3"/>
              </div>
            </div>
          </div>


          <!-- <h3 class="miniTitle mar-30 text-animate-gsap">
            <editable_text dictionary_key="command_title"/>
            Командные номинации
          </h3>

          <div class="awards-container v2">
            <span class="text centerline text-animate-gsap">
              <editable_text dictionary_key="command_desc"/>
            </span>
            <span class="text nipigasAprivel text-animate-gsap nominations"
              v-for="(nomination, key) in command_nomination_1"
              :key="nomination"
              >
              <div class="nominations-nomination awards">
                <div class="nominations-icon">
                  <img :src="`/img/types_of_award/${key+1}.svg`" alt="icon">
                </div>
                {{nomination.nomination}}
              </div>
              <span class="nominations-description">
                {{nomination.description}}
              </span>
            </span>
          </div> -->



          <h3 class="miniTitle mar-30 text-animate-gsap">
            <!-- <editable_text dictionary_key="command_title_3"/> -->
            Командные номинации 2024 года
          </h3>

          <div class="awards-container v2">
            <!-- <span class="text centerline text-animate-gsap">
              <editable_text dictionary_key="command_desc"/>
            </span> -->
            <span class="text nipigasAprivel text-animate-gsap nominations"
              v-for="(nomination, key) in command_nomination_3"
              :key="nomination"
              >
              <div class="nominations-nomination">
                <div class="nominations-icon">
                  <img :src="`/img/types_of_award/2_${key+1}.svg`" alt="icon">
                </div>
                {{nomination.nomination}} 
              </div>
              <span class="nominations-description">
                {{nomination.description}}
              </span>
            </span>
          </div>


          <h3 class="miniTitle mar-30 text-animate-gsap">
            <!-- <editable_text dictionary_key="command_title_2"/> -->
            Командные номинации 2022, 2023 года
          </h3>

          <div class="awards-container v2">
            <!-- <span class="text centerline text-animate-gsap">
              <editable_text dictionary_key="command_desc"/>
            </span> -->
            <span class="text nipigasAprivel text-animate-gsap nominations"
              v-for="(nomination, key) in command_nomination_1"
              :key="nomination"
              >
              <div class="nominations-nomination awards">
                <div class="nominations-icon">
                  <img :src="`/img/types_of_award/${key+1}.svg`" alt="icon">
                </div>
                {{nomination.nomination}}
              </div>
              <span class="nominations-description">
                {{nomination.description}}
              </span>
            </span>
          </div>


          <!-- ! Не работает -->
          <!-- <div class="awards-container v2"> -->
            <!-- <span class="text centerline text-animate-gsap">
              <editable_text dictionary_key="command_desc"/>
            </span> -->
            <!-- <span class="text nipigasAprivel text-animate-gsap nominations"
              v-for="(nomination, key) in availableNominations"
              :key="nomination"
              >
              <div class="nominations-nomination">
                <div class="nominations-icon">
                  <img :src="`/img/types_of_award/${key+1}.svg`" alt="icon">
                </div>
                {{nomination.nomination}} 123
              </div>
              <span class="nominations-description">
                {{nomination.description}}
              </span>
            </span> -->
          <!-- </div> -->
        </div>

        <!-- ! Не работает -->
        <!-- <div class="bottom_block text-animate-gsap">
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
                  <editable_text :dictionary_key="`individual_desc_grade_${degree.id}`"/>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom_block-right">
            <h3 class="bottom_block-title">Командные номинации</h3>
            <div class="bottom_block-main">


            <div class="bottom_block-main-item" 
              v-for="nomination in availableNominations"
              :key="nomination">
              <div class="awards-title mini" v-if="nomination.nomination == 'Организационный проект'">
                  {{ nomination.nomination }} (2023)
              </div>
              <div class="awards-title mini" v-else>
                  {{ nomination.nomination }}
              </div>
              <div class="awards-content_block">
                  {{ nomination.description }}
              </div>
            </div>

            </div>
          </div>
        </div> -->



      </div>
    </div>
    <footer_comp/>
  </div>
</template>

<style scoped>

.awards-container.v2{
  width: 100%;
  flex-direction: row-reverse;
  margin: 46px 0 0 0;
}

.awards-container.v2 span.text.nominations.nipigasAprivel{
  width: 50%;
  margin: 0 0 100px 0;
}

.nominations-icon{
  position: absolute;
  left: 0;
  transform: translateX(calc(-100% - 20px));
}

.nomination{
  width: 50%;
}
.awards-container.v2 span.text.nominations.nipigasAprivel:nth-child(odd){
  padding: 0 0 0 100px;
}
.awards-container.v2 span.text.nominations.nipigasAprivel:nth-child(even){
  padding: 0 100px 0 0;
}
.nominations-nomination{
  display: inline-block;
  color: var(--nipigasColorAdditional);
  font-size: 20px;
  margin: 0 0 15px 0;
}

.nominations-description{
  color: var(--textColorBlack);
  font-size: 16px;
  font-weight: 600;
}





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
  width: 50%;
  height: fit-content;
  margin: 0 0 35px 0;
  color: var(--nipigasColorMain);
  font-size: 20px;
  font-weight: 700;
  align-items: left;
  flex-direction: column;
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
.miniTitle.mar-30{
  margin: 70px 0 0 0;
}
.miniTitle{
  font-size: 24px;
  font-weight: 700;
  color: var(--nipigasColorMain);
  text-align: center;
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
  margin: 10px 0 315px 0;
}
.text-block h3:first-child{
  margin: 44px 0 50px 0;
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
  z-index: 1;
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

.bg-element-two{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    justify-content: flex-start;
    align-items: flex-start;
}
.bg-element-two img{
    position: absolute;
}




.awards-container{
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: 70px 0 0 0;
}
.awards-container.column{
  width: 100%;
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
  padding: 0 0 10px 0;
}
.awards-title{
  flex-direction: row;
  align-items: center;
  color: var(--nipigasColorAdditional);
  font-size: 20px;
  font-weight: 700;
  padding: 0 0 24px 0;
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
  font-weight: 600;
}







.text-block span.text.nominations{
  display: flex;
  width: fit-content;
}



.nominations:last-child .nominations-nomination.awards::after{
  content: " (NEW 2023)";
  color: rgba(252, 194, 23, 1);
  font-size: 20px;
  font-weight: 600;
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
  min-height: 200px;
  height: fit-content;
  border-radius: 6px;
  background: #F6F6F6;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  padding: 15px 50px;
  margin: 25px 0 0 0;
  justify-content: flex-start;
}
.bottom_block-main-item{
  width: 100%;
  height: auto;
}

/* .bottom_block-main-item:last-child .awards-title.mini::after{
  content: 'Новая номинация 2023';
  font-size: 10px;
  color: var(--nipigasColorMain);
  position: absolute;
  top: -25%;
  left: 10%;
} */



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
  max-height: 0;
  padding: 0px 0 0px 0;
  color: var(--textColorBlack);
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  opacity: 0;
  /* opacity: 1; */
  pointer-events: none;
  transition: all 0.0s 0.0s, opacity 0.0s 0.0s;
  cursor: auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
}

/* .awards-title:hover~.awards-content_block{
  height: auto;
  max-height: 1000px;
  padding: 0px 0 24px 0;
  opacity: 1;
  pointer-events: auto;
  transition: all 0.5s, opacity 0.25s 0.25s;
}
.awards-title:hover::before{
  opacity: 1;
} */


@media (max-width: 1700px) {
  .bg-element{
    width: 35vw;
    height: 60vw;
    transform: translateX(22vw);
  }
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
  .bottom_block-title{
    font-size: 1.6vw;
  }
  .awards-title{
    font-size: 1.4vw;
  }
  .awards-title span, .nipigasAprivel span img{
    width: 1vw;
  }
  .bottom_block-main{
    width: 30vw;
    padding: 1vw 2.5vw;
  }
  .awards-title.mini, .awards-content_block{
    font-size: 1.1vw;
  }
  .nominations-nomination, .nominations:last-child .nominations-nomination::after{
    font-size: 1.2vw;
  }
  .nominations-description{
    font-size: 1vw;
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

  .bottom_block {
    flex-direction: column;
  }
  .bottom_block-left{
    width: 100%;
    margin: 0 0 50px 0;
  } 
  .bottom_block-right{
    width: 100%;
  }
  .bottom_block-title{
    font-size: 20px;
  }
  .bottom_block-main{
    width: 100%;
    padding: 20px 40px;
  }
  .awards-title.mini, .awards-content_block{
    font-size: 16px;
  }

  .nominations-nomination, .nominations:last-child .nominations-nomination::after{
    font-size: 18px;
  }
  .nominations-description{
    font-size: 16px;
  }

  .awards-container.v2{
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin: 46px 0 0 0;
  }

  .text-block span.text.nominations.nipigasAprivel{
    width: 100%;
    align-items: center;
  }
  .nomination{
    width: 100%;
    align-items: center;
  }

  .nominations-icon {
    width: calc(60px - 20px);
  }
  .awards-container.v2 span.text.nominations.nipigasAprivel:nth-child(odd){
    width: 100%;
    padding: 0 0 0 60px;
  }
  .awards-container.v2 span.text.nominations.nipigasAprivel:nth-child(even){
    width: 100%;
    padding: 0 0 0 60px;
  }

  .nominations-nomination{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .text-block .nominations-description {
    text-align: left;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .text-block span{
    align-items: center;
    text-align: center;
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



  .bottom_block-title{
    font-size: 18px;
  }
  .bottom_block-main{
    width: 100%;
    padding: 20px 30px;
  }
  .awards-title{
    font-size: 14px;
  }
  .awards-title.mini, .awards-content_block{
    font-size: 12px;
  }

  .awards-title span, .nipigasAprivel span img{
    width: 12px;
  }


  .nominations-nomination, .nominations:last-child .nominations-nomination::after{
    font-size: 16px;
    text-align: center;
  }
  .nominations-description{
    font-size: 14px;
  }
}
@media (max-width: 420px) {
  .nominations-icon {
    width: calc(40px - 20px);
  }
  .awards-container.v2 span.text.nominations.nipigasAprivel:nth-child(odd){
    width: 100%;
    padding: 0 0 0 40px;
  }
  .awards-container.v2 span.text.nominations.nipigasAprivel:nth-child(even){
    width: 100%;
    padding: 0 0 0 40px;
  }
  .nominations-nomination {
    text-align: left;
  }
}
@media (max-width: 340px) {
  .text-block span.text.nominations.nipigasAprivel{
    font-size: 3.0vw;
  }
  .nipigasAprivel span img{
    width: 2.0vw;
  }
}
</style>