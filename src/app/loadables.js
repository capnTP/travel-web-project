import Loadable from 'react-loadable';
import i18next from 'i18next';

import Loader from '../components/Loader';

const Tours = Loadable({
  loader: () => {
    // only use loadNamespaces if component gonna be preloaded
    i18next.loadNamespaces(['discover']);
    return import('../containers/Tours');
  },
  loading: Loader,
});

const AboutUs = Loadable({
  loader: () => import('../pages/AboutUs'),
  loading: Loader,
});

const Policies = Loadable({
  loader: () => import('../containers/Policies'),
  loading: Loader,
});

const Terms = Loadable({
  loader: () => import('../containers/Terms'),
  loading: Loader,
});

const Contact = Loadable({
  loader: () => import('../pages/ContactUs'),
  loading: Loader,
});

const Account = Loadable({
  loader: () => import('../containers/Account'),
  loading: Loader,
});

const PageNotFound = Loadable({
  loader: () => import('../containers/NotFound'),
  loading: Loader,
});

const Discover = Loadable({
  loader: () => import('../containers/Discover'),
  loading: Loader,
});

const Cities = Loadable({
  loader: () => import('../containers/Cities'),
  loading: Loader,
});

const Checkout = Loadable({
  loader: () => {
    // only use loadNamespaces if component gonna be preloaded
    i18next.loadNamespaces(['checkout']);
    return import('../containers/Checkout');
  },
  loading: Loader,
});

const Signing = Loadable({
  loader: () => {
    // only use loadNamespaces if component gonna be preloaded
    i18next.loadNamespaces(['signing']);
    return import('../containers/Signing');
  },
  loading: Loader,
});

const Home = Loadable({
  loader: () => import('../containers/Home'),
  loading: Loader,
});

const ResetPasswordPage = Loadable({
  loader: () => import('../pages/ResetPassword'),
  loading: Loader,
});

export {
  Tours,
  AboutUs,
  Policies,
  Terms,
  Contact,
  Account,
  PageNotFound,
  Discover,
  Checkout,
  Signing,
  Cities,
  Home,
  ResetPasswordPage,
};
