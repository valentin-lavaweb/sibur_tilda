<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";
import nomination_item from "@/components/nomination_item.vue";



export default {
  name: "team_track_winners",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
    }
  },
  components:{
    header_comp,
    footer_comp,
    nomination_item,
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
    <div class="wrapper-block">
      <h1 class="title">
        Лауреаты ведомственных наград
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
      <div class="nomination-container">
        <nomination_item v-for="item in interaction.nominationArray"
          :key="item.id"
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
  background-image: url(/img/background_page/team_track_winners.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.wrapper-block{
   width: 1160px;
   height: fit-content;
   margin: 130px 0 0 0;
}

.title{
  font-size: 48px;
  color: var(--nipigasColorAdditional);
  margin: 75px 0 0 0;
}

.years-container{
  margin: 20px 0 0 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
}
.year:first-child{
  margin: 0;
}
.year.active{
  background-color: var(--nipigasColorAdditional);
  color: var(--white);
}
.year{
  margin: 0 0 0 50px;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: rgba(246, 246, 246, 1);
  color: var(--nipigasColorMain);
  font-size: 16px;
  transition: all 0.25s ease;
  cursor: pointer;
}
.year:hover{
  background-color: var(--nipigasColorAdditional);
  color: var(--white);
}






.nomination-container{
  margin: 40px 0 300px 0;
  width: 1120px;
  height: fit-content;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}














</style>