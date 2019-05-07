function winPopUPCenter(url, winName, pWidth, pHeight) {
  const winL = (screen.availWidth - pWidth) / 2 + window.screenLeft;
  const winT = (screen.availHeight - pHeight) / 2;
  let spec = 'toolbar=no,';
  spec = `${spec}status=no,`;
  spec = `${spec}location=no,`;
  spec = `${spec}height=${pHeight},`;
  spec = `${spec}width=${pWidth},`;
  spec = `${spec}top=${winT},`;
  spec = `${spec}left=${winL},`;
  spec = `${spec}scrollbars=no`;
  spec = `${spec}resizable=no`;
  const win = window.open(url, winName, spec);
  if (parseInt(navigator.appVersion, 10) >= 4) {
    win.window.focus();
  }
  return win;
}

export default winPopUPCenter;
