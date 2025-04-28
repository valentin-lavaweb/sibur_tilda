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
          <th>Предпросмотр</th>
          <th>Галерея</th>
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
          <td>
            <input type="file" @change="onPreviewChange($event, row)" />
          </td>
          <td>
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
            <td>
              <div v-if="editingMap[item.id].row.previewInfo?.url">
                <img
                  :src="editingMap[item.id].row.previewInfo.url"
                  style="max-width: 100px; margin-bottom: 4px"
                />
              </div>
              <input
                type="file"
                @change="onPreviewChange($event, editingMap[item.id].row)"
              />
            </td>
            <td>
              <div v-if="editingMap[item.id].row.gallery?.length">
                <img
                  v-for="(g, i) in editingMap[item.id].row.gallery"
                  :key="i"
                  :src="g.url"
                  style="max-width: 80px; margin-right: 4px; margin-bottom: 4px"
                />
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
            <td>
              <img
                v-if="item.previewInfo?.url"
                :src="item.previewInfo.url"
                style="max-width: 100px"
              />
            </td>
            <td>
              <img
                v-for="(g, i) in item.gallery"
                :key="i"
                :src="g.url"
                style="max-width: 80px; margin-right: 4px"
              />
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { authClient, apiClient } from "@/scripts/api";
import api from "@/scripts/api";

const newsList = ref([]);
const editingRows = ref([]);
const sortDirection = ref("desc");

// 1) Сортировка
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

// 2) Для новых строк и для мапы редактирования
const newRows = computed(() => editingRows.value.filter((r) => !r.id));
const editingMap = computed(() => {
  const map = {};
  editingRows.value.forEach((r, i) => {
    if (r.id) map[r.id] = { row: r, index: i };
  });
  return map;
});

// 3) Загрузка
async function loadNews() {
  try {
    const { data } = await apiClient.get("v2/news");
    // Возможно, оборачивает в data.data:
    newsList.value = data.data ?? data;
  } catch (e) {
    console.error("Ошибка загрузки новостей", e);
  }
}

// 4) Создание новой строки
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

// 5) Начать редактирование существующей
function startEdit(item) {
  editingRows.value.unshift({
    id: item.id,
    title: item.title,
    content: item.content,
    published_at: new Date(item.published_at).toISOString().slice(0, 16),
    // кладём текущие info, чтобы показать превью и галерею
    previewInfo: item.previewInfo || {},
    gallery: item.gallery || [],
    previewFile: null,
    galleryFiles: [],
    isSaving: false,
  });
}

// 6) Отменить
function cancelEdit(index) {
  editingRows.value.splice(index, 1);
}

// 7) Обработчики выбора файлов
function onPreviewChange(e, row) {
  const f = e.target.files[0];
  if (f) row.previewFile = f;
}
function onGalleryChange(e, row) {
  const f = e.target.files[0];
  row.galleryFiles = f ? [f] : [];
}

// 8) Сохранение (POST / PUT)
async function saveNews(row, index) {
  row.isSaving = true;
  try {
    // CSRF для Sanctum
    await authClient.get("/sanctum/csrf-cookie");

    // собираем FormData
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
      // Берём старые ID из существующей галереи
      galleryIds = row.gallery.map((g) => g.uuid);
    }

    galleryIds.forEach((id) => form.append("gallery[]", id));

    let resp;
    if (row.id) {
      // добавляем Laravel-спуфер
      form.append("_method", "PUT");
      resp = await apiClient.post(`v2/news/${row.id}`, form);
    } else {
      resp = await apiClient.post("v2/news", form);
    }

    // извлекаем объект новости из ответа
    const item = resp.data.data ?? resp.data ?? resp;
    if (row.id) {
      const i = newsList.value.findIndex((n) => n.id === row.id);
      if (i !== -1) newsList.value.splice(i, 1, item);
    } else {
      newsList.value.unshift(item);
    }

    // закрываем режим редактирования
    cancelEdit(index);
  } catch (e) {
    console.error("Ошибка при сохранении", e);
    alert("Не удалось сохранить новость");
  } finally {
    row.isSaving = false;
  }
}

// 9) Удаление
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

onMounted(loadNews);
</script>

<style scoped lang="scss">
.newsTableContainer {
  //   border: 1px solid black;
  color: var(--textColorBlack);
  th {
    background: #f0f0f0;
    color: var(--nipigasColorMain);
  }
  img {
    display: block;
  }

  tr {
    td {
      &:last-child {
        margin: auto;
        text-align: center;
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

.buttonBlock {
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid black;
  border-bottom: 0px solid transparent;
  padding: 10px;
}
</style>
