<!-- src\components\admin\tables\personal_awards_edit.vue -->

<script>
import TextEdit from "../cells/textEdit.vue";

export default {
  name: "personal_awards_edit",
  emits: ["done", "cancel", "upload-image"],
  props: {
    item: Object,
    availableSections: Array,
  },
  data() {
    return {
      editItem: Object.assign({}, this.item),
    };
  },
  components: {
    TextEdit,
  },
  methods: {
    uploadImageFile(event) {
      // 1) достаём выбранный файл из события
      const file = event.target.files?.[0] || null;
      // 2) сохраняем его в локальном editItem
      this.editItem.image = file;
      // 3) шлём наружу и сам editItem, и сам event
      this.$emit("upload-image", this.editItem, event);
    },

    endEdit() {
      this.$emit("done", this.editItem);
    },
    setItem(item) {
      this.editItem = Object.assign({}, item);
    },
  },
  computed: {
    imagePath() {
      // 1) если это File — всегда создаём blob-url
      if (this.editItem.image instanceof File) {
        return URL.createObjectURL(this.editItem.image);
      }
      // 2) если пришёл info от сервера и там есть url/preview — его можно показать
      if (this.editItem.imageInfo?.url) {
        return this.editItem.imageInfo.url;
      }
      // 3) если это строка (UUID или полный URL) — как раньше
      if (typeof this.editItem.image === "string") {
        try {
          return new URL(this.editItem.image);
        } catch {
          return new URL(
            "files/" + this.editItem.image,
            import.meta.env.VITE_VUE_APP_API_URL
          );
        }
      }
      // 4) дефолтный аватар
      return this.editItem.gender
        ? new URL(
            "storage/app/public/default_men.svg",
            import.meta.env.VITE_VUE_APP_API_URL
          )
        : new URL(
            "storage/app/public/default.svg",
            import.meta.env.VITE_VUE_APP_API_URL
          );
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="Main_block-content">
      <div class="block-content">
        <h3>ID: {{ editItem.id ?? "---" }}</h3>

        <div class="content">
          <h2>Имя</h2>
          <TextEdit
            :item="editItem"
            editProp="name"
            @updateItem="editItem = $event"
          />
        </div>

        <div class="content">
          <h2>Должность</h2>
          <TextEdit
            :item="editItem"
            editProp="position"
            @updateItem="editItem = $event"
          />
        </div>

        <div class="content">
          <h2>Компания</h2>
          <TextEdit
            :item="editItem"
            editProp="company"
            @updateItem="editItem = $event"
          />
        </div>

        <div class="content">
          <h2>Награды</h2>
          <TextEdit
            :item="editItem"
            editProp="award"
            @updateItem="editItem = $event"
          />
        </div>

        <div class="content">
          <h2>Степень</h2>
          <select v-model="editItem.grade">
            <option :value="null">Не указано</option>
            <option :value="'1 Степень'">1 Степень</option>
            <option :value="'2 Степень'">2 Степень</option>
            <option :value="'3 Степень'">3 Степень</option>
            <option :value="'Гордость СИБУР профсоюза'">
              Гордость СИБУР профсоюза
            </option>
          </select>
        </div>

        <div class="content">
          <h2>Выдана</h2>
          <TextEdit
            :item="editItem"
            editProp="issued"
            @updateItem="editItem = $event"
          />
        </div>

        <div class="content row-content">
          <h2>Пол</h2>
          <div class="inpu_gender">
            <input type="checkbox" v-model="editItem.gender" />
            <span>
              <div>муж - &nbsp; <input type="checkbox" checked /></div>
              <div>жен - &nbsp; <input type="checkbox" /></div>
            </span>
          </div>
        </div>

        <div class="content">
          <h2>Фото</h2>
          <div class="photoDownlouad-box">
            <div class="input__wrapper">
              <input
                name="file"
                accept="image/*"
                type="file"
                :id="`input_edit_${editItem.id}`"
                class="input input__file"
                :multiple="false"
                @change="uploadImageFile"
              />
              <label
                :for="`input_edit_${editItem.id}`"
                class="input__file-button"
              >
                <span class="input__file-icon-wrapper">
                  <img
                    class="input__file-icon"
                    src="/download.png"
                    alt="Выбрать файл"
                  />
                </span>
                <span class="input__file-button-text">Выберите файл</span>
              </label>
            </div>
            <div class="img-block">
              <img :src="imagePath" :alt="editItem.name" />
            </div>
          </div>
        </div>

        <div class="content">
          <h2>Год</h2>
          <TextEdit
            :item="editItem"
            editProp="year"
            @updateItem="editItem = $event"
          />
        </div>

        <div class="content">
          <h2>Первый раздел</h2>
          <select v-model="editItem.personal_award_section_id">
            <option
              v-for="section in availableSections"
              :key="section.id"
              :value="section.id"
            >
              {{ section.title }}
            </option>
          </select>
        </div>

        <div class="content">
          <h2>Второй раздел</h2>
          <select v-model="editItem.second_personal_award_section_id">
            <option :value="null">Не указано</option>
            <option
              v-for="section in availableSections"
              :key="'second_' + section.id"
              :value="section.id"
            >
              {{ section.title }}
            </option>
          </select>
        </div>

        <div class="content-btn">
          <button class="btn" @click="$emit('cancel')">Отменить</button>
          <button class="btn" @click="endEdit">Завершить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 50;
  backdrop-filter: blur(10px);
  transition: all 0.25s ease;
}
.Main_block-content {
  width: 90vw;
  height: 90vh;
  max-width: 650px;
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
.block-content {
  width: 90vw;
  height: 90vh;
  max-width: 640px;
  max-height: 800px;
  padding: 20px 10px;
  justify-content: space-between;
  border-radius: 20px;
  overflow-y: auto;
}
.content {
  width: 100%;
  margin: 0 0 10px 0;
  justify-content: flex-start;
  align-items: flex-start;
}
.content.row-content {
  flex-direction: row;
  align-items: center;
}

.content-btn {
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0 0 0;
}

.content-btn {
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0 0 0;
}

h3 {
  width: 100%;
  color: var(--textColorBlack);
  margin: 0 0 20px 0;
  font-size: 20px;
  padding: 5px 10px;

  background: transparent;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
h2 {
  width: 100%;
  color: var(--nipigasColorMain);
  margin: 0 20px 5px 0;
  padding: 0 0 0 10px;
  font-size: 20px;
  text-align: left;
  font-weight: 500;
  opacity: 0.7;
  font-size: 1.4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

textarea {
  min-width: 100%;
  max-width: 100%;
  min-height: 80px;
  max-height: 80px;
  resize: none;
  color: var(--textColorBlack);
  font-size: 15px;
  padding: 5px 10px;

  background: transparent;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

button {
  border: none;
  width: 250px;
  height: 50px;
  border-radius: 50px;
  cursor: pointer;
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s ease;
}

.btn:nth-child(1) {
  background: #ff1f7170;
}
.btn:nth-child(2) {
  background: #1eff4570;
}
.btn:nth-child(1):hover {
  background: #ff1f71;
  box-shadow: 0 0 2px #ff1f71, 0 0 2px #ff1f71, 0 0 5px #ff1f71,
    0 0 10px #ff1f71;
}
.btn:nth-child(2):hover {
  background: #1eff45;
  box-shadow: 0 0 2px #1eff45, 0 0 2px #1eff45, 0 0 5px #1eff45,
    0 0 10px #1eff45;
}

@media (max-width: 600px) {
  .content-btn {
    flex-direction: column;
  }
  button {
    margin: 10px 0 0 0;
    width: 70%;
  }
}

select {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: var(--white);
  font-size: 16px;
  font-weight: 500;
  color: var(--textColorBlack);
  border: 1px solid var(--nipigasColorMain);
  padding: 5px 10px 5px 10px;
  cursor: pointer;
}

option {
  padding: 5px;
  cursor: pointer;
}

.inpu_gender {
  width: 100%;
  align-items: flex-start;
}
.inpu_gender span {
  position: absolute;
  top: 0;
  width: 100%;
  transform: translateY(-120%);
  padding: 5px 30px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  transition: all 0.25s ease;
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
.inpu_gender span div {
  color: var(--textColorBlack);
  flex-direction: row;
}
.inpu_gender span div input {
  pointer-events: none;
}
.inpu_gender:hover span {
  opacity: 1;
}

input {
  color: var(--textColorBlack);
}

img {
  width: 150px;
  height: auto;
}

.photoDownlouad-box {
  width: 100%;
  padding: 0 0 0 10px;
  flex-direction: row;
  justify-content: flex-start;
}
.input__wrapper {
  width: fit-content;
  position: relative;
  margin: 0px 20px 0px 0px;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.input__file-icon-wrapper {
  height: 40px;
  width: 40px;
  margin-right: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-right: 1px solid #fff;
}
.input__file-icon-wrapper img {
  width: 20px;
  height: 20px;
}

.input__file-button-text {
  line-height: 1;
  margin-top: 1px;
}

.input__file-button {
  width: 100%;
  max-width: 290px;
  height: 40px;
  background: #1bbc9b;
  color: #fff;
  padding: 0 5px 0 0;
  font-size: 1.125rem;
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
}
</style>
