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

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  scrollbar-width: thin;
  scrollbar-color: #d8d8d8 white;
}

html,
body {
  width: 100vw;
  overflow-x: hidden;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

input {
  border: none;
  outline: none;
  background-color: transparent;
}

.page {
  height: 100%;
  width: 100%;
  max-width: 1279px;
  padding: 60px 0 60px;
  background-color: $white;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 3px;
  height: 4px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #a8a8a8;
}
</style>
