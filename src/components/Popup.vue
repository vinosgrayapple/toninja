<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Добавить работника</v-btn>
    <v-card>
      <v-card-title>
        <h2>Добавить нового работника</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Имя" v-model="name" prepend-icon="account_box" :rules="inputRules"></v-text-field>
          <v-text-field
            label="Фамилия"
            v-model="lastname"
            prepend-icon="account_circle"
            :rules="inputRules"
          ></v-text-field>
          <!-- Load Photo -->
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-img :src="imageUrl" max-height="150" contain></v-img>
            </v-flex>
          </v-layout>
          <v-btn
            raised
            class="primary"
            prepend-icon="account_circle"
            @click="onPickFile"
            block
          >Загрузка Фото</v-btn>
          <input
            type="file"
            style="display:none"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"
          >

          <!-- Load email -->
          <v-text-field
            v-model="email"
            prepend-icon="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
          ></v-text-field>
          <v-autocomplete
            ref="unit"
            v-model="unit"
            :rules="[() => !!unit || 'Сделайте Выбор!']"
            :items="units"
            label="Подразделение"
            prepend-icon="add_comment"
            required
          ></v-autocomplete>
          <v-autocomplete
            ref="department"
            v-model="department"
            :rules="[() => !!department || 'Сделайте Выбор!']"
            :items="departments[unit]"
            label="Департамент"
            prepend-icon="add_comment"
            required
          ></v-autocomplete>

          <!-- department -->
          <!-- <v-textarea label="Information" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea> -->
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
              label="День рождения"
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
            <v-btn
              flat
              class="success mx-0 mt-3"
              @click="submit"
              :loading="loading"
            >Добавить Работника</v-btn>
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
      imageUrl: "",
      image: null,
      dialog: false,
      unit: "",
      department: "",
      departments: {
        "Производственный цех": [
          "Виноматериальный",
          "Ликерный",
          "Тиражный",
          "Послетиражная выдержка",
          "Рядовая отделка",
          "Экспортная отделка",
          "Игристые вина",
          "Шампанизация"
        ],
        Вспомогательное: [
          "Материальный склад",
          "Медпункт",
          "Механическое отделение",
          "Микробиология",
          "Отдел автоматизации",
          "Отдел технического контроля",
          "Лаборатория",
          "ОМТСиТЛ",
          "Тарно-транспортное",
          "Энергоупровление",
          "ИТ",
          "РСУ"
        ],
        Административное: [
          "Менеджмент",
          "Главный технолог",
          "ФЭБ",
          "Бухгалтерия",
          "ОИСМ",
          "Отдел кадров",
          "ПЭО",
          "Специалисты",
          "Юротдел"
        ],
        Сбытовое: [],
        Прочие: []
      },
      units: [
        "  ",
        "Производственный цех",
        "Вспомогательное",
        "Административное",
        "Сбытовое",
        "Прочие"
      ],
      name: "",
      email: "",
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length <= 20 || "Max 20 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      lastname: "",
      content: "",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      inputRules: [v => v.length >= 3 || "Text must be more 3 characters"],
      loading: false
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      // console.log(files);
      let filename = files[0].name;
      if (!filename.includes(".")) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.iamge = files[0];
    },
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