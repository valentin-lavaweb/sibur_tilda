<template>
  <div class="edit-modal-backdrop" @click.self="$emit('cancel')">
    <div class="edit-modal">
      <h2 class="modal-title">
        {{ item.id ? "Редактировать новость" : "Новая новость" }}
      </h2>
      <form @submit.prevent="save" class="modal-form">
        <div class="form-group">
          <label for="title">Заголовок</label>
          <input
            id="title"
            v-model="form.title"
            placeholder="Введите заголовок"
          />
        </div>

        <div class="form-group">
          <label for="content">Контент</label>
          <textarea
            id="content"
            v-model="form.content"
            rows="4"
            placeholder="Текст новости..."
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="published_at">Дата публикации</label>
            <input
              id="published_at"
              type="datetime-local"
              v-model="localDate"
            />
          </div>
          <div class="form-group">
            <label>Превью</label>
            <input type="file" @change="onFile($event, 'preview')" />
            <div v-if="form.previewInfo?.url" class="preview-thumb">
              <img :src="form.previewInfo.url" alt="preview" />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Галерея</label>
          <input type="file" multiple @change="onFile($event, 'gallery')" />
          <div v-if="form.gallery?.length" class="gallery-preview">
            <div v-for="(f, i) in form.gallery" :key="i" class="gallery-thumb">
              <img :src="URL.createObjectURL(f)" alt="gallery" />
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary">Сохранить</button>
          <button type="button" class="btn-secondary" @click="$emit('cancel')">
            Отмена
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      form: { ...this.item },
    };
  },
  computed: {
    localDate: {
      get() {
        return this.form.published_at?.slice(0, 16) || "";
      },
      set(v) {
        this.form.published_at = new Date(v).toISOString();
      },
    },
  },
  methods: {
    onFile(e, prop) {
      const files = Array.from(e.target.files || []);
      if (prop === "preview") this.form.preview = files[0];
      else this.form.gallery = files;
    },
    save() {
      this.$emit("done", this.form);
    },
    setItem(item) {
      this.form = { ...item };
    },
  },
};
</script>

<style scoped>
/* затемнённый фон */
.edit-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* сама модалка */
.edit-modal {
  background: #fff;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: fadeInScale 0.2s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-title {
  margin: 0 0 16px;
  font-size: 1.5rem;
  color: var(--nipigasColorMain);
  text-align: center;
}

/* форма */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="datetime-local"],
.form-group textarea,
.form-group input[type="file"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
}

/* превью */
.preview-thumb,
.gallery-preview {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.preview-thumb img,
.gallery-thumb img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
}

/* кнопки */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.btn-primary {
  background-color: var(--nipigasColorMain);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--nipigasColorMain-hover);
}

.btn-secondary {
  background: transparent;
  color: #555;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #f5f5f5;
}
</style>
