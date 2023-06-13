<script>
import TextEdit from '../cells/textEdit.vue';

export default {
  name: "personal_awards_edit",
  emits:['done', 'cancel'],
  props:{
    item: Object,
    availableSections: Array
  },
  data() {
    return{
      editItem: this.item,

    }
  },
  components:{
    TextEdit
  },
  methods:{
    endEdit(event){
      this.$emit('done', this.editItem);
    },
    async updateImage(event) {

        let files = event.target.files || event.dataTransfer.files;
        if (!files.length){
            this.editItem.image = null;
        }else{
            this.editItem.image = files[0];
        }
    }

  },
  computed:{
    imagePath(){
        if(typeof this.editItem.image === 'string'){
            return new URL('storage/' + this.editItem.image, import.meta.env.VITE_VUE_APP_API_URL);
        }else if(this.editItem.image === null){
            if (this.editItem.gender) {
                return new URL('storage/default_men.svg', import.meta.env.VITE_VUE_APP_API_URL);
            } else {
                return new URL('storage/default_women.svg', import.meta.env.VITE_VUE_APP_API_URL);
            }
        }
        else{
            return URL.createObjectURL(this.editItem.image);
        }
    }

  }
};
</script>




<template >
    <div class="container">

        <div>ID: {{ editItem.id ?? '---' }}</div>


        <TextEdit :item="editItem" editProp="name" @updateItem="editItem = $event" />

        <TextEdit :item="editItem" editProp="position" @updateItem="editItem = $event" />

        <TextEdit :item="editItem" editProp="company" @updateItem="editItem = $event"/>

        <TextEdit :item="editItem" editProp="award" @updateItem="editItem = $event" />

        <select v-model="editItem.grade">
          <option :value="null">
            Не указано
          </option>
          <option :value="1">
            1
          </option>
          <option :value="2">
            2
          </option>
          <option :value="3">
            3
          </option>
        </select>

        <TextEdit :item="editItem" editProp="issued" @updateItem="editItem = $event" />

        <input type="checkbox" v-model="editItem.gender" />

        <img :src="imagePath" :alt="editItem.name">
        <input type="file" accept="image/*" multiple="false" @change="updateImage($event)">

        <TextEdit :item="editItem" editProp="year" @updateItem="editItem = $event" />

        <select v-model="editItem.personal_award_section_id">
          <option v-for="section in availableSections" :key="section.id" :value="section.id">
            {{ section.title }}
          </option>
        </select>


        <button @click="$emit('cancel')">Отменить</button>
        <button @click="endEdit">Завершить</button>
    </div>
  </template>


<style scoped>
.container{
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 50;
}

img {
    width: 100px;
    height: 100px;
}
</style>