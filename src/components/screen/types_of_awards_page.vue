<script>
import { useGameStore } from "@/stores/interface-interaction.js";
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

import gsap from "gsap";
import editable_text from "../editable_text.vue";

export default {
  name: "types_of_awards_page",
  data() {
    let interaction = useGameStore();
    return {
      arrayDegree: [
        {
          id: 1,
          title: "1 Степень",
          description:
            "Супергерои СИБУРа! Ежегодно награду получают 3 лучших сотрудника, которые сделали уникальный вклад в развитие компании и отрасли, продемонстрировали достижения, выходящие за рамки занимаемой должности.",
        },
        {
          id: 2,
          title: "2 Степень",
          description:
            "Значительный личный вклад в развитие СИБУРа и результаты «выше ожиданий» – отличительные особенности лауреатов корпоративной награды 2 степени.",
        },
        {
          id: 3,
          title: "3 Степень",
          description:
            "Награду получают как опытные специалисты, так и новички – те сотрудники, которые внесли значимый вклад в развитие своего предприятия и получили признание в коллективе.",
        },
      ],
      interaction: interaction,

      command_nomination_1: [
        {
          nomination: "Организационное решение",
          description:
            "Управление рисками обеспеченности ХП в условиях санкционных ограничений и проработка аналогов химической продукции",
        },
        {
          nomination: "Производственное решение",
          description:
            "Катализатор тетраизобутират циркония (ТИБЦ) для ЛАО НКНХ",
        },
        {
          nomination: "Организационный проект",
          description: "RTO, APC, Хроматограф на ЭП-60 АО «Сибур-Химпром»",
        },
        {
          nomination: "Решение в области работы с клиентами",
          description: "Продуктовые решения для отрасли Транспорт",
        },
      ],
      command_nomination_2: [
        {
          nomination: "Производственное решение",
          description:
            "Катализатор тетраизобутират циркония (ТИБЦ) для ЛАО НКНХ",
        },
        {
          nomination: "Организационное решение",
          description:
            "Управление рисками обеспеченности ХП в условиях санкционных ограничений и проработка аналогов химической продукции",
        },
        {
          nomination: "Решение в области работы с клиентами",
          description: "Продуктовые решения для отрасли Транспорт",
        },
        {
          nomination: "Организационный проект",
          description: "RTO, APC, Хроматограф на ЭП-60 АО «Сибур-Химпром»",
        },
      ],
      command_nomination_3: [
        {
          nomination: "Производственное решение",
          description:
            "Проекты, направленные на развитие производственных мощностей СИБУРа, повышение эффективности существующих технологий или на разработку новых решений для производства",
        },
        {
          nomination: "Лидерство в коммуникациях",
          description:
            "Проекты, направленные на продвижение имиджа и бренда отрасли и компании, укрепление репутации во внешней среде. А также поддержку ценностного предложения для сотрудников компании, укрепление наших ключевых ценностей и смыслов ",
        },
        {
          nomination: "Цифровая трансформация",
          description:
            "Проекты, направленные на автоматизацию текущих рабочих процессов, создание цифровых инструментов, помогающих повысить эффективность и прозрачность работы с данными",
        },
        {
          nomination: "Инфраструктурное развитие и устойчивость",
          description:
            "Проекты, направленные на развитие регионов присутствия и инфраструктурные проекты",
        },
      ],
      command_nomination_4: [
        {
          nomination: "Лучшее организационное решение",
          description:
            "В номинацию входит широкий перечень проектов, которые помогают СИБУРу трансформироваться и достигать поставленных бизнес-целей",
        },
        {
          nomination: "Производственное решение года",
          description:
            "Команды представляют инициативы, повышающие эффективность и результативность  производственного процесса",
        },
        {
          nomination: "Организационный проект",
          description:
            "Номинация объединяет любые инициативы по повышению эффективности и автоматизации сквозных бизнес-процессов",
          new: true,
        },
        {
          nomination: "Решение в области работы с клиентами",
          description:
            "Команды предлагают проекты, которые повышают эффективность взаимодействия с партнерами и клиентами",
        },
      ],
    };
  },
  components: {
    header_comp,
    footer_comp,
    editable_text,
  },
  methods: {},
  mounted() {
    gsap.from(".text-animate-gsap", {
      x: -100,
      opacity: 0,
      duration: 0.25,
      stagger: 0.15,
      delay: 0.25,
    });
    // gsap.from(".img-animate-gsap", {
    //   opacity: 0,
    //   scale: 0.5,
    //   duration: 0.5,
    //   delay: 0.25,
    //   ease: "sine",
    // });
  },
  computed: {
    availableNominations() {
      return this.interaction.availableNominations.filter(
        ({ nomination }) => nomination != "Приз зрительских симпатий"
      );
    },
  },
  async beforeRouteEnter(to, from, next) {
    let interaction = useGameStore();
    if (!interaction.commandAwards) {
      await interaction.loadCommandAwards();
    }
    next();
  },
};
</script>

<template>
  <div class="wrapper">
    <header_comp />
    <div class="awardTypesBackground"></div>
    <div class="wrapper-block">
      <div class="titleBlock">
        <h1 class="title text-animate-gsap">
          <editable_text dictionary_key="awards_title" />
        </h1>
        <span class="description text-animate-gsap">
          <editable_text dictionary_key="awards_desc" />
        </span>
      </div>
      <div class="awardsContainer whiteBlock">
        <div class="blockAwards text-animate-gsap">
          <div class="awardsTitle">
            <div class="top">
              <img src="/img/degree_left.svg" alt="degree" />
              <div class="number">1</div>
              <img src="/img/degree_right.svg" alt="degree" />
            </div>
            <div class="bottom">
              <div class="text">Степень</div>
            </div>
          </div>
          <div class="awardsText">
            <editable_text dictionary_key="individual_desc_grade_1" />
          </div>
        </div>
        <div class="blockAwards text-animate-gsap">
          <div class="awardsTitle">
            <div class="top">
              <img src="/img/degree_left.svg" alt="degree" />
              <div class="number">2</div>
              <img src="/img/degree_right.svg" alt="degree" />
            </div>
            <div class="bottom">
              <div class="text">Степень</div>
            </div>
          </div>
          <div class="awardsText">
            <editable_text dictionary_key="individual_desc_grade_2" />
          </div>
        </div>
        <div class="blockAwards text-animate-gsap">
          <div class="awardsTitle">
            <div class="top">
              <img src="/img/degree_left.svg" alt="degree" />
              <div class="number">3</div>
              <img src="/img/degree_right.svg" alt="degree" />
            </div>
            <div class="bottom">
              <div class="text">Степень</div>
            </div>
          </div>
          <div class="awardsText">
            <editable_text dictionary_key="individual_desc_grade_3" />
          </div>
        </div>
      </div>
      <div class="separator"></div>
      <div class="nominationsContainer">
        <div class="nominationsBlock whiteBlock">
          <h3 class="title orange text-animate-gsap">Командные номинации</h3>
          <div class="nominations">
            <span
              class="nominationItem text-animate-gsap"
              v-for="(nomination, key) in command_nomination_4"
              :key="nomination"
            >
              <div class="icon">
                <img :src="`/img/types_of_award/${key + 1}_1.svg`" alt="icon" />
              </div>
              <div class="textBlock">
                <div class="title">
                  {{ nomination.nomination }}
                  <span v-if="nomination.new" class="new">(NEW 2023)</span>
                </div>
                <span class="description">
                  {{ nomination.description }}
                </span>
              </div>
            </span>
          </div>
        </div>

        <div class="nominationsBlock whiteBlock">
          <h3 class="title text-animate-gsap">
            <!-- <editable_text dictionary_key="command_title_2"/> -->
            Командные номинации 2022, 2023 года
          </h3>
          <!-- <span class="text centerline text-animate-gsap">
              <editable_text dictionary_key="command_desc"/>
            </span> -->
          <div class="nominations">
            <span
              class="nominationItem text-animate-gsap"
              v-for="(nomination, key) in command_nomination_1"
              :key="nomination"
            >
              <div class="icon">
                <img :src="`/img/types_of_award/${key + 1}_2.svg`" alt="icon" />
              </div>
              <div class="textBlock">
                <div class="title">
                  {{ nomination.nomination }}
                </div>
                <span class="description">
                  {{ nomination.description }}
                </span>
              </div>
            </span>
          </div>
        </div>

        <div class="nominationsBlock whiteBlock">
          <h3 class="title text-animate-gsap">
            <!-- <editable_text dictionary_key="command_title_3"/> -->
            Командные номинации 2024 года
          </h3>
          <div class="nominations">
            <span
              class="nominationItem text-animate-gsap"
              v-for="(nomination, key) in command_nomination_3"
              :key="nomination"
            >
              <div class="icon">
                <img :src="`/img/types_of_award/${key + 1}_3.svg`" alt="icon" />
              </div>
              <div class="textBlock">
                <div class="title">
                  {{ nomination.nomination }}
                </div>
                <span class="nominations-description">
                  {{ nomination.description }}
                </span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <footer_comp />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  background: linear-gradient(225deg, #f8fcff 0%, #f8fffd 100%);
  font-family: YFF_RARE_TRIAL;
  color: var(--textColorBlack);
}
.wrapper-block {
  width: 1326px;
  height: fit-content;
  margin: 200px 0 0 0;
  gap: 50px;
}

.awardTypesBackground {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("/img/award_types_background.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.titleBlock {
  gap: 50px;
  .title {
    font-family: YFF_RARE_MEGA_TRIAL;
    font-size: 64px;
    line-height: 1.25;
  }

  .description {
    font-family: ArticulatCF;
    font-size: 20px;
    max-width: 1012px;
    text-align: center;
  }
}

.whiteBlock {
  align-items: flex-start;
  width: 100%;
  background-color: white;
  border-radius: 25px;
  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.1);
  padding: 50px;

  .title {
    color: var(--textColorBlack);
    font-family: YFF_RARE_MEGA_TRIAL;
    font-size: 38px;
    line-height: 1.25;

    &.orange {
      color: #f05a28;
    }
  }
}

.awardsContainer {
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
  width: 100%;

  .blockAwards {
    max-width: 310px;
  }

  .awardsTitle {
    .top {
      flex-direction: row;
      gap: 17px;
      font-family: YFF_RARE_MEGA_TRIAL;

      img {
        width: 20px;
      }
      .number {
        font-size: 42px;
        font-weight: 800;
      }
    }

    .bottom {
      .text {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }

  .awardsText {
    font-family: ArticulatCF;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.25;
  }
}

.separator {
  position: relative;
  width: 100vw;
  height: 3px;
  background-color: #7bd6c4;
}

.nominationsContainer {
  gap: 50px;
  padding: 0px 0px 50px 0px;

  .nominationsBlock {
    gap: 50px;
    .nominations {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 50px 85px;

      .nominationItem {
        display: flex;
        flex-direction: row;
        width: calc(50% - 20px);
        max-width: 450px;
        gap: 15px;

        .icon {
          min-width: 45px;
          width: 45px;
          height: 45px;
        }

        .textBlock {
          align-items: flex-start;
          width: calc(100% - 45px);
          line-height: 1.25;
          gap: 15px;

          .title {
            align-items: flex-start;
            font-size: 16px;
            font-weight: 800;

            .new {
              color: #f05a28;
            }
          }

          .text {
            font-size: 16px;
            font-family: ArticulatCF;
            font-weight: 500;
          }
        }
      }
    }
  }
}

@media (max-width: 1440px) {
  .wrapper-block {
    width: 90vw;
  }

  .titleBlock {
    gap: 2vw;
    .title {
      font-size: 4vw;
    }
    .description {
      font-size: 18px;
      max-width: 70vw;
    }
  }

  .whiteBlock {
    .title {
      font-size: 3.25vw;
    }
  }
}

@media (max-width: 1280px) {
  .nominationsContainer {
    .nominationsBlock {
      .nominations {
        .nominationItem {
          width: calc(50% - 43px);
        }
      }
    }
  }
}

@media (max-width: 980px) {
  .awardsContainer {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .titleBlock {
    .title {
      font-size: 44px;
    }
  }

  .nominationsContainer {
    .nominationsBlock {
      .nominations {
        gap: 50px;
        .nominationItem {
          flex-direction: column;
          width: calc(50% - 25px);
        }
      }
    }
  }

  .whiteBlock {
    .title {
      font-size: 32px;
    }
  }
}

@media (max-width: 768px) {
  .nominationsContainer {
    .nominationsBlock {
      .nominations {
        flex-direction: column;
        gap: 50px;
        .nominationItem {
          flex-direction: row;
          width: calc(100%);
        }
      }
    }
  }

  .whiteBlock {
    padding: 50px 25px;

    .title {
    }
  }
}

@media (max-width: 480px) {
  .titleBlock {
    .title {
      font-size: 32px;
    }
    .description {
      max-width: unset;
      font-size: 16px;
      line-height: 1.25;
    }
  }

  .whiteBlock {
    .title {
      font-size: 24px;
    }
  }
}
</style>
