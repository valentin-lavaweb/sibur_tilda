<script>
import { useGameStore } from '@/stores/interface-interaction.js';

export default {
  name: "footer",
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
                Главная
            </div>
            <div class="link">
                Виды наград
            </div>
            <div class="link">
                Фотогаллерея
            </div>
            <div class="link">
                Сертификаты
            </div>
        </div>
        <div class="footer-block-link">
            <div class="link underline">
                Победители командного трека
            </div>
            <div class="link underline">
                Лауреаты ведомственных наград
            </div>
            <div class="link underline">
                Лучшие корпоративные тренеры
            </div>
            <div class="link underline">
                Лучшие производственные наставники
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
}

.footer-block-link{
    align-items: flex-start;
}
.link{
    font-size: 14px;
}
.link.underline{
    text-decoration: underline;
}
</style>