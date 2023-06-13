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
      isEdit: true,

    }
  },
  components:{
  },
  methods:{
    endEdit(event){
      // if(!this.isEdit) return;
      let text = event.target.value;
      let newItem = {...this.item};
      newItem[this.editProp] = text;
      this.$emit('updateItem', newItem);
      // this.isEdit = false;
    },

  },
  computed:{}
};
</script>




<template >
    <textarea :value="item[editProp]"  @change="endEdit" :class="{edit: isEdit}" :readonly="!isEdit" resize="none"
 ></textarea>
  </template>