<template>
  <div class="newsTable">
    <div class="news-list" style="margin-bottom: 40px">
      <h1>Новости</h1>
      <div v-if="newsList.length">
        <div
          v-for="item in newsList"
          :key="item.id"
          style="
            padding: 12px;
            border: 1px solid #ccc;
            margin-bottom: 12px;
            border-radius: 4px;
          "
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
          <small
            >Опубликовано:
            {{ new Date(item.published_at).toLocaleString() }}</small
          >
        </div>
      </div>
      <div v-else>
        <p>Новостей пока нет.</p>
      </div>
    </div>

    <div
      class="news-form"
      style="
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        max-width: 600px;
      "
    >
      <h1 style="margin-bottom: 16px">Создать новость</h1>
      <form @submit.prevent="submit">
        <!-- Заголовок -->
        <div style="margin-bottom: 12px">
          <label style="display: block; margin-bottom: 4px">Заголовок</label>
          <input
            v-model="title"
            type="text"
            required
            style="width: 100%; padding: 8px"
          />
        </div>

        <!-- Содержимое -->
        <div style="margin-bottom: 12px">
          <label style="display: block; margin-bottom: 4px">Содержимое</label>
          <textarea
            v-model="content"
            required
            rows="5"
            style="width: 100%; padding: 8px"
          ></textarea>
        </div>

        <!-- Дата публикации -->
        <div style="margin-bottom: 12px">
          <label style="display: block; margin-bottom: 4px"
            >Дата публикации</label
          >
          <input
            v-model="publishedAt"
            type="datetime-local"
            required
            style="padding: 8px"
          />
        </div>

        <!-- Превью -->
        <div style="margin-bottom: 12px">
          <label style="display: block; margin-bottom: 4px">
            Превью (файл, необязательно)
          </label>
          <input type="file" @change="handlePreviewChange" accept="image/*" />
        </div>

        <!-- Галерея -->
        <div style="margin-bottom: 12px">
          <label style="display: block; margin-bottom: 4px">
            Галерея (можно выбрать несколько файлов)
          </label>
          <input
            type="file"
            @change="handleGalleryChange"
            accept="image/*"
            multiple
          />
        </div>

        <!-- Кнопка -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            style="padding: 10px 20px; cursor: pointer"
          >
            {{ isSubmitting ? "Сохраняем..." : "Сохранить новость" }}
          </button>
        </div>

        <!-- Ошибка -->
        <div v-if="error" style="color: red; margin-top: 12px">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const newsList = ref([]);

async function loadNews() {
  try {
    const { data } = await apiClient.get("v2/news");
    newsList.value = data.data || [];
  } catch (e) {
    console.error("Ошибка загрузки новостей", e);
  }
}

// Когда компонент загрузится
onMounted(() => {
  loadNews();
});
// Важно: берем authClient для CSRF и apiClient для остальных запросов
import { authClient, apiClient } from "@/scripts/api";

const title = ref("");
const content = ref("");
const publishedAt = ref(new Date().toISOString().slice(0, 16));

const preview = ref(null);
const gallery = ref([]);

const isSubmitting = ref(false);
const error = ref("");

function handlePreviewChange(e) {
  preview.value = e.target.files[0] || null;
}

function handleGalleryChange(e) {
  gallery.value = Array.from(e.target.files);
}

async function submit() {
  error.value = "";
  isSubmitting.value = true;

  try {
    // 0) Обновляем CSRF-token по sanctum
    await authClient.get("/sanctum/csrf-cookie");

    // 1) Загрузка превью (если есть)
    let previewUuid = null;
    if (preview.value) {
      const fdPrev = new FormData();
      fdPrev.append("files[]", preview.value);
      // Логируем содержимое FormData превью
      console.group("FormData /v2/files (preview)");
      for (let pair of fdPrev.entries()) {
        console.log(pair[0], pair[1]);
      }
      console.groupEnd();

      const { data: respPrev } = await apiClient.post("v2/files", fdPrev);
      previewUuid = respPrev.data[0]?.uuid || respPrev.data.data[0].uuid;
    }

    // 2) Загрузка галереи (если есть)
    let galleryUuids = [];
    if (gallery.value.length) {
      const fdGal = new FormData();
      gallery.value.forEach((f) => fdGal.append("files[]", f));
      // Логируем содержимое FormData галереи
      console.group("FormData /v2/files (gallery)");
      for (let pair of fdGal.entries()) {
        console.log(pair[0], pair[1]);
      }
      console.groupEnd();

      const { data: respGal } = await apiClient.post("v2/files", fdGal);
      console.log("Response /v2/files (gallery)", respGal);
      galleryUuids = respGal.data.map((item) => item.uuid);
    }

    // 3) Формируем JSON-пейлоад по схеме NewsInput
    const payload = {
      title: title.value,
      content: content.value,
      published_at: new Date(publishedAt.value).toISOString(),
      ...(previewUuid && { preview: previewUuid }),
      ...(galleryUuids.length && { gallery: galleryUuids }),
    };

    // Логируем JSON-пейлоад перед отправкой
    console.group("JSON payload /v2/news");
    console.log(JSON.stringify(payload, null, 2));
    console.groupEnd();

    // 4) Создаем новость
    await apiClient.post("v2/news", payload);

    alert("✅ Новость успешно создана");
    // Сброс формы
    title.value = "";
    content.value = "";
    publishedAt.value = new Date().toISOString().slice(0, 16);
    preview.value = null;
    gallery.value = [];
  } catch (e) {
    console.error(e);
    if (e.response?.data?.errors) {
      // Показываем первую ошибку
      error.value = Object.values(e.response.data.errors)[0][0];
    } else {
      error.value = e.response?.data?.message || "Ошибка при создании новости";
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped lang="scss">
.newsTable {
  color: var(--textColorBlack);
}
</style>
