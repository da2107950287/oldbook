<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html{
  font-size: calc((100*100vw)/458);
  background: #f2f3f7;
}
body{
  background: #f2f3f7;
  font-size: 0.16rem;
}
*{
  margin:0;
  padding:0;
}
a
{
  color:#333;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width:100vw;
}
li{
  text-decoration: none;
}
</style>
