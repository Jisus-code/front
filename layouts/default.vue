<template>
  <div class="background">
    <div class="scanlines"></div>
  </div>
  
  <Loader-Main v-if="loaderShow" @close="loaderShow = false"></Loader-Main>
  
  <section v-else>
    <Canvas-Grid></Canvas-Grid>

    <nav class="navigation">
      <Navigation-Item 
        v-for="item in nav" :key="item" 
        :item="item"
      ></Navigation-Item>
    </nav>
  
    <div>
      <slot />
    </div>
  </section>
</template>

<script setup>
  const loaderShow = ref( true )

  const nav = [
    {
      type: 'folder',
      title: 'Melody & Motion',
      height: '89px',
      additional: [
        { title: 'Music player', type: 'file' },
        { title: 'Video player', type: 'file' }
      ]
    },
    {
      type: 'folder',
      title: 'Table Maestro',
      height: '116px',
      additional: [
        { title: 'Table', type: 'file' },
        { title: 'Connections', type: 'file' },
        { title: 'Settings', type: 'file' }
      ]
    },
    {
      type: 'folder',
      title: 'Chat gpt',
      height: '89px',
      additional: [
        { title: 'Chat', type: 'file' },
        { title: 'Settings', type: 'file' }
      ]
    },
    {
      type: 'folder',
      title: 'Text Mechanic',
      height: '370px',
      additional: [
        { title: 'Generation content', type: 'file' },
        { title: 'Spellchecking', type: 'file' },
        { title: 'Word processing', type: 'file' },
        { title: 'Text printing', type: 'file' }
      ]
    },
    {
      type: 'folder',
      title: 'More',
      height: '116px',
      additional: [
      { title: 'Password generator', type: 'file' },
      { title: 'Image Lab', type: 'file' },
      { title: 'To-do List', type: 'file' },
      ]
    },
    {
      type: 'folder',
      title: 'Site settings',
      height: '89px',
      additional: [
        { title: 'Close the connection', type: 'file' },
        { title: 'Add connection point', type: 'file' }
      ]
    }
  ];

</script>