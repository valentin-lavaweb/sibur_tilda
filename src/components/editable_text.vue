<script>
import { useGameStore } from '@/stores/interface-interaction.js';


export default {
  props:{
    dictionary_key: String,
  },
  name: "editable_text",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
        editableText: interaction.dictionary[this.dictionary_key],
        isEdit: false,
        editLeft: 0,
        editTop: 0,
    }
  },
  components:{

  },
  methods:{
    restoreText(){
      this.editableText = this.interaction.dictionary[this.dictionary_key];
    },
    async updateText(){

      if(this.interaction.dictionary[this.dictionary_key] == this.editableText) return true;
      
      try {

        let res = await this.interaction.api.updateText(this.dictionary_key, this.editableText);
        let newItem = res.data.data;

        this.interaction.dictionary[this.dictionary_key] = newItem.text;

        this.$toast.success("Текст обновлен");

        return newItem;

      } catch (e) {
        setTimeout(() => {
          this.restoreText();
        }, 500);
        this.$toast.error(e.message);
        return false;
      } 
      
    },
    async save(){

        let saved = await this.updateText();
        this.isEdit = !saved;
      
    },
    startEdit(){
        let buttonRect = this.$refs.button.getBoundingClientRect();
        this.editLeft = buttonRect.left;
        this.editTop = buttonRect.top;
        this.isEdit = true;
    }


  },
  mounted() {

  },
  computed:{
    isAdmin(){
        return this.interaction.isAdmin;
    },
  },
  watch:{

  },
};
</script>


<template>
    <div class="editor" v-if="isAdmin">
        <button title="Редактировать"  @click="startEdit()" :class="{edit: isEdit}" ref="button" v-if="!isEdit"> 
          <img src="/src/assets/icons/edit.png" alt="Редактировать" class="edit"/>
        </button>
    </div>

    <Teleport to="body">
      <div class="edit-wrapper"  :style="{left: editLeft + 'px', top: editTop + 'px'}"  v-if="isEdit">
        <button title="Сохранить"  @click="save()"> 
          <img src="/src/assets/icons/save.png" alt="Сохранить" class="save"/>
        </button>
        <textarea v-model="editableText" >
        </textarea>
      </div>
      
    </Teleport>
        
    
    {{editableText}}
</template>

<style scoped>
.editor{
    position: absolute;
    right: -3vh;
    top: 0%;
    width: auto;
    height: auto;
    z-index: 500;
}

.edit-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    width: auto;
    height: auto;
    z-index: 500;
}


button {
  width: 3vh;
}

textarea {
  position: absolute;
  left: 100%;
  top: 0;
  display: flex;
  height: fit-content;
  padding: 5px;
  color: var(--textColorBlack);
  resize: both;
  background-color: white;

}
</style>