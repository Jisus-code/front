import scramble from '~/additional classes/scramble.js'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scramble', {
    mounted( el, binding ) {
      const effect = new scramble( el, binding.value.char, binding.value.amount, binding.value.speed, binding.value.duration || 0 )
      effect.setText( el.textContent )
    }
  });
});