<script>
import { useGameStore } from '@/stores/interface-interaction.js';

export default {
  props: {
    dictionary_key: String,
  },
  name: "editable_text",
  data() {
    let interaction = useGameStore();
    return {
      interaction: interaction,
      editableText: interaction.dictionary[this.dictionary_key],
      isEdit: false,
      editLeft: 0,
      editTop: 0,
      id: Symbol("editable_popup_id")
    }
  },
  components: {

  },
  methods: {
    restoreText() {
      this.editableText = this.interaction.dictionary[this.dictionary_key];
    },
    async updateText() {

      if (this.interaction.dictionary[this.dictionary_key] == this.editableText) return true;

      try {

        let res = await this.interaction.api.updateText(this.dictionary_key, this.editableText);
        let newItem = res.data.data;

        this.interaction.dictionary[this.dictionary_key] = newItem.text;

        this.$toast.success("Текст обновлен");

        return newItem;

      } catch (e) {
        // setTimeout(() => {
        //   this.restoreText();
        // }, 500);
        this.$toast.error(e.message);
        return false;
      }

    },
    async save() {

      let saved = await this.updateText();
      this.isEdit = !saved;

    },
    close() {
      this.restoreText();
      this.isEdit = false;
    },
    startEdit() {
      let buttonRect = this.$refs.button.getBoundingClientRect();
      this.editLeft = buttonRect.left;
      this.editTop = buttonRect.top;
      this.isEdit = true;

      setTimeout(()=>{
        let editor = this.$refs.editor;
        let pos = { start: {x:0, y:0}, current: {x:0, y:0}, end: {x:0, y:0} };

        editor.addEventListener('pointerdown', (e) => {

          pos.start = pos.current = pos.end = {x:e.clientX, y:e.clientY};

          // editor.style.cursor = 'grabbing';
          editor.style.userSelect = 'none';

          editor.setPointerCapture(e.pointerId);

          const movelistener = (e) => {

              pos.end = {x:e.clientX, y:e.clientY};
              let deltaX = pos.end.x - pos.current.x;
              let deltaY = pos.end.y - pos.current.y;
              pos.current = {x:e.clientX, y:e.clientY};
              this.editLeft += deltaX;
              this.editTop += deltaY;
          }

          const uplistener = (e) => {
              pos.end = {x:e.clientX, y:e.clientY};

              editor.removeEventListener('pointermove', movelistener);
              editor.removeEventListener('pointerup', uplistener);

              // editor.style.cursor = 'auto';
              editor.style.userSelect = 'all';

          }



          editor.addEventListener('pointermove', movelistener);

          editor.addEventListener('pointerup', uplistener);

        });
      }, 10)


    }
  },
    mounted() {

    },
    computed: {
      isAdmin() {
        return this.interaction.isAdmin;
      },
    },
    watch: {

    },
  };
</script>


<template>
  <div class="editor" v-if="isAdmin">
    <button title="Редактировать" @click="startEdit()" :class="{ edit: isEdit }" ref="button" v-if="!isEdit">
      <img src="/src/assets/icons/edit.png" alt="Редактировать" class="edit" />
    </button>
  </div>

  <Teleport to="body">

    <Transition name="openPage" mode="out-in">
      <div class="edit-wrapper" :style="{ left: editLeft + 'px', top: editTop + 'px', 'z-index': interaction.focusedEditPopup == id ? 5000 : '' }" @pointerdown="interaction.focusedEditPopup = id" v-if="isEdit" >
        <div class="edit-header" ref="editor">
          <div class="edit-left_block">
            <button class="btn-save" title="Сохранить" @click="save()">
            <img src="/src/assets/icons/save.png" alt="Сохранить" class="save" />
          </button>
          Нажмите чтобы сохранить
          </div>
          <button class="btn-close" title="закрыть" @click="close()">
            <img src="/src/assets/icons/close.png" alt="закрыть" class="close" />
          </button>
        </div>
        <div class="edit-content">
          <textarea v-model="editableText" />
        </div>
      </div>
    </Transition>
  </Teleport>


  {{ editableText }}
</template>

<style scoped>
.editor {
  position: absolute;
  right: -3vh;
  top: 0%;
  width: auto;
  height: auto;
  z-index: 500;
  cursor: pointer;
}

.edit-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: fit-content;
  height: auto;
  z-index: 500;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--nipigasColorMain);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 140, 149, 0.5);
}


textarea {
  position: relative;
  display: flex;
  height: fit-content;
  min-width: 320px;
  min-height: 100px;
  width: 100%;
  height: 100%;
  padding: 5px;
  font-family: "Roboto", "Dinpro", sans-serif;
  color: var(--textColorBlack);
  resize: both;
  background-color: transparent;
  border: none;
}

.edit-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  height: 50px;
  background-color: rgba(236, 236, 236, 0.5);
  color: var(--nipigasColorMain);
  font-weight: 600;
  cursor: move;
  backdrop-filter: blur(10px);
}
.edit-content {
  width: fit-content;
  height: fit-content;
  background-color: rgb(255, 255, 255);
}

.edit-left_block{
  flex-direction: row;
  color: var(--nipigasColorMain);
  font-weight: 600;
}

.btn-save {
  margin: 0 5px 0 0;
}
.btn-save img{
  z-index: 3;
}
.btn-close {
  width: 32px;
  height: 32px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  transition: all 0.25s ease;
}
.btn-close:hover{
  background-color: transparent;
}
.btn-close:hover::before{
  width: 32px;
  height: 32px;
  background-color: rgb(223, 236, 248);
}
.btn-close::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  background-color: rgb(220, 220, 220);
  transition: all 0.25s ease;
  border-radius: 50%;
}
.btn-close img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.25s ease;
}

button{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  padding: 5px;
  border-radius: 8px;
  border: none;
  border: 1px dashed var(--nipigasColorMain);
  background-color: aliceblue;
  cursor: pointer;
  transition: all 0.25s ease;
}
button img{
  z-index: 2;
}
button:hover{
  background-color: transparent;
  border-radius: 50%;
}

button:hover::before{
  width: 26px;
  height: 26px;
  background-color: rgb(223, 236, 248);
}
button::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  background-color: rgb(220, 220, 220);
  transition: all 0.25s ease;
  border-radius: 50%;
  z-index: 1;
}






</style>