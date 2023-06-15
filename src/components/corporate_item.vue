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
    imagePath(){
        if(this.item.image){
            try{
                let url = new URL(this.item.image);
                return url;
            }catch{
                let url = new URL('files/' + this.item.image, import.meta.env.VITE_VUE_APP_API_URL);
                return url;
            }
        }else{
            if(this.item.gender){
                return new URL('storage/default_men.svg', import.meta.env.VITE_VUE_APP_API_URL);
            }else{
                return new URL('storage/default_women.svg', import.meta.env.VITE_VUE_APP_API_URL);
            }
            
        }
        
    }
  },
  watch:{

  },
};
</script>


<template>
    <div class="corporate-item">
        <div class="corporate-item_img">
            <img :src="imagePath" :alt="item.name"/>
        </div>
        <div class="corporate-item_name">
            {{ item.name }}
        </div>
        <div class="corporate-item_post tempelBlock">
            {{ item.position }}
        </div>
        <div class="corporate-item_filter tempelBlock">
            {{ item.company }}
        </div>
        <div class="corporate-item_reward tempelBlock" v-if="item.issued">
            <span class="imgBlock"> 
                <img src="/img/degree_left.svg" alt="cup">
            </span>
            {{ item.award }}
            <span class="imgBlock"> 
                <img src="/img/degree_right.svg" alt="cup">
            </span>
        </div>
        <div class="corporate-item_date tempelBlock" v-if="item.grade">
            <span class="degreeBlock">
                {{ item.grade }}
            </span>
        </div>
        <div class="corporate-item_date tempelBlock" v-if="item.issued">
            <span>Награда выдана: </span>{{ item.issued }}
        </div>
        <div class="corporate-item_date tempelBlock">
            {{ item.award }}
        </div>
    </div>
</template>

<style scoped>
.corporate-item{
  width: calc(25% - 20px);
  height: fit-content;
  min-height: 240px;
  color: var(--textColorBlack);
  padding: 5px 5px 30px 5px;
  margin: 0 20px 0 0;
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
    font-weight: 700;
    margin: 0 0 5px 0;
    text-align: center;
}

.tempelBlock{
    width: 90%;
    font-size: 14px;
    display: block;
    text-align: center;
    line-height: normal;
}
.corporate-item_filter{
    font-weight: 600;
}
.corporate-item_post.tempelBlock{
    width: 100%;
    text-transform: uppercase;
    font-size: 12px;
    text-align: center;
    justify-content: center;
    display: flex;
}
.corporate-item_filter.tempelBlock{
    width: 100%;
    text-align: center;
    justify-content: center;
    display: flex;
    margin: 0 0 10px 0;
}
.corporate-item_post span{
    font-weight: 600;
}
.corporate-item_reward.imgBlock{
    display: flex;
}
.imgBlock img{
    display: flex;
    width: 24px;
    height: 24px;
    /* transform: translateY(2px); */
    margin: 0 5px;
}
.corporate-item_reward.tempelBlock{
    display: flex;
    flex-direction: row;
}
.corporate-item_reward{
    margin: 0 0 10px 0;
    color: var(--nipigasColorAdditional);
    font-weight: 700;
}
.corporate-item_reward span{
    font-weight: 600;
    color: var(--nipigasColorMain);
}
.corporate-item_date span{
    font-weight: 600;
    color: var(--nipigasColorMain);
}

.corporate-item_date.tempelBlock{
    display: flex;
}
.degreeBlock{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    background: url(/img/degree.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 5px 0 0px 0;
}
.corporate-item_date span.degreeBlock{
    color: var(--nipigasColorAdditional);
    font-size: 16px;
    font-weight: 800;
}

@media (max-width: 1440px) {
    .corporate-item{
        min-width: 270px;
    }
}
@media (max-width: 725px) {
    .corporate-item{
        width: 100%;
    }
    .tempelBlock{
        text-align: center;
    }
}
</style>