<template>
  <button :type="type" class="px-4 py-2 text-blue-100 bg-blue-800 rounded-md">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['type'],
};
</script>

<style></style>
