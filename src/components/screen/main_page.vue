<script>
import { useGameStore } from "@/stores/interface-interaction.js";
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";
import editable_text from "../editable_text.vue";

// import gsap from "gsap";
import Timeline from "../Timeline.vue";
import Teamtrack from "../Teamtrack.vue";
import { RouterLink } from "vue-router";

export default {
  name: "main_page",
  data() {
    let interaction = useGameStore();
    return {
      interaction: interaction,
      sliderIndex: 0,
      // для драга
      isDragging: false,
      startX: 0,
      dragOffset: 0,

      // прогресс текущий у командного трека
      progress: 0,
      isMobile: window.innerWidth <= 480,
    };
  },
  components: {
    header_comp,
    Timeline,
    Teamtrack,
    footer_comp,
    editable_text,
  },
  methods: {
    nextSlide() {
      // не выходим за границы
      if (this.sliderIndex < this.interaction.news.length - 1) {
        this.sliderIndex++;
      }
    },
    prevSlide() {
      if (this.sliderIndex > 0) {
        this.sliderIndex--;
      }
    },

    // ДРАГ
    getX(e) {
      return e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
    },
    getY(e) {
      return e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;
    },
    onDragStart(e) {
      this.isDragging = true;
      this.startX = this.getX(e);
      this.startY = this.getY(e);
      this.dragOffset = 0;

      const moveTarget = e.type.startsWith("touch") ? e.target : window;

      moveTarget.addEventListener("mousemove", this.onDragMove, {
        passive: false,
      });
      moveTarget.addEventListener("mouseup", this.onDragEnd);
      moveTarget.addEventListener("touchmove", this.onDragMove, {
        passive: false,
      });
      moveTarget.addEventListener("touchend", this.onDragEnd);
    },
    onDragMove(e) {
      if (!this.isDragging) return;

      const currentX = this.getX(e);
      const currentY = this.getY(e);

      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      // если пальцем пошли больше по Y, чем по X — игнорим
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        this.onDragEnd(); // сразу отменим
        return;
      }

      e.preventDefault(); // отключим прокрутку страницы
      this.dragOffset = deltaX;
    },
    onDragEnd(e) {
      if (!this.isDragging) return;
      this.isDragging = false;

      const sliderEl = this.$refs.sliderBlock;
      const style = getComputedStyle(sliderEl);
      const itemW = parseFloat(style.getPropertyValue("--newsSliderItemWidth"));
      const gap = parseFloat(style.getPropertyValue("--newsSliderGap"));
      const step = itemW + gap;

      // перелистываем только на 1 слайд максимум
      const movedSlides =
        Math.abs(this.dragOffset) > step / 3 ? Math.sign(-this.dragOffset) : 0;

      this.sliderIndex = Math.min(
        Math.max(0, this.sliderIndex + movedSlides),
        this.interaction.news.length - 1
      );

      this.dragOffset = 0;

      window.removeEventListener("mousemove", this.onDragMove);
      window.removeEventListener("mouseup", this.onDragEnd);
      window.removeEventListener("touchmove", this.onDragMove);
      window.removeEventListener("touchend", this.onDragEnd);
    },
  },
  async mounted() {
    // gsap.from(".img-animate-gsap", {
    //   x: 240,
    //   opacity: 0,
    //   duration: 0.5,
    //   ease: "sine",
    // });
    // gsap.from(".text-animate-gsap", {
    //   x: -100,
    //   opacity: 0,
    //   duration: 0.25,
    //   stagger: 0.15,
    //   delay: 0.25,
    // });

    await this.interaction.loadNews(1);
    window.addEventListener("resize", this.checkScreenWidth);
    this.checkScreenWidth();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenWidth);
  },
  computed: {
    sliderTransform() {
      return `translateX(calc((var(--newsSliderItemWidth) + var(--newsSliderGap)) * -${this.sliderIndex} + ${this.dragOffset}px))`;
    },
    filledHeightPercent() {
      return `${Math.round(this.progress * 100)}%`;
    },
    filledWidthPercent() {
      return `${Math.round(this.progress * 100)}%`;
    },
    isMobileWidth() {
      return window.innerWidth <= 480;
    },
  },
  watch: {},
};
</script>

<template>
  <div class="wrapper">
    <header_comp />
    <Timeline />
    <Teamtrack @progressUpdate="progress = $event" />
    <div class="energyContainer contentBlock fullScreen">
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

      <div class="bannerTrack">
        <div class="cup"></div>
        <div class="line">
          <div
            class="filledLine"
            :style="
              isMobile
                ? { width: filledWidthPercent }
                : { height: filledHeightPercent }
            "
          >
            {{ Math.round(progress * 100) }}%
          </div>
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
            <div class="arrow prev" @click="prevSlide"></div>
            <div class="arrow next" @click="nextSlide"></div>
          </div>
        </div>
        <div
          class="sliderBlock"
          ref="sliderBlock"
          :class="{ dragging: isDragging }"
          @mousedown.prevent="onDragStart"
          @touchstart.prevent="onDragStart"
          :style="{ transform: sliderTransform }"
        >
          <div
            class="sliderItem"
            v-for="post in interaction.news"
            :key="post.id"
          >
            <div class="image">
              <img
                :src="post.previewInfo.url"
                :alt="post.previewInfo.originalName"
              />
              <div class="goToBlock">Перейти</div>
            </div>
            <div class="title">{{ post.title }}</div>
            <div class="description">{{ post.content }}</div>
            <div class="date">
              {{ new Date(post.published_at).toLocaleDateString("ru-RU") }}
            </div>
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
  padding: 150px 0 0 0;
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
  max-width: 1326px;
  padding: 85px 0px 85px 100px;
  height: 34vw;
  max-height: 650px;
  border-radius: 20px;
  background-color: var(--textColorBlack);
  justify-content: center;
  gap: 40px;
  overflow: visible;
  box-shadow: 40px 49px 88px rgba(0, 140, 149, 0.28);
  z-index: 1;

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
    max-height: 1000px;
    width: 53vw;
    max-width: 1000px;
    pointer-events: none;
  }
}

.bannerTrack {
  //   display: none;
  position: absolute;
  right: 5vw;
  width: 45px;
  background-color: white;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  height: 375px;
  padding: 16px;
  gap: 16px;
  z-index: 0;

  .cup {
    width: 27px;
    height: 27px;
    background-image: url("/img/bannerTrackCup.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .line {
    width: 100%;
    height: calc(100% - 27px);
    background-color: rgba(0, 45, 58, 1);
    border-radius: 50px;
  }

  .filledLine {
    position: absolute;
    bottom: 0;
    width: 200%;
    height: 50%;
    min-height: 50px;
    background-color: rgba(240, 90, 40, 1);
    border-radius: 50px;
    color: white;
    writing-mode: sideways-lr;
    padding: 10px;
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
    display: none;
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
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: fit-content;
    padding: 0px 0px 2vw 0px;
    gap: var(--newsSliderGap);
    transition: 0.5s;
    touch-action: pan-y;
    cursor: grab;

    &.dragging {
      transition: none;
    }

    .sliderItem {
      align-items: flex-start;
      justify-content: space-between;
      padding: 25px;
      width: var(--newsSliderItemWidth);
      min-width: var(--newsSliderItemWidth);
      height: 685px;
      border-radius: 25px;
      background-color: white;
      box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.06);

      &:hover {
        .image {
          .goToBlock {
            transform: translate(0px, 0%);
          }
        }
      }

      .image {
        background-color: #77e2c3;
        height: 485px;
        width: 100%;
        border-radius: 25px;
        overflow: hidden;

        .goToBlock {
          flex-direction: row;
          padding: 10px 20px;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          transform: translate(0px, 101%);
          transition: 0.25s;
          color: white;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.5);
          justify-content: flex-start;
          transition: 0.25s;

          &:hover {
            text-decoration: underline;
          }
        }
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
@media (max-width: 1920px) {
  .banner {
    padding: 6vw 0px 5vw 7vw;
    gap: 2vw;
  }
}
@media (max-width: 1880px) {
  .bannerTrack {
    right: 0;
    left: 2vw;
    z-index: 1;
  }
}

@media (max-width: 1680px) {
  .bannerTrack {
    left: var(--contentPadding);
    transform: translate(-50%, 0);
  }
}
@media (max-width: 1440px) {
  .bannerTrack {
    max-height: 70%;
  }
  .contentBlock {
    max-width: unset;
    width: 90vw;

    &.fullScreen {
      width: 100%;
    }
  }

  .banner {
    max-width: 90vw;
    .title {
      font-size: 5vw;
    }

    .subTitle {
      font-size: 2vw;
    }
  }

  .news {
    .sliderBlock {
      .sliderItem {
        height: 40vw;

        .image {
          height: 27vw;
        }

        .title {
          font-size: 32px;
          margin: 20px 0px 0px 0px;
        }

        .description {
          font-size: 16px;
          margin: 10px 0px 0px 0px;
        }
      }
    }
  }
}
@media (max-width: 1280px) {
  .news {
    gap: 50px;

    .sliderBlock {
      .sliderItem {
        height: 50vw;

        .image {
          height: 33vw;
        }
      }
    }
  }
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

  .bannerTrack {
    width: 5vw;
    padding: 0.9vw 1.7vw;
    gap: 1.2vw;

    .cup {
      width: 3vw;
      height: 3vw;
    }

    .line {
      .filledLine {
        font-size: 15px;
      }
    }
  }

  .news {
    gap: 25px;

    .topBlock {
      .arrowsBlock {
        align-self: flex-end;
      }
    }

    .sliderBlock {
      .sliderItem {
        padding: 3vw;
        height: 55vw;

        .image {
          height: 33vw;
        }
      }
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

  .newsBanner {
    .playIcon {
      width: 45px;
      height: 45px;
    }
  }

  .news {
    .topBlock {
      .titleBlock {
        .title {
          font-size: 7vw;
        }
      }
    }
    .sliderBlock {
      .sliderItem {
        min-height: 50vw;
        height: fit-content;
        border-radius: 4vw;
        .image {
          height: 30vw;
          min-height: 30vw;
          border-radius: 4vw;
        }

        .title {
          font-size: 24px;
        }

        .description {
          font-size: 14px;
          margin: 15px 0px 0px 0px;
        }

        .date {
          font-size: 12px;
          margin: 10px 0px 0px 0px;
        }
      }
    }
  }
}
@media (max-width: 480px) {
  .energyContainer {
    margin: 0px 0px 20px 0px;
  }
  .bannerTrack {
    position: absolute;
    flex-direction: row-reverse;
    width: 70vw;
    height: 27px;
    left: 50%;
    bottom: 0;
    padding: 10px;
    transform: translate(-50%, calc(-2.5vw + 50%));
    margin: 10px 0px 0px 0px;

    .cup {
      width: 22px;
      height: 22px;
    }

    .line {
      padding: 0;
      width: calc(100% - 30px);
      height: 100%;
      .filledLine {
        min-width: 50px;
        width: 50px;
        // width: 50% !important;
        height: 200% !important;
        min-height: unset;
        bottom: unset;
        left: 0;
        padding: 0;
        writing-mode: lr;
        font-size: 13px;
      }
    }
  }

  .news {
    .topBlock {
      .titleBlock {
        .title {
          font-size: 32px;
        }
      }
    }
  }
}
@media (max-width: 420px) {
}
@media (max-width: 380px) {
}
</style>
