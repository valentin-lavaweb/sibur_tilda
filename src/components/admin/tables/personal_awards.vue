<script>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { useGameStore } from '@/stores/interface-interaction.js';



const headers = [
  { text: "Id", value: "id", fixed: true, width: 50 },
  { text: "Имя", value: "name", fixed: true, width: 200 },
  { text: "Должность", value: "position", width: 200 },
  { text: "Компания", value: "company", width: 200 },
  { text: "Награда", value: "award", width: 200 },
  { text: "Степень", value: "grade", width: 75 },
  { text: "Выдана", value: "issued", width: 200 },
  { text: "Фото", value: "image", width: 200 },
  { text: "Год", value: "year", width: 75 },
  { text: "Раздел", value: "section", width: 240 },
]






export default {
  name: "personal_awards_table",
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
        sortType: 'asc',
      },
      headers: headers


    }
  },
  components: {
    Vue3EasyDataTable,
  },
  methods: {
    async loadData() {



      let filter = {
        // ...this.queryFilter,
        limit: this.serverOptions.rowsPerPage
      }
      this.isLoading = true;

      let res = await this.interaction.api.getPersonalAwards(filter, this.serverOptions.page);

      let awards = res.data.data;
      this.serverTotalItemsLength = res.data.meta.total;

      this.serverItems = awards
      this.isLoading = false;










    },
    async updateItem(item) {

      let oldItem = this.serverItems.find(i => i.id == item.id);

      let updateItem = {};

      for (let prop in oldItem) {
        if (prop == 'image') continue;
        if (oldItem[prop] != item[prop]) {
          updateItem[prop] = item[prop];
        }
      }


      // console.log(item);
      console.log(updateItem);
      // return
      let res = await this.interaction.api.updatePersonalAward(item.id, updateItem);
      console.log(res.data);

      Object.assign(oldItem, res.data);


    },
    async updateImage(item, image) {

      let oldItem = this.serverItems.find(i => i.id == item.id);

      console.log(item);
      let res = await this.interaction.api.updatePersonalAward(item.id, { image: image });
      console.log(res.data);

      Object.assign(oldItem, res.data);


    }
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
          return new URL('storage/' + item.image, import.meta.env.VITE_VUE_APP_API_URL);
        } else {
          if (item.gender) {
            return new URL('storage/default_men.svg', import.meta.env.VITE_VUE_APP_API_URL);
          } else {
            return new URL('storage/default_women.svg', import.meta.env.VITE_VUE_APP_API_URL);
          }
        }
      }
    }

  },
  watch: {
    serverOptions() {
      this.loadData();
    }
  },
};
</script>


<template>
  <div>

    <Vue3EasyDataTable v-model:server-options="serverOptions" :server-items-length="serverTotalItemsLength"
      :loading="isLoading" :headers="headers" :items="serverItems" border-cell theme-color="rgb(0, 140, 149)"
      table-class-name="customize-table" header-text-direction="center" body-text-direction="center" buttons-pagination>


      <template #item-image="item">
        <img :src="imagePath(item)" :alt="item.name">
        <input type="file" accept="image/*" multiple="false">
      </template>
      <template #item-section="item">
        <select v-model="item.section_id" @change="updateItem(item)">
          <option v-for="section in availableSections" :key="section.id" :value="section.id">
            {{ section.title }}
          </option>
        </select>
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







<style>
.vue3-easy-data-table__footer,
.vue3-easy-data-table__footer .pagination__rows-per-page,
.easy-data-table__rows-selector .rows-input__wrapper {
  flex-direction: row;
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
  --easy-table-body-row-hover-background-color: #e6e6e6;

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
  ;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>