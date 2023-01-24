<template>
  <div id="control-tower">
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

p {
  font-family: 'maple' !important;
}

@font-face {
  font-family: 'maple';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>
