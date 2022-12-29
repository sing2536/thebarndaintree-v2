<script setup>
</script>

<template>
  <div>
    <h2>Blank page</h2>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  top: 0;
  height: 100vh;
  background: var(--color-background);
  z-index: 2;
}

.login-wrapper {
  background: var(--color-background2);
  border-radius: var(--radius-normal);
  padding: var(--gap-medium);
  width: 320px;
}

.info-wrapper {
    background: var(--color-red);
    border-radius: var(--radius-normal);
    padding: var(--gap-xtiny);
    margin-bottom: var(--gap-small);
}

h3 {
  padding-bottom: var(--gap-medium);
}

p {
  font-size: smaller;
  text-align: center;
  font-weight: 500;
}

form {
  display: flex;
  flex-direction: column;
}
</style>