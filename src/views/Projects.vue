<template>
  <div class="projects">
    <h1 class="subheadin grey--text my-5">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panel v-for="project in myProjects" :key="project.title">
        <v-expansion-panel-content>
          <div slot="header">{{project.title}}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">due by {{project.due}}</div>
              <div>{{project.content}}</div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>
<script>
import db from "@/fb";
export default {
  name: "team",
  data() {
    return {
      projects: []
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter(a => {
        return a.person === "vinos";
      });
    }
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

<style scoped>
</style>