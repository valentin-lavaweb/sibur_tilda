

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
      <transition name="openPage" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
</template>

<style>
.openPage-enter-active {
  opacity: 1;
  transition: all 0.25s ease;
}
.openPage-enter-active .header{
  transform: translateY(0px);
  opacity: 1;
  transition: all 0.25s ease;
}



.openPage-leave-active .header, .openPage-enter-from .header, .openPage-leave-to .header {
  transform: translateY(-100%) scale(0.9);
  opacity: 0;
  transition: all 0.25s ease;
}


.openPage-leave-active, .openPage-enter-from, .openPage-leave-to {
  opacity: 0;
  transition: all 0.25s ease;
}



.nominationFade-enter-active {
  transform: scale(1.0);
  opacity: 1;
  transition: all 0.25s ease;
}
.nominationFade-leave-active, .nominationFade-enter-from, .nominationFade-leave-to {
  transform: scale(0.5);
  opacity: 0;
  transition: all 0.25s ease;
}

.win_Tracker-enter-active {
  transform: scale(1.0);
  opacity: 1;
  transition: all 0.25s ease;
}
.win_Tracker-leave-active{
  position: absolute;
  transform: scale(0.5);
  opacity: 0;
  transition: all 0.0s ease;
} 
.win_Tracker-enter-from{
  transform: scale(0.5);
  opacity: 0;
  transition: all 0.25s ease;
} 
.win_Tracker-leave-to {
  transform: scale(0.5);
  opacity: 0;
  transition: all 0.25s ease;
}





.openPopup-enter-active {
  transform: scale(1.0);
  opacity: 1;
  transition: all 0.25s ease;
}
.openPopup-leave-active, .openPopup-enter-from, .openPopup-leave-to {
  transform: scale(0.5);
  opacity: 0;
  transition: all 0.25s ease;
}

.wrapper{
  overflow: hidden;
}

</style>
