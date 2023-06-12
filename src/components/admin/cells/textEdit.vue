<script>

export default {
  name: "text_edit",
  emits:['updateItem'],
  props:{
    item: Object,
    editProp: String,
  },
  data() {
    return{
      isEdit: false,
      editItem: null,

    }
  },
  components:{
  },
  created(){
    this.editItem = this.item;
  },
  methods:{
    startEdit(){
      this.isEdit = true;
    },
    endEdit(){
      if(!this.isEdit) return;
      this.isEdit = false;
      this.$emit('updateItem', this.editItem);
    },

  },
  computed:{}
};
</script>




<template >
    <textarea v-model="editItem[editProp]"  @dblclick="startEdit" @change="endEdit" :class="{edit: isEdit}" :readonly="!isEdit" resize="none"
 ></textarea>
  </template>