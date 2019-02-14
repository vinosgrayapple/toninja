<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add New Project</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-textarea label="Information" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
          >
            <v-text-field
              :value="formatteDate"
              slot="activator"
              label="Due date"
              prepend-icon="date_range"
              readonly
              :rules="inputRules"
            ></v-text-field>
            <v-date-picker v-model="date" locale="ru" first-day-of-week="1" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="menu=false">Cancel</v-btn>
              <v-btn color="primary" flat @click="menu=false">OK</v-btn>
              <!-- $refs.menu.save(date) -->
            </v-date-picker>
          </v-menu>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add project</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from "date-fns/format";
import db from "@/fb";
const ru = require("date-fns/locale/ru");

export default {
  data() {
    return {
      dialog: false,
      title: "",
      content: "",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      inputRules: [v => v.length >= 3 || "Text must be more 3 characters"],
      loading: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project = {
          title: this.title,
          content: this.content,
          due: format(this.date, "DD MMMM YYYY", { locale: ru }),
          person: "vinos",
          status: "ongoing"
        };
        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            this.$refs.form.reset();
            this.dialog = false;
          });
        this.$emit("projectAdded");
      }
    }
  },
  computed: {
    formatteDate() {
      return this.date
        ? format(this.date, "DD MMMM YYYY", { locale: ru })
        : format(new Date(), "DD MMMM YYYY", { locale: ru });
    }
  },
  watch: {}
};
</script>

<style scoped>
</style>