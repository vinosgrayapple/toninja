<template>
  <div class="team">
    <h1 class="subheading grey--text">Team</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="110" class="grey lighten-2">
                <img :src="person.avatar" :alt="person.name">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{person.name}}</div>
              <div class="grey--text">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-tooltip top>
                <v-btn flat color="grey" slot="activator">
                  <v-icon small left>email</v-icon>
                  <span>Send Mail</span>
                </v-btn>
                <span>{{ person.email }}</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          name: "The Net Ninja",
          role: "Web developer",
          email: "ninja@artwinery.com.ua",
          avatar: "img/avatar-1.png"
        },
        {
          name: "Ryu",
          role: "Graphic designer",
          email: "raya@artwinery.com.ua",
          avatar: "img/avatar-2.png"
        },
        {
          name: "Chun Li",
          role: "Web developer",
          email: "chuck@artwinery.com.ua",
          avatar: "img/avatar-3.png"
        },
        {
          name: "Gouken",
          role: "Social media maverick",
          email: "gouken@artwinery.com.ua",
          avatar: "img/avatar-4.png"
        },
        {
          name: "Yoshi",
          role: "Sales guru",
          email: "yoshi@artwinery.com.ua",
          avatar: "img/avatar-5.png"
        }
      ]
    };
  },
  name: "team"
};
</script>

<style scoped>
</style>