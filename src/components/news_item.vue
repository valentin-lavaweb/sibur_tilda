<template>
  <div class="wrapper">
    <header_comp />
    <div class="content-block">
      <button @click="$router.back()">← Назад к новостям</button>

      <div v-if="!currentNews">Загрузка...</div>
      <div v-else class="news-detail">
        <h1>{{ currentNews.title }}</h1>
        <small>{{ formatDate(currentNews.published_at) }}</small>

        <img
          v-if="currentNews.previewInfo?.url"
          :src="currentNews.previewInfo.url"
          :alt="currentNews.previewInfo.originalName"
        />

        <!-- Если контент приходит как HTML -->
        <div v-html="currentNews.content"></div>

        <div v-if="currentNews.gallery?.length" class="gallery">
          <h3>Галерея</h3>
          <div class="images">
            <img
              v-for="img in currentNews.gallery"
              :key="img.uuid"
              :src="img.url"
              :alt="img.originalName"
            />
          </div>
        </div>
      </div>
    </div>
    <footer_comp />
  </div>
</template>

<script>
import { useGameStore } from "@/stores/interface-interaction.js";
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

export default {
  name: "news_item",
  components: { header_comp, footer_comp },
  props: ["id"],
  data() {
    return {
      interaction: useGameStore(),
    };
  },
  computed: {
    currentNews() {
      return this.interaction.currentNews;
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
  },
  async beforeRouteEnter(to, from, next) {
    const store = useGameStore();
    await store.loadNewsById(to.params.id);
    next();
  },
};
</script>

<style scoped>
.news-detail img {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
}
.gallery .images {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.gallery .images img {
  width: 150px;
  object-fit: cover;
}
</style>
