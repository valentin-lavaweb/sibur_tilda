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
  <select v-model="item.section_id">
    <option
        v-for="section in personalSections"
        :key="section.id"
        :value="section.id"
        >
        {{section.title}}
    </option>
  </select>
</template>
<style scoped>
select{
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: var(--white);
    font-size: 16px;
    font-weight: 500;
    color: var(--filterColor);
    border: 1px solid var(--filterColor);
    padding: 0 10px 0 5px;
}
option{
    padding: 5px;
    cursor: pointer;
}
</style>