<!-- src/components/Teamtrack.vue -->
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

// 1) Данные
const items = ref([
  {
    id: 1,
    title: "Сбор заявок в группе «Энергия признания» в Клике",
    date_from: "2025-04-16T00:00:00Z",
    date_to: "2025-05-16T00:00:00Z",
    is_active: false,
  },
  {
    id: 2,
    title: "Вебинар по подготовке к защитам с приглашаемым спикером",
    date_from: "2025-05-XXT00:00:00Z",
    is_active: false,
  },
  {
    id: 3,
    title: "Подготовка команд к защитам",
    date_from: "2025-05-19T00:00:00Z",
    date_to: "2025-05-23T00:00:00Z",
    is_active: false,
  },
  {
    id: 4,
    title: "Защита проектов",
    date_from: "2025-05-26T00:00:00Z",
    date_to: "2025-06-06T00:00:00Z",
    is_active: false,
  },
  {
    id: 5,
    title: "Оценка проектов и защит экспертным жюри, утверждение победителей",
    date_from: "2025-06-09T00:00:00Z",
    date_to: "2025-06-11T00:00:00Z",
    is_active: false,
  },
  {
    id: 6,
    title: "Подготовка к церемонии награждения и объявлению победителей",
    date_from: "2025-06-16T00:00:00Z",
    date_to: "2025-07-04T00:00:00Z",
    is_active: false,
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
  if (item.is_active) return true;

  // если в date_from есть XX — подставляем 01
  const raw = item.date_from.includes("XX")
    ? item.date_from.replace("XX", "01")
    : item.date_from;
  const ev = new Date(raw).toLocaleDateString("en-CA", {
    timeZone: "Europe/Moscow",
  });
  return ev <= nowMoscow();
}
// 5) Формат даты «23 апреля»
function formatDate(item) {
  const df = item.date_from;
  const dt = item.date_to;

  // 1) Если в date_from есть XX — неизвестен день начала
  if (df.includes("XX")) {
    // вычленяем month из "YYYY-MM-XX"
    const [, monthPart] = df.split("-");
    const monthIdx = parseInt(monthPart, 10) - 1;
    const monFrom = monthNames[monthIdx];

    // если нет date_to — просто "XX {месяц}"
    if (!dt) return `XX ${monFrom}`;

    // если и в date_to есть XX — "XX {monFrom} — XX {monTo}"
    if (dt.includes("XX")) {
      const [, monthToPart] = dt.split("-");
      const monTo = monthNames[parseInt(monthToPart, 10) - 1];
      return `XX ${monFrom} — XX ${monTo}`;
    }

    // иначе to — валидная дата
    const to = new Date(dt);
    const dayTo = to.getDate();
    const monTo = monthNames[to.getMonth()];
    return `XX ${monFrom} — ${dayTo} ${monTo}`;
  }

  // 2) Если date_from валиден
  const from = new Date(df);
  const dayFrom = from.getDate();
  const monFrom = monthNames[from.getMonth()];

  // без date_to
  if (!dt) {
    return `${dayFrom} ${monFrom}`;
  }

  // если в date_to стоит XX — неизвестен день окончания
  if (dt.includes("XX")) {
    // следующего месяца или того же?
    const monTo =
      monthNames[from.getMonth() + 1] || monthNames[from.getMonth()];
    return `${dayFrom} ${monFrom} — XX ${monTo}`;
  }

  // оба валидны
  const to = new Date(dt);
  const dayTo = to.getDate();
  const monTo = monthNames[to.getMonth()];
  if (monFrom === monTo) {
    return `${dayFrom}–${dayTo} ${monTo}`;
  }
  return `${dayFrom} ${monFrom} — ${dayTo} ${monTo}`;
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

const progressFraction = computed(() => {
  const i = activeIndex.value;
  // если ещё ни одно не началось или мы на последнем — нет дробной части
  if (i < 0 || i >= items.value.length - 1) return 0;

  // берём «сырые» строки, подставляем 01 вместо XX
  const rawFrom = items.value[i].date_from.replace("XX", "01");
  const rawTo = items.value[i + 1].date_from.replace("XX", "01");

  const from = new Date(rawFrom);
  const to = new Date(rawTo);
  const now = new Date();

  const frac = (now - from) / (to - from);
  // корректируем, чтобы было в [0,1]
  return Math.min(Math.max(frac, 0), 1);
});

const filledLineWidth = computed(() => {
  const i = activeIndex.value;
  const pad = "var(--contentPadding)";
  const w = "var(--timelineItemWidth)";
  const g = "var(--timelineGap)";

  // если ни одного не активировано — центр первой точки
  if (i < 0) {
    return `calc(${pad} + ${w} / 2)`;
  }

  // базовый сдвиг до центра i-й точки
  // + фракция между i и i+1
  return `calc(
    ${pad}
    + ${w} / 2
    + (${w} + ${g}) * ${i}
    + (${w} + ${g}) * ${progressFraction.value}
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
  z-index: 1;
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
      width: fit-content;

      .title {
        width: 100%;
        text-align: center;
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
        gap: 20px;

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
