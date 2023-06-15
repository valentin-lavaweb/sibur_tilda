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
        return {
            interaction: interaction,
            searchValue: null,
        }
    },
    components: {
        login_comp,
        // Vue3EasyDataTable,
        // personal_awards,
        // command_awards,
        // personal_award_sections,
        // gallery_table
    },
    methods: {
        checkAuth() {
            this.interaction.getAuthAdmin().catch(e => console.warn(e)).then(e => console.debug(e));
        }
    },
    mounted() {
        let tableContainer = this.$refs.tableContainer;
        let pos = { start: 0, current: 0, end: 0 };

        tableContainer.addEventListener('pointerdown', (e) => {


            let table = tableContainer.querySelector('.vue3-easy-data-table__main');

            if (table) {
                pos.start = pos.current = pos.end = e.clientX;

                tableContainer.style.cursor = 'grabbing';
                tableContainer.style.userSelect = 'none';

                tableContainer.setPointerCapture(e.pointerId);

                const movelistener = (e) => {

                    pos.end = e.clientX;
                    let delta = pos.end - pos.current;
                    pos.current = e.clientX;
                    table.scrollLeft -= delta;
                }

                const uplistener = (e) => {
                    pos.end = e.clientX;

                    tableContainer.removeEventListener('pointermove', movelistener);
                    tableContainer.removeEventListener('pointerup', uplistener);

                    tableContainer.style.cursor = 'auto';
                    tableContainer.style.userSelect = 'all';

                }



                tableContainer.addEventListener('pointermove', movelistener);

                tableContainer.addEventListener('pointerup', uplistener);

            }







        });

        this.checkAuth();

    },
    computed: {

    },
    watch: {

    },
};
</script>


<template>
    <div class="wrapper">
        <Teleport to="body">
            <transition name="openPage" mode="out-in" appear>
                <login_comp v-if="!interaction.admin" />
            </transition>
        </Teleport>
        <div class="wrapper-block" v-show="interaction.admin">
            <div class="content-block">
                <nav>
                    <div class="logo" @click="checkAuth">
                        <img src="/img/logo.svg" alt="logo" />
                        <div class="logo-text">
                            энергия<br>
                            признания
                        </div>
                    </div>
                    <div class="login" @click="interaction.logout(), $router.push({ name: 'admin_page' })">
                        Выйти
                    </div>
                </nav>
                <div class="search_panel">
                    <div class="search-img">
                        <img src="/img/search_grey.svg" alt="search" />
                    </div>
                    <input type="text" placeholder="Введите запрос" v-model="searchValue">
                </div>
                <section class="section_tabs">
                    <div class="tab" :class="{ active: this.$route.name == 'command_awards_table' }"
                        @click="this.$router.push({ name: 'command_awards_table' })">
                        командные награды
                    </div>
                    <div class="tab" :class="{ active: this.$route.name == 'personal_awards_table' }"
                        @click="this.$router.push({ name: 'personal_awards_table' })">
                        персональные награды
                    </div>
                    <div class="tab" :class="{ active: this.$route.name == 'personal_award_sections_table' }"
                        @click="this.$router.push({ name: 'personal_award_sections_table' })">
                        разделы для персональных наград
                    </div>
                    <div class="tab" :class="{ active: this.$route.name == 'gallery_table' }"
                        @click="this.$router.push({ name: 'gallery_table' })">
                        галерея
                    </div>
                </section>
                <section class="content_table" ref="tableContainer">
                    <div class="control-panel">
                        <button class="btn">
                            добавить
                        </button>
                    </div>
                    <RouterView :search="searchValue" />
                    <!-- <personal_award_sections :search="searchValue" v-if="this.$route.name == 'personal_award_sections_table'"/>
            <personal_awards :search="searchValue" v-if="this.$route.name == 'personal_awards_table'"/>
            <command_awards :search="searchValue" v-if="this.$route.name == 'command_awards_table'"/> -->
                </section>
            </div>
        </div>
    </div>
</template>

<style>
.vue3-easy-data-table__body tr td:first-child {
    background-color: #EDF7F8;
}

.vue3-easy-data-table__main.hoverable tr:hover td:first-child {
    background-color: #EDF7F8;
}

/* .vue3-easy-data-table__main.hoverable tr:hover td:hover{
    background-color: transparent;
} */
.vue3-easy-data-table__body tr td {
    transition: all 0.25s ease;
}


.easy-data-table__rows-selector ul.select-items.inside li,
.buttons-pagination .item {
    transition: all 0.25s ease;
}

.easy-data-table__rows-selector ul.select-items.inside li:hover,
.buttons-pagination .item:hover {
    background-color: rgb(236, 236, 236);
}

.easy-data-table__rows-selector ul.select-items.inside li.selected:hover,
.buttons-pagination .item.button.active:hover {
    background-color: var(--nipigasColorMain-hover);
}

.vue3-easy-data-table__footer,
.vue3-easy-data-table__footer * {
    flex-direction: row;
}

.vue3-easy-data-table__main {
    display: block;
}

/* .buttons-pagination,
.vue3-easy-data-table__footer,
.vue3-easy-data-table__footer .pagination__rows-per-page,
.easy-data-table__rows-selector .rows-input__wrapper{
    flex-direction: row;
} */
</style>
<style scoped>
.content_table div {
    display: unset;
    justify-content: unset;
    align-items: unset;
    flex-direction: unset;
}

.wrapper {
    width: 100%;
    height: 100%;
}

.wrapper-block {
    width: 1800px;
    height: fit-content;
    margin: 0px 0 50px 0;
    overflow-x: auto;
}

.content-block {
    margin: 0 0 0 0;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 2;
}

nav {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
}

.logo {
    flex-direction: row;
}

.logo-text {
    margin: 0 0 0 5px;
    line-height: 87.1%;
    color: var(--nipigasColorMain);
}

.login {
    font-size: 16px;
    font-weight: 500;
    text-decoration-line: underline;
    color: var(--nipigasColorMain);
    cursor: pointer;
    transition: all 0.25s ease;
}

.login:hover {
    color: var(--nipigasColorMain-hover);
}





.search_panel {
    width: 100%;
    position: relative;
    flex-direction: row;
    justify-content: flex-end;
    flex-direction: row;
    margin: 50px 0 0 0;
}

.search-img {
    margin: 0 5px 0 0;
}

.search_panel input {
    width: 140px;
    border: none;
    border-bottom: 1px solid #D6D6D6;
    font-size: 14px;
    color: var(--nipigasColorMain);
    font-style: italic;
}

.search_panel input::placeholder {
    font-size: 14px;
    color: #D9D9D9;
    font-style: italic;
}


section {
    margin: 50px 0 0 0;
    position: relative;
    display: flex;
}

.tab.active {
    color: var(--white);
    background-color: var(--nipigasColorMain);
}

.tab {
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

.tab:hover {
    background-color: var(--nipigasColorMain-hover);
    color: var(--white);
}

.content_table {
    margin: 0;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    /* border-top: 1px solid var(--nipigasColorMain); */
}


.control-panel{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    border: 1px solid var(--nipigasColorMain);
    border-bottom: none;
    padding: 5px 10px 0 10px;
}
.btn{
    position: relative;
    display: flex;
}



@media (max-width: 1700px) {
    .wrapper-block {
        width: 90vw;
    }
}

@media (max-width: 1440px) {}

@media (max-width: 1024px) {}

@media (max-width: 980px) {}

@media (max-width: 768px) {

    .section_tabs {
        flex-wrap: wrap;
    }

    .tab {
        border-radius: 0px;
    }
}

@media (max-width: 640px) {}

@media (max-width: 480px) {}

@media (max-width: 420px) {}

@media (max-width: 380px) {}</style>