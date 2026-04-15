document.querySelectorAll('[data-profile-menu]').forEach((menu) => {
  const trigger = menu.querySelector('[data-profile-trigger]');
  const dropdown = menu.querySelector('[data-profile-dropdown]');
  const items = Array.from(menu.querySelectorAll('[data-profile-item]'));

  if (!trigger || !dropdown) return;

  const setItemsFocusable = (enabled) => {
    items.forEach((item) => {
      item.tabIndex = enabled ? 0 : -1;
    });
  };

  const closeMenu = () => {
    menu.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    setItemsFocusable(false);
  };

  const openMenu = () => {
    document.querySelectorAll('[data-profile-menu].is-open').forEach((otherMenu) => {
      if (otherMenu !== menu) {
        otherMenu.classList.remove('is-open');
        const otherTrigger = otherMenu.querySelector('[data-profile-trigger]');
        const otherItems = otherMenu.querySelectorAll('[data-profile-item]');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        otherItems.forEach((item) => {
          item.tabIndex = -1;
        });
      }
    });

    menu.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    setItemsFocusable(true);
  };

  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.addEventListener('mouseenter', () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      menu.classList.add('is-hovered');
    }
  });

  menu.addEventListener('mouseleave', () => {
    menu.classList.remove('is-hovered');
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      trigger.focus();
    }
  });

  dropdown.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  closeMenu();
});
