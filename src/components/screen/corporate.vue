<script>
import { useGameStore, debounce } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";
import corporate_item from "@/components/corporate_item.vue";

import gsap from "gsap";

export default {
  name: "corporate_awards",
  data() {
    let interaction = useGameStore();
    return{
        yearPhoto: '2023',
        filterHoverStatus: false,
        interaction: interaction,
        awardsList: [],
        page: 1,
        meta: null

    }
  },
  components:{
    header_comp,
    footer_comp,
    corporate_item,
  },
  methods: {

    toggleIssuerFilter(issuer){
        if(!this.filterIssuers.includes(issuer)){
            this.filterIssuers = [...this.filterIssuers, issuer];
        }else{
            this.filterIssuers = this.filterIssuers.filter(i => i != issuer);
        }
    },
    // toggleCompanyFilter(company){
    //     if(!this.filterCompanies.includes(company)){
    //         this.filterCompanies = [...this.filterCompanies, company];
    //     }else{
    //         this.filterCompanies = this.filterCompanies.filter(i => i != company);
    //     }
    // },

    async updateAwardsList(){
        let filter = {
          ...this.queryFilter,
          personal_award_section_id: this.thisSection.id
        }
        this.searching = true;

        let res = await this.interaction.api.getPersonalAwards(filter, this.page);

        let awards = res.data.data;
        this.meta = res.data.meta;

        this.awardsList = awards
        this.searching = false;
    }

  },
  mounted() {
    gsap.from(".text-animate-gsap", {
    x: - 100,
    opacity: 0,
    duration: 0.25,
    delay: 0.25,
    ease: "sine",
    });
    gsap.from(".img-animate-gsap", {
    x: - 100,
    opacity: 0,
    scale: 0.5,
    duration: 0.25,
    delay: 0.5,
    ease: "sine",
    });
  },
  computed:{
    thisSection(){
        let sectionId = this.$route.params.sectionId;
        let section = this.interaction.personalSections.find(s => s.id == sectionId) ?? this.interaction.personalSections[0];
        return section;
    },
    queryFilter(){
        let query = this.$route.query;
        let filter = {
            name: query.name,
            companies: query.companies,
            issuers: query.issuers,
            grade: query.grade,
            year: query.year,
        }
        return filter;
    },
    filterYear:{
        get(){
            return this.$route.query.year ?? undefined;
        },
        set(value){
            this.$router.replace({query:{...this.$route.query, year: value}})
        }
    },
    filterName:{
        get(){
            return this.$route.query.name ?? undefined;
        },
        set(value){
            this.$router.replace({query:{...this.$route.query, name: value}})
        }
    },
    filterCompanies:{
        get(){
            let companies = this.$route.query.companies;
            if(companies){
                return String(companies).split(',');
            }else{
                return [];
            }
        },
        set(companies){
            let string = companies.length > 0 ? companies.join(',') : undefined;
            this.$router.replace({query:{...this.$route.query, companies: string}})
        },
    },
    filterIssuers:{
        get(){
            let issuers = this.$route.query.issuers;
            if(issuers){
                return String(issuers).split(',');
            }else{
                return [];
            }
        },
        set(issuers){
            let string = issuers.length > 0 ? issuers.join(',') : undefined;
            this.$router.replace({query:{...this.$route.query, issuers: string}})
        },
    },
    filterGrade:{
        get(){
            return this.$route.query.grade ?? undefined;
        },
        set(value){
            this.$router.replace({query:{...this.$route.query, grade: value}})
        }
    },

    availableYears(){
        let list = this.thisSection.filters.year ?? [];
        return list.sort();
    },
    availableGrades(){
        //TODO если степень 0?
        let list = this.thisSection.filters.grade ?? [];
        return list.sort();
    },
    availableCompanies(){
        let list = this.thisSection.filters.company ?? [];
        return list.sort();
    },
    availableIssuers(){
        let list = this.thisSection.filters.issued ?? [];
        return list.sort();
    },

    gradeFilterEnabled(){
        return Boolean(this.thisSection.grade_filter)
    },
    companyFilterEnabled(){
        return Boolean(this.thisSection.company_filter)
    },
    issuerFilterEnabled(){
        return Boolean(this.thisSection.issuer_filter)
    },


  },
  watch:{
    queryFilter(){
        this.debouncedUpdateAwardsList();
    }
  },
  created(){
    this.debouncedUpdateAwardsList = debounce(this.updateAwardsList, 500);
    this.updateAwardsList();
  },
  beforeRouteUpdate(){
    this.awardsList = [];
  },
};
</script>


<template>
  <div class="wrapper">
    <header_comp/>
    <div class="bg-element img-animate-gsap">
      <img src="/img/background_page/team_track_winners.svg" alt=""/>
    </div>
    <div class="wrapper-block">
        <h1 class="title text-animate-gsap">
            {{ thisSection.title }}
        </h1>
        <div class="years-container">
            <button class="year"
            v-for="year in availableYears"
            :key="year"

            @click="filterYear == year ? filterYear = undefined : filterYear = year"
            :class="{active: filterYear == year}">
            {{year}}
            </button>
        </div>
        <div class="years-container name" v-if="issuerFilterEnabled">
            <button class="year name"
            v-for="issuer in availableIssuers"
            :key="issuer"

            @click="toggleIssuerFilter(issuer)"
            :class="{active: filterIssuers.includes(issuer)}">
                {{issuer}}
            </button>
        </div>
        <div class="years-container name" v-if="gradeFilterEnabled">
            <button class="year name"
            v-for="grade in availableGrades"
            :key="grade"

            @click="filterGrade == grade ? filterGrade = undefined : filterGrade = grade"
            :class="{active: filterGrade == grade}">
                Степень {{grade}}
            </button>
        </div>
        <div class="filter_AND_search-block" v-if="companyFilterEnabled">
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
                    <label class="custom-checkbox"
                    v-for="company in availableCompanies"
                    :key="company"
                    >
                        <input type="checkbox" :value="company" v-model="filterCompanies">
                        <span>{{company}}</span>
                    </label>
                </div>
            </div>
            <div class="search_panel">
                <div class="search-img">
                    <img src="/img/search_grey.svg" alt="search"/>
                </div>
                <input type="text" placeholder="Введите запрос" v-model="filterName">
            </div>
        </div>
        <div class="corporate-container_content">
            <transition-group name="nominationFade" appear>
                <corporate_item v-for="item in awardsList"
                :key = "item.id"
                :item = "item"
                />
            </transition-group>
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

.custom-checkbox{
    margin: 0 0 20px 0;
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
    color: var(--nipigasColorMain);
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



@media (max-width: 1440px) {
    .wrapper-block{
        width: 70vw;
    }
    .title {
        font-size: 3.8vw;
    }
    .filter-block{
        width: 70vw;
        height: 50vh;
    }
    .filter-container_content{
        padding: 20px;
    }
    .filter-block label{
        width: 50%;
    }
    .corporate-container_content{
        justify-content: space-between;
    }
}
@media (max-width: 1024px) {
    .wrapper-block{
        width: 80vw;
    }
    .filter-block{
        width: 70vw;
    }
    .title {
        margin: 20px 0 20px 0;
        font-size: 36px;
        text-align: center;
    }
}
@media (max-width: 980px) {

}
@media (max-width: 768px) {
    .years-container{
        width: 80vw;
    }
    .filter_AND_search-block{
        justify-content: space-around;
    }
    .search_panel{
        position: relative;
        right: unset;
    }
    .filter-block label{
        width: 100%;
    }
}
@media (max-width: 640px) {

}
@media (max-width: 580px) {
    .corporate-container_content{
        justify-content: center;
    }
}
@media (max-width: 480px) {
    .years-container{
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .year{
        width: calc(50% - 2vw);
    }
    .year:nth-child(1){
        margin: 0 2vw 10px 0;
    }
    .year:nth-child(2){
        margin: 0 0 10px 2vw;
    }
    .year:nth-child(3){
        margin: 0 2vw 10px 0;
    }
    .year:nth-child(4){
        margin: 0 0 10px 2vw;
    }

    .year.name{
        width: 100%;
        margin: 0 0 10px 0;
    }

    .corporate-container_content{
        margin: 0 0 50px 0;
    }
    .filter_AND_search-block{
        flex-direction: column-reverse;
    }
    .search_panel{
        margin: 0 0 20px 0;
    }
    .filter-block{
        width: 90vw;
    }
}
@media (max-width: 420px) {

}
@media (max-width: 360px) {
    .title{
        font-size: 30px;
    }
}

</style>