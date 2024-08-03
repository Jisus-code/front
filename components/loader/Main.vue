<template>
  <section class="loader-main">
    <div class="loader-main__company-information">
      <span>
        Serega Avosapyants,
        <br>
        Jisus-code Inc. 
      </span>

      <span>
        Released: 02/08/2024
        <br>
        HHBIOS (C)2000 Serega coder lol.,
      </span>
    </div>
    
  
    <div class="loader-main__personal-information">
      <span>
        HPS<span class="space"></span>S13<span class="space"></span>2000 - 2024<span class="space"></span>Special UC131S
      </span>

      <span>
        HPS Showcase(tm)<span class="space"></span>XX<span class="space"></span>113 
        <br>
        Checking RAM<span class="space"></span>:<span class="space"></span>14000 OK
      </span>
    </div>

    <div class="loader-main__process-loader">
      <span>
        LOADING RESOURCES ({{ currentIndex }}/27)
      </span>

      <div class="loader-main__container" ref="container">
        <span v-for="el in printText" :key="el">
          <p>{{ el.text }}</p>
          <p>... {{ el.percentage }}</p>
        </span>
      </div>
    </div>

    <div class="loader-main__computer-info">
      <span>
        Press <span class="active">DEL</span> to enter <span class="active">SETUP</span>, <span class="active">ESC</span> to skip memory
        <br>
        02/08/2024
      </span>
    </div>
  </section>
</template>

<script setup>
  const emit = defineEmits(['close'])

  const pattern = [
    'CHANGELOG.md',
    '.npmignore',
    'karma.conf.js',
    'package.json',
    'lazy.js',
    'browser.js',
    'dasherSettingSchema.json',
    'manifest.json',
    'offscreendocument.html',
    'offscreendocument_main.js',
    'page_embed_script.js',
    'service_worker_bin_prod.js',
    'Affiliation Database',
    'Affiliation Database-journal',
    'AutofillStrikeDatabase',
    'blob_storage',
    'Bookmarks',
    'BrowsingTopicsSiteData',
    'BrowsingTopicsSiteData-journal',
    'BrowsingTopicsState',
    'BudgetDatabase',
    'Cache',
    'chrome_cart_db',
    'ClientCertificates',
    'Code Cache',
    'commerce_subscription_db',
    'coupon_db',
    'CRXTelemetry',
    'DawnGraphiteCache',
    'DawnWebGPUCache',
    'DIPS',
    'DIPS-journal',
    'Discounts_db',
    'Download Service',
    'Extension Rules',
    'Extension Scripts',
    'Extension State',
    'Extensions',
    'Favicons',
    'Favicons-journal',
    'Accounts'
  ]

  const randomRange = ( min, max ) => {
    return Math.floor( Math.random() * ( max - min + 1) ) + min
  }

  const randomText = ( number ) => {
    const text = pattern[ randomRange( 0, pattern.length - 1 ) ]
    const percentage = ( ( number + 1 ) / 27 ) * 100 | 0

    return { text: `Loaded ${ text }`, percentage: `${ percentage }%` }
  }

  const text = new Array( 27 ).fill().map( ( el, index ) => randomText( index ) )
  
  const printText = ref([])
  const currentIndex = ref(0)

  const container = ref(null)

  const scrollToBottom = ( el ) => {
    el.scrollTop = el.scrollHeight;
  }

  onMounted(() => {
    scrollToBottom( container.value )

    const runTimeout = () => {
      if (currentIndex.value < text.length) {
        printText.value.push(text[currentIndex.value]);
        currentIndex.value++;

        setTimeout(runTimeout, randomRange(100, 300));
      } else {
        emit( 'close' )
      }
    };

    setTimeout(runTimeout, randomRange(100, 300));
  })

  onUpdated(() => {
    scrollToBottom( container.value )
  })
</script>