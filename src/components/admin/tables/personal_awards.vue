<!-- src\components\admin\tables\personal_awards.vue -->

<script>
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { useGameStore, debounce } from "@/stores/interface-interaction.js";

import TextEdit from "../cells/textEdit.vue";
import Personal_awards_edit from "./personal_awards_edit.vue";
// import CheckBoxEdit from '../cells/checkBoxEdit.vue';

const headers = [
  { text: "Id", value: "id", fixed: true, width: 50 },
  { text: "Действия", value: "actions", fixed: true, width: 75 },
  { text: "Имя", value: "name", fixed: true, width: 150 },
  { text: "Должность", value: "position", width: 150 },
  { text: "Компания", value: "company", width: 200 },
  { text: "Награда", value: "award", width: 150 },
  { text: "Степень", value: "grade", width: 150 },
  { text: "Выдана", value: "issued", width: 200 },
  { text: "Пол", value: "gender", width: 50 },
  { text: "Фото", value: "image", width: 300 },
  { text: "Год", value: "year", width: 75 },
  { text: "Раздел", value: "section", width: 240 },
];

export default {
  name: "personal_awards_table",
  props: {
    search: String,
  },
  data() {
    let interaction = useGameStore();
    return {
      interaction: interaction,
      isLoading: false,
      serverItems: [],
      serverTotalItemsLength: 0,
      serverOptions: {
        page: 1,
        rowsPerPage: 25,
        sortBy: "id",
        sortType: "asc",
      },
      headers: headers,
      editedItem: null,
      onEditDone: null,
    };
  },
  components: {
    Vue3EasyDataTable,
    TextEdit,
    Personal_awards_edit,
  },
  methods: {
    async loadData() {
      let filter = {
        limit: this.serverOptions.rowsPerPage,
        name: this.search?.trim() || undefined,
      };

      this.isLoading = true;

      try {
        const res = await this.interaction.api.getPersonalAwards(
          filter,
          this.serverOptions.page
        );
        const awards = res?.data?.data ?? [];

        this.serverItems = awards;
        this.serverTotalItemsLength = res?.data?.meta?.total ?? awards.length;
      } catch (e) {
        this.$toast.error("Ошибка загрузки данных: " + e.message);
        console.warn("Ошибка в loadData", e);
      } finally {
        this.isLoading = false;
      }
    },

    async createItem(item) {
      try {
        let updateItem = {};

        for (let prop in item) {
          if (prop === "image") {
            if (item[prop] instanceof File || typeof item[prop] === "string") {
              updateItem[prop] = item[prop];
            }
            continue;
          }

          // Если поле second_personal_award_section_id пустое или null — не добавлять его вообще
          if (
            prop === "second_personal_award_section_id" &&
            (item[prop] === null || item[prop] === undefined)
          ) {
            continue;
          }

          switch (item[prop]) {
            case null:
              updateItem[prop] = null;
              break;
            case true:
              updateItem[prop] = 1;
              break;
            case false:
              updateItem[prop] = 0;
              break;
            default:
              updateItem[prop] = item[prop];
              break;
          }
        }

        let res = await this.interaction.api.createPersonalAward(updateItem);
        let newItem = res.data;

        this.serverItems.unshift(newItem);

        this.$toast.success("Данные добавлены");

        return newItem;
      } catch (e) {
        this.$toast.error(e.message);
      }
    },
    async updateItem(item) {
      let oldItem = this.serverItems.find((i) => i.id == item.id);
      let oldItemRestore = Object.assign({}, oldItem);
      try {
        let updateItem = {};

        for (let prop in item) {
          if (prop === "image") {
            if (item[prop] instanceof File) {
              updateItem[prop] = item[prop];
            }
            continue;
          }

          // Если поле second_personal_award_section_id пустое или null — не добавлять его вообще
          if (
            prop === "second_personal_award_section_id" &&
            (item[prop] === null || item[prop] === undefined)
          ) {
            continue;
          }

          switch (item[prop]) {
            case null:
              updateItem[prop] = null;
              break;
            case true:
              updateItem[prop] = 1;
              break;
            case false:
              updateItem[prop] = 0;
              break;
            default:
              updateItem[prop] = item[prop];
              break;
          }
        }

        console.log(updateItem);

        let res = await this.interaction.api.updatePersonalAward(
          item.id,
          updateItem
        );
        let newItem = res.data.data;

        Object.assign(oldItem, newItem);

        this.$toast.success("Данные обновлены");

        return oldItem;
      } catch (e) {
        setTimeout(() => {
          let oldIdx = this.serverItems.findIndex((i) => i.id == item.id);
          this.serverItems[oldIdx] = oldItemRestore;
        }, 500);
        this.$toast.error(e.message);
      }
    },
    async updateImage(item, event) {
      let oldItem = this.serverItems.find((i) => i.id == item.id);
      let oldItemRestore = Object.assign({}, oldItem);

      try {
        let files = event.target.files || event.dataTransfer.files;
        if (!files.length) return;

        const file = files[0];

        // ⏳ Загружаем файл на сервер
        let uploadResponse = await this.interaction.api.uploadFile(file);
        let uploadedFile = uploadResponse.data?.data?.[0];

        if (!uploadedFile || !uploadedFile.uuid) {
          throw new Error("Не удалось загрузить файл");
        }

        // 📥 Сохраняем новый UUID в item.image прямо перед отправкой
        item.image = uploadedFile.uuid;

        // 📥 Обновляем запись
        const updated = await this.updateItem(item);

        // 👀 Чтобы Vue обновил превьюшку картинки без F5
        if (updated) {
          oldItem.image = uploadedFile.uuid; // вот это самое важное
        }

        this.$toast.success("Файл загружен и привязан!");
      } catch (e) {
        setTimeout(() => {
          let oldIdx = this.serverItems.findIndex((i) => i.id == item.id);
          this.serverItems[oldIdx] = oldItemRestore;
        }, 500);
        this.$toast.error(e.message);
      }
    },

    async deleteItem(item) {
      if (!confirm(`Удалить ${item.name}?`)) return;

      let oldIdx = this.serverItems.findIndex((i) => i.id == item.id);
      let oldItem = this.serverItems[oldIdx];
      let oldItemRestore = Object.assign({}, oldItem);
      try {
        let res = await this.interaction.api.deletePersonalAward(item.id);

        this.serverItems.splice(oldIdx, 1);

        this.$toast.success("Удалено");
      } catch (e) {
        setTimeout(() => {
          this.serverItems.splice(oldIdx, 0, oldItemRestore);
        }, 500);
        this.$toast.error(e.message);
      }
    },
    async editItem(item) {
      this.onEditDone = async (item) => {
        let updItem = await this.updateItem(item);
        if (!updItem) return;
        this.editItem(updItem);
      };
      this.editedItem = item;
      this.$refs.editForm?.setItem(item);
    },
    async duplicateItem(item) {
      this.onEditDone = async (item) => {
        let newItem = await this.createItem(item);
        if (!newItem) return;
        this.editItem(newItem);
      };
      this.editedItem = Object.assign({}, item, { id: undefined, image: null });
    },
  },
  created() {
    this.loadData();
  },
  computed: {
    availableSections() {
      return this.interaction.personalSections;
    },
    imagePath() {
      return function (item) {
        if (item.image) {
          try {
            let url = new URL(item.image);
            return url;
          } catch {
            let url = new URL(
              "files/" + item.image,
              import.meta.env.VITE_VUE_APP_API_URL
            );
            return url;
          }
        } else {
          if (item.gender) {
            return new URL(
              "storage/app/public/default_men.svg",
              import.meta.env.VITE_VUE_APP_API_URL
            );
          } else {
            return new URL(
              "storage/app/public/default_women.svg",
              import.meta.env.VITE_VUE_APP_API_URL
            );
          }
        }
      };
    },
    debouncedSearch() {
      return debounce(this.loadData, 500);
    },
  },
  watch: {
    serverOptions() {
      this.loadData();
    },
    search() {
      this.debouncedSearch();
    },
  },
};
</script>

<template>
  <div class="awards_table">
    <Teleport to="body">
      <transition name="openPage" mode="out-in" appear>
        <Personal_awards_edit
          :item="editedItem"
          @done="onEditDone"
          @cancel="editedItem = null"
          v-if="editedItem"
          ref="editForm"
          :availableSections="availableSections"
        />
      </transition>
    </Teleport>

    <div class="control-panel">
      <button
        class="btn"
        @click="
          duplicateItem({
            name: null,
            position: null,
            company: null,
            award: null,
            grade: null,
            issued: null,
            gender: null,
            image: null,
            personal_award_section_id: availableSections[0]?.id,
            second_personal_award_section_id: availableSections[0]?.id,
            year: new Date().getFullYear(),
          })
        "
      >
        добавить запись
      </button>
    </div>

    <Vue3EasyDataTable
      v-model:server-options="serverOptions"
      :server-items-length="serverTotalItemsLength"
      :loading="isLoading"
      :headers="headers"
      :items="serverItems"
      border-cell
      theme-color="rgb(0, 140, 149)"
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center"
      buttons-pagination
    >
      <template #item-name="item">
        <TextEdit
          :item="item"
          editProp="name"
          @updateItem="updateItem($event)"
        />
      </template>

      <template #item-position="item">
        <TextEdit
          :item="item"
          editProp="position"
          @updateItem="updateItem($event)"
        />
      </template>

      <template #item-company="item">
        <TextEdit
          :item="item"
          editProp="company"
          @updateItem="updateItem($event)"
        />
      </template>

      <template #item-award="item">
        <TextEdit
          :item="item"
          editProp="award"
          @updateItem="updateItem($event)"
        />
      </template>

      <template #item-grade="item">
        <select v-model="item.grade" @change="updateItem(item)">
          <option :value="null">Не указано</option>
          <option :value="'1 Степень'">1 Степень</option>
          <option :value="'2 Степень'">2 Степень</option>
          <option :value="'3 Степень'">3 Степень</option>
          <option :value="'Гордость СИБУР профсоюза'">
            Гордость СИБУР Профсоюза
          </option>
        </select>
      </template>

      <template #item-issued="item">
        <TextEdit
          :item="item"
          editProp="issued"
          @updateItem="updateItem($event)"
        />
      </template>

      <template #item-gender="item">
        <!-- <CheckBoxEdit :item="item" editProp="gender" :value="item.gender" @updateValue="item.gender = $event"  @updateItem="updateItem($event)"/> -->
        <div class="inpu_gender">
          <input
            class="gender_change"
            type="checkbox"
            v-model="item.gender"
            @change="updateItem({ ...item, gender: $event.target.checked })"
          />
          <span>
            <div>муж - &nbsp; <input type="checkbox" checked /></div>
            <div>жен - &nbsp; <input type="checkbox" /></div>
          </span>
        </div>
        <!-- <input type="radio" id="one" :value="true" v-model="item.gender" @change="updateItem(item)"/>
        <label for="one">Муж</label>
        <br />
        <input type="radio" id="two" :value="false" v-model="item.gender" />
        <label for="two">Жен</label> -->
      </template>

      <template #item-image="item">
        <div class="photoDownlouad-box">
          <div class="input__wrapper">
            <input
              name="file"
              accept="image/*"
              type="file"
              :id="`input_img_${item.id}`"
              class="input input__file"
              multiple="false"
              @change="updateImage(item, $event)"
            />
            <label :for="`input_img_${item.id}`" class="input__file-button">
              <span class="input__file-icon-wrapper">
                <img
                  class="input__file-icon"
                  src="/download.png"
                  alt="Выбрать файл"
                />
              </span>
              <span class="input__file-button-text">Выберите файл</span>
            </label>
          </div>
          <div class="img-block">
            <img :src="imagePath(item)" :alt="item.name" />
          </div>
        </div>
      </template>

      <template #item-year="item">
        <TextEdit
          :item="item"
          editProp="year"
          @updateItem="updateItem($event)"
        />
      </template>

      <template #item-section="item">
        <div class="select-section-block">
          <select
            v-model="item.personal_award_section_id"
            @change="updateItem(item)"
          >
            <option
              v-for="section in availableSections"
              :key="section.id"
              :value="section.id"
            >
              {{ section.title }}
            </option>
          </select>
          <select
            v-model="item.second_personal_award_section_id"
            @change="updateItem(item)"
          >
            <option
              v-for="section in availableSections"
              :key="'second_' + section.id"
              :value="section.id"
            >
              {{ section.title }}
            </option>
          </select>
        </div>
      </template>

      <template #item-actions="item">
        <div class="actions">
          <button title="Удалить" @click="deleteItem(item)">
            <img
              src="/src/assets/icons/delete.png"
              alt="Удалить"
              class="delete"
            />
          </button>
          <button title="Редактировать" @click="editItem(item)">
            <img
              src="/src/assets/icons/edit.png"
              alt="Редактировать"
              class="edit"
            />
          </button>
          <button title="Дублировать" @click="duplicateItem(item)">
            <img
              src="/src/assets/icons/duplicate.png"
              alt="Дублировать"
              class="duplicate"
            />
          </button>
        </div>
      </template>
    </Vue3EasyDataTable>
  </div>
</template>

<style scoped>
.awards_table {
  width: 100%;
}

.customize-table {
  width: 100%;
  height: 100%;

  --easy-table-border: 1px solid var(--nipigasColorMain);
  --easy-table-row-border: 1px solid var(--nipigasColorMain);

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: var(--nipigasColorMain);
  --easy-table-header-background-color: var(--white);

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: var(--nipigasColorMain);
  --easy-table-body-even-row-background-color: var(--white);

  --easy-table-body-row-font-color: var(--textColorBlack);
  --easy-table-body-row-background-color: var(--white);
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: var(--nipigasColorMain-hover);
  --easy-table-body-row-hover-background-color: var(--white);

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: var(--white);
  --easy-table-footer-font-color: var(--nipigasColorMain);
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}

textarea {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100px;
  height: fit-content;
  max-height: 200px;
  padding: 5px;
  color: var(--textColorBlack);
  resize: none;
  border: none;
}

input {
  color: var(--textColorBlack);
}

select {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: var(--white);
  font-size: 16px;
  font-weight: 500;
  color: var(--textColorBlack);
  border: 1px solid var(--nipigasColorMain);
  padding: 5px 10px 5px 10px;
  cursor: pointer;
}

v option {
  padding: 5px;
  cursor: pointer;
}

.actions button {
  margin: 0 0 20px 0;
}

.inpu_gender span {
  position: absolute;
  top: 0;
  transform: translateY(-120%);
  min-width: 100px;
  padding: 5px 5px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  transition: all 0.25s ease;
  opacity: 0;
  pointer-events: none;
  z-index: 3;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.inpu_gender span div {
  color: var(--textColorBlack);
  flex-direction: row;
}

.inpu_gender span div input {
  pointer-events: none;
}

.inpu_gender:hover span {
  opacity: 1;
}

.img-block {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px 0;
}

.img-block img {
  width: 150px;
  height: auto;
}

.photoDownlouad-box {
  width: 100%;
  padding: 0 0 0 10px;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
}

.input__wrapper {
  width: fit-content;
  position: relative;
  margin: 0px 0px 0px 0px;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.input__file-icon-wrapper {
  height: 40px;
  width: 40px;
  margin-right: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-right: 1px solid #fff;
}

.input__file-icon-wrapper img {
  width: 20px;
  height: 20px;
}

.input__file-button-text {
  line-height: 1;
  margin-top: 1px;
}

.input__file-button {
  width: 100%;
  max-width: 290px;
  height: 40px;
  background: #1bbc9b;
  color: #fff;
  padding: 0 5px 0 0;
  font-size: 1.125rem;
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
}
</style>
