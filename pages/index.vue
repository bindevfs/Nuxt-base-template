<template>
  <div>
    <p>{{ $t('accounts') }}</p>
    <div class="wrapper-relative">
      <div class="wrapper-relative__content">
        <AButton type="primary" shape="round">Subscribe</AButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const count = ref(0)
const appConfig = useAppConfig()
console.log(appConfig.theme, count)
</script>
<style lang="scss" scoped>
.wrapper-relative {
  position: relative;
  width: 300px;
  height: 300px;
  &__content {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
