import { shallowMount } from '@vue/test-utils';
import BaseCurrencyInput from '@/components/BaseCurrencyInput.vue';


describe('BaseCurrencyInput', () => {
  it('should render label correctly', () => {
    const wrapper = shallowMount(BaseCurrencyInput, {
      propsData: {
        label: 'Currency',
      },
    });

    const label = wrapper.find('.base-currency-input__label');
    expect(label.text()).toBe('Currency');
  });

  it('should emit input event when input value changes', async () => {
    const wrapper = shallowMount(BaseCurrencyInput);

    const input = wrapper.find('.base-currency-input__field-input');
    await input.setValue('13579');
    expect(wrapper.emitted('input')[0][0]).toBe('13579');
  });

  it('should switch currency selector on click', async () => {
    const wrapper = shallowMount(BaseCurrencyInput);

    const currencySelector = wrapper.find('.base-currency-input__currency');
    await currencySelector.trigger('click');
    expect(wrapper.vm.isCurrencySelectorShown).toBe(true);
  });     
});
