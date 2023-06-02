

<script>
import main_page from "@/components/screen/main_page.vue";
import photo_gallery from "@/components/screen/photo_gallery.vue";
import types_of_awards_page from "@/components/screen/types_of_awards_page.vue";
import team_track_winners from "@/components/screen/team_track_winners.vue";
import certificates from "@/components/screen/certificates.vue";
import corporate from "@/components/screen/corporate.vue";


export default {
  name: "App",
  data() {
    return {

    };
  },
  components: {
    main_page,
    photo_gallery,
    types_of_awards_page,
    team_track_winners,
    certificates,
    corporate,
  },
  computed:{
    
  }

};
</script>
<template>
    <router-view  v-slot="{ Component }">
      <transition name="openPage" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
</template>

<style scoped></style>
