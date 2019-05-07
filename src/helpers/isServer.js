// @flow
const isServer = (): boolean => !(typeof window !== 'undefined' && (!!window && !!window.document));

export default isServer;
