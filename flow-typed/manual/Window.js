// @flow
declare class Window extends EventTarget {
  document: ?Object;
  innerWidth: number;
  location: {
    hostname: string,
  };
  scrollTo: (number, number) => void;
  scrollY: number;
}

declare var window: ?Window;
