<template>
  <div>
    <AConfigProvider
      :theme="{
      token: {
        colorPrimary: '#00b96b',
      },
    }"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </AConfigProvider>
  </div>
</template>
