<script>
import { useGameStore } from "@/stores/interface-interaction.js";

export default {
  props: {
    item: Object,
  },
  name: "nomination_item",
  computed: {},
};
</script>

<template>
  <div class="nomination-item">
    <div class="front-item-content">
      <div class="item-content">
        <div class="titleBlock">
          <div class="icon"></div>
          <h3 class="subTitle">
            {{ item.nomination }}
          </h3>
        </div>
        <span class="text">
          <span class="descBlock">Проект </span>«{{ item.project }}»
        </span>
        <span class="autorText">
          <span class="autorBlock"> Команда: </span>
          {{ item.authors }}
        </span>
        <!-- <button class="show_winers">
            Показать победителей
          </button> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.front-item-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  z-index: 2;
  transition: all 0.5s ease;
}

.nomination-item {
  width: 450px;
  height: 100%;
  border: 1px solid rgba(0, 140, 149, 0);
  border-radius: 10px;
  justify-content: flex-start;
  align-self: flex-start;
  transition: all 0.25s ease;
}

.titleBlock {
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;

  .icon {
    min-width: 35px;
    width: 35px;
    height: 39px;
    background-image: url("/img/awardCup.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
}

.subTitle > span {
  display: flex;
}
span img {
  width: 20px;
  transform-origin: bottom;
  transition: all 0.25s ease;
}

.item-content {
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  overflow-y: auto;
  gap: 15px;
  z-index: 2;
}
.subTitle {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: YFF_RARE_TRIAL;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  line-height: 1.25;
  color: var(--nipigasColorAdditional);
}
.text {
  width: 100%;
  text-align: left;
  font-family: ArticulatCF;
  font-size: 14px;
  font-weight: 600;
  color: var(--textColorBlack);
  line-height: 1.3;
}
.descBlock {
  color: var(--nipigasColorMain);
  font-weight: 700;
}
.autorText {
  width: 100%;
  height: fit-content;
  font-family: ArticulatCF;
  font-size: 14px;
  font-weight: 500;
  color: var(--textColorBlack);
  text-align: left;
}
.autorBlock {
  font-size: 14px;
  font-weight: 700;
  color: var(--nipigasColorMain);
}

@media (max-width: 1440px) {
  .subTitle {
    font-size: 1.2vw;
  }
  .text {
    font-size: 1.1vw;
  }
  .autorText {
    font-size: 1vw;
  }
  .autorBlock {
    font-size: 1vw;
  }
}

@media (max-width: 1280px) {
  .subTitle {
    font-size: 16px;
  }

  .text {
    font-size: 14px;
  }

  .autorText {
    font-size: 14px;
  }

  .autorBlock {
    font-size: 14px;
  }
}

@media (max-width: 1024px) {
  .subTitle {
    font-size: 20px;
  }
  .text {
    font-size: 18px;
  }
  .autorText {
    font-size: 16px;
  }
  .autorBlock {
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
  .titleBlock {
    flex-direction: column;
    align-items: flex-start;
  }
}
@media (max-width: 420px) {
}
@media (max-width: 380px) {
}
</style>
