<script>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { useGameStore } from '@/stores/interface-interaction.js';
import login_comp from "@/components/admin/login.vue";







export default {
  name: "command_awards_table",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
        isLoading: true,
        serverItems:[],

    }
  },
  components:{
    Vue3EasyDataTable,
  },
  methods: {
    async loadData(){
        let data = this.interaction.lo



        loading.value = true;
  const {
    serverCurrentPageItems,
    serverTotalItemsLength,
  } = await mockServerItems(serverOptions.value);
  items.value = serverCurrentPageItems;
  serverItemsLength.value = serverTotalItemsLength;
  loading.value = false;
        






    }
  },
  mounted() {

  },
  computed:{
    serverItemsLength(){
        return serverItems.length;
    },
    serverOptions(){
        return {
            page: 1,
            rowsPerPage: 25,
            sortBy: "id",
            sortType: 'asc',
        }
    },

  },
  watch:{
    serverOptions(){
        this.loadData();
    }
  },
};
</script>


<template>
<Vue3EasyDataTable
                v-model:server-options="serverOptions"
                :server-items-length="serverItemsLength"
                :loading="isLoading"

                :headers="headers"
                :items="items"
                v-model:items-selected="itemsSelected"
                show-index
            
                :search-field="searchField"
                :search-value="searchValue"

                border-cell
                theme-color="rgb(0, 140, 149)"
                table-class-name="customize-table"
                header-text-direction="center"
                body-text-direction="center"

                :items-selected="itemsSelected"
                buttons-pagination
            />
</template>

<style scoped>
.vue3-easy-data-table__body tr td:first-child{
    background-color: rgba(0, 140, 149, 0.07);
}
.vue3-easy-data-table__main.hoverable tr:hover td:first-child{
    background-color: rgba(0, 140, 149, 0.07);
}
.vue3-easy-data-table__main.hoverable tr:hover td:hover{
    background-color: transparent;
}
.vue3-easy-data-table__body tr td{transition: all 0.25s ease;}


.easy-data-table__rows-selector ul.select-items.inside li,
.buttons-pagination .item{
    transition: all 0.25s ease;
}
.easy-data-table__rows-selector ul.select-items.inside li:hover,
.buttons-pagination .item:hover{
    background-color: rgb(236, 236, 236);
}
.easy-data-table__rows-selector ul.select-items.inside li.selected:hover,
.buttons-pagination .item.button.active:hover{
    background-color: var(--nipigasColorMain-hover);
}

.buttons-pagination,
.vue3-easy-data-table__footer,
.vue3-easy-data-table__footer .pagination__rows-per-page,
.easy-data-table__rows-selector .rows-input__wrapper{
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
  --easy-table-body-row-hover-background-color: none;

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
  --easy-table-scrollbar-thumb-color: #4c5d7a;;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}

textarea{
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 50px;
  max-height: 200px;
  padding: 5px;
  color: var(--textColorBlack);
  resize: vertical;
  border: none;
}
input{
  color: var(--textColorBlack);
}

select{
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
option{
    padding: 5px;
    cursor: pointer;
}

</style>