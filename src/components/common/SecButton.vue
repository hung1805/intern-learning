<template>
  <buton :type="type">
    <slot></slot>
  </buton>
</template>

<script>
export default {
  props: ['type'],
};
</script>

<style></style>
