<template>
  <div class="col s12 m6">
    <div class="page-subtitle">
      <h4>Edit</h4>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="refSelect" v-model="currentCategoryId">
          <option v-for="c in categories" :key="c.id" :value="c.id">{{
            c.title
          }}</option>
        </select>
        <label>Select a category</label>
      </div>

      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="title"
          :class="{ invalid: $v.title.$dirty && !$v.title.required }"
        />
        <label for="name">Title</label>
        <span
          class="helper-text invalid"
          v-if="$v.title.$dirty && !$v.title.required"
        >
          Enter the title
        </span>
      </div>

      <div class="input-field">
        <input
          id="limit"
          type="number"
          v-model.number="limit"
          :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
        />
        <label for="limit">Limit</label>
        <span
          class="helper-text invalid"
          v-if="$v.title.$dirty && !$v.limit.minValue"
        >
          Minimum value is {{ $v.limit.$params.minValue.min }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Update
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators"
import M from "materialize-css/dist/js/materialize.min"

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    title: "",
    limit: 100,
    currentCategoryId: null,
    select: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    currentCategoryId() {
      const { title, limit } = this.categories.find(
        c => c.id === this.currentCategoryId
      )
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const { id, title, limit } = this.categories[0]
    this.currentCategoryId = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.refSelect)
    M.updateTextFields()
  },
  methods: {
    async handleSubmit() {
      if (this.$v.invalid) {
        this.$v.touch()
        return
      }

      try {
        const categoryData = {
          id: this.currentCategoryId,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch("updateCategory", categoryData)
        this.$message("Category was updated")
        this.$emit("update", categoryData)
      } catch (error) {
        console.log(error)
      }
    }
  },
  destroyed() {
    this.select?.destroy?.()
  }
}
</script>
