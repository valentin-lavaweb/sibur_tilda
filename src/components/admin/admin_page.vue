<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import login_comp from "@/components/admin/login.vue";

export default {
  name: "admin_page",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
    }
  },
  components:{
    login_comp,
  },
  methods: {

  },
  mounted() {

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
    <div class="wrapper-block">
      <div class="content-block">
        <nav>
            <div class="logo">
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
            <input type="text" placeholder="Введите запрос" v-model="filterName">
        </div>
        <section>
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
        <section class="content_table">
            <div class="table">
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
            </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>

.wrapper{
  width: 100%;
  height: 100%;
}
.wrapper-block{
   width: 1160px;
   height: fit-content;
   margin: 0px 0 50px 0;
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
    border-top: 1px solid var(--nipigasColorMain);
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







@media (max-width: 1440px) {
}
@media (max-width: 1024px) {

}
@media (max-width: 980px) {

}
@media (max-width: 768px) {

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