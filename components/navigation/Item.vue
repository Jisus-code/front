<template>
  <div 
    class="navigation__folder" 
    @mouseleave="show = false"
    @mouseover="show = true"
    ref="folder" 
  >
    <h1 
      class="navigation__title"
    >{{ item.title }}</h1>

    <div class="navigation__container" v-if="show">
      <p 
        v-scramble="{ char: 'qwertyuiopasjkdalskhdciacowniacoaibzxoi', amount: 10, speed: 30 }"
        v-for="el in item.additional" :key="el"
        class="navigation__file" 
        v-cursor="'active'"
      >{{ el.title }}</p>
    </div>
  </div>

  |
</template>

<script setup>
  defineProps({
    item: {
      type: Object,
      required: true
    }
  })

  const show = ref( false )
</script>