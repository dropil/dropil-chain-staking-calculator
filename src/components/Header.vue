<template>
  <header class="navigation">
    <div class="container lg">
      <div class="type-logo">
        <router-link to="/" class="title"></router-link>
      </div>

      <ul class="mininav">        
        <li><a href="https://zeli.dropilchain.com">Zeli Wallet</a></li>
        <li><a href="https://docs.dropilchain.com">Docs <i class="far fa-external-link"></i></a></li>
        <li><a href="https://dropilchain.com">Website <i class="far fa-external-link"></i></a></li>
      </ul>

      <div class="submenu">
        <div class="extra">
          <a href="https://zeli.io">Zeli Wallet</a>
          <a href="https://docs.dropilchain.com">Docs <i class="far fa-external-link"></i></a>
          <a href="https://dropilchain.com">Website <i class="far fa-external-link"></i></a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>