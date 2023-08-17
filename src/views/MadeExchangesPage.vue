<template>
  <div class="made-exchanges">
    <h1 class="made-exchanges__title">Створені обміни</h1>
    <table v-if="madeExchangesList.length > 0" class="made-exchanges__table">
      <thead>
        <tr>
          <th>Віддаю</th>
          <th>Отримую</th>
          <th>По курсу</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in madeExchangesList" :key="item.id">
          <td>{{ item.firstCurrency.value }} {{ item.firstCurrency.cc }}</td>
          <td>{{ item.secondCurrency.value }} {{ item.secondCurrency.cc }}</td>
          <td>1 = {{ item.exchangeRate }}</td>
        </tr>
      </tbody>
    </table>
    <h3 v-else class="made-exchanges__not-exist">Ще не зроблено жодного обміну</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MadeExchangesPage extends Vue {
  get madeExchangesList(): any {
    return this.$store.state.currency.madeExchangesList
  }
}
</script>

<style lang="scss" scoped>
.made-exchanges {
  display: flex;
  flex-direction: column;
  padding: 0 46px;

  &__title {
    text-align: center;
    margin-bottom: 16px;
  }

  &__table {
    th,
    td {
      border-radius: 4px;
      border: 1px solid $gray-dark;
      padding: 8px;
      text-align: left;
    }
  }

  &__not-exist {
    text-align: center;
    color: $gray-dark;
  }
}

@media screen and (max-width: 767px) {
  .made-exchanges {
    padding: 0 16px;
  }
}
</style>
