<template>
  <div class="wrapper">
    <header_comp />
    <div class="wrapper-block">
      <h1 class="page-title">Новости</h1>

      <!-- загрузка -->
      <div v-if="!interaction.news" class="loading">Загрузка...</div>

      <!-- список новостей -->
      <ul v-else class="news-list">
        <li v-for="item in interaction.news" :key="item.id" class="news-item">
          <router-link
            :to="{ name: 'news_item', params: { id: item.id } }"
            class="news-link"
          >
            <h2>{{ item.title }}</h2>
            <p>{{ item.preview }}</p>
            <small>{{ formatDate(item.published_at) }}</small>
          </router-link>
        </li>
      </ul>

      <!-- пагинация -->
      <div v-if="interaction.newsMeta.lastPage > 1" class="pagination">
        <button :disabled="page === 1" @click="goTo(page - 1)">‹ Назад</button>
        <span>Стр. {{ page }} / {{ interaction.newsMeta.lastPage }}</span>
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

<script>
import { useGameStore } from "@/stores/interface-interaction.js";
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

export default {
  name: "news_page",
  components: { header_comp, footer_comp },
  data() {
    return {
      interaction: useGameStore(),
      page: parseInt(this.$route.query.page) || 1,
    };
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
      this.$router.push({ name: "news_page", query: { page: newPage } });
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

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
}
.wrapper-block {
  width: 1160px;
  margin: 80px auto;
}
.page-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
.loading {
  font-size: 1.2rem;
  color: #666;
}
.news-list {
  list-style: none;
  padding: 0;
}
.news-item {
  margin-bottom: 2rem;
}
.news-link {
  text-decoration: none;
  color: inherit;
}
.news-link h2 {
  margin: 0 0 0.5rem;
}
.pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
}
.pagination button[disabled] {
  opacity: 0.5;
  cursor: default;
}
</style>
