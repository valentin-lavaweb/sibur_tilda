<template>
  <div class="newsTableContainer">
    <div class="buttonBlock">
      <button @click="addNewsRow">Добавить новость</button>
    </div>

    <table
      border="1"
      cellspacing="0"
      cellpadding="8"
      style="width: 100%; border-collapse: collapse"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Заголовок</th>
          <th>Содержание</th>
          <th>Изображение на гл. странице</th>
          <th>Изображение</th>
          <th @click="toggleSort" style="cursor: pointer; user-select: none">
            Дата публикации
            <span v-if="sortDirection === 'asc'">▲</span>
            <span v-else>▼</span>
          </th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <!-- Редактируемые новые строки (без id) -->
        <tr
          v-for="(row, idx) in newRows"
          :key="'new-' + idx"
          style="background: #f9f9f9"
        >
          <!-- title, content, preview, gallery, date, actions -->
          <td>-</td>
          <td>
            <input
              v-model="row.title"
              type="text"
              placeholder="Заголовок"
              style="width: 100%"
            />
          </td>
          <td>
            <textarea
              v-model="row.content"
              rows="2"
              placeholder="Содержимое"
              style="width: 100%"
            ></textarea>
          </td>
          <td class="center">
            <input type="file" @change="onPreviewChange($event, row)" />
          </td>
          <td class="center">
            <input type="file" @change="onGalleryChange($event, row)" />
          </td>
          <td>
            <input
              v-model="row.published_at"
              type="datetime-local"
              style="width: 100%"
            />
          </td>
          <td>
            <button
              @click="saveNews(row, editingRows.indexOf(row))"
              :disabled="row.isSaving"
              style="margin: 0px 10px 0px 0px; cursor: pointer"
            >
              {{ row.isSaving ? "Сохраняем..." : "Сохранить" }}
            </button>
            <button
              @click="cancelEdit(editingRows.indexOf(row))"
              :disabled="row.isSaving"
            >
              Отменить
            </button>
          </td>
        </tr>

        <!-- Существующие новости, отсортированные -->
        <tr v-for="item in sortedNews" :key="item.id">
          <!-- если для этой новости есть запись в editingMap -->
          <template v-if="editingMap[item.id]">
            <td>{{ item.id }}</td>
            <td>
              <input
                v-model="editingMap[item.id].row.title"
                type="text"
                style="width: 100%"
              />
            </td>
            <td>
              <textarea
                v-model="editingMap[item.id].row.content"
                rows="2"
                style="width: 100%"
              ></textarea>
            </td>
            <td class="center">
              <div v-if="editingMap[item.id].row.previewInfo?.url">
                <template
                  v-if="isVideo(editingMap[item.id].row.previewInfo.url)"
                >
                  <video
                    :src="editingMap[item.id].row.previewInfo.url"
                    muted
                    playsinline
                    style="max-width: 100px; margin-bottom: 4px"
                  ></video>
                </template>
                <template v-else>
                  <img
                    :src="editingMap[item.id].row.previewInfo.url"
                    style="max-width: 100px; margin-bottom: 4px"
                  />
                </template>
              </div>
              <input
                type="file"
                @change="onPreviewChange($event, editingMap[item.id].row)"
              />
            </td>
            <td class="center">
              <div v-if="editingMap[item.id].row.gallery?.length">
                <template v-for="(g, i) in item.gallery" :key="i">
                  <video
                    v-if="isVideo(g.url)"
                    :src="g.url"
                    muted
                    playsinline
                  ></video>
                  <img v-else :src="g.url" />
                </template>
              </div>
              <input
                type="file"
                @change="onGalleryChange($event, editingMap[item.id].row)"
              />
            </td>
            <td>
              <input
                v-model="editingMap[item.id].row.published_at"
                type="datetime-local"
                style="width: 100%"
              />
            </td>
            <td>
              <button
                @click="
                  saveNews(editingMap[item.id].row, editingMap[item.id].index)
                "
                :disabled="editingMap[item.id].row.isSaving"
                style="margin: 0px 10px 0px 0px; cursor: pointer"
              >
                {{
                  editingMap[item.id].row.isSaving
                    ? "Сохраняем..."
                    : "Сохранить"
                }}
              </button>
              <button
                @click="cancelEdit(editingMap[item.id].index)"
                :disabled="editingMap[item.id].row.isSaving"
              >
                Отменить
              </button>
            </td>
          </template>

          <!-- если не редактируется -->
          <template v-else>
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.content }}</td>
            <td class="center">
              <template v-if="item.previewInfo?.url">
                <video
                  v-if="isVideo(item.previewInfo.url)"
                  :src="item.previewInfo.url"
                  controls
                  muted
                  playsinline
                ></video>
                <img v-else :src="item.previewInfo.url" />
              </template>
            </td>
            <td class="center">
              <template v-for="(g, i) in item.gallery" :key="i">
                <video
                  v-if="isVideo(g.url)"
                  :src="g.url"
                  muted
                  playsinline
                ></video>
                <img v-else :src="g.url" />
              </template>
            </td>
            <td>{{ new Date(item.published_at).toLocaleString() }}</td>
            <td>
              <button
                @click="deleteNews(item)"
                style="margin: 0px 10px 0px 0px; cursor: pointer"
              >
                Удалить
              </button>
              <button @click="startEdit(item)">Редактировать</button>
            </td>
          </template>
        </tr>

        <tr v-if="newsList.length === 0 && newRows.length === 0">
          <td colspan="6" style="text-align: center; padding: 16px">
            Новостей пока нет.
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1" class="pagination">
      <button @click="prevPage" :disabled="currentPage <= 1">‹ Назад</button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
        style="margin: 0 4px"
      >
        {{ page }}
      </button>

      <button @click="nextPage" :disabled="currentPage >= totalPages">
        Вперёд ›
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { authClient, apiClient } from "@/scripts/api";
import api from "@/scripts/api";

const newsList = ref([]);
const editingRows = ref([]);
const sortDirection = ref("desc");
const currentPage = ref(
  parseInt(new URLSearchParams(window.location.search).get("page")) || 1
);
const totalPages = ref(1);

const isVideo = (url) => {
  return (
    url &&
    (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg"))
  );
};

function formatDateForInput(date) {
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  d.setMinutes(d.getMinutes() - offset);
  return d.toISOString().slice(0, 16);
}

// 1) Сортировка новостей
const sortedNews = computed(() => {
  return [...newsList.value].sort((a, b) => {
    const da = new Date(a.published_at).getTime();
    const db = new Date(b.published_at).getTime();
    return sortDirection.value === "asc" ? da - db : db - da;
  });
});

function toggleSort() {
  sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
}

// 2) Новые строки (добавляем новости) и редактируемые строки
const newRows = computed(() => editingRows.value.filter((r) => !r.id));
const editingMap = computed(() => {
  const map = {};
  editingRows.value.forEach((r, i) => {
    if (r.id) map[r.id] = { row: r, index: i };
  });
  return map;
});

// 3) Загрузка новостей
async function loadNews(page = 1) {
  try {
    const { data } = await apiClient.get(`v2/news?page=${page}`);
    newsList.value = data.data ?? [];
    currentPage.value = data.meta?.currentPage ?? 1;
    totalPages.value = data.meta?.lastPage ?? 1;
    console.log("Новости:", data.data);
    console.log("Мета:", data.meta);
    console.log(totalPages);
  } catch (e) {
    console.error("Ошибка загрузки новостей", e);
  }
}

// 4) Добавить новую новость
function addNewsRow() {
  editingRows.value.unshift({
    title: "",
    content: "",
    published_at: new Date().toISOString().slice(0, 16),
    previewFile: null,
    galleryFiles: [],
    isSaving: false,
  });
}

// 5) Начать редактирование
function startEdit(item) {
  editingRows.value.unshift({
    id: item.id,
    title: item.title,
    content: item.content,
    published_at: formatDateForInput(item.published_at),
    previewInfo: item.previewInfo || {},
    gallery: item.gallery || [],
    previewFile: null,
    galleryFiles: [],
    isSaving: false,
  });
}

// 6) Отменить редактирование
function cancelEdit(index) {
  editingRows.value.splice(index, 1);
}

// 7) Изменение файлов
function onPreviewChange(e, row) {
  const f = e.target.files[0];
  if (f) row.previewFile = f;
}
function onGalleryChange(e, row) {
  const f = e.target.files[0];
  row.galleryFiles = f ? [f] : [];
}

// 8) Сохранение новости
async function saveNews(row, index) {
  row.isSaving = true;
  try {
    await authClient.get("/sanctum/csrf-cookie");

    const form = new FormData();
    form.append("title", row.title);
    form.append("content", row.content);
    form.append("published_at", new Date(row.published_at).toISOString());

    if (row.previewFile) {
      const pf = new FormData();
      pf.append("files[]", row.previewFile);
      const prRes = await apiClient.post("v2/files", pf);
      form.append("preview", prRes.data.data[0].uuid);
    } else if (row.previewInfo?.uuid) {
      form.append("preview", row.previewInfo.uuid);
    }

    let galleryIds = [];

    if (row.galleryFiles?.length) {
      for (const file of row.galleryFiles) {
        const fileForm = new FormData();
        fileForm.append("files[]", file);
        const uploadRes = await apiClient.post("v2/files", fileForm);
        galleryIds.push(uploadRes.data.data[0].uuid);
      }
    } else if (row.gallery?.length) {
      galleryIds = row.gallery.map((g) => g.uuid);
    }

    galleryIds.forEach((id) => form.append("gallery[]", id));

    let resp;
    if (row.id) {
      form.append("_method", "PUT");
      resp = await apiClient.post(`v2/news/${row.id}`, form);
    } else {
      resp = await apiClient.post("v2/news", form);
    }

    const item = resp.data.data ?? resp.data ?? resp;
    if (row.id) {
      const i = newsList.value.findIndex((n) => n.id === row.id);
      if (i !== -1) newsList.value.splice(i, 1, item);
    } else {
      newsList.value.unshift(item);
    }

    cancelEdit(index);
  } catch (e) {
    console.error("Ошибка при сохранении", e);
    alert("Не удалось сохранить новость");
  } finally {
    row.isSaving = false;
  }
}

// 9) Удаление новости
async function deleteNews(item) {
  if (!window.confirm("Вы точно хотите удалить эту новость?")) return;
  try {
    await apiClient.delete(`v2/news/${item.id}`);
    newsList.value = newsList.value.filter((n) => n.id !== item.id);
  } catch (e) {
    console.error("Ошибка при удалении", e);
    alert("Не удалось удалить новость");
  }
}

// --- Новая логика переходов между страницами ---

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    const query = new URLSearchParams(window.location.search);
    query.set("page", page);
    window.history.pushState(null, "", `${window.location.pathname}?${query}`);
    loadNews(page);
  }
}

function prevPage() {
  goToPage(currentPage.value - 1);
}

function nextPage() {
  goToPage(currentPage.value + 1);
}

// Когда юзер нажал назад/вперед в браузере
window.addEventListener("popstate", () => {
  const page =
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
  loadNews(page);
});

// При открытии компонента
onMounted(() => loadNews(currentPage.value));
</script>

<style scoped lang="scss">
.newsTableContainer {
  //   border: 1px solid black;
  color: var(--textColorBlack);
  th {
    background: #f0f0f0;
    color: var(--nipigasColorMain);
  }
  img,
  video {
    max-width: 100px;
    display: block;
    margin: auto;
  }

  video {
    &:fullscreen,
    &:-webkit-full-screen,
    &:-moz-full-screen,
    &:-ms-fullscreen {
      object-fit: contain;
    }
  }

  tr {
    td {
      &:last-child {
        margin: auto;
        text-align: center;
      }

      &.center {
        text-align: center;
        margin: auto;
      }
    }
  }

  button {
    margin: 0;
    padding: 10px 15px;
    cursor: pointer;
    border: 1px solid var(--nipigasColorMain);
    color: var(--nipigasColorMain);
    background-color: white;
    border-radius: 4px;
    text-transform: uppercase;
    font-family: ArticulatCF;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: 0.25s;

    &:hover {
      background-color: var(--nipigasColorMain);
      color: white;
    }
  }
}

.pagination {
  flex-direction: row;
  gap: 2px;
  margin: 20px 0px 0px 0px;
}

.buttonBlock {
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid black;
  border-bottom: 0px solid transparent;
  padding: 10px;
}
</style>
