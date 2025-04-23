<script>
import { useGameStore } from "@/stores/interface-interaction.js";
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";
import nomination_item from "@/components/nomination_item.vue";

import gsap from "gsap";

export default {
  name: "team_track_winners",
  data() {
    let interaction = useGameStore();
    return {
      selectedYear: 2022,
      interaction: interaction,
    };
  },
  components: {
    header_comp,
    footer_comp,
    nomination_item,
  },
  methods: {},
  mounted() {
    gsap.from(".text-animate-gsap", {
      x: -100,
      opacity: 0,
      duration: 0.25,
      delay: 0.25,
      ease: "sine",
    });
    gsap.from(".img-animate-gsap", {
      x: -100,
      opacity: 0,
      scale: 0.5,
      duration: 0.25,
      delay: 0.5,
      ease: "sine",
    });
  },
  computed: {
    availableYears() {
      const uniqueTable = {};
      let years = this.interaction.commandAwards
        .map((a) => a.year)
        .filter((year) => !uniqueTable[year] && (uniqueTable[year] = 1));
      return years.sort((a, b) => b - a);
    },
    yearWinners() {
      return this.interaction.commandAwards.filter(
        (w) => w.year == this.selectedYear
      );
    },
  },
  created() {
    this.selectedYear = this.availableYears[0];
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
    <!-- <div class="bg-element img-animate-gsap">
      <img src="/img/background_page/team_track_winners.svg" alt=""/>
    </div> -->
    <div class="wrapper-block">
      <div class="whiteBlock">
        <h1 class="title text-animate-gsap">Победители командного трека</h1>
        <div class="years-container">
          <button
            class="year"
            v-for="year in availableYears.slice().reverse()"
            :key="year"
            @click="selectedYear = year"
            :class="{ active: selectedYear == year }"
          >
            {{ year }}
          </button>
        </div>
        <div class="nomination-container">
          <transition-group name="win_Tracker" appear>
            <nomination_item
              v-for="item in yearWinners"
              :key="item.id"
              :item="item"
            />
          </transition-group>
        </div>
      </div>
    </div>
    <footer_comp />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  font-family: YFF_RARE_TRIAL;
  background: linear-gradient(225deg, #f8fcff 0%, #f8fffd 100%);
}
.wrapper-block {
  width: 1326px;
  height: fit-content;
  padding: 130px 0 50px 0;
}

.whiteBlock {
  width: 100%;
  background-color: white;
  border-radius: 25px;
  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.1);
  margin: 75px 0 0 0;
  padding: 50px 135px;
}

.title {
  font-family: YFF_RARE_MEGA_TRIAL;
  font-size: 48px;
  line-height: 1.25;
  font-weight: 700;
  color: var(--textColorBlack);
}

.years-container {
  margin: 20px 0 0 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
}
.year:first-child {
  margin: 0;
}
.year.active {
  background-color: var(--nipigasColorAdditional);
  color: var(--white);
}
.year {
  font-family: YFF_RARE_TRIAL;
  margin: 0 0 0 50px;
  width: 115px;
  height: 33px;
  padding: 4px 0px 0px 0px;
  border-radius: 5px;
  border: none;
  background-color: #008a93;
  color: white;
  font-size: 20px;
  font-weight: 700;
  transition: all 0.25s ease;
  cursor: pointer;
}
.year:hover {
  background-color: var(--nipigasColorAdditional);
  color: var(--white);
}

.nomination-container {
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 40px 0 0px 0;
  height: fit-content;
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto; */
  justify-content: space-between;
  gap: 75px 50px;
}

.bg-element {
  position: absolute;
  top: 0;
  width: 1920px;
  height: 1200px;
  z-index: 0;
}
.bg-element img {
  position: absolute;
}

@media (max-width: 1440px) {
  .wrapper-block {
    width: 90vw;
  }
  .title {
    font-size: 3.5vw;
  }
  .nomination-container {
    gap: 75px 3vw;
  }
  .nomination-item {
    width: calc(50% - 3vw);
    min-height: 220px;
  }
}

@media (max-width: 1280px) {
  .whiteBlock {
    padding: 50px;
  }
}

@media (max-width: 1200px) {
  .nomination-item {
    min-height: 200px;
  }
}
@media (max-width: 1024px) {
  .wrapper-block {
    width: 80vw;
  }
  .nomination-container {
    grid-template-columns: 1fr;
  }
  .title {
    margin: 20px 0 0 0;
    font-size: 36px;
    text-align: center;
  }
  .nomination-container {
    flex-direction: column;
  }
  .nomination-item {
    width: 100%;
    min-height: fit-content;
  }
}
@media (max-width: 980px) {
}
@media (max-width: 768px) {
}
@media (max-width: 640px) {
  .whiteBlock {
    padding: 50px 25px;
  }

  .years-container {
    gap: 2vw;
  }

  .year {
    margin: 0;
  }

  .wrapper-block {
    width: 90vw;
  }
}
@media (max-width: 480px) {
  .years-container {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .year {
    width: calc(50% - 2vw);
    margin: 0;
  }

  .title {
    font-size: 24px;
    text-align: center;
  }

  .nomination-container {
    margin: 40px 0 50px 0;
  }
}
@media (max-width: 420px) {
}
@media (max-width: 380px) {
}
</style>
