import { shallowMount } from '@vue/test-utils'
import BaseSearchInput from '@/components/BaseSearchInput.vue'

describe('BaseCurrencyInput', () => {
  it('should render the label correctly', async () => {
    const label = 'Name'
    const wrapper = shallowMount(BaseSearchInput, {
      propsData: { label },
    })
    expect(wrapper.find('label').text()).toMatch(label)
  })

  it('should update the input value when input event is triggered', () => {
    const wrapper = shallowMount(BaseSearchInput)

    const inputValue = 'example'
    wrapper.find('.base-search-input__field-input').setValue(inputValue)

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')).toEqual([[inputValue]])
  })

  it('should set isInputFocused to true when input is focused', () => {
    const wrapper = shallowMount(BaseSearchInput)

    wrapper.find('.base-search-input__field-input').trigger('focus')

    expect(wrapper.vm.isInputFocused).toBeTruthy()
  })

  it('should set isInputFocused to false when input is blurred', () => {
    const wrapper = shallowMount(BaseSearchInput);

    wrapper.find('.base-search-input__field-input').trigger('focus')
    wrapper.find('.base-search-input__field-input').trigger('blur');

    expect(wrapper.vm.isInputFocused).toBe(false);
  });
})
