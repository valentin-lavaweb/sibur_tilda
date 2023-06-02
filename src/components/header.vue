<script>
import { useGameStore } from '@/stores/interface-interaction.js';

export default {
  name: "header_comp",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
    }
  },
  components:{

  },
  methods(){

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
  <div class="header">
    <div class="header-content">
        <div class="header-logo">
            <div class="logo">
                <RouterLink :to="{name: 'main_page'}" active-class="active">
                    <img src="/img/logo.svg" alt="logo"/>
                </RouterLink>
            </div>
            <div class="logo-text">
                <RouterLink :to="{name: 'main_page'}" active-class="active">
                    энергия<br>
                    признания
                </RouterLink>
            </div>
        </div>
        <div class="header-block-link">
            <div class="header-link">
                <RouterLink :to="{name: 'types_of_awards_page'}" active-class="active">
                    Виды наград
                </RouterLink>
            </div>
            <div class="header-link hover_link">
                <RouterLink :to="{name: 'team_track_winners'}" active-class="active">
                    Победители и лауреаты
                </RouterLink>
                <div class="header-hover-menu">
                    <div class="hover-link">
                        <RouterLink :to="{name: 'corporate_winners'}" active-class="active">
                            Победители командного трека
                        </RouterLink>
                    </div>
                    <div class="hover-link">
                        <RouterLink :to="{name: 'corporate_rewards'}" active-class="active">
                            Лауреаты ведомственных наград
                        </RouterLink>
                    </div>
                    <div class="hover-link">
                        <RouterLink :to="{name: 'corporate_trainer'}" active-class="active">
                            Лучшие корпоративные тренеры
                        </RouterLink>
                    </div>
                    <div class="hover-link">
                        <RouterLink :to="{name: 'corporate_mentor'}" active-class="active">
                            Лучшие производственные наставники
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div class="header-link">
                <RouterLink :to="{name: 'photo_gallery'}" active-class="active">
                    Фотогаллерея
                </RouterLink>
            </div>
            <div class="header-link">
                <RouterLink :to="{name: 'certificates'}" active-class="active">
                    Сертификаты
                </RouterLink>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.header{
    position: fixed;
    width: 1326px;
    height: 100px;
    background-color: #F6F6F6;
    border-radius: 250px;
    top: 30px;
    z-index: 5 ;
}
.header-content{
    width: 970px;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
}
.header-logo{
    flex-direction: row;
}
.logo{
    width: 50px;
    height: 50px;
}
.logo a{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.logo-text{
    margin: 0 0 0 5px;
    line-height: 87.1%;
    color: var(--nipigasColorMain);
}

.header-block-link{
    flex-direction: row;
}   
.header-link:first-child{
    margin: 0;
}



.header-link{
    margin: 0 0 0 72px;
    color: var(--nipigasColorMain);
    font-weight: 700;
    transition: all 0.25s ease;
    cursor: pointer;
}
.header-link.hover_link::before{
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
.header-link.hover_link:hover .header-hover-menu{
    pointer-events: auto;
    opacity: 1;
}


.header-hover-menu{
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
.hover-link::before{
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
.hover-link{
    font-size: 14px;
    line-height: 150%;
    white-space: nowrap;
    margin: 0 0 5px 0;
    transition: all 0.25s ease;
    cursor: pointer;
}
.hover-link a{
    font-weight: 400;
}
.hover-link:hover::before{
    left: -12px;
    opacity: 1;
}






a:active{
    color: var(--nipigasColorAdditional);
}

a:visited{
    color: var(--nipigasColorMain);
}
.router-link-active:visited{
    color: var(--nipigasColorAdditional);
}

a{
    color: var(--nipigasColorMain);
    font-weight: 700;
}
.router-link{
    color: var(--nipigasColorMain);
    
}

.router-link-active{
    color: var(--nipigasColorAdditional);
}
.hover-link a{
    text-decoration: underline;
}






</style>