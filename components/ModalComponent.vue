<template>
  <portal to="body">
    <transition
      name="modal-outer"
      enter-active-class="duration-500 ease-out opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-300 ease-in"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="modalActive"
        class="
          absolute
          w-full
          bg-black bg-opacity-30
          h-screen
          top-0
          left-0
          flex
          justify-center
          px-8
          z-0
        "
      >
        <div
          v-if="modalActive"
          class="
            p-4
            bg-modal-primary
            self-start
            mt-32
            max-w-screen-md
            rounded-lg
            shadow-lg
          "
        >
          <slot />
          <button
            class="text-white mt-8 bg-button-primary py-2 px-6 rounded-lg"
            @click="$emit('close-modal')"
          >
            Close
          </button>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
import { Portal } from "@linusborg/vue-simple-portal";
export default {
  name: "ModalComponent",
  components: {
    Portal,
  },
  props: {
    modalActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close-modal"],
};
</script>