<script>
import { useGameStore } from '@/stores/interface-interaction.js';

export default {
  props:{
    item: Object,
  },
  name: "corporate_item",
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
    <div class="corporate-item">
        <div class="corporate-item_img">
            <img :src="item.src" alt="item.src"/>
        </div>
        <div class="corporate-item_name">
            {{ item.name }}
        </div>
        <div class="corporate-item_post tempelBlock">
            <span>Должность: </span>{{ item.post }}
        </div>
        <div class="corporate-item_filter tempelBlock">
            {{ item.filter }}
        </div>
        <div class="corporate-item_reward tempelBlock">
            <span>Награда: </span>{{ item.reward }}
        </div>
        <div class="corporate-item_date tempelBlock">
            <span>Выдана: </span>{{ item.date }}
        </div>
    </div>
</template>

<style scoped>
.corporate-item{
  width: calc(20% - 30px);
  height: fit-content;
  min-height: 240px;
  color: var(--textColorBlack);
  padding: 5px 5px 30px 5px;
  margin: 0 30px 0 0;
  justify-content: flex-start;
}
.corporate-item_img img{
    width: 160px;
    height: 160px;
    min-width: 160px;
    min-height: 160px;
}
.corporate-item_name{
    width: 100%;
    color: var(--nipigasColorMain);
    font-size: 16px;
    margin: 0 0 10px 0;
}

.tempelBlock{
    width: 100%;
    display: block;
}
.corporate-item_post span{

}
.corporate-item_reward span{
    color: var(--nipigasColorMain);
}
.corporate-item_date span{
    color: var(--nipigasColorMain);
}
</style>