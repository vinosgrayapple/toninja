<template>
  <v-dialog max-width="600px"  v-model="dialog">
    <v-btn flat slot="activator" class="success">Add New Project</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Title" v-model="title" prepend-icon="folder"></v-text-field>
          <v-textarea label="Information" v-model="content" prepend-icon="edit"></v-textarea>

            <v-menu>
              <v-text-field :value="formatteDate" slot="activator" label="Due date" prepend-icon="date_range"></v-text-field>
              <v-date-picker v-model="date"></v-date-picker>
            </v-menu>

          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn flat class="success mx-0 mt-3" @click="submit">Add project</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format'
export default {
  data() {
    return {
      dialog: false,
      title: "",
      content: "",
      date:""
    };
  },
  methods: {
    submit() {
      console.log(this.title, this.content, this.date)
      this.dialog = false
    }
  },
  computed: {
    formatteDate() {
      return this.date ? format(this.date, 'Do MMM YYY'):format(new Date, 'Do MMM YYY')
    }
  }
};
</script>

<style scoped>
</style>