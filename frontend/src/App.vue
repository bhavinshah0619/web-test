<template>
  <div class="page-container">
    <!-- <div id="nav"> -->
      <!-- <router-link to="/reservations">Reservations</router-link> |
      <router-link to="/inventory">Inventory</router-link> |
      <router-link to="/inventory">Inventory</router-link> -->
      <md-tabs md-sync-route>
        <md-tab id="reservations" md-label="Reservations" to="/reservations" exact></md-tab>
        <md-tab id="create-inventory" md-label="Create Inventory" to="/create-inventory" exact></md-tab>
        <md-tab id="view-inventory" md-label="View Inventory" to="/view-inventory" exact></md-tab>
      </md-tabs>
    <!-- </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
</style>
