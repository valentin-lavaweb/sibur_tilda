<!-- src/components/Timeline.vue -->
<template>
  <div class="timelineBlock">
    <div class="items" :style="{ width: itemsWidth }">
      <div
        v-for="(item, idx) in items"
        :key="item.id"
        class="item"
        :class="{ active: isDatePassed(item) }"
      >
        <div class="dot"></div>
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

    <div class="line" :style="{ width: lineWidth }">
      <div class="filledLine" :style="{ width: filledLineWidth }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 1) Пример данных: часть с range, часть с single
const items = ref([
  {
    id: 1,
    title: "Форум корпоративных тренеров",
    date_from: "2025-04-08T00:00:00Z",
    date_to: "2025-04-09T00:00:00Z",
  },
  {
    id: 2,
    title: "Форум производственных наставников",
    date_from: "2025-04-23T00:00:00Z",
    date_to: "2025-04-24T00:00:00Z",
  },
  {
    id: 3,
    title: "Локальные Дни компании на предприятиях",
    date_from: "2025-05-23T00:00:00Z",
  },
  {
    id: 4,
    title: "Локальные Дни компании на предприятиях",
    date_from: "2025-07-14T00:00:00Z",
  },
  {
    id: 5,
    title: "Церемония награждения на ВДНХ",
    date_from: "2025-07-19T00:00:00Z",
  },
  {
    id: 5,
    title: "День нефтяника",
    date_from: "2025-08-28T00:00:00Z",
  },
]);

// Текущая дата в формате YYYY-MM-DD по Москве
function nowMoscow() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Moscow" });
}

// Теперь сравниваем только date_from
function isDatePassed(item) {
  const eventDate = new Date(item.date_from).toLocaleDateString("en-CA", {
    timeZone: "Europe/Moscow",
  });
  return eventDate <= nowMoscow();
}

// Русские месяцы в родительном падеже
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

// Форматируем для вывода «день месяц», «день–день месяц» или «день месяц – день месяц»
function formatDate(item) {
  const d1 = new Date(item.date_from);
  const day1 = d1.getDate();
  const mon1 = monthNames[d1.getMonth()];

  if (item.date_to) {
    const d2 = new Date(item.date_to);
    const day2 = d2.getDate();
    const mon2 = monthNames[d2.getMonth()];

    if (mon1 === mon2) {
      // один и тот же месяц
      return `${day1}–${day2} ${mon1}`;
    } else {
      // разные месяцы
      return `${day1} ${mon1} – ${day2} ${mon2}`;
    }
  } else {
    // одиночная дата
    return `${day1} ${mon1}`;
  }
}

// 2) Ширина .items: 2*padding + n*itemWidth + n*gap
const itemsCount = computed(() => items.value.length);
const lineWidth = computed(() => {
  const n = itemsCount.value;
  return `calc(
    2 * var(--contentPadding)
    + ${n} * var(--timelineItemWidth)
    + ${n} * var(--timelineGap)
  )`;
});

// 3) Индекс последнего прошедшего
const activeIndex = computed(() => {
  let last = -1;
  items.value.forEach((it, i) => {
    if (isDatePassed(it)) last = i;
  });
  return last;
});

// 4) Ширина заполнения линии до активного
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
.timelineBlock {
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  padding: 0px 0px 15px 0px;
  overflow-x: auto;
  margin: 0px 0px 20px 0px;
}
.items {
  width: fit-content;
  padding: 0px var(--contentPadding);
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
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
      .dot {
        background-color: #77e2c3;
      }

      .block {
        opacity: 1;
      }
    }

    .dot {
      position: absolute;
      top: 100%;
      transform: translate(0px, 12px);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #afb0b1;
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
  height: 4px;
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
  background-color: #002d3a;

  &::after {
    content: "";
    display: flex;
    position: absolute;
    left: 100%;
    transform: translate(-50%, 0);
    width: 5px;
    height: 100%;
    border-radius: 50%;
    background-color: #002d3a;
  }
}

@media (max-width: 1440px) {
}
</style>
