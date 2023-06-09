<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

import login_comp from "@/components/admin/login.vue";

export default {
  name: "admin_page",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
    }
  },
  components:{
    header_comp,
    footer_comp,
    login_comp,
  },
  methods: {

  },
  mounted() {

  },
  computed:{
    
  },
  watch:{

  },
};
</script>


<template>
  <div class="wrapper">
    <Teleport to="body">
        <login_comp/>
    </Teleport>
    <header_comp/>
    <div class="wrapper-block">
      <div class="content-block">

      </div>
    </div>
    <footer_comp/>
  </div>
</template>

<style scoped>

.wrapper{
  width: 100%;
  height: 100%;
}
.wrapper-block{
   width: 1160px;
   height: fit-content;
   margin: 130px 0 300px 0;
}


.content-block{
  margin: 250px 0 0 0;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 2;
}






@media (max-width: 1440px) {
}
@media (max-width: 1024px) {

}
@media (max-width: 980px) {

}
@media (max-width: 768px) {

}
@media (max-width: 640px) {

}
@media (max-width: 480px) {

}
@media (max-width: 420px) {

}
@media (max-width: 380px) {

}
</style>