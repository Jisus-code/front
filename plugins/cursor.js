export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('cursor', {
    mounted( el, binding ) {
      el.onmouseover = () => document.querySelector('.cursor').classList.add( `cursor_${ binding.value }` )
      el.onmouseout = () => document.querySelector('.cursor').classList.remove( `cursor_${ binding.value }` )
    }
  });
});