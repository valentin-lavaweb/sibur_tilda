<script>

export default {
  name: "section_selector",
  props:{
    personalSections: Array,
    item: Object
  },
  data() {
    return{

    }
  },
  components:{
  },

  computed:{
    imagePath(){
      return function(item){
        if (item.image) {
            return new URL('storage/' + item.image, import.meta.env.VITE_VUE_APP_API_URL);
          } else {
            if (item.gender) {
              return new URL('storage/default_men.svg', import.meta.env.VITE_VUE_APP_API_URL);
            } else {
              return new URL('storage/default_women.svg', import.meta.env.VITE_VUE_APP_API_URL);
            }
          }
      }
    }
    
  },
  watch:{
    serverOptions(){
        this.loadData();
    }
  },
};
</script>




<template >
    <select v-model="item.personal_award_section_id">
      <option
          v-for="section in personalSections"
          :key="section.id"
          :value="section.id"
          >
          {{section.title}}
      </option>
    </select>
  </template>