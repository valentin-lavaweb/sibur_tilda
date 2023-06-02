<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";
import corporate_item from "@/components/corporate_item.vue";


export default {
  name: "corporate",
  data() {
    let interaction = useGameStore();
    return{
        filterHoverStatus: false,
        interaction: interaction,
    }
  },
  components:{
    header_comp,
    footer_comp,
    corporate_item,
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
    <header_comp/>
    <div class="bg-element">
      <img src="/img/background_page/team_track_winners.svg" alt=""/>
    </div>
    <div class="wrapper-block">
        <h1 class="title">
            {{ this.$route.meta.title}}
        </h1>
        <div class="years-container">
            <button class="year">
                2020
            </button>
            <button class="year">
                2021
            </button>
            <button class="year">
                2022
            </button>
            <button class="year active">
                2023
            </button>
        </div>
        <div class="years-container name">
            <button class="year name">
                РСХ
            </button>
            <button class="year name">
                МИНЭНЕРГО
            </button>
            <button class="year name">
                МИНПРОМТОРГ
            </button>
        </div>
        <div class="filter_AND_search-block">
            <button class="filterButton" 
            :class="{active: filterHoverStatus}"
            @click="filterHoverStatus = !filterHoverStatus"
            >
                <div class="blockImg" v-if="!filterHoverStatus">
                    <div class="img_ser">
                        <img src="/img/menu.svg" alt="menu"/>
                    </div>
                    <div class="img_ser">
                        <img src="/img/search.svg" alt="search" v-if="!filterHoverStatus"/>
                    </div>
                </div>
                <div class="blockImg" v-else>
                    <div class="img_ser">
                        <img src="/img/close.svg" alt="close"/>
                    </div>
                </div>
                Все предприятия
            </button>
            <div class="filter-block" :class="{active: filterHoverStatus}">
                <div class="filter-container_content">
                    <label class="custom-checkbox">
                        <input type="checkbox">
                        <span>АО “Воронежсинтезкаучук”</span>
                    </label>
                </div>
            </div>
            <div class="search_panel">
                <div class="search-img">
                    <img src="/img/search_grey.svg" alt="search"/>
                </div>
                <input type="text" placeholder="Введите запрос">
            </div>
        </div>
        <div class="corporate-container_content">
            <corporate_item v-for="item in interaction.testCorporateArray"
            :key = "item.id"
            :item = "item"
            />
        </div>
    </div>
    <footer_comp/>
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
   margin: 130px 0 0 0;
}


.title{
    margin: 75px 0 20px 0;
    font-size: 48px;
    font-weight: 700;
    color: var(--nipigasColorAdditional);
}
.years-container{
  margin: 0 0 20px 0;
  width: 550px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
}
.years-container.name{
    justify-content: space-around;
}
.year:first-child{
  margin: 0;
}
.year.active{
  background-color: var(--nipigasColorAdditional);
  color: var(--white);
}
.year{
  margin: 0 0 0 40px;
  width: 100px;
  height: 30px;
  font-weight: 500;
  border-radius: 5px;
  border: none;
  background-color: rgba(246, 246, 246, 1);
  color: var(--nipigasColorMain);
  font-size: 16px;
  transition: all 0.25s ease;
  cursor: pointer;
}
.year.name{
    width: fit-content;
    padding: 0px 20px;
    margin: 0 0 0 0px;
}
.year:hover{
  background-color: var(--nipigasColorAdditional);
  color: var(--white);
}








.filter_AND_search-block{
    width: 100%;
    flex-direction: row;
    margin: 0 0 40px 0;
}
.filterButton.active{
    background-color: var(--nipigasColorMain);
}
.filterButton.active:hover{
    background-color: var(--nipigasColorMain-hover);
}
.filterButton{
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: var(--filterColor);
    border: none;
    border-radius: 5px;
    padding: 0 30px;
    font-size: 16px;
    font-weight: 500;
    color: var(--white);
    transition: all 0.25s ease;
    cursor: pointer;
}
.filterButton:hover{
    background-color: var(--filterColor-hover);
}
.blockImg{
    margin: 0 6px 0 0;
    flex-direction: row;
}




.filter-block.active{
    transform: scale(1);
    opacity: 1;
    pointer-events: auto;
}
.filter-block{
    position: absolute;
    top: calc(100% + 12px);
    transform: scale(0.7);
    width: 835px;
    height: 510px;
    background-color: #FAF9F9;
    border: 1px solid #008C95;
    border-radius: 10px;
    overflow: hidden;
    cursor: auto;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease;
}
.filter-container_content{
    width: 100%;
    height: 100%;
    padding: 40px 20px;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: auto;
}
.filter-block label{
    width: 32%;
    color: var(--textColorBlack);
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.25s ease;
}
.filter-block label:hover{
    color: var(--textColorBlack-hover);
}

/* для элемента input c type="checkbox" */
.custom-checkbox>input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

/* для элемента label, связанного с .custom-checkbox */
.custom-checkbox>span {
  display: inline-flex;
  align-items: center;
  user-select: none;
}

/* создание в label псевдоэлемента before со следующими стилями */
.custom-checkbox>span::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0 6px 0 0;
  border: 1px solid var(--nipigasColorMain);
  background-color: transparent;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

/* стили при наведении курсора на checkbox */
.custom-checkbox>input:not(:disabled):not(:checked)+span:hover::before {
  border-color: rgb(1, 114, 122);
}

/* стили для активного чекбокса (при нажатии на него) */
.custom-checkbox>input:not(:disabled):active+span::before {
  background-color: rgb(1, 114, 122);
  border-color: rgb(1, 114, 122);
}



/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox>input:focus:not(:checked)+span::before {
  border-color: var(--nipigasColorMain);
}

/* стили для чекбокса, находящегося в состоянии checked */
.custom-checkbox>input:checked+span::before {
  border-color: var(--nipigasColorMain);
  background-color: transparent;
  background-image: url("/img/arrow_checkbox.svg");
}

/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox>input:disabled+span::before {
  background-color: transparent;
}












.search_panel{
    position: absolute;
    right: 0;
    flex-direction: row;
}
.search-img{
   margin: 0 5px 0 0;
}
.search_panel input{
    width: 140px;
    border: none;
    border-bottom: 1px solid #D6D6D6;
    font-size: 14px;
    color: #D9D9D9;
    font-style: italic;
}
.search_panel input::placeholder{
    font-size: 14px;
    color: #D9D9D9;
    font-style: italic;
}


.corporate-container_content{
    width: 100%;
    height: fit-content;
    min-height: 450px;
    margin: 0 0 100px 0;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
}




.bg-element{
    position: absolute;
    top: 0;
    z-index: 0;
}

</style>