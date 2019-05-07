export default {
  // ref: https://getbootstrap.com/docs/4.0/layout/grid/#grid-options
  getSize(width) {
    switch (true) {
      case width < 576:
        return 'xs';
      case width >= 576 && width < 768:
        return 'sm';
      case width >= 768:
        return 'md';
      default:
        return '';
    }
  },
};
