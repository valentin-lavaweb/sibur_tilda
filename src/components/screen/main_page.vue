<script>
import { useGameStore } from "@/stores/interface-interaction.js";
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";
import editable_text from "../editable_text.vue";

import gsap from "gsap";
import Timeline from "../Timeline.vue";
import Teamtrack from "../Teamtrack.vue";
import { RouterLink } from "vue-router";

export default {
  name: "main_page",
  data() {
    let interaction = useGameStore();
    return {
      interaction: interaction,
    };
  },
  components: {
    header_comp,
    Timeline,
    Teamtrack,
    footer_comp,
    editable_text,
  },
  methods: {},
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
  computed: {},
  watch: {},
};
</script>

<template>
  <div class="wrapper">
    <header_comp />
    <Timeline />
    <Teamtrack />
    <div class="energyContainer contentBlock">
      <div class="banner">
        <div class="background">
          <img src="/img/bannerBackground.png" />
        </div>
        <div class="logo">
          <img src="/img/sibur_logo_white.svg" alt="sibur logo" />
        </div>
        <div class="separator">
          <div class="sep"></div>
          <div class="sep"></div>
        </div>
        <div class="subTitle">Наградная кампания</div>
        <div class="title">Энергия<br />Признания</div>
        <div class="imageLight">
          <img src="/img/light.png" />
        </div>
      </div>
    </div>
    <div class="newsBannerContainer contentBlock fullScreen z-1">
      <div class="newsBanner">
        <video src=""></video>
        <div class="playIcon"></div>
      </div>
    </div>
    <div class="newsContainer contentBlock news fullScreen newsContainer">
      <div class="backgroundImages">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <div class="contentBlock news">
        <div class="topBlock">
          <div class="titleBlock">
            <div class="title">Новости</div>
            <div class="additionalText">
              <RouterLink :to="{ name: 'news' }"> Больше новостей </RouterLink>
            </div>
          </div>
          <div class="arrowsBlock">
            <div class="arrow prev"></div>
            <div class="arrow next"></div>
          </div>
        </div>
        <div class="sliderBlock">
          <div class="sliderItem">
            <div class="image">
              <img src="" alt="" />
            </div>
            <div class="title">Заголовок</div>
            <div class="description">
              Описание, описание, описание, описание, описание, описание,
              описание, описание, описание, описание, описание
            </div>
            <div class="date">31.12.2025</div>
          </div>
        </div>
      </div>
    </div>
    <footer_comp />
  </div>
</template>

<style scoped lang="scss">
$logoWidth: 175px;

.wrapper {
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 200px 0 0 0;
}
.contentBlock {
  width: 100%;
  max-width: 1326px;
  overflow: visible;

  &.fullScreen {
    max-width: 100%;
  }

  &.z-1 {
    z-index: 1;
  }

  padding: 2.5vw 0px;
}

.banner {
  font-family: YFF_RARE_MEGA_TRIAL;
  align-items: flex-start;
  width: 100%;
  padding: 6vw 0px 5vw 7vw;
  height: 34vw;
  border-radius: 20px;
  background-color: var(--textColorBlack);
  justify-content: center;
  gap: 2vw;
  overflow: visible;
  box-shadow: 40px 49px 88px rgba(0, 140, 149, 0.28);

  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .logo {
    width: $logoWidth;
    height: 32px;
  }

  .separator {
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    width: calc($logoWidth * 0.85);
    .sep {
      width: 85%;
      height: 4px;
      background-color: white;
      border-radius: 50px;
      &:nth-child(2) {
        width: 15%;
      }
    }
  }

  .subTitle {
    font-family: ArticulatCF;
    font-size: 36px;
    font-weight: 300;
    text-transform: uppercase;
  }

  .title {
    font-size: 96px;
    font-weight: 800;
    color: #77e2c3;
    text-transform: uppercase;
    line-height: 1;
  }

  .imageLight {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translate(-69%, -50%);
    height: 53vw;
    width: 53vw;
    pointer-events: none;
  }
}

.newsBanner {
  width: 100%;
  height: 42vw;
  background-image: url("/img/newsBannerTemplate.png");
  background-position: center;
  background-size: cover;

  .playIcon {
    position: absolute;
    width: 5vw;
    height: 5vw;
    max-width: 90px;
    max-height: 90px;
    background-image: url("/img/playIcon.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.news {
  align-items: flex-start;
  color: var(--textColorBlack);
  font-family: YFF_RARE_MEGA_TRIAL;
  line-height: 1;
  gap: 100px;
  &.fullScreen {
    align-items: center;
  }

  .backgroundImages {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;

    .left {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 80vw;
      height: 80vw;
      background-image: url(/img/news_flares_left.png);
      background-position: left bottom;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .right {
      position: absolute;
      right: 0;
      top: -69vw;
      width: 130vw;
      height: 130vw;
      background-image: url(/img/news_flares_right.png);
      background-position: right top;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  .topBlock {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    .titleBlock {
      align-items: flex-start;
      gap: 15px;
      .title {
        font-size: 54px;
        font-weight: 600;
      }
      .additionalText {
        a {
          font-size: 18px;
          font-weight: 600;
          color: var(--nipigasColorMain);
          text-decoration: underline;
        }
      }
    }

    .arrowsBlock {
      flex-direction: row;
      gap: 10px;

      .arrow {
        width: 40px;
        height: 25px;
        background-color: var(--nipigasColorMain);
        border-radius: 8px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 60%;
        cursor: pointer;

        &.next {
          background-image: url("/img/arrow-right.svg");
        }
        &.prev {
          background-image: url("/img/arrow-left.svg");
        }
      }
    }
  }

  .sliderBlock {
    width: 100%;
    height: fit-content;
    padding: 0px 0px 2vw 0px;

    .sliderItem {
      align-items: flex-start;
      justify-content: space-between;
      padding: 25px;
      width: 100%;
      height: 685px;
      border-radius: 25px;
      background-color: white;
      box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.06);

      .image {
        background-color: #77e2c3;
        height: 485px;
        width: 100%;
        border-radius: 25px;
      }

      .title {
        font-size: 36px;
        color: black;
        margin: 25px 0px 0px 0px;
      }

      .description {
        font-family: ArticulatCF;
        font-size: 16px;
        color: black;
        margin: 15px 0px 0px 0px;
      }

      .date {
        font-size: 16px;
        color: #aaaaaa;
        margin: 25px 0px 0px 0px;
      }
    }
  }
}

@media (max-width: 1440px) {
  .contentBlock {
    max-width: unset;
    width: 90vw;

    &.fullScreen {
      width: 100%;
    }
  }

  .banner {
    .title {
      font-size: 5vw;
    }

    .subTitle {
      font-size: 2vw;
    }
  }
}
@media (max-width: 1280px) {
}
@media (max-width: 1060px) {
  .wrapper {
    padding: 130px 0px 0px 0px;
  }
}
@media (max-width: 980px) {
  .banner {
    .logo {
      width: 15vw;
      height: 3vw;
    }
  }
}
@media (max-width: 768px) {
}
@media (max-width: 640px) {
  .banner {
    height: 45vw;
    gap: 3vw;

    .logo {
      width: 20vw;
      height: 4vw;
    }
    .subTitle {
      font-size: 3.5vw;
    }

    .title {
      font-size: 7vw;
    }
  }
}
@media (max-width: 480px) {
}
@media (max-width: 420px) {
}
@media (max-width: 380px) {
}
</style>
