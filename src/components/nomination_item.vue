<script>
import { useGameStore } from '@/stores/interface-interaction.js';

export default {
  props:{
    item: Object,
  },
  name: "nomination_item",
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
    <div class="nomination-item">
        <h3 class="subTitle">
            {{ item.title }}
        </h3>
        <span class="text">
            {{ item.subTitle }}
        </span>
        <span class="autorText">
            <span class="autorBlock">
                Авторы:
            </span>
            {{ item.autors }}
        </span>  
    </div>
</template>

<style scoped>
.nomination-item{
  width: 545px;
  height: fit-content;
  min-height: 240px;
  background-color: rgba(246, 246, 246, 1);
  border: 1px solid rgba(0, 140, 149, 0.2);
  border-radius: 10px;
  padding: 25px 15px;
  margin: 0 0 30px 0;
  justify-content: flex-start;
}
.subTitle{
  width: 100%;
  align-items: flex-start;
  font-size: 20px;
  color: var(--nipigasColorMain);
  margin: 0 0 25px 0;
}
.text{
  width: 100%;
  align-items: flex-start;
  font-size: 18px;
  color: var(--nipigasColorMain);
  margin: 0 0 20px 0;
}
.autorText{
  width: 100%;
  height: fit-content;
  font-size: 16px;
  color: var(--textColorBlack);
}
.autorBlock{
  font-size: 16px;
  color: var(--nipigasColorAdditional);
}
</style>