<template>
  <div class="timelinesContainer">
    <div v-if="timelineItems.length === 0">
      <p>Нет таймлайн-айтемов.</p>
    </div>

    <div v-else class="timelinesColumn">
      <!-- Левая колонка -->
      <div class="timeline">
        <h3>Таймлайн 1</h3>
        <div class="timelineRow">
          <div
            v-for="(item, index) in timelineItems.slice(0, 6)"
            :key="item.id || index"
            class="timelineItem"
          >
            <div v-if="item.id" class="timelineId">ID: {{ item.id }}</div>

            <div class="dateBlock">
              <div class="inputBlock">
                <label class="inputLabel">ОТ</label>
                <input v-model="item.date" type="date" />
              </div>

              <div class="inputBlock">
                <label class="inputLabel">ДО</label>
                <input v-model="item.date_to" type="date" />
              </div>
            </div>

            <div class="inputBlock">
              <label class="inputLabel">Название</label>
              <textarea v-model="item.title" placeholder="Название" />
            </div>

            <div class="inputBlock">
              <label class="inputLabel">Ссылка</label>
              <input v-model="item.link" type="text" placeholder="Ссылка" />
            </div>

            <div class="inputBlock">
              <label class="activeCheckbox">
                <input type="checkbox" v-model="item.is_active" />
                Активен
              </label>
            </div>

            <div class="itemButtons">
              <button :disabled="!isItemChanged(item)" @click="saveItem(item)">
                💾 Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Командный трек -->
      <div class="timeline">
        <h3>Командный трек</h3>
        <div class="timelineRow">
          <div
            v-for="(item, index) in timelineItems.slice(6, 12)"
            :key="item.id || index"
            class="timelineItem"
          >
            <div v-if="item.id" class="timelineId">ID: {{ item.id }}</div>

            <div class="dateBlock">
              <div class="inputBlock">
                <label class="inputLabel">ОТ</label>
                <input v-model="item.date" type="date" />
              </div>
              <div class="inputBlock">
                <label class="inputLabel">до</label>
                <input v-model="item.date_to" type="date" />
              </div>
            </div>

            <div class="inputBlock">
              <label class="inputLabel">Название</label>
              <textarea v-model="item.title" placeholder="Название" />
            </div>

            <div class="inputBlock">
              <label class="inputLabel">Ссылка</label>
              <input v-model="item.link" type="text" placeholder="Ссылка" />
            </div>

            <div class="inputBlock">
              <label class="activeCheckbox">
                <input type="checkbox" v-model="item.is_active" />
                Активен
              </label>
            </div>

            <div class="itemButtons">
              <button :disabled="!isItemChanged(item)" @click="saveItem(item)">
                💾 Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { apiClient } from "@/scripts/api";

const timelineItems = ref([]);
const originalItems = ref([]); // <== Оригинальные данные для сравнения

async function loadTimelineItems() {
  try {
    const response = await apiClient.get("/v2/timeline-items");
    const items = response.data.data || [];

    timelineItems.value = items.map((item) => ({
      ...item,
      date: item.date ? item.date.split("T")[0] : "",
      date_to: item.date_end ? item.date_end.split("T")[0] : "", // ДЛЯ ИНПУТА
      date_end: item.date_end ? item.date_end.split("T")[0] : "", // ДЛЯ СОХРАНЕНИЯ
    }));

    // Копируем оригинальные данные
    originalItems.value = JSON.parse(JSON.stringify(timelineItems.value));
  } catch (error) {
    console.error("Ошибка загрузки таймлайн-айтемов:", error);
  }
}

async function saveItem(item) {
  try {
    item.date_end = item.date_to;
    const payload = {
      title: item.title,
      link: item.link,
      date: item.date ? item.date + "T00:00:00+03:00" : null,
      date_end: item.date_end ? item.date_end + "T00:00:00+03:00" : null, // <== добавляем
      is_active: item.is_active,
      description: item.description ?? "",
    };

    if (!payload.title || !payload.link || !payload.date) {
      alert("Пожалуйста, заполните дату, название и ссылку.");
      return;
    }

    if (item.id) {
      await apiClient.put(`/v2/timeline-items/${item.id}`, payload);
      alert("Изменения сохранены!");

      // После успешного сохранения обновляем оригинал
      const index = timelineItems.value.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        originalItems.value[index] = JSON.parse(JSON.stringify(item));
      }
    }
  } catch (error) {
    console.error("Ошибка сохранения айтема:", error);
    alert("Ошибка при сохранении.");
  }
}

// Функция сравнения айтема с оригиналом
function isItemChanged(item) {
  const original = originalItems.value.find((i) => i.id === item.id);
  if (!original) return true;

  return (
    item.title !== original.title ||
    item.link !== original.link ||
    item.date !== original.date ||
    item.date_to !== original.date_to ||
    item.is_active !== original.is_active
  );
}

onMounted(loadTimelineItems);
</script>

<style scoped lang="scss">
.timelinesContainer {
  padding: 20px;
  color: var(--textColorBlack);
  border: 1px solid var(--nipigasColorMain);

  textarea {
    min-width: 168px;
    min-height: 40px;
  }
}
.timelinesColumn {
  display: flex;
  align-items: flex-start;
  gap: 40px;
}

.timeline {
  align-items: flex-start;
  width: 100%;
}
.timelineRow {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  overflow-x: auto;
  width: 100%;
  padding: 0px 0px 20px 0px;
}
.timelineItem {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.timelineId {
  position: absolute;
  left: 10px;
  top: 5px;
  font-weight: bold;
  color: #555;
  font-size: 12px;
}
.itemButtons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.itemButtons button {
  background: var(--nipigasColorMain);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
.itemButtons button:hover {
  background: var(--nipigasColorMain-hover);
}

.dateBlock {
  gap: 5px;
  .inputBlock {
    flex-direction: row;
    gap: 5px;
  }

  input {
    &:read-only {
      opacity: 0.25;
    }
  }
}
.inputLabel {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
input[readonly] {
  background-color: #eee;
  cursor: not-allowed;
}
</style>
