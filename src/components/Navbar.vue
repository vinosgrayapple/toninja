<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer=!drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">ART</span>
        <span>WINERY</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn slot="activator" color="grey" flat>Menu</v-btn>
        <v-list>
          <v-list-tile v-for="(link,key) in links" :key="key" router :to="link.route">
            <v-list-tile-title>
              <v-icon left>{{link.icon}}</v-icon>
              {{ link.text }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app absolute v-model="drawer">
      <v-layout align-center justify-center column>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/avatar-1.png" alt="My photo">
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="purple--text subheading mt-1">Сергей Комаричев</p>
        </v-flex>
        <v-flex class="mt-4 mb-4">
          <Popup/>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="(link,key) in links" :key="key" router :to="link.route">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content to="/" class="text-capitalize">{{link.text}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup";

export default {
  components: { Popup },
  mounted() {},
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "folder", text: "My Project", route: "/projects" },
        { icon: "person", text: "Team", route: "/team" }
      ]
    };
  }
};
</script>

<style scoped>
</style>
