import React from 'react';
import Loadable from 'react-loadable';

const Error404 = Loadable({
  loader: () => import('./404'),
  loading() {
    return <div>Loading...</div>;
  },
});

const Error500 = Loadable({
  loader: () => import('./500'),
  loading() {
    return <div>Loading...</div>;
  },
});

export { Error404, Error500 };
