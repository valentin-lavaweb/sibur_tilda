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
    }
  },
  components:{

  },
  methods(){

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
        <textarea :value="editableText"  :class="{edit: isEdit}" resize="none">
        </textarea>
    </div>
    {{editableText}}
</template>

<style scoped>
.editor{
    width: 20px;
    height: 20px;
}
</style>