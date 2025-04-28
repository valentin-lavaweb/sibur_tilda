<template>
  <div class="news-list" style="margin-bottom: 40px">
    <h1>Новости</h1>

    <button
      @click="addNewsRow"
      style="margin-bottom: 12px; padding: 8px 16px; cursor: pointer"
    >
      Добавить новость
    </button>

    <table
      border="1"
      cellspacing="0"
      cellpadding="8"
      style="width: 100%; border-collapse: collapse"
    >
      <thead>
        <tr>
          <th>Заголовок</th>
          <th>Содержание</th>
          <th>Дата публикации</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <!-- Новые строки (без id) -->
        <tr
          v-for="(row, idx) in newRows"
          :key="'new-' + idx"
          style="background: #f9f9f9"
        >
          <td>
            <input
              v-model="row.title"
              type="text"
              placeholder="Введите заголовок"
              style="width: 100%"
            />
          </td>
          <td>
            <textarea
              v-model="row.content"
              rows="2"
              placeholder="Введите содержимое"
              style="width: 100%"
            ></textarea>
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

        <!-- Существующие новости -->
        <tr v-for="item in newsList" :key="item.id">
          <!-- Если эту новость редактируют -->
          <template v-if="editingMap[item.id]">
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

          <!-- В обычном режиме -->
          <template v-else>
            <td>{{ item.title }}</td>
            <td>{{ item.content }}</td>
            <td>{{ new Date(item.published_at).toLocaleString() }}</td>
            <td>
              <button
                @click="deleteNews(item)"
                style="padding: 4px 8px; cursor: pointer"
              >
                Удалить
              </button>
              <button
                @click="startEdit(item)"
                style="margin-left: 8px; padding: 4px 8px; cursor: pointer"
              >
                Редактировать
              </button>
            </td>
          </template>
        </tr>

        <!-- Заглушка, если нет ни новых, ни существующих -->
        <tr v-if="newsList.length === 0 && newRows.length === 0">
          <td colspan="4" style="text-align: center; padding: 16px">
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

const newsList = ref([]);
const editingRows = ref([]);

// Вычисляемые списки:
const newRows = computed(() => editingRows.value.filter((r) => !r.id));
const editingMap = computed(() => {
  const map = {};
  editingRows.value.forEach((r, i) => {
    if (r.id) map[r.id] = { row: r, index: i };
  });
  return map;
});

// Загрузить новости
async function loadNews() {
  try {
    const { data } = await apiClient.get("v2/news");
    newsList.value = data.data ?? data;
  } catch (e) {
    console.error("Ошибка загрузки новостей", e);
  }
}

// Добавить новую строку
function addNewsRow() {
  editingRows.value.unshift({
    title: "",
    content: "",
    published_at: new Date().toISOString().slice(0, 16),
    isSaving: false,
  });
}

// Начать редактирование существующей
function startEdit(item) {
  editingRows.value.unshift({
    id: item.id,
    title: item.title,
    content: item.content,
    published_at: new Date(item.published_at).toISOString().slice(0, 16),
    isSaving: false,
  });
}

// Отменить редактирование
function cancelEdit(index) {
  editingRows.value.splice(index, 1);
}

// Сохранить (POST или PUT)
async function saveNews(row, index) {
  row.isSaving = true;
  try {
    await authClient.get("/sanctum/csrf-cookie");
    const payload = {
      title: row.title,
      content: row.content,
      published_at: new Date(row.published_at).toISOString(),
    };

    if (row.id) {
      const { data: resp } = await apiClient.put(`v2/news/${row.id}`, payload);
      const updated = resp.data ?? resp;
      const idx = newsList.value.findIndex((n) => n.id === row.id);
      if (idx !== -1) newsList.value.splice(idx, 1, updated);
    } else {
      const { data: respNew } = await apiClient.post("v2/news", payload);
      const created = respNew.data ?? respNew;
      newsList.value.unshift(created);
    }

    cancelEdit(index);
  } catch (e) {
    console.error("Ошибка при сохранении новости", e);
    alert("Не удалось сохранить новость");
  } finally {
    row.isSaving = false;
  }
}

// Удалить новость
async function deleteNews(item) {
  if (!window.confirm("Вы уверены, что хотите удалить эту новость?")) return;
  try {
    await apiClient.delete(`v2/news/${item.id}`);
    newsList.value = newsList.value.filter((n) => n.id !== item.id);
  } catch (e) {
    console.error("Ошибка при удалении новости", e);
    alert("Не удалось удалить новость");
  }
}

onMounted(loadNews);
</script>

<style scoped lang="scss">
.news-list {
  color: var(--textColorBlack);
}
</style>
