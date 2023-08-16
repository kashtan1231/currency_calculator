<template>
  <div class="the-header">
    <router-link :to="{ name: linkName }" class="the-header__link">
      <p>{{ linkText }}</p>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {
  get linkText(): string {
    return `Перейти до ${this.$route.name === 'HomePage' ? 'всіх курсів' : 'обміну'}`
  }
  get linkName(): string {
    return this.$route.name === 'HomePage' ? 'AllCurrencies' : 'HomePage'
  }
}
</script>

<style lang="scss" scoped>
.the-header {
  padding: 16px;
  border-bottom: 2px solid $red;

  &__link {
    color: $black;
    text-decoration: none;
  }
}
</style>
