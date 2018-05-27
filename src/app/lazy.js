import React from 'react';
import Loadable from 'react-loadable';

const Lazy = (loader, options) => {
  return getComponent(loader, options);
};

function getLoading(loading) {
  return loading || (() => null);
}
function getRender(name, render) {
  if (!name || render) {
    return render;
  }
  return (loaded, props) => {
    const Component = loaded[name];
    return <Component {...props} />;
  };
}
function getComponent(loader, {name, render, loading, ...options} = {}) {
  const _render = getRender(name, render);
  if (_render) {
    return Loadable({
      loader,
      render: _render,
      loading: getLoading(loading),
      ...options,
    });
  }
  return Loadable({
    loader,
    loading: getLoading(loading),
    ...options,
  });
}

export default Lazy;
