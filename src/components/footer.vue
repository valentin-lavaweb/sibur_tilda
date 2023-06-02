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
  <div class="footer">
    <div class="footer-content">
        <div class="footer-logo">
            <img src="/img/sibur_white.svg" alt="sibur_white"/>
        </div>
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
                    Фотогаллерея
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
                <RouterLink :to="{name: 'corporate_winners'}" active-class="active">
                    Победители командного трека
                </RouterLink>                
            </div>
            <div class="link underline">
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
    width: 820px;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
}


.footer-logo{
    width: 260px;
    height: 48px;
    align-items: flex-start;
}
.footer-logo::after{
    content: "Сделаем успех видимым для каждого!";
    font-size: 14px;
    margin: 10px 0 0 0;
    font-weight: 600;
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
.link.underline{
    text-decoration: underline;
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



</style>