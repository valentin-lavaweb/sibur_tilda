<script>
import { useGameStore } from "@/stores/interface-interaction.js";
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";
import Timeline from "../Timeline.vue";
import Teamtrack from "../Teamtrack.vue";

export default {
  name: "news_page",
  components: { header_comp, footer_comp, Timeline, Teamtrack },
  data() {
    return {
      interaction: useGameStore(),
      page: parseInt(this.$route.query.page) || 1,
    };
  },
  computed: {
    paginationPages() {
      const total = this.interaction.newsMeta.lastPage;
      const current = this.page;
      const delta = 1;
      const pages = [];

      if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        if (current - delta > 2) pages.push("...");
        for (
          let i = Math.max(2, current - delta);
          i <= Math.min(total - 1, current + delta);
          i++
        ) {
          pages.push(i);
        }
        if (current + delta < total - 1) pages.push("...");
        pages.push(total);
      }

      return pages;
    },
  },
  methods: {
    formatDate(iso) {
      return new Date(iso).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    goTo(newPage) {
      this.$router.push({ name: "news", query: { page: newPage } });
    },
  },
  async beforeRouteEnter(to, from, next) {
    const page = parseInt(to.query.page) || 1;
    const store = useGameStore();
    if (!store.news || store.newsMeta.currentPage !== page) {
      await store.loadNews(page);
    }
    next((vm) => (vm.page = page));
  },
  watch: {
    "$route.query.page"(val) {
      const newPage = parseInt(val) || 1;
      this.page = newPage;
      this.interaction.loadNews(newPage);
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <header_comp />
    <Timeline />
    <Teamtrack />
    <div class="wrapper-block">
      <h1 class="pageTitle">Новости</h1>

      <!-- загрузка -->
      <div v-if="!interaction.news" class="loading">Загрузка...</div>

      <!-- список новостей -->
      <div v-else class="newsList">
        <router-link
          v-for="item in interaction.news"
          :key="item.id"
          :to="{ name: 'news_item', params: { id: item.id } }"
          class="newsItem"
        >
          <div class="imageBlock">
            <img
              :src="item.previewInfo?.url || '/img/newsPlaceholder1.png'"
              :alt="item.title"
            />
          </div>
          <div class="newsTitle">{{ item.title }}</div>
          <div class="newsDescription">{{ item.content }}</div>
          <div class="newsDate">{{ formatDate(item.published_at) }}</div>
        </router-link>
      </div>

      <!-- пагинация -->
      <div v-if="interaction.newsMeta.lastPage > 1" class="pagination">
        <button :disabled="page === 1" @click="goTo(page - 1)">‹ Назад</button>

        <button
          v-for="p in paginationPages"
          :key="p + '_'"
          :class="{ active: p === page }"
          @click="typeof p === 'number' && goTo(p)"
          :disabled="p === '...'"
        >
          {{ p }}
        </button>

        <button
          :disabled="page === interaction.newsMeta.lastPage"
          @click="goTo(page + 1)"
        >
          Вперёд ›
        </button>
      </div>
    </div>
    <footer_comp />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  min-height: 100vh;
  padding: 150px 0px 0px 0px;
}
.wrapper-block {
  width: 100%;
  max-width: 1326px;
  padding: 0px 0px 50px 0px;
}

.pageTitle {
  //   font-family: ArticulatCF;
  //   font-size: 32px;
  //   font-weight: 600;
  //   color: var(--nipigasColorMain);
  font-family: YFF_RARE_MEGA_TRIAL;
  font-size: 48px;
  line-height: 1.25;
  font-weight: 700;
  color: var(--textColorBlack);
  margin: 50px 0px 50px 0px;
}

.newsList {
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 50px 50px;

  .newsItem {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: calc(50% - 25px);
    height: fit-content;
    min-height: 500px;
    padding: 25px;
    border-radius: 25px;
    background-color: white;
    box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.1);

    &:hover {
      .imageBlock {
        img {
          width: 103%;
          height: 103%;
        }
      }
    }

    .imageBlock {
      height: 300px;
      width: 100%;
      background-color: #777;
      border-radius: 25px;
      overflow: hidden;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: 0.25s;
        object-fit: cover;
      }
    }

    .newsTitle {
      font-family: YFF_RARE_MEGA_TRIAL;
      font-size: 36px;
      line-height: 1.25;
      color: var(--textColorBlack);
      margin: 20px 0px 0px 0px;
    }

    .newsDescription {
      font-family: ArticulatCF;
      font-size: 16px;
      font-weight: 300;
      color: var(--textColorBlack);
      margin: 10px 0px 0px 0px;
    }

    .newsDate {
      font-family: ArticulatCF;
      font-size: 14px;
      font-weight: 300;
      color: #aaaaaa;
      margin: 20px 0px 0px 0px;
    }
  }
}

.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 60px 0;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 10px;
    background-color: white;
    color: var(--textColorBlack);
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s all;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

    &:hover:not([disabled]) {
      background-color: var(--nipigasColorMain);
      color: white;
    }

    &.active {
      background-color: var(--nipigasColorMain);
      color: white;
      font-weight: bold;
    }

    &[disabled] {
      cursor: default;
      color: #bbb;
      background-color: #f3f3f3;
      box-shadow: none;
    }
  }
}

@media (max-width: 1440px) {
  .wrapper-block {
    width: 90vw;
  }

  .newsList {
    .newsItem {
      .imageBlock {
        height: 22vw;
      }
    }
  }
}

@media (max-width: 1280px) {
  .newsList {
    .newsItem {
      padding: 15px;
      min-height: unset;
      .newsTitle {
        font-size: 30px;
      }

      .newsDescription {
        font-size: 15px;
      }
    }
  }
}

@media (max-width: 1060px) {
  .wrapper {
    padding: 150px 0px 0px 0px;
  }
}

@media (max-width: 768px) {
  .newsList {
    flex-direction: column;
    .newsItem {
      width: 100%;
      padding: 15px;
      min-height: unset;
      .imageBlock {
        height: 40vw;
      }

      .newsTitle {
        font-size: 30px;
      }

      .newsDescription {
        font-size: 15px;
      }
    }
  }
}

@media (max-width: 480px) {
  .newsList {
    flex-direction: column;
    .newsItem {
      width: 100%;
      padding: 15px;
      min-height: unset;
      .imageBlock {
        height: 40vw;
      }

      .newsTitle {
        font-size: 20px;
      }

      .newsDescription {
        font-size: 15px;
        line-height: 1.25;
      }
    }
  }
}
</style>
