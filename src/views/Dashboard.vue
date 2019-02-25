<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn slot="activator" small flat color="grey" @click="sortBy('title')">
            <v-icon>folder</v-icon>
            <span class="caption text-lowercase">by project name</span>
          </v-btn>
          <span>Sort project by project name</span>
        </v-tooltip>
        <v-tooltip right>
          <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
            <v-icon>person</v-icon>
            <span class="caption text-lowercase">by person</span>
          </v-btn>
          <span>Sort name by name</span>
        </v-tooltip>
      </v-layout>
      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div>
              <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";
export default {
  data() {
    return {
      projects: []
    };
  },
  methods: {
    sortBy(val) {
      this.projects = this.projects.sort((a, b) => (a[val] > b[val] ? 1 : -1));
    }
  },

  firestore() {
    return {
      projects: db.collection("projects").get()
    };
  },
  created() {
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        this.projects.push({
          ...change.doc.data(),
          id: change.doc.id
        });
      });
    });
  }
};
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}

.v-chip.complete {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: orange;
}
.v-chip.overdue {
  background: tomato;
}
</style>