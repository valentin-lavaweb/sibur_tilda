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
        // return import.meta.env.VITE_VUE_APP_API_URL + '/' + this.item.image;
        return this.item.image;
    }
  },
  watch:{

  },
};
</script>


'id'    =>      $this->id,
            'name' =>       $this->name,
            'position' =>   $this->position,
            'division' =>   $this->division,
            'company' =>    $this->company,
            'award' =>      $this->award,
            'grade' =>      $this->grade,
            'issued' =>     $this->issued,
            'year' =>       $this->year,
            'image' =>      $this->image,
            'section' =>    new PersonalAwardSectionResource($this->section),



<template>
    <div class="corporate-item">
        <div class="corporate-item_img">
            <img :src="imagePath" :alt="item.name"/>
        </div>
        <div class="corporate-item_name">
            {{ item.name }}
        </div>
        <div class="corporate-item_post tempelBlock">
            <span>Должность: </span>{{ item.position }}
        </div>
        <div class="corporate-item_filter tempelBlock">
            {{ item.company }}
        </div>
        <div class="corporate-item_reward tempelBlock">
            <span>Награда: </span>{{ item.award }}
        </div>
        <div class="corporate-item_date tempelBlock" v-if="item.issued">
            <span>Выдана: </span>{{ item.issued }}
        </div>
    </div>
</template>

<style scoped>
.corporate-item{
  width: calc(20% - 20px);
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
    margin: 0 0 10px 0;
}

.tempelBlock{
    width: 100%;
    display: block;
}
.corporate-item_filter{
    font-weight: 600;
}
.corporate-item_post span{
    font-weight: 600;
}
.corporate-item_reward span{
    font-weight: 600;
    color: var(--nipigasColorMain);
}
.corporate-item_date span{
    font-weight: 600;
    color: var(--nipigasColorMain);
}

@media (max-width: 1440px) {
    .corporate-item{
        min-width: 212px;
    }
}
@media (max-width: 580px) {
    .corporate-item{
        width: 100%;
    }
    .tempelBlock{
        text-align: center;
    }
}
</style>