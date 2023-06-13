<script>

export default {
  name: "checkbox_edit",
  emits:['updateValue'],
  props:{
    // value: Boolean,
    item: Object,
    editProp: String,
  },
  data() {
    return{
    }
  },
  components:{
  },
  methods:{
    // endEdit(event){
    //   let val = event.target.checked;
    //   this.$emit('updateValue', val);
    // },

    endEdit(event){
      // if(!this.isEdit) return;
      let val = event.target.checked;
      this.$emit('updateValue', val);
      let newItem = {...this.item};
      newItem[this.editProp] = val;
      this.$emit('updateItem', newItem);
      // this.isEdit = false;
    },

  },
  watch:{
  },
  computed:{
    compValue(){
      return this.item.gender;
    }
  }
};
</script>




<template >
    <input ref="box" type="checkbox" v-model="compValue" @change="endEdit"/>
  </template>