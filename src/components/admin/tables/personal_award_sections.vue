<!-- src\components\admin\tables\personal_award_sections.vue -->

<script>
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { useGameStore, debounce } from "@/stores/interface-interaction.js";

import TextEdit from "../cells/textEdit.vue";
import personal_award_sections_edit from "./personal_award_sections_edit.vue";
// import CheckBoxEdit from '../cells/checkBoxEdit.vue';

const headers = [
  { text: "Id", value: "id", fixed: true, width: 50 },
  { text: "Действия", value: "actions", fixed: true, width: 75 },
  { text: "Название раздела", value: "title", fixed: true, width: 300 },
  { text: "Фильтр по выдавшему", value: "issuer_filter", width: 100 },
  { text: "Фильтр по компании", value: "company_filter", width: 100 },
  { text: "Фильтр по степени", value: "grade_filter", width: 100 },
  { text: "Отображать", value: "is_visible", width: 100 },
];

export default {
  name: "personal_award_sections",
  props: {
    search: String,
  },
  data() {
    let interaction = useGameStore();
    return {
      interaction: interaction,
      headers: headers,
      editedItem: null,
      onEditDone: null,
    };
  },
  components: {
    Vue3EasyDataTable,
    TextEdit,
    personal_award_sections_edit,
  },
  methods: {
    async createItem(item) {
      try {
        let updateItem = {};

        for (let prop in item) {
          if (prop == "image") {
            if (item[prop] instanceof File) {
              updateItem[prop] = item[prop];
            } else {
              continue;
            }
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

        let res = await this.interaction.api.createPersonalAwardSection(
          updateItem
        );
        let newItem = res.data;

        this.interaction.personalSections.unshift(newItem);

        this.$toast.success("Данные добавлены");

        return newItem;
      } catch (e) {
        this.$toast.error(e.message);
      }
    },
    async updateItem(item) {
      let oldItem = this.items.find((i) => i.id == item.id);
      let oldItemRestore = Object.assign({}, oldItem);

      try {
        let updateItem = {};

        for (let prop in item) {
          if (prop == "image") {
            if (item[prop] instanceof File) {
              updateItem[prop] = item[prop];
            }
            continue;
          }

          if (typeof item[prop] === "boolean") {
            updateItem[prop] = item[prop] ? 1 : 0;
          } else {
            updateItem[prop] = item[prop];
          }
        }

        console.log(updateItem);

        let res = await this.interaction.api.updatePersonalAwardSection(
          item.id,
          updateItem
        );
        let newItem = res.data.data;

        Object.assign(oldItem, newItem);

        this.$toast.success("Данные обновлены");

        return oldItem;
      } catch (e) {
        setTimeout(() => {
          let oldIdx = this.interaction.personalSections.findIndex(
            (i) => i.id == item.id
          );
          this.interaction.personalSections[oldIdx] = oldItemRestore;
        }, 500);
        this.$toast.error(e.message);
      }
    },
    async deleteItem(item) {
      if (!confirm(`Удалить ${item.title}?`)) return;

      let oldIdx = this.interaction.personalSections.findIndex(
        (i) => i.id == item.id
      );
      let oldItem = this.interaction.personalSections[oldIdx];
      let oldItemRestore = Object.assign({}, oldItem);
      try {
        let res = await this.interaction.api.deletePersonalAwardSection(
          item.id
        );

        this.interaction.personalSections.splice(oldIdx, 1);

        this.$toast.success("Удалено");
      } catch (e) {
        setTimeout(() => {
          this.interaction.personalSections.splice(oldIdx, 0, oldItemRestore);
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
    if (!this.interaction.personalSections) {
      this.interaction.loadSections();
    }
  },
  computed: {
    availableSections() {
      return this.interaction.personalSections;
    },
    items: {
      get() {
        return this.interaction.personalSections ?? [];
      },
    },
    searchValue() {
      return this.search && this.search != "" ? this.search : undefined;
    },
  },
  watch: {},
};
</script>

<template>
  <div class="sections_table">
    <Teleport to="body">
      <transition name="openPage" mode="out-in" appear>
        <personal_award_sections_edit
          :item="editedItem"
          @done="onEditDone"
          @cancel="editedItem = null"
          v-if="editedItem"
          ref="editForm"
        />
      </transition>
    </Teleport>

    <div class="control-panel">
      <button
        class="btn"
        @click="
          duplicateItem({
            title: null,
            issuer_filter: false,
            company_filter: false,
            grade_filter: false,
            is_visible: false,
          })
        "
      >
        добавить запись
      </button>
    </div>

    <Vue3EasyDataTable
      :search-value="searchValue"
      :headers="headers"
      :items="items"
      border-cell
      theme-color="rgb(0, 140, 149)"
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center"
      buttons-pagination
    >
      <template #item-title="item">
        <TextEdit
          :item="item"
          editProp="title"
          @updateItem="updateItem($event)"
        />
      </template>

      <template #item-issuer_filter="item">
        <input
          type="checkbox"
          v-model="item.issuer_filter"
          @change="updateItem(item)"
        />
      </template>

      <template #item-company_filter="item">
        <input
          type="checkbox"
          v-model="item.company_filter"
          @change="updateItem(item)"
        />
      </template>

      <template #item-grade_filter="item">
        <input
          type="checkbox"
          v-model="item.grade_filter"
          @change="updateItem(item)"
        />
      </template>

      <template #item-is_visible="item">
        <input
          type="checkbox"
          v-model="item.is_visible"
          @change="updateItem(item)"
        />
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

<!-- { text: "Id", value: "id", fixed: true },
{ text: "Имя", value: "name" },
{ text: "Должность", value: "position" },
{ text: "Компания", value: "company",  },
{ text: "Награда", value: "award", },
{ text: "Степень", value: "grade", },
{ text: "Выдана", value: "issued", },
{ text: "Фото", value: "image", },
{ text: "Год", value: "year" },
{ text: "Раздел", value: "section" }, -->

<style scoped>
.sections_table {
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

option {
  padding: 5px;
  cursor: pointer;
}

.actions button {
  margin: 0 0 20px 0;
}
</style>
