<template>
  <div class="team">
    <h1 class="subheading grey--text">Team</h1>
    <v-container class="my-5">
      <v-card>

      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
       team: [
        { name: 'The Net Ninja', role: 'Web developer' },
        { name: 'Ryu', role: 'Graphic designer' },
        { name: 'Chun Li', role: 'Web developer' },
        { name: 'Gouken', role: 'Social media maverick' },
        { name: 'Yoshi', role: 'Sales guru'}
      ]
    }
  },
  name: "team"
};
</script>

<style scoped>
</style>