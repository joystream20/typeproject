// src/app/router.options.ts
import type { RouterScrollBehavior } from 'vue-router'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }

  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    };
  }

  return { top: 0 };
};

export default {
  scrollBehavior
};
