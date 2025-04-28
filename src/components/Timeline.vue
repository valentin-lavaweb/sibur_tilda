<!-- src/components/Timeline.vue -->
<template>
  <div class="timelineBlock">
    <div class="items" :style="{ width: itemsWidth }">
      <component
        :is="getTag(item)"
        :href="getHref(item)"
        :target="isExternal(item.url) ? '_blank' : undefined"
        v-for="(item, idx) in items"
        :key="item.id"
        class="item"
        :class="{
          active: isDatePassed(item) || item.active,
          opened: item.opened,
        }"
        @click="onItemClick(item)"
      >
        <component
          :is="getTag(item)"
          :href="getHref(item)"
          :target="isExternal(item.url) ? '_blank' : undefined"
          class="dot"
          @click="
            () => {
              if (!isDatePassed(item) && !item.active) openLockedPopup(item);
            }
          "
        />
        <div class="block">
          <div class="title">{{ item.title }}</div>
          <div class="separator"></div>
          <div
            class="descriptionBlock"
            @click="handleDescriptionClick(item, $event)"
          >
            <div class="date">{{ formatDate(item) }}</div>
            <div class="arrow">
              <div class="text">перейти</div>
              <div class="icon"></div>
            </div>
          </div>
        </div>
      </component>
    </div>

    <div class="line" :style="{ width: lineWidth }">
      <div class="filledLine" :style="{ width: filledLineWidth }"></div>
    </div>
  </div>
  <Teleport to="body">
    <div
      v-if="lockedItem"
      class="lockedPopupWrapper"
      @click.self="closeLockedPopup"
    >
      <div class="lockedPopup">
        <div class="textBlock">
          <div class="text">Этот этап признания заряжается</div>
          <div class="date">до {{ formatDate(lockedItem) }}</div>
        </div>
        <div class="popupButtons">
          <button class="back" @click="closeLockedPopup">
            <div class="text">Назад</div>
            <div class="icon"></div>
          </button>
          <button class="main" v-if="!isHomePage" @click="goHome">
            <div class="text">Вернуться на главную</div>
            <div class="icon"></div>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiClient } from "@/scripts/api"; // Добавь это в импортах сверху

const items = ref([
  {
    id: 1,
    title: "Форум корпоративных тренеров",
    date_from: "2025-04-08T00:00:00Z",
    date_to: "2025-04-09T00:00:00Z",
    url: "/",
    active: false,
    opened: true,
  },
  {
    id: 2,
    title: "Форум производственных наставников",
    date_from: "2025-04-23T00:00:00Z",
    date_to: "2025-04-24T00:00:00Z",
    url: "/",
    active: false,
    opened: false,
  },
  {
    id: 3,
    title: "Локальные Дни компании на предприятиях",
    date_from: "2025-05-23T00:00:00Z",
    url: "/",
    active: true,
    opened: false,
  },
  {
    id: 4,
    title: "Локальные Дни компании на предприятиях",
    date_from: "2025-07-14T00:00:00Z",
    url: "/",
    active: false,
    opened: false,
  },
  {
    id: 5,
    title: "Церемония награждения на ВДНХ",
    date_from: "2025-07-19T00:00:00Z",
    url: "/",
    active: false,
    opened: false,
  },
  {
    id: 6,
    title: "День нефтяника",
    date_from: "2025-08-28T00:00:00Z",
    url: "/",
    opened: false,
  },
]);
const isMobile = ref(window.innerWidth <= 980);
function getTag(item) {
  if (isMobile.value) return "div";
  return isDatePassed(item) || item.active ? "a" : "div";
}

function isExternal(url) {
  return /^https?:\/\//.test(url);
}

function getHref(item) {
  if (isMobile.value) return undefined;
  if (!item.url) return undefined;

  // если событие не прошло и не активно — ссылки быть не должно
  if (!isDatePassed(item) && !item.active) {
    return undefined;
  }

  return item.url;
}

function onItemClick(item) {
  if (!isMobile.value) {
    if (!isDatePassed(item) && !item.active) {
      openLockedPopup(item);
    }
  }
}

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 980;
}

async function loadTimelineItems() {
  try {
    const response = await apiClient.get("/v2/timeline-items");
    const fetchedItems = response.data.data || [];

    // Только первые 6
    const firstSix = fetchedItems.slice(0, 6);

    firstSix.forEach((itemFromServer, index) => {
      if (items.value[index]) {
        items.value[index].title =
          itemFromServer.title || items.value[index].title;
        items.value[index].url = itemFromServer.link || items.value[index].url;
        items.value[index].active =
          itemFromServer.is_active ?? items.value[index].active;

        // НОВОЕ: заменить только date_from
        if (itemFromServer.date) {
          const dateOnly = itemFromServer.date.split("T")[0]; // оставляем только дату без времени
          items.value[index].date_from = dateOnly + "T00:00:00Z";
        }
      }
    });
  } catch (error) {
    console.error("Ошибка загрузки таймлайна:", error);
  }
}

onMounted(async () => {
  window.addEventListener("resize", updateIsMobile);
  await loadTimelineItems();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});

function handleDescriptionClick(item, event) {
  const target = event.target;
  const arrowClicked =
    target.classList.contains("arrow") || target.closest(".arrow");
  if (arrowClicked && item.opened) {
    event.preventDefault();
    event.stopPropagation();
    console.log(item);
    if (isDatePassed(item) || item.active) {
      router.push(item.url);
    } else {
      openLockedPopup(item);
    }
    return;
  }

  if (isMobile.value) {
    item.opened = !item.opened;
  }
}

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
  const rawFrom = item.date_from;
  const rawTo = item.date_to;

  // Обработка "XX" в начале
  if (rawFrom.includes("XX")) {
    const mon1 = monthNames[+rawFrom.split("-")[1] - 1]; // месяц из строки
    if (rawTo && rawTo.includes("XX")) {
      const mon2 = monthNames[+rawTo.split("-")[1] - 1];
      return `XX ${mon1} – 31 ${mon2}`;
    } else if (rawTo) {
      const d2 = new Date(rawTo);
      const day2 = d2.getDate();
      const mon2 = monthNames[d2.getMonth()];
      return `XX ${mon1} – ${day2} ${mon2}`;
    } else {
      return `XX ${mon1}`;
    }
  }

  // Обычная логика если date_from валидна
  const d1 = new Date(item.date_from);
  const day1 = d1.getDate();
  const mon1 = monthNames[d1.getMonth()];

  if (item.date_to) {
    let d2;
    if (item.date_to.includes("XX")) {
      // Если дата_to тоже содержит XX — ставим 31
      const parts = item.date_to.split("-");
      d2 = new Date(`${parts[0]}-${parts[1]}-31`);
    } else {
      d2 = new Date(item.date_to);
    }
    const day2 = d2.getDate();
    const mon2 = monthNames[d2.getMonth()];

    if (mon1 === mon2) {
      return `${day1}–${day2} ${mon1}`;
    } else {
      return `${day1} ${mon1} – ${day2} ${mon2}`;
    }
  } else {
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

// Добавляем это — чтобы в шаблоне не было «undefined»
const itemsWidth = lineWidth;

// 3) Индекс последнего прошедшего
const activeIndex = computed(() => {
  let last = -1;
  items.value.forEach((it, i) => {
    if (isDatePassed(it)) last = i;
  });
  return last;
});

// 4) Ширина заполнения линии до активного

const progressFraction = computed(() => {
  const now = new Date();
  let previous = null;
  let next = null;
  const validDates = [];

  for (const item of items.value) {
    const raw = item.date_from;

    if (raw.includes("XX")) {
      continue;
    }

    const date = new Date(raw);
    if (isNaN(date)) {
      continue;
    }

    if (date <= now) {
      if (!previous || date > previous) previous = date;
    } else {
      if (!next || date < next) next = date;
    }
  }

  validDates.forEach((d) =>
    console.log(`  • ${d.date.toISOString()} — ${d.title}`)
  );

  if (previous && next) {
    const progress = (now - previous) / (next - previous);
    return Math.min(Math.max(progress, 0), 1);
  }

  if (!next && previous) {
    return 1;
  }
  return 0;
});

const filledLineWidth = computed(() => {
  const i = activeIndex.value;
  const pad = "var(--contentPadding)";
  const w = "var(--timelineItemWidth)";
  const g = "var(--timelineGap)";
  // базовый сдвиг до центра i-й точки
  // pad + w/2 + i*(w + g)
  // добавляем (w+g) * progressFraction
  return `calc(
	  ${pad}
	  + ${w} / 2
	  + (${w} + ${g}) * ${i}
	  + (${w} + ${g}) * ${progressFraction.value}
	)`;
});

const lockedItem = ref(null);
const route = useRoute();
const router = useRouter();

function openLockedPopup(item) {
  lockedItem.value = item;
}

function closeLockedPopup() {
  lockedItem.value = null;
}

const isHomePage = computed(() => route.path === "/");

function goHome() {
  router.push("/");
  closeLockedPopup();
}
</script>

<style scoped lang="scss">
.timelineBlock {
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  height: 150px;
  gap: 20px;
  padding: 0px 0px 15px 0px;
  overflow-x: hidden;
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
    cursor: pointer;

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

    &:hover {
      .block {
        .separator {
          margin: 10px 0px;
          height: 2px;
          background-color: #77e2c3;
        }

        .title {
          max-height: 300px;
        }

        .descriptionBlock {
          .arrow {
            .icon {
              transform: rotate(270deg);
            }
          }
        }
      }
    }

    .dot {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 12px);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #afb0b1;
      cursor: pointer;
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
      opacity: 0.35;

      .title {
        // position: absolute;
        text-align: center;
        font-family: YFF_RARE_GIGA_TRIAL;
        font-weight: 800;
        line-height: 1.25;
        overflow: hidden;
        height: fit-content;
        max-height: 0px;
        transition: 0.25s;
        background-color: white;
        color: var(--textColorBlack);
        // padding: 15px;
        border-radius: 10px;
        // width: 100%;
        // left: 0;
        // bottom: 100%;
      }

      .separator {
        margin: 0px 0px;
        width: 100%;
        height: 0px;
        background-color: #77e2c3;
        transition: 0.25s;
      }

      .descriptionBlock {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: fit-content;
        // max-height: 0;
        overflow: hidden;

        .date {
          font-family: YFF_RARE_GIGA_TRIAL;
          font-weight: 300;
          color: #002d3a;
        }

        .arrow {
          flex-direction: row;
          gap: 5px;
          .text {
            display: none;
            font-family: YFF_RARE_TRIAL;
            font-size: 10px;
            letter-spacing: 0.5px;
            font-weight: 500;
            text-transform: uppercase;
            color: #62c9b0;
            opacity: 0;
            transform: translate(calc(120%), 0);
            transition: 0.25s 0.1s;
          }
          .icon {
            width: 15px;
            height: 15px;
            background-color: white;
            background-image: url("/img/arrow_bottom_green.svg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: rotate(180deg);
            transition: 0.25s;
          }
        }
      }
    }
  }
}

.line {
  width: 100%;
  height: 4px;
  min-height: 4px;
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

.lockedPopupWrapper {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(6px);
}

.lockedPopup {
  font-family: ArticulatCF;
  background: #002d3a;
  padding: 60px 120px;
  color: white;
  border-radius: 16px;
  max-width: 90vw;
  width: fit-content;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  gap: 50px;
  background-image: url("/img/popupBackground.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .text {
    font-size: 36px;
    font-weight: 600;
    color: white;
    line-height: 1.25;
  }

  .date {
    line-height: 1.25;
    font-size: 48px;
    font-weight: 800;
    color: #f05a28;
  }

  .popupButtons {
    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: center;

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background-color: #77e2c3;
      color: #002d3a;
      font-weight: bold;
      gap: 10px;

      &.back {
        background-color: white;
        .text {
          color: var(--textColorBlack);
        }
        .icon {
          background-image: url("/img/arrow_orange_back.svg");
        }
      }

      &.main {
        background-color: #f05a28;
        .text {
          color: white;
        }
        .icon {
          background-image: url("/img/home_icon_white.svg");
        }
      }

      &:hover {
        background-color: #62c9b0;
      }

      .text {
        font-size: 20px;
      }

      .icon {
        width: 15px;
        height: 15px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}

@media (max-width: 1680px) {
  .timelineBlock {
    overflow-x: auto;
  }
}

@media (max-width: 1440px) {
}

@media (max-width: 980px) {
  .lockedPopup {
    padding: 5vw 10vw;

    .popupButtons {
      flex-wrap: wrap;
    }
  }

  .items {
    .item {
      &:hover {
        .block {
          .separator {
            margin: 0px 0px;
            height: 0px;
          }

          .title {
            max-height: 0px;
          }

          .descriptionBlock {
            .arrow {
              .icon {
                transform: rotate(180deg);
              }
            }
          }
        }
      }
      &.opened {
        .block {
          .separator {
            margin: 10px 0px;
            height: 2px;
            background-color: #77e2c3;
          }

          .title {
            max-height: 300px;
          }

          .descriptionBlock {
            .arrow {
              .text {
                transform: translate(calc(0%), 0);
                opacity: 1;
              }
              .icon {
                transform: rotate(270deg);
              }
            }
          }
        }
      }
      .block {
        .descriptionBlock {
          .arrow {
            .text {
              display: flex;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 640px) {
  .lockedPopup {
    background-position: left;
    gap: 30px;
    .text {
      font-size: 30px;
    }

    .date {
      font-size: 34px;
    }
  }
}

@media (max-width: 480px) {
  .lockedPopup {
    .text {
      font-size: 20px;
    }

    .date {
      font-size: 25px;
    }

    .popupButtons {
      button {
        .text {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
