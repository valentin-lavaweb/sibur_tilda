<script>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { useGameStore } from '@/stores/interface-interaction.js';
import login_comp from "@/components/admin/login.vue";

// import personal_awards from "@/components/admin/tables/personal_awards.vue";
// import command_awards from "@/components/admin/tables/command_awards.vue";
// import personal_award_sections from "@/components/admin/tables/personal_award_sections.vue";
// import gallery_table from "@/components/admin/tables/gallery.vue";

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
    // personal_awards,
    // command_awards,
    // personal_award_sections,
    // gallery_table
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
    <div class="wrapper-block" ref="wrapper" v-show="interaction.admin">
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
                @click="interaction.logout(), $router.push({name: 'admin_page'})">
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
            <div class="tab" 
                :class="{active: this.$route.name == 'command_awards_table'}"
                @click="this.$router.push({name: 'command_awards_table'})">
                командные награды
            </div>
            <div class="tab"
                :class="{active: this.$route.name == 'personal_awards_table'}"
                @click="this.$router.push({name: 'personal_awards_table'})">
                персональные награды
            </div>
            <div class="tab"
                :class="{active: this.$route.name == 'personal_award_sections_table'}"
                @click="this.$router.push({name: 'personal_award_sections_table'})">
                разделы для персональных наград
            </div>
            <div class="tab"
                :class="{active: this.$route.name == 'gallery_table'}"
                @click="this.$router.push({name: 'gallery_table'})">
                галерея
            </div>
        </section>
        <section class="content_table" ref="table">
            <RouterView :search="searchValue"/>
            <!-- <personal_award_sections :search="searchValue" v-if="this.$route.name == 'personal_award_sections_table'"/>
            <personal_awards :search="searchValue" v-if="this.$route.name == 'personal_awards_table'"/>
            <command_awards :search="searchValue" v-if="this.$route.name == 'command_awards_table'"/> -->
        </section>
      </div>
    </div>
  </div>
  
</template>

<style>
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

  --easy-table-body-row-hover-font-color: var(--textColorBlack);
  --easy-table-body-row-hover-background-color: none;

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
   width: 1700px;
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
    color: var(--white);
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
    height: fit-content;
    /* border-top: 1px solid var(--nipigasColorMain); */
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