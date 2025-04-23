<template>
  <div class="news_table">
    <!-- Модалка создания/редактирования -->
    <Teleport to="body">
      <transition name="openPage" mode="out-in" appear>
        <NewsEdit
          v-if="editedItem"
          :item="editedItem"
          @done="onEditDone"
          @cancel="editedItem = null"
          ref="editForm"
        />
      </transition>
    </Teleport>

    <!-- Панель управления -->
    <div class="control-panel">
      <button class="btn" @click="addNews()">добавить новость</button>
    </div>

    <!-- Таблица -->
    <Vue3EasyDataTable
      v-model:server-options="serverOptions"
      :server-items-length="total"
      :loading="isLoading"
      :headers="headers"
      :items="items"
      border-cell
      theme-color="rgb(0, 140, 149)"
      buttons-pagination
    >
      <template #item-title="{ item }">
        <TextEdit :item="item" editProp="title" @updateItem="updateItem" />
      </template>
      <template #item-content="{ item }">
        <TextEdit :item="item" editProp="content" @updateItem="updateItem" />
      </template>
      <template #item-published_at="{ item }">
        <TextEdit
          :item="item"
          editProp="published_at"
          @updateItem="updateItem"
        />
      </template>
      <template #item-preview="{ item }">
        <input
          type="file"
          accept="image/*"
          @change="updatePreview(item, $event)"
        />
        <img
          v-if="item.previewInfo?.url"
          :src="item.previewInfo.url"
          width="100"
          alt="preview"
        />
      </template>
      <template #item-gallery="{ item }">
        <gallery_edit_many
          :item="item"
          @updated="updateGallery(item, $event)"
        />
      </template>
      <template #item-actions="{ item }">
        <button @click="editItem(item)" title="Редактировать">✏️</button>
        <button @click="deleteItem(item)" title="Удалить">🗑️</button>
      </template>
    </Vue3EasyDataTable>
  </div>
</template>

<script>
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { useGameStore } from "@/stores/interface-interaction.js";
import TextEdit from "../cells/textEdit.vue";
import gallery_edit_many from "@/components/admin/tables/gallery_edit_many.vue";
import NewsEdit from "./news_edit.vue";

const headers = [
  { text: "Id", value: "id", width: 60 },
  { text: "Заголовок", value: "title", width: 200 },
  { text: "Контент", value: "content", width: 300 },
  { text: "Дата публикации", value: "published_at", width: 180 },
  { text: "Превью", value: "preview", width: 120 },
  { text: "Галерея", value: "gallery", width: 120 },
  { text: "Действия", value: "actions", fixed: true, width: 100 },
];

export default {
  name: "news_table",
  components: { Vue3EasyDataTable, TextEdit, gallery_edit_many, NewsEdit },
  data() {
    return {
      interaction: useGameStore(),
      isLoading: false,
      items: [],
      total: 0,
      serverOptions: {
        page: 1,
        rowsPerPage: 25,
        sortBy: "id",
        sortType: "asc",
      },
      headers,
      editedItem: null,
      onEditDone: null,
    };
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      // только page передаем в getNews
      const res = await this.interaction.api.getNews(this.serverOptions.page);
      this.items = res.data.data;
      this.total = res.data.meta.total;
      this.isLoading = false;
    },
    addNews() {
      this.editedItem = {
        title: "",
        content: "",
        published_at: new Date().toISOString(),
        preview: null,
        gallery: [],
      };
      this.onEditDone = async (newItem) => {
        const formData = new FormData();
        formData.append("title", newItem.title);
        formData.append("content", newItem.content);
        formData.append("published_at", newItem.published_at);
        if (newItem.preview) {
          formData.append("preview", newItem.preview);
        }
        if (Array.isArray(newItem.gallery)) {
          newItem.gallery.forEach((f, i) => {
            formData.append(`gallery[${i}]`, f);
          });
        }

        const res = await this.interaction.api.createNews(formData);
        this.items.unshift(res.data.data);
        this.editedItem = null;
      };
    },

    editItem(item) {
      // клонируем для модального окна
      this.editedItem = { ...item };
      this.onEditDone = async (updated) => {
        const res = await this.interaction.api.updateNews(item.id, updated);
        Object.assign(item, res.data.data);
        this.editedItem = null;
      };
      // передаем в форму
      this.$refs.editForm.setItem(this.editedItem);
    },
    async deleteItem(item) {
      if (!confirm(`Удалить новость «${item.title}»?`)) return;
      await this.interaction.api.deleteNews(item.id);
      this.items = this.items.filter((i) => i.id !== item.id);
    },
    async updateItem(item) {
      // TextEdit эмитит измененный item целиком
      const res = await this.interaction.api.updateNews(item.id, {
        title: item.title,
        content: item.content,
        published_at: item.published_at,
      });
      Object.assign(item, res.data.data);
      return item;
    },
    async updatePreview(item, e) {
      const file = e.target.files[0];
      if (!file) return;
      const form = new FormData();
      form.append("preview", file);
      const res = await this.interaction.api.updateNews(item.id, form);
      Object.assign(item, res.data.data);
    },
    async updateGallery(item, files) {
      const form = new FormData();
      files.forEach((f, i) => form.append(`gallery[${i}]`, f));
      const res = await this.interaction.api.updateNews(item.id, form);
      Object.assign(item, res.data.data);
    },
  },
  watch: {
    serverOptions: {
      handler: "loadData",
      deep: true,
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style scoped>
.news_table {
  width: 100%;
}
.control-panel {
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
}
.control-panel .btn {
  background-color: var(--nipigasColorMain);
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
.control-panel .btn:hover {
  background-color: var(--nipigasColorMain-hover);
}
</style>
