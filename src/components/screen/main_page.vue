<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

export default {
  name: "main_page",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
    }
  },
  components:{
    header_comp,
    footer_comp,
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
  <div class="wrapper">
    <header_comp/>
    <div class="wrapper-block">
      <div class="content-block">
        <h2 class="subTitle">
          НАГРАДНАЯ КАМПАНИЯ
        </h2>
        <h1 class="title">
          ЭНЕРГИЯ <br> 
          ПРИЗНАНИЯ
        </h1>
        <span class="text">  
          — это возможность поощрить лучших профессионалов компании <br>
          и вдохновить остальных! СИБУР ежегодно подчеркивает вклад <br>
          сотрудников в развитие холдинга: как благодарственными грамотами, <br>
          так и материальным вознаграждением.
        </span>
        <span class="pinata">
          Сделаем успех видимым для каждого!
        </span>
      </div>
      <div class="img-block">
        <img src="/img/the_energy_of_recognition.svg" alt="the_energy_of_recognition"/>
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
   margin: 130px 0 300px 0;
}


.content-block{
  margin: 250px 0 0 0;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 2;
}
.subTitle{
  font-size: 36px;
  color: var(--nipigasColorMain);
}
.title{
  font-size: 96px;
  color: var(--nipigasColorAdditional);
  line-height: 100%;
}
.text{
  font-size: 16px;
  color: var(--textColorBlack);
  margin: 14px 0;
}
.pinata{
  font-size: 16px;
  color: var(--nipigasColorAdditional);
}


.img-block{
  position: absolute;
  top: 0;
  right: 0;
  margin: 50px 0 0 0;
  transform: translateX(120px);
  z-index: 1;
}
</style>