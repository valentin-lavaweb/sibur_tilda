<script>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { useGameStore } from '@/stores/interface-interaction.js';
import login_comp from "@/components/admin/login.vue";

import awardsTable from "@/components/admin/tables/personal_awards.vue";

export default {
  name: "admin_page",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
        searchValue: null,
    }
  },
  components:{
    login_comp,
    // Vue3EasyDataTable,
    awardsTable
  },
  methods: {
    checkAuth(){
        this.interaction.getAuthAdmin().catch(e => console.error(e)).then(e => console.debug(e));
    }
  },
  mounted() {
    let table  = this.$refs.table;
    let wrapper  = this.$refs.wrapper;
    let pos = { left: 0, x: 0, };

    const mouseDownHandler = function (e) {
        pos = {
            left: wrapper.scrollLeft,
            x: e.clientX,

        };
        table.style.cursor = 'grabbing';
        table.style.userSelect = 'none';

        wrapper.addEventListener('mousemove', mouseMoveHandler);
        wrapper.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        const dx = e.clientX - pos.x;
        wrapper.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
        wrapper.removeEventListener('mousemove', mouseMoveHandler);
        wrapper.removeEventListener('mouseup', mouseUpHandler);

        table.style.cursor = 'auto';
        table.style.userSelect = 'all';
    };


    table.addEventListener('mousedown', mouseDownHandler);


    this.checkAuth();

  },
  computed:{
    
  },
  watch:{

  },
};
</script>


<template>
  <div class="wrapper">
    <Teleport to="body">
        <transition name="openPage" mode="out-in" appear>
            <login_comp v-if="!interaction.admin"/>
        </transition>
    </Teleport>
    <div class="wrapper-block" ref="wrapper">
      <div class="content-block">
        <nav>
            <div class="logo" @click="checkAuth">
                <img src="/img/logo.svg" alt="logo" />
                <div class="logo-text">
                    энергия<br>
                    признания
                </div>
            </div>
            <div class="login"
                @click="interaction.logout()">
                Выйти
            </div>
        </nav>
        <div class="search_panel">
            <div class="search-img">
                <img src="/img/search_grey.svg" alt="search"/>
            </div>
            <input type="text" placeholder="Введите запрос" v-model="searchValue">
        </div>
        <section class="section_tabs">
            <div class="tab">
                командные награды
            </div>
            <div class="tab">
                персональные награды
            </div>
            <div class="tab">
                разделы для персональных наград
            </div>
            <div class="tab">
                фотогалерея
            </div>
        </section>
        <section class="content_table" ref="table">
            <!-- <div class="table">
                <div class="table_item">
                    <div class="table_item-title">
                        ID
                    </div>
                    <div class="table_item-title">
                        Наименование
                    </div>
                    <div class="table_item-title">
                        Описание
                    </div>
                    <div class="table_item-title">
                        Авторы
                    </div>
                    <div class="table_item-title">
                        Год
                    </div>
                </div>
                <div class="table_item" 
                    v-for ="item in 20" 
                    :key="item">
                    <div class="table_item-content">
                        ID
                        <div class="table_item-hover_panel">
                            <button>
                                удалить
                                строку
                            </button>
                        </div>
                    </div>
                    <div class="table_item-content">
                        <input type="text">
                    </div>
                    <div class="table_item-content">
                        <input type="text">
                    </div>
                    <div class="table_item-content">
                        <input type="text">
                    </div>
                    <div class="table_item-content">
                        <input type="number">
                    </div>
                </div>
            </div> -->
            <!-- <Vue3EasyDataTable
                v-model:server-options="serverOptions"
                :server-items-length="serverItemsLength"
                :loading="loading"

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
                loading
            /> -->
            <awards-table/>
        </section>
      </div>
    </div>
  </div>
  
</template>

<style>
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

  --easy-table-header-font-size: 18px;
  --easy-table-header-height: 30px;
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

  --easy-table-body-item-padding: 5px 10px;

  --easy-table-footer-background-color: var(--white);
  --easy-table-footer-font-color: var(--nipigasColorMain);
  --easy-table-footer-font-size: 16px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 60px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;


  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}


</style>
<style scoped>
.content_table div{
  display: unset;
  justify-content: unset;
  align-items: unset;  
  flex-direction: unset;
}
.wrapper{
  width: 100%;
  height: 100%;
}
.wrapper-block{
   width: 1645px;
   height: fit-content;
   margin: 0px 0 50px 0;
   overflow-x: auto;
}

.content-block{
  margin: 0 0 0 0;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 2;
}
nav{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
}
.logo{
    flex-direction: row;
}
.logo-text {
    margin: 0 0 0 5px;
    line-height: 87.1%;
    color: var(--nipigasColorMain);
}
.login{
    font-size: 16px;
    font-weight: 500;
    text-decoration-line: underline;
    color: var(--nipigasColorMain);
    cursor: pointer;
    transition: all 0.25s ease;
}
.login:hover{
    color: var(--nipigasColorMain-hover);
}





.search_panel{
    width: 100%;
    position: relative;
    flex-direction: row;
    justify-content: flex-end;
    flex-direction: row;
    margin: 50px 0 0 0;
}
.search-img{
   margin: 0 5px 0 0;
}
.search_panel input{
    width: 140px;
    border: none;
    border-bottom: 1px solid #D6D6D6;
    font-size: 14px;
    color: var(--nipigasColorMain);
    font-style: italic;
}
.search_panel input::placeholder{
    font-size: 14px;
    color: #D9D9D9;
    font-style: italic;
}


section{
    margin: 50px 0 0 0;
    position: relative;
    display: flex;
}
.tab.active{
    background-color: var(--nipigasColorMain);
}
.tab{
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border: 1px solid var(--nipigasColorMain);
    border-bottom: none;
    padding: 5px 10px;
    margin: 0 10px 0 0;
    color: var(--nipigasColorMain);
    cursor: pointer;
    transition: all 0.25s ease;
}
.tab:hover{
    background-color: var(--nipigasColorMain-hover);
    color: var(--white);
}

.content_table{
    margin: 0;
    width: 100%;
    min-height: 400px;
    height: fit-content;
    /* border-top: 1px solid var(--nipigasColorMain); */
}
.table{
    width: 100%;
    min-height: 400px;
    height: 100%;
}

.table_item{
    width: 100%;
    height: 50px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--nipigasColorMain);
}
.table_item-title{
    height: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: var(--nipigasColorMain);
    font-weight: 600;
    border-right: 1px solid var(--nipigasColorMain);
    padding: 5px 10px;
}


.table_item-content input{
    width: 100%;
    height: 100%;
    color: var(--textColorBlack);
    border: none;
    background: none;
}
.table_item-content{
    height: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: var(--textColorBlack);
    border-right: 1px solid var(--nipigasColorMain);
    padding: 5px 10px;
    overflow: auto;
}

.table_item-content:first-child, .table_item-title:first-child{
    width: 75px;
    min-width: 75px;
    background-color: #008C9512;
}
.table_item-content:first-child:hover{
    color: rgba(255, 255, 255, 0);
} 
.table_item-content:first-child:hover .table_item-hover_panel{
    opacity: 1;
    pointer-events: auto;
}
.table_item-hover_panel{
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease;
}
.table_item-hover_panel button{
    border: none;
    width: 100%;
    height: 100%;
    color: var(--white);
    font-weight: 600;
    background-color: #008b955d;
    cursor: pointer;
}
.table_item-hover_panel button:active{
    background-color: #008C9512;
}
.table_item-content:first-child:hover, .table_item-title:first-child:hover{
    background-color: #008b955d;
}
.table_item-content:nth-child(2), .table_item-title:nth-child(2){
    width: 100%;
}
.table_item-content:nth-child(3), .table_item-title:nth-child(3){
    width: 100%;
}
.table_item-content:nth-child(4), .table_item-title:nth-child(4){
    width: 100%;
}
    
.table_item-content:nth-child(5), .table_item-title:nth-child(5){
    width: 60px;
    min-width: 60px;
}
.table_item-content:last-child, .table_item-title:last-child{
    border: none;
}




.table_item-content:nth-child(2),
.table_item-content:nth-child(3),
.table_item-content:nth-child(4),
.table_item-content:nth-child(5){
    opacity: 0.5;
    background-color: rgba(44, 44, 44, 0.2);
    cursor: pointer;
}
.table_item-content:nth-child(2).active,
.table_item-content:nth-child(3).active,
.table_item-content:nth-child(4).active,
.table_item-content:nth-child(5).active{
    opacity: 1;
    background-color: none;
    cursor: auto;
}
.table_item-content input{
    pointer-events: none;
}
.table_item-content.active input{
    pointer-events: auto;
}






@media (max-width: 1700px) {
    .wrapper-block{
        width: 90vw;
    }
}
@media (max-width: 1440px) {

}
@media (max-width: 1024px) {

}
@media (max-width: 980px) {

}
@media (max-width: 768px) {

    .section_tabs{
        flex-wrap: wrap;
    }
    .tab{
        border-radius: 0px;
    }
}
@media (max-width: 640px) {

}
@media (max-width: 480px) {

}
@media (max-width: 420px) {

}
@media (max-width: 380px) {

}
</style>