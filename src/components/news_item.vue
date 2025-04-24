<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGameStore } from "@/stores/interface-interaction.js";
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";
import Timeline from "./Timeline.vue";
import Teamtrack from "./Teamtrack.vue";

const route = useRoute();
const router = useRouter();
const store = useGameStore();

const loading = ref(true);
const error = ref(null);

const currentId = computed(() => parseInt(route.params.id));
const minId = 1;
const maxId = 15;

const hasPrev = computed(() => currentId.value > minId);
const hasNext = computed(() => currentId.value < maxId);

const formatDate = (iso) => {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const loadNews = async () => {
  try {
    await store.loadNewsById(currentId.value);
    if (!store.currentNews) {
      throw new Error("Новость не найдена");
    }
  } catch (e) {
    error.value = e.message || "Ошибка при загрузке";
  } finally {
    loading.value = false;
  }
};

onMounted(loadNews);

watch(
  () => route.params.id,
  async () => {
    loading.value = true;
    await loadNews();
  }
);
</script>

<template>
  <div class="newsPage">
    <header_comp />
    <Timeline />
    <Teamtrack />

    <div class="contentBlock">
      <template v-if="loading">
        <div class="loading">Загрузка...</div>
      </template>

      <template v-else-if="error">
        <div class="error">{{ error }}</div>
        <button @click="router.back()">← Вернуться назад</button>
      </template>

      <template v-else>
        <div class="whiteBlock">
          <h1 class="newsTitle">{{ store.currentNews.title }}</h1>
          <div class="image">
            <img
              v-if="store.currentNews.previewInfo?.url"
              :src="store.currentNews.previewInfo.url"
              class="newsImage"
              :alt="store.currentNews.title"
            />
          </div>
          <div class="newsContent" v-html="store.currentNews.content" />
          <div class="newsDate">
            {{ formatDate(store.currentNews.published_at) }}
          </div>
          <!-- Навигация между новостями -->
          <div class="newsNavigation">
            <router-link
              v-if="hasPrev"
              :to="{ name: 'news_item', params: { id: currentId - 1 } }"
              class="navButton prev"
            >
              ← Предыдущая новость
            </router-link>

            <router-link
              v-if="hasNext"
              :to="{ name: 'news_item', params: { id: currentId + 1 } }"
              class="navButton next"
            >
              Следующая новость →
            </router-link>
          </div>
        </div>
      </template>
    </div>
    <footer_comp />
  </div>
</template>

<style scoped lang="scss">
.newsPage {
  width: 100%;
  min-height: 100vh;
  padding: 200px 0px 0px;
}
.contentBlock {
  width: 100%;
  max-width: 1326px;
  padding: 50px 0px 100px 0px;
}
.loading,
.error {
  font-size: 20px;
  color: #777;
  margin: 40px 0;
  text-align: center;
}

.whiteBlock {
  align-items: flex-start;
  width: 100%;
  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.1);
  padding: 50px 100px;
  border-radius: 25px;
  color: var(--textColorBlack);
}

.image {
  border-radius: 25px;
  overflow: hidden;
  width: 100%;
  height: 575px;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.newsTitle {
  font-family: YFF_RARE_MEGA_TRIAL;
  font-size: 36px;
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 15px;
  color: var(--textColorBlack);
}

.newsContent {
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  font-family: ArticulatCF;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.35;
  margin: 35px 0px 0px 0px;
}

.newsDate {
  font-size: 24px;
  font-weight: 600;
  color: rgba(170, 170, 170, 1);
  margin: 35px 0px 0px 0px;
}

.newsNavigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 60px;
  gap: 20px;
  flex-wrap: wrap;

  .navButton {
    font-family: YFF_RARE_MEGA_TRIAL;
    font-size: 16px;
    font-weight: 400;
    background-color: var(--nipigasColorMain);
    color: white;
    text-decoration: none;
    border: 2px solid var(--nipigasColorMain);
    padding: 7px 30px 5px;
    border-radius: 10px;
    transition: 0.3s;

    &:hover {
      background-color: var(--nipigasColorMain);
      color: white;
    }

    &.next {
      align-self: flex-start;
    }

    &.prev {
      align-self: flex-start;
    }
  }
}

@media (max-width: 1440px) {
  .contentBlock {
    width: 90vw;
  }

  .image {
    height: 35vw;
  }

  .newsTitle {
    font-size: 2.5vw;
  }

  .newsContent {
    font-size: 1.5vw;
    margin: 1.8vw 0px 0px 0px;
  }

  .newsDate {
    font-size: 1.5vw;
    margin: 1.8vw 0px 0px 0px;
  }
}

@media (max-width: 1280px) {
  .contentBlock {
    width: 90vw;
  }

  .newsTitle {
    font-size: 32px;
  }

  .newsContent {
    font-size: 18px;
    margin: 20px 0px 0px 0px;
  }

  .newsDate {
    font-size: 18px;
    margin: 20px 0px 0px 0px;
  }
}
@media (max-width: 980px) {
  .whiteBlock {
    padding: 5vw 8vw;
  }

  .newsTitle {
    font-size: 32px;
  }

  .newsContent {
    font-size: 18px;
    margin: 20px 0px 0px 0px;
  }

  .newsDate {
    font-size: 18px;
    margin: 20px 0px 0px 0px;
  }

  .newsNavigation {
    .navButton {
      padding: 1vw 3vw 0.5vw;
      font-size: 2vw;
    }
  }
}

@media (max-width: 640px) {
  .whiteBlock {
    padding: 5vw;
    border-radius: 4vw;
  }

  .image {
    height: 40vw;
    border-radius: 4vw;
  }

  .newsContent {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .newsNavigation {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    .navButton {
      justify-content: center;
      text-align: center;
      width: 100%;
      padding: 7px 30px 3px;
      font-size: 14px;
    }
  }
}
</style>
