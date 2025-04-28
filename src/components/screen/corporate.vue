<script>
import { useGameStore, debounce } from "@/stores/interface-interaction.js";
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";
import corporate_item from "@/components/corporate_item.vue";
import UIbtn from "@/components/UIbtn.vue";

import gsap from "gsap";
import Timeline from "../Timeline.vue";
import Teamtrack from "../Teamtrack.vue";

export default {
  name: "corporate_awards",
  data() {
    let interaction = useGameStore();
    return {
      filterHoverStatus: false,
      interaction: interaction,
      awardsList: [],
      page: 1,
      meta: null,
      searching: false,
    };
  },
  components: {
    header_comp,
    footer_comp,
    corporate_item,
    UIbtn,
    Timeline,
    Teamtrack,
  },
  methods: {
    // toggleIssuerFilter(issuer){
    //     if(!this.filterIssuers.includes(issuer)){
    //         this.filterIssuers = [...this.filterIssuers, issuer];
    //     }else{
    //         this.filterIssuers = this.filterIssuers.filter(i => i != issuer);
    //     }
    // },
    // toggleCompanyFilter(company){
    //     if(!this.filterCompanies.includes(company)){
    //         this.filterCompanies = [...this.filterCompanies, company];
    //     }else{
    //         this.filterCompanies = this.filterCompanies.filter(i => i != company);
    //     }
    // },

    async updateAwardsList() {
      let filter = {
        ...this.queryFilter,
        personal_award_section_id: this.thisSection.id,
      };

      // Специально: issuers должен быть массивом
      if (filter.issuers && !Array.isArray(filter.issuers)) {
        filter.issuers = [filter.issuers];
      }

      this.searching = true;
      let res = await this.interaction.api.getPersonalAwards(filter, this.page);
      let awards = res.data.data;
      this.meta = res.data.meta;
      this.awardsList = awards;
      this.searching = false;
    },

    changePage(button) {
      if (button.type === "button" && !button.active) {
        this.page = button.page;
        this.updateAwardsList(); // добавляем сразу перезапрос данных
      }
    },
    prevPage() {
      this.page = Math.max(1, this.page - 1);
    },
    nextPage() {
      this.page = Math.min(this.meta?.lastPage, this.page + 1);
    },
  },
  mounted() {
    gsap.from(".text-animate-gsap", {
      x: -100,
      opacity: 0,
      duration: 0.25,
      delay: 0.25,
      ease: "sine",
    });
    // gsap.from(".img-animate-gsap", {
    //   x: -100,
    //   opacity: 0,
    //   scale: 0.5,
    //   duration: 0.25,
    //   delay: 0.5,
    //   ease: "sine",
    // });
  },
  computed: {
    thisSection() {
      console.log(this.$route);
      let sectionId = this.$route.params.sectionId;
      let section =
        this.interaction.personalSections.find((s) => s.id == sectionId) ??
        this.interaction.personalSections[0];
      return section;
    },
    queryFilter() {
      let query = this.$route.query;
      return {
        name: query.name,
        companies: query.companies
          ? String(query.companies).split(",") // ← разделяем по запятым в массив
          : undefined,
        issuers: query.issuer ? [query.issuer] : undefined,
        grade: query.grade,
        year: query.year,
        limit: 32,
      };
    },

    filterYear: {
      get() {
        return this.$route.query.year ?? undefined;
      },
      set(value) {
        this.$router.replace({ query: { ...this.$route.query, year: value } });
      },
    },
    filterName: {
      get() {
        return this.$route.query.name ?? undefined;
      },
      set(value) {
        this.$router.replace({ query: { ...this.$route.query, name: value } });
      },
    },
    filterCompanies: {
      get() {
        let companies = this.$route.query.companies;
        if (companies) {
          return String(companies).split(",");
        } else {
          return [];
        }
      },
      set(companies) {
        let string = companies.length > 0 ? companies.join(",") : undefined;
        this.$router.replace({
          query: { ...this.$route.query, companies: string },
        });
      },
    },
    filterIssuers: {
      get() {
        const issuer = this.$route.query.issuer;
        return issuer ?? undefined; // всегда строка или undefined
      },
      set(value) {
        this.$router.replace({
          query: { ...this.$route.query, issuer: value || undefined },
        });
      },
    },

    filterGrade: {
      get() {
        return this.$route.query.grade ?? undefined;
      },
      set(value) {
        this.$router.replace({ query: { ...this.$route.query, grade: value } });
      },
    },

    availableYears() {
      let list = this.thisSection.filters.year ?? [];
      return list.sort((a, b) => b - a);
    },
    availableGrades() {
      //TODO если степень 0?
      let list = this.thisSection.filters.grade ?? [];
      return list.sort();
    },
    availableCompanies() {
      let list = this.thisSection.filters.company ?? [];
      return list.sort();
    },
    availableIssuers() {
      let list = this.thisSection.filters.issued ?? [];
      return list.sort();
    },

    gradeFilterEnabled() {
      return Boolean(this.thisSection.grade_filter);
    },
    companyFilterEnabled() {
      return Boolean(this.thisSection.company_filter);
    },
    issuerFilterEnabled() {
      return Boolean(this.thisSection.issuer_filter);
    },

    paginationButtons() {
      const totalVisible = 7;

      const meta = this.meta;

      if (!meta || isNaN(meta.currentPage) || meta.currentPage === undefined)
        return [];

      const paginationItems = [];
      if (meta.lastPage <= totalVisible) {
        // x,x,x,x
        for (let i = 1; i <= meta.lastPage; i += 1) {
          paginationItems.push({
            type: "button",
            page: i,
            active: i === meta.currentPage,
            activePrev: i + 1 === meta.currentPage,
          });
        }
      } else if (
        [1, 2, meta.lastPage, meta.lastPage - 1].includes(meta.currentPage)
      ) {
        // x,x,x,...,x,x,x
        for (let i = 1; i <= totalVisible; i += 1) {
          if (i <= 3) {
            paginationItems.push({
              type: "button",
              page: i,
              active: i === meta.currentPage,
              activePrev: i + 1 === meta.currentPage,
            });
          } else if (i === 4) {
            paginationItems.push({
              type: "omission",
            });
          } else {
            const page = meta.lastPage - (totalVisible - i);
            paginationItems.push({
              type: "button",
              page,
              active: page === meta.currentPage,
              activePrev: page + 1 === meta.currentPage,
            });
          }
        }
      } else if ([3, 4].includes(meta.currentPage)) {
        // x,x,x,x,x,...,x
        for (let i = 1; i <= totalVisible; i += 1) {
          if (i <= 5) {
            paginationItems.push({
              type: "button",
              page: i,
              active: i === meta.currentPage,
              activePrev: i + 1 === meta.currentPage,
            });
          } else if (i === 6) {
            paginationItems.push({
              type: "omission",
            });
          } else {
            paginationItems.push({
              type: "button",
              page: meta.lastPage,
              active: meta.lastPage === meta.currentPage,
              activePrev: i + 1 === meta.currentPage,
            });
          }
        }
      } else if (
        [meta.lastPage - 2, meta.lastPage - 3].includes(meta.currentPage)
      ) {
        // x,...,x,x,x,x,x
        for (let i = 1; i <= totalVisible; i += 1) {
          if (i === 1) {
            paginationItems.push({
              type: "button",
              page: 1,
              active: meta.currentPage === 1,
              activePrev: i + 1 === meta.currentPage,
            });
          } else if (i === 2) {
            paginationItems.push({
              type: "omission",
            });
          } else {
            const page = meta.lastPage - (totalVisible - i);
            paginationItems.push({
              type: "button",
              page,
              active: page === meta.currentPage,
              activePrev: page + 1 === meta.currentPage,
            });
          }
        }
      } else {
        // x,...,x,x,x,...,x
        for (let i = 1; i <= totalVisible; i += 1) {
          if (i === 1) {
            paginationItems.push({
              type: "button",
              page: 1,
              active: meta.currentPage === 1,
              activePrev: i + 1 === meta.currentPage,
            });
          } else if (i === 2 || i === 6) {
            paginationItems.push({
              type: "omission",
            });
          } else if (i === 7) {
            paginationItems.push({
              type: "button",
              page: meta.lastPage,
              active: meta.lastPage === meta.currentPage,
              activePrev: i + 1 === meta.currentPage,
            });
          } else {
            const diff = 4 - i;
            const page = meta.currentPage - diff;
            paginationItems.push({
              type: "button",
              page,
              active: page === meta.currentPage,
              activePrev: page + 1 === meta.currentPage,
            });
          }
        }
      }
      return paginationItems;
    },
  },
  watch: {
    queryFilter() {
      if (!this.searching) {
        this.page = 1;
        this.debouncedUpdateAwardsList();
      }
    },
    page() {
      this.updateAwardsList();
    },
    thisSection() {
      this.page = 1;
      this.updateAwardsList();
    },
  },
  created() {
    this.debouncedUpdateAwardsList = debounce(this.updateAwardsList, 500);
    this.updateAwardsList();
  },
};
</script>

<template>
  <div class="wrapper">
    <header_comp />
    <Timeline />
    <Teamtrack />
    <div class="wrapper-block personal">
      <div class="whiteBlock">
        <h1 class="title text-animate-gsap">
          {{ thisSection.title }}
        </h1>

        <div class="years-container">
          <div class="filter-selection">
            <UIbtn
              :variantStyle="true"
              :enablePanel="true"
              :resetItem="'Год'"
              :options="availableYears"
              :selected="filterYear"
              v-model:selected="filterYear"
            >
              Год {{ filterYear }}
            </UIbtn>
          </div>
          <div class="filter-selection" v-if="gradeFilterEnabled">
            <UIbtn
              :enablePanel="true"
              :resetItem="'Степень'"
              :options="availableGrades"
              :selected="filterGrade"
              v-model:selected="filterGrade"
            >
              {{ filterGrade ?? "Степень" }}
            </UIbtn>
          </div>
          <div class="filter-selection" v-if="issuerFilterEnabled">
            <UIbtn
              :enablePanel="true"
              :resetItem="'Кем выдана'"
              :options="availableIssuers"
              :selected="filterIssuers"
              v-model:selected="filterIssuers"
            >
              <span v-if="filterIssuers">
                {{ filterIssuers }}
              </span>
              <span v-else> Кем выдана </span>
            </UIbtn>
          </div>
          <div class="filter-selection">
            <UIbtn
              :variantSize="true"
              :enablePanel="false"
              @click="filterHoverStatus = !filterHoverStatus"
            >
              Все предприятия
            </UIbtn>
          </div>

          <div class="filter_AND_search-block" v-if="companyFilterEnabled">
            <div class="search_panel">
              <input type="text" placeholder="Поиск" v-model="filterName" />
              <div class="search-img">
                <img src="/img/search_nipigas.svg" alt="search" />
              </div>
            </div>
          </div>
          <div class="filter-block" :class="{ active: filterHoverStatus }">
            <div class="filter-container_content">
              <label
                class="custom-checkbox"
                v-for="company in availableCompanies"
                :key="company"
              >
                <input
                  type="checkbox"
                  :value="company"
                  v-model="filterCompanies"
                />
                <span>{{ company }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="corporate-container_content">
        <div class="placeholder" v-if="searching">
          Поиск...
          <img src="/default.gif" alt="крутилка" />
        </div>
        <div class="placeholder" v-else-if="awardsList.length == 0">
          Ничего не найдено
        </div>
        <transition-group name="nominationFade" appear v-else>
          <corporate_item
            v-for="item in awardsList"
            :key="item.id"
            :item="item"
          />
        </transition-group>
      </div>
      <div class="block-changePage" v-if="meta">
        <div
          class="changePage-arrow left"
          @click="prevPage"
          :class="{ disactive: this.page == 1 }"
        >
          <img src="/img/arrow_page.svg" alt="arrow" />
        </div>
        <div class="changePage-block">
          <div
            class="changePage_page"
            v-for="(item, i) in paginationButtons || []"
            :key="i"
            :class="{
              button: item.type === 'button',
              active: item.type === 'button' && item.active,
              'active-prev': item.type === 'button' && item.activePrev,
              omission: item.type === 'omission',
            }"
            @click="changePage(item)"
          >
            {{ item.type === "button" ? item.page : "..." }}
          </div>
        </div>
        <div
          class="changePage-arrow right"
          @click="nextPage"
          :class="{ disactive: this.page == this.meta.lastPage }"
        >
          <img src="/img/arrow_page.svg" alt="arrow" />
        </div>
      </div>
    </div>
    <footer_comp />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  font-family: ArticulatCF;
  padding: 150px 0px 0px 0px;
}
.block-changePage {
  flex-direction: row;
  margin: 0 0 100px 0;
}

.whiteBlock {
  width: 100%;
  border-radius: 25px;
  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.1);
  margin: 0px 0 0 0;
  padding: 50px 135px 50px 135px;
  background-color: white;
  background-image: url("/img/whiteBlockBackground.png");
  background-repeat: no-repeat;
  background-position: -200px -270px;
  background-size: calc(100% + 400px) auto;
}

.changePage-block {
  flex-direction: row;
  border: 1px solid rgb(201, 201, 201);
  border-radius: 5px;
  overflow-x: hidden;
}
.changePage_page {
  width: 30px;
  height: 30px;
  background-color: var(--white);
  color: var(--nipigasColorMain);
  font-size: 14px;
  border-right: 1px solid rgb(201, 201, 201);
  cursor: pointer;
  transition: all 0.25s ease;
}
.changePage_page:hover {
  background-color: rgb(236, 236, 236);
  color: var(--white);
}
.changePage_page.active {
  background-color: var(--nipigasColorMain);
  color: var(--white);
}
.changePage_page:last-child {
  border-right: none;
}

.changePage-arrow {
  width: 10px;
}
.changePage-arrow.left {
  transform: rotate(180deg);
  margin: 0 10px 0 0;
  cursor: pointer;
  transition: all 0.25s ease;
}
.changePage-arrow.right {
  margin: 0 0 0 10px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.changePage-arrow.disactive {
  filter: grayscale(1);
  cursor: auto;
}

.wrapper {
  width: 100%;
  height: 100%;
}
.wrapper-block {
  width: 1326px;
  height: fit-content;
  margin: 0px 0 0 0;
}

.title {
  font-family: YFF_RARE_MEGA_TRIAL;
  margin: 0px 0 20px 0;
  font-size: 48px;
  line-height: 1.25;
  font-weight: 700;
  color: var(--textColorBlack);
}
.years-container {
  width: fit-content;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  z-index: 2;
}
.years-container.name {
  justify-content: space-around;
}
.year:first-child {
  margin: 0;
}
.year.active {
  background-color: var(--nipigasColorAdditional);
  color: var(--white);
}
.year {
  margin: 0 0 0 30px;
  width: 120px;
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
.year.name {
  width: fit-content;
  padding: 0px 20px;
  margin: 0 0 0 0px;
}
.year:hover {
  background-color: var(--nipigasColorAdditional);
  color: var(--white);
}

.filter_AND_search-block {
  width: 100%;
  flex-direction: row;
}
.filterButton.active {
  background-color: var(--nipigasColorMain);
}
.filterButton.active:hover {
  background-color: var(--nipigasColorMain-hover);
}
.filterButton {
  /* width: 258px; */
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--nipigasColorMain);
  border: none;
  border-radius: 5px;
  padding: 0 30px;
  font-size: 16px;
  font-weight: 500;
  color: var(--white);
  transition: all 0.25s ease;
  cursor: pointer;
}
.filterButton:hover {
  background-color: var(--nipigasColorMain-hover);
}
.blockImg {
  margin: 0 6px 0 0;
  flex-direction: row;
}

.filter-block.active {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}
.filter-block {
  position: absolute;
  top: calc(100% + 12px);
  transform: scale(0.7);
  width: 835px;
  height: 510px;
  background-color: #faf9f9;
  border: 1px solid #008c95;
  border-radius: 10px;
  overflow: hidden;
  cursor: auto;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
  transition: all 0.25s ease;
}
.filter-container_content {
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
.filter-block label {
  width: calc(33% - 10px);
  margin: 0 10px 0 0;
  height: 50px;
  color: var(--textColorBlack);
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s ease;
}
.filter-block label:hover {
  color: var(--textColorBlack-hover);
}

/* для элемента input c type="checkbox" */
.custom-checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

/* для элемента label, связанного с .custom-checkbox */
.custom-checkbox > span {
  display: inline-flex;
  align-items: center;
  user-select: none;
}

/* создание в label псевдоэлемента before со следующими стилями */
.custom-checkbox > span::before {
  content: "";
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
.custom-checkbox > input:not(:disabled):not(:checked) + span:hover::before {
  border-color: rgb(1, 114, 122);
}

/* стили для активного чекбокса (при нажатии на него) */
.custom-checkbox > input:not(:disabled):active + span::before {
  background-color: rgb(1, 114, 122);
  border-color: rgb(1, 114, 122);
}

/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox > input:focus:not(:checked) + span::before {
  border-color: var(--nipigasColorMain);
}

/* стили для чекбокса, находящегося в состоянии checked */
.custom-checkbox > input:checked + span::before {
  border-color: var(--nipigasColorMain);
  background-color: transparent;
  background-image: url("/img/arrow_checkbox.svg");
}

/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox > input:disabled + span::before {
  background-color: transparent;
}

.custom-checkbox {
  margin: 0 0 20px 0;
}

.placeholder {
  flex-direction: row-reverse;
  color: var(--nipigasColorMain);
}
.placeholder img {
  width: 36px;
  margin: 0 10px 0 0;
}

.filter-selection {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: unset;
}
select.yearSelect {
  background-color: var(--nipigasColorAdditional);
  border: 1px solid var(--nipigasColorAdditional);
}
select {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: var(--nipigasColorMain);
  font-size: 16px;
  font-weight: 500;
  color: var(--white);
  border: 1px solid var(--nipigasColorMain);
  padding: 0 10px 0 5px;
}
option {
  padding: 5px;
}

.search_panel {
  flex-direction: row;
  justify-content: space-between;
  width: 500px;
  height: 40px;
  padding: 0px 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
}
.search-img {
  margin: 0 5px 0 0;
}
.search_panel input {
  width: 100%;
  border: none;
  font-size: 16px;
  font-family: ArticulatCF;
  color: var(--nipigasColorMain);
  font-weight: 500;
  background-color: transparent;
}
.search_panel input::placeholder {
  font-size: 16px;
  color: #c2c2c2;
  font-weight: 500;
}

.corporate-container_content {
  width: 100%;
  height: fit-content;
  min-height: 450px;
  margin: 50px 0 20px 0;
  /* flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start; */
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  justify-content: space-around;
  gap: 50px 20px;
}

.container-filter-selection {
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin: 0 0 20px 0;
}

.bg-element {
  position: absolute;
  top: 0;
  z-index: 0;
}

@media (max-width: 1440px) {
  .wrapper-block {
    width: 90vw;
  }

  .whiteBlock {
    padding: 50px 15px;
  }
  .title {
    font-size: 3.8vw;
  }
  .filter-block {
    width: 70vw;
    height: 50vh;
  }
  .filter-container_content {
    padding: 20px;
  }
  .filter-block label {
    width: calc(50% - 10px);
  }
  .corporate-container_content {
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    gap: 25px;
  }

  .years-container {
    flex-wrap: wrap;
  }
}
@media (max-width: 1280px) {
  .whiteBlock {
    background-position: -20vw -24vw;
    background-size: calc(100% + 60vw) auto;
  }
}
@media (max-width: 1200px) {
  .years-container {
    gap: 1.7vw;
    width: 50vw;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .search_panel {
    position: relative;
    width: 50vw;
  }
  .filter_AND_search-block {
    justify-content: center;
  }

  .filter-block {
    top: calc(40px + 12px);
  }
}
@media (max-width: 1060px) {
  .wrapper {
    padding: 150px 0px 0px 0px;
  }
}
@media (max-width: 1024px) {
  .wrapper-block {
    width: 80vw;
  }
  .filter-block {
    width: 70vw;
  }
  .title {
    margin: 20px 0 20px 0;
    font-size: 36px;
    text-align: center;
  }
  .corporate-container_content {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 980px) {
  .years-container {
    width: 60vw;
  }

  .search_panel {
    width: 100%;
  }

  .filter-selection {
    width: calc((100% - 25%) / 2 - 1.7vw);

    &:nth-child(1) {
      width: 25%;
    }
  }
}
@media (max-width: 768px) {
  .filter_AND_search-block {
    flex-direction: column;
    height: fit-content;
  }
  .filter-selection {
    width: 100%;
  }
  .filter-selection {
    width: 200px;
    &:nth-child(1) {
      width: 200px;
    }
  }
  .filterButton {
    margin: 0;
  }
  .years-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .filter_AND_search-block {
    justify-content: space-around;
  }
  .search_panel {
    position: relative;
    right: unset;
  }

  .filter-block {
    top: calc(100% - 40px);
  }
  .filter-block label {
    width: 100%;
    height: fit-content;
    margin: 0 0 15px 0;
  }
  .corporate-container_content {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
}
@media (max-width: 580px) {
  .corporate-container_content {
    justify-content: center;
  }
}
@media (max-width: 480px) {
  .whiteBlock {
    background-repeat: repeat;
    background-position: -20vw -24vw;
    background-size: calc(100% + 200vw) auto;
  }
  .years-container {
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .year {
    width: 100%;
  }
  .year:nth-child(1) {
    margin: 0 0 10px 0;
  }
  .year:nth-child(2) {
    margin: 0 0 10px 0;
  }
  .year:nth-child(3) {
    margin: 0 0 10px 0;
  }
  .year:nth-child(4) {
    margin: 0 0 10px 0;
  }

  .year.name {
    width: 100%;
    margin: 0 0 10px 0;
  }

  .corporate-container_content {
    margin: 50px 0 50px 0;
  }
  .filter_AND_search-block {
    flex-direction: column-reverse;
  }
  .search_panel {
    margin: 0 0 20px 0;
  }
  .filter-block {
    width: 90vw;
  }
  .filter-selection {
    &:nth-child(1) {
      width: 100%;
    }
    width: 100%;
  }
  .title {
    font-size: 6vw;
  }
}
</style>
