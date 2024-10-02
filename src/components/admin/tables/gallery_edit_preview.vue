<script>
import TextEdit from '../cells/textEdit.vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
  name: "gallery_edit",
  emits:['done'],
  props: ['src'],
  components:{
    Cropper
  },
  methods:{
    async done(){
      /**
       * @type {{canvas: HTMLCanvasElement}}
       */
      const { canvas } = this.$refs.previewCropper.getResult();
      
			if (canvas) {
				const blob = await new Promise(resolve => canvas.toBlob(resolve));
        this.$emit('done', blob);
			}else{
        this.$emit('done', null);
      }
    }
  }
};
</script>




<template>
  <div class="container">

    <div class="content">
      <cropper class="cropper" ref="previewCropper" :stencil-props="{ aspectRatio: 1.4 / 1 }" :canvas="{
        minHeight: 0,
        minWidth: 0,
        maxHeight: 300,
        maxWidth: 400,
      }" :src="src" />

      <div class="filler"></div>

      <button @click="done()">
        Готово
      </button>
    </div>
  </div>

</template>


<style scoped>

.cropper{
  height: 90%;
  width: 90%;
}

.filler{
  height: auto;
}

.container{
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 50;
    backdrop-filter: blur(10px);
    transition: all 0.25s ease;
}
.content{
  width: 90vw;
  height: 90vh;
  max-width: 1000px;
  max-height: 810px;
  padding: 10px 10px 10px 0;
  background-color: var(--white);
  justify-content: flex-start;
  border-radius: 20px;

  border: 1px solid rgba(0, 255, 242, 0.25);
  border-radius: 20px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

  backdrop-filter: blur(15px);

  transition: all 0.25s ease;
}


button{
  margin-top: 20px;
  border: none;
  width: 250px;
	height: 50px;
  border-radius: 50px;
  cursor: pointer;
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s ease;
  background: #1eff4570;
}

button:hover {
	background: #1eff45;
	box-shadow: 0 0 2px #1eff45, 0 0 2px #1eff45, 0 0 5px #1eff45,
		0 0 10px #1eff45;
}


</style>