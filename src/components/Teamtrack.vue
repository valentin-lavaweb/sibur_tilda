<!-- src/components/Timeline.vue -->
<template>
  <div class="teamtrackBlock">
    <!-- линия с полной шириной -->
    <div class="line" :style="{ width: lineWidth }">
      <div class="filledLine" :style="{ width: filledLineWidth }"></div>
    </div>

    <!-- сами элементы -->
    <div class="items" :style="{ width: itemsWidth }">
      <div
        v-for="(item, idx) in items"
        :key="item.id"
        class="item"
        :class="{ active: isDatePassed(item) }"
      >
        <div class="lineSeparator"></div>
        <div class="block">
          <div class="title">{{ item.title }}</div>
          <div class="separator"></div>
          <div class="descriptionBlock">
            <div class="date">{{ formatDate(item) }}</div>
            <div class="arrow"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="trackTitle">Командный трек</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 1) Данные с single-датой
const items = ref([
  {
    id: 1,
    title: "Сбор заявок в группе «Энергия признания» в Клике",
    date: "2025-04-22T00:00:00Z",
  },
  {
    id: 2,
    title: "Вебинар по подготовке к защитам с приглашаемым спикером",
    date: "2025-04-23T00:00:00Z",
  },
  { id: 3, title: "Подготовка команд к защитам", date: "2025-04-24T00:00:00Z" },
  { id: 4, title: "Защита проектов", date: "2025-04-25T00:00:00Z" },
  {
    id: 5,
    title: "Оценка проектов и защит экспертным жюри, утверждение победителей",
    date: "2025-04-26T00:00:00Z",
  },
  {
    id: 6,
    title: "Подготовка к церемонии награждения и объявлению победителей",
    date: "2025-04-27T00:00:00Z",
  },
]);

// 2) Русские месяцы в родительном падеже
const monthNames = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

// 3) Текущая дата в формате YYYY-MM-DD по Москве
function nowMoscow() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Moscow" });
}

// 4) Активность по dеate_from (item.date)
function isDatePassed(item) {
  const ev = new Date(item.date).toLocaleDateString("en-CA", {
    timeZone: "Europe/Moscow",
  });
  return ev <= nowMoscow();
}

// 5) Формат даты «23 апреля»
function formatDate(item) {
  const d = new Date(item.date);
  const day = d.getDate();
  const mon = monthNames[d.getMonth()];
  return `${day} ${mon}`;
}

// 6) Кол-во элементов
const itemsCount = computed(() => items.value.length);

// 7) Общая ширина контейнера .items = 2*padding + n*itemWidth + n*gap
const itemsWidth = computed(() => {
  const n = itemsCount.value;
  return `calc(
    2 * var(--contentPadding)
    + ${n} * var(--timelineItemWidth)
    + ${n} * var(--timelineGap)
  )`;
});

// 8) Ширина всей линии, равная ширине .items
//    (чтобы фон стирался по всему таймлайну)
const lineWidth = itemsWidth;

// 9) Последний прошедший индекс
const activeIndex = computed(() => {
  let last = -1;
  items.value.forEach((it, i) => {
    if (isDatePassed(it)) last = i;
  });
  return last;
});

// 10) Ширина заполненной части: contentPadding + ½ блока + (block+gap)*activeIndex
const filledLineWidth = computed(() => {
  const i = activeIndex.value;
  if (i < 0) {
    return `calc(var(--contentPadding) + var(--timelineItemWidth)/2)`;
  }
  return `calc(
    var(--contentPadding)
    + var(--timelineItemWidth)/2
    + (var(--timelineItemWidth) + var(--timelineGap)) * ${i}
  )`;
});
</script>

<style scoped lang="scss">
.teamtrackBlock {
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  padding: 0px 0px 20px 0px;
  overflow-x: auto;
}
.trackTitle {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
  color: #002d3a;
  font-family: YFF_RARE_TRIAL;
  height: 22px;
  font-weight: 600;
}
.items {
  width: fit-content;
  padding: 0px var(--contentPadding);
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  color: #002d3a;
  gap: var(--timelineGap);
  z-index: 1;

  .item {
    width: var(--timelineItemWidth);
    min-width: var(--timelineItemWidth);
    pointer-events: none;

    .block {
      opacity: 0.35;
    }

    &.active {
      opacity: 1;
      pointer-events: auto;

      .block {
        opacity: 1;
      }
    }

    .lineSeparator {
      position: absolute;
      bottom: 100%;
      transform: translate(0px, -20px);
      width: 4px;
      height: 22px;
      border-radius: 20px;
      background-color: #2b9fa6;
    }

    .block {
      justify-content: flex-start;
      align-items: flex-start;
      background-color: white;
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05);
      padding: 10px;
      border-radius: 15px;
      font-size: 14px;
      width: 100%;

      .title {
        font-family: YFF_RARE_GIGA_TRIAL;
        font-weight: 800;
        line-height: 1.25;
      }

      .separator {
        margin: 10px 0px;
        width: 100%;
        height: 2px;
        background-color: #77e2c3;
      }

      .descriptionBlock {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;

        .date {
          font-family: YFF_RARE_GIGA_TRIAL;
          font-weight: 300;
          color: #002d3a;
        }

        .arrow {
          width: 15px;
          height: 15px;
          background-image: url("/img/arrow_bottom_green.svg");
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
      }
    }
  }
}

.line {
  width: 100%;
  height: 22px;
  background-color: #e1fff6;
}

.filledLine {
  position: absolute;
  left: 0;
  width: calc(
    var(--contentPadding) +
      (var(--timelineItemWidth) * 0.5 + var(--timelineGap) * 0)
  );
  height: 100%;
  background-color: #77e2c3;
}

@media (max-width: 1440px) {
}
</style>
