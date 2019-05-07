class IdleDetector {
  constructor(minutes) {
    this.timeout = minutes * 60 * 1000;
    this.idleTimer = 0;
    this.detectors = [
      'onload',
      'onmousemove',
      'onmousedown',
      'ontouchstart',
      'onclick',
      'onkeypress',
    ];
  }

  onIdleTimeout = () => {
    window.location.reload();
  };

  resetIdleTimer = () => {
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(this.onIdleTimeout, this.timeout);
  };

  detect = () => {
    this.detectors.forEach(event => {
      window[event] = this.resetIdleTimer;
    });
    window.addEventListener('scroll', this.resetIdleTimer, true);
    return this;
  };
}

export default IdleDetector;
