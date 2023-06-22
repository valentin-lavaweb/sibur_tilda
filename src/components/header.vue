<script>
import { useGameStore } from '@/stores/interface-interaction.js';

export default {
    name: "header_comp",
    data() {
        let interaction = useGameStore();
        return {
            statusMobileMenu: false,
            interaction: interaction,
        }
    },
    components: {

    },
    methods() {

    },
    mounted() {

    },
    computed: {
        personalSections() {
            return this.interaction.personalSections;
        }
    },
    watch: {

    },
};
</script>


<template>
    <div class="header">
        <div class="header-back_block"></div>
        <div class="back_block"></div>
        <div class="header-content">
            <div class="header-logo">
                <div class="logo">
                    <RouterLink :to="{ name: 'main_page' }" active-class="active">
                        <img src="/img/logo.png" alt="logo" />
                    </RouterLink>
                </div>
                <!-- <div class="logo-text">
                    <RouterLink :to="{ name: 'main_page' }" active-class="active">
                        энергия<br>
                        признания
                    </RouterLink>
                </div> -->
            </div>
            <div class="header-block-link">
                <div class="header-link">
                    <RouterLink :to="{ name: 'types_of_awards_page' }" active-class="active">
                        Виды наград
                    </RouterLink>
                </div>
                <div class="header-link hover_link" :class="{ active: this.$route.name == 'team_track_winners' }">
                    <RouterLink :to="{ name: 'team_track_winners' }" active-class="active">
                        Победители и лауреаты
                    </RouterLink>
                    <div class="header-hover-menu">
                        <div class="hover-link">
                            <RouterLink :to="{ name: 'team_track_winners' }" active-class="active">
                                Победители командного трека
                            </RouterLink>
                        </div>
                        <div class="hover-link" v-for="section in personalSections" :key="section.id">
                            <RouterLink
                                :to="{ name: 'personal_awards', params: { sectionId: section.id} }"
                                active-class="active">
                                {{section.title}}
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="header-link">
                    <RouterLink :to="{ name: 'photo_gallery' }" active-class="active">
                        Фотогалерея
                    </RouterLink>
                </div>
                <div class="header-link">
                    <RouterLink :to="{ name: 'certificates' }" active-class="active">
                        Сертификаты
                    </RouterLink>
                </div>
            </div>
            <div class="header-mobile-menu" @click="statusMobileMenu = true">
                <img src="/img/menu_grey.svg" alt="menu" />
            </div>
            <div class="header-block-link-mobile" :class="{ active: statusMobileMenu == true }">
                <div class="header-logo mobile">
                    <div class="logo">
                        <RouterLink :to="{ name: 'main_page' }" active-class="active">
                            <img src="/img/logo.png" alt="logo" />
                        </RouterLink>
                    </div>
                    <!-- <div class="logo-text">
                        <RouterLink :to="{ name: 'main_page' }" active-class="active">
                            энергия<br>
                            признания
                        </RouterLink>
                    </div> -->
                </div>
                <div class="header-mobile-close" @click="statusMobileMenu = false">
                    <img src="/img/close_grey.svg" alt="close" />
                </div>
                <RouterLink :to="{ name: 'types_of_awards_page' }" active-class="active">
                    Виды наград
                </RouterLink>
                <RouterLink :to="{ name: 'team_track_winners' }" active-class="active">
                    Победители и лауреаты
                </RouterLink>
                <RouterLink class="sub_a" v-for="section in personalSections" :key="section.id"
                    @click="statusMobileMenu = false"
                    :to="{ name: 'personal_awards', params: { sectionId: section.id } }"
                    active-class="active">
                    {{section.title}}
                </RouterLink>
                <RouterLink :to="{ name: 'photo_gallery' }" active-class="active">
                    Фотогалерея
                </RouterLink>
                <RouterLink :to="{ name: 'certificates' }" active-class="active">
                    Сертификаты
                </RouterLink>
            </div>
            <div class="bg-header-mobile" @click="statusMobileMenu = false" :class="{ active: statusMobileMenu == true }">
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    position: fixed;
    width: 1326px;
    height: 100px;
    top: 30px;
    z-index: 5;
}
.header-back_block{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #F6F6F6;
    border-radius: 250px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 3;
}
.back_block{
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateY(-50%);
    background-color: #fff;
    z-index: 0;
}

.header-content {
    width: 970px;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    background-color: #F6F6F6;
    z-index: 5;
}

.header-logo {
    flex-direction: row;
}

.logo {
    width: 150px;
    height: 50px;
}

.logo a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-text {
    margin: 0 0 0 5px;
    line-height: 87.1%;
    color: var(--nipigasColorMain);
}

.header-block-link {
    flex-direction: row;
}

.header-link:first-child {
    margin: 0;
}



.header-link {
    margin: 0 0 0 72px;
    color: var(--nipigasColorMain);
    font-weight: 700;
    transition: all 0.25s ease;
    cursor: pointer;
}

.header-link.active.hover_link::before {
    border-top-color: var(--nipigasColorAdditional);
}

.header-link.hover_link::before {
    content: "";
    position: absolute;
    display: block;
    height: 0;
    width: 0;
    border: 6px solid transparent;
    border-top-color: var(--nipigasColor);
    bottom: -10px;
    left: calc(50% - 6px);
    transition: all 0.25s ease;
}

.header-link.hover_link::after {
    content: "";
    position: absolute;
    bottom: -10px;
    width: 100%;
    height: 10px;
}

.header-link.hover_link:hover::before {
    transform: translateY(-5px) rotateX(180deg);
}

.header-link.hover_link:hover .header-hover-menu {
    pointer-events: auto;
    opacity: 1;
}


.header-hover-menu {
    position: absolute;
    top: calc(100% + 10px);
    width: fit-content;
    height: fit-content;
    align-items: flex-start;
    padding: 22px 15px 17px 30px;
    background-color: rgba(246, 246, 246, 1);
    border: 1px solid rgba(0, 140, 149, 0.2);
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease;
}

.hover-link::before {
    content: "";
    position: absolute;
    left: -8px;
    display: block;
    height: 0;
    width: 0;
    border: 7px solid transparent;
    border-top-color: var(--nipigasColorAdditional);
    transform: rotate(-90deg);
    opacity: 0;
    transition: all 0.25s ease;
}

.hover-link {
    font-size: 14px;
    line-height: 150%;
    white-space: nowrap;
    margin: 0 0 5px 0;
    transition: all 0.25s ease;
    cursor: pointer;
}

.hover-link a {
    font-weight: 400;
}

.hover-link:hover::before {
    transform: translateX(-5px) rotate(-90deg);
    opacity: 1;
}






a:active {
    color: var(--nipigasColorAdditional);
}

a:visited {
    color: var(--nipigasColorMain);
}

.router-link-active:visited {
    color: var(--nipigasColorAdditional);
}

a {
    color: var(--nipigasColorMain);
    font-weight: 700;
}

.router-link {
    color: var(--nipigasColorMain);

}

a.active {
    color: var(--nipigasColorAdditional);
}

.router-link-active {
    color: var(--nipigasColorAdditional);
}

.hover-link a {
    text-decoration: underline;
}

.header-mobile-menu {
    display: none;
    width: 40px;
    height: 40px;
    cursor: pointer;
}

.header-mobile-close {
    position: fixed;
    top: 40px;
    right: 40px;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.header-block-link-mobile.active {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0%);
    transition: all 0.25s ease;
}

.header-block-link-mobile {
    position: fixed;
    top: 0;
    right: 0;
    padding: 50px 20px 0 20px;
    width: 320px;
    height: 100%;
    z-index: 3;
    background-color: var(--white);
    align-items: flex-start;
    opacity: 0;
    pointer-events: none;
    transform: translateX(100%);
    transition: all 0.25s ease;
}

.header-logo.mobile {
    position: fixed;
    top: 40px;
    left: 20px;
}

.header-block-link-mobile a {
    margin: 0 0 20px 0;

}

.bg-header-mobile.active {
    opacity: 1;
    pointer-events: auto;
}

.bg-header-mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(9, 89, 95, 0.84);
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease;
}


@media (max-width: 1440px) {
    .header {
        width: 90vw;
    }

    .header-content {
        width: 80vw;
    }

    .header-link:first-child {
        margin: 0;
    }

    .header-link {
        margin: 0 0 0 3.5vw;
    }
}

@media (max-width: 1024px) {
    .header {
        width: 100vw;
        top: 0;
        border-radius: 0;
        background-color: #F6F6F6;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .header-content {
        width: 90vw;
    }

    .header-block-link {
        display: none;
    }

    .header-mobile-menu {
        display: flex;
    }
    .header-back_block{display: none;}
    .back_block{display: none;}
}

@media (max-width: 980px) {}

@media (max-width: 768px) {}

@media (max-width: 640px) {}

@media (max-width: 480px) {}

@media (max-width: 420px) {}

@media (max-width: 380px) {}</style>