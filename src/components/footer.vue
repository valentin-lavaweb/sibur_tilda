<script>
import { useGameStore } from '@/stores/interface-interaction.js';

export default {
  name: "footer_comp",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
    }
  },
  computed:{
    personalSections(){
        return this.interaction.personalSections;
    }
  },

};
</script>


<template>
  <div class="footer">
    <div class="footer-content">
        <div class="footer-logo_block">
            <div class="footer-logo">
                <img src="/img/sibur_white_description.svg" alt="sibur"/>
            </div>
            <!-- <span>
                Сделаем успех видимым для каждого!
            </span> -->
        </div>
        <div class="link-container">
            <div class="footer-block-link">
                <div class="link">
                    <RouterLink :to="{name: 'main_page'}" active-class="active">
                        Главная
                    </RouterLink>
                </div>
                <div class="link">
                    <RouterLink :to="{name: 'types_of_awards_page'}" active-class="active">
                        Виды наград
                    </RouterLink>                
                </div>
                <div class="link">
                    <RouterLink :to="{name: 'photo_gallery'}" active-class="active">
                        Фотогалерея
                    </RouterLink>                
                </div>
                <div class="link">
                    <RouterLink :to="{name: 'certificates'}" active-class="active">
                        Сертификаты
                    </RouterLink>                
                </div>
            </div>
            <div class="footer-block-link">
                <div class="link underline">
                    <RouterLink :to="{ name: 'team_track_winners' }" active-class="active">
                            Победители командного трека
                    </RouterLink>
                </div>
                <div class="link underline"
                v-for="section in personalSections"
                :key="section.id"
                >
                    <RouterLink :to="{name: 'personal_awards', params:{sectionId: section.id}}" active-class="active">
                        {{section.title}}
                    </RouterLink>                
                </div>
                <!-- <div class="link underline">
                    <RouterLink :to="{name: 'corporate_rewards'}" active-class="active">
                        Лауреаты ведомственных наград
                    </RouterLink>                
                </div>
                <div class="link underline">
                    <RouterLink :to="{name: 'corporate_trainer'}" active-class="active">
                        Лучшие корпоративные тренеры
                    </RouterLink>                
                </div>
                <div class="link underline">
                    <RouterLink :to="{name: 'corporate_mentor'}" active-class="active">
                        Лучшие производственные наставники
                    </RouterLink>                
                </div> -->
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.footer{
    width: 100%;
    height: 200px;
    background-color: var(--nipigasColorMain);
    z-index: 4 ;
}
.footer-content{
    width: 1160px;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
}


.footer-logo_block{
    align-items: flex-start;
}
.footer-logo{
    width: 200px;
    height: 48px;
    align-items: flex-start;
}
/* .footer-logo_block span{
    content: "Сделаем успех видимым для каждого!";
    font-size: 14px;
    margin: 10px 0 0 0;
    font-weight: 600;
} */
.link-container{
    flex-direction: row;
    margin: 0 100px 0 0;
}
.link-container .footer-block-link:first-child{
    margin: 0 114px 0 0;
}

.footer-block-link{
    align-items: flex-start;
}
.link{
    font-weight: 400;
    font-size: 14px;
}
.link a{
    font-weight: 400;
}
.link.underline a{
    /* text-decoration: underline; */
    font-weight: 500;
}





a:active{
    color: var(--white);
}

a:visited{
    color: var(--white);
}
.router-link-active:visited{
    color: var(--white);
}

a{
    color: var(--white);
    font-weight: 700;
}
.router-link{
    color: var(--white);
    
}

.router-link-active{
    color: var(--white);
}
.hover-link a{
    text-decoration: underline;
}

@media (max-width: 1440px) {
    .footer-content{
        width: 90vw;
        flex-wrap: wrap;
    }
}

@media (max-width: 1024px) {
    .footer-content{
        width: 90vw;
        flex-wrap: wrap;
    }
}
@media (max-width: 980px) {

    .link-container{
        flex-direction: row;
        margin: 0 0 0 0;
    }
    .link-container .footer-block-link:first-child{
        margin: 0 50px 0 0;
    }
}
@media (max-width: 730px) {
    .footer{
        height: 340px;
        padding: 20px 0;
    }
    .footer-content{
        justify-content: center;
        flex-wrap: wrap;
    }
    .footer-block-link{
        width: 100%;
        align-items: center;
    }
    .footer-logo_block{
        align-items: center;
    }

    .link-container{
        flex-direction: column;
        margin: 0 0 0 0;
        display: none;
    }
    .footer{
        height: 120px;
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