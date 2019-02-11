<template>
  <div class="team">
    <h1 class="subheading grey--text">Team</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex xs2 v-for="it in [1,2,3,3,4,5,6,7,8,9,10,11,12]" :key="it">
          <v-btn outline block class="primary">{{it}}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "team"
};
</script>

<style scoped>
</style>