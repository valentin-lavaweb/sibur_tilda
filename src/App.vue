

<script>
import main_page from "@/components/screen/main_page.vue";
import photo_gallery from "@/components/screen/photo_gallery.vue";
import types_of_awards_page from "@/components/screen/types_of_awards_page.vue";
import team_track_winners from "@/components/screen/team_track_winners.vue";


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
  },
  computed:{
    
  }

};
</script>
<template>
  <team_track_winners/>
</template>

<style scoped></style>
