<template>
  <div id="app">
    <TheHeader />
    <div class="page">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getCurrencies } from '@/api/mainRequests'
import TheHeader from './components/TheHeader.vue'

@Component({
  components: { TheHeader }
})
export default class App extends Vue {
  public unSubscribe!: () => void

  synchronizeStateAndStore(): void {
    this.unSubscribe = this.$store.subscribe((mutation, state: any) => {
      localStorage.setItem('store', JSON.stringify({ ...state }))
    })
  }

  mounted(): void {
    getCurrencies()
    this.synchronizeStateAndStore()
  }
  destroyed(): void {
    if (this.unSubscribe) {
      this.unSubscribe()
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: $gray;
  font-family: $font-family-default, Arial;
  font-style: normal;
  font-weight: 400;
}

.page {
  height: 100%;
  width: 100%;
  max-width: 1279px;
  padding: 60px 0 60px;
  background-color: $white;
}
</style>
