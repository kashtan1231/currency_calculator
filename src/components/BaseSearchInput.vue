<template>
  <div class="base-search-input">
    <label :class="['base-search-input__label', { 'move-label': isInputFocused || value }]">{{
      label
    }}</label>
    <div class="base-search-input__wrapper">
      <input
        class="base-search-input__field-input"
        @input="onInput"
        @focus="focusInput"
        @blur="unfocusInput"
        :value="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseSearchInput extends Vue {
  @Prop({ default: '' }) value!: string
  @Prop({ default: '' }) label!: string

  isInputFocused = false

  focusInput(): void {
    this.isInputFocused = true
  }
  unfocusInput(): void {
    this.isInputFocused = false
  }
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    const regex = /[^0-9a-zA-Zа-яА-яҐґЄєІіЇїЁё]/u

    target.value = target.value.replace(regex, '')

    this.$emit('input', target.value)
  }
}
</script>

<style lang="scss" scoped>
.base-search-input {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;

  &__label {
    @extend p;
    position: absolute;
    top: 14px;
    left: 16px;
    padding: 0 4px;
    border-radius: 30px;
    background-color: $white;
    color: $gray-dark;
    transition-duration: 0.2s;
    user-select: none;
    pointer-events: none;
  }

  &__wrapper {
    display: flex;
    box-shadow: inset 0 0 0 1px $gray-dark;
    border-radius: 4px;
  }

  &__field-input {
    @extend p;
    padding: 14px 16px;
    width: 100%;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      -webkit-text-fill-color: $black;
      transition: background-color 5000s ease-in-out 0s;
    }

    &::-webkit-calendar-picker-indicator {
      opacity: 0;
    }
  }

  &__currency {
    display: flex;
    align-items: center;
    margin: 10px 12px 10px 0;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;

    &-arrow {
      height: 0;
      margin-left: 8px;
      border-top: 5px solid $black;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      transition-duration: 0.2s;
    }

    &:hover {
      background-color: $gray;
    }
  }

  &__helper {
    margin-top: 8px;
  }

  &__currency-selector {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    display: flex;
    flex-direction: column;
    max-height: 400px;
    width: 100%;
    padding: 14px 0;
    border-radius: 4px;
    background-color: $white;
    border: solid 1px $gray-dark;
    box-shadow: 0 0 11px 0px rgba($gray-dark, 0.5);
    overflow: auto;
  }

  .currency-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 15px;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: $gray;
    }

    &__cc {
      padding-right: 8px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.active-arrow {
  rotate: 180deg;
}

.move-label {
  top: -7px;
  left: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
}
</style>
