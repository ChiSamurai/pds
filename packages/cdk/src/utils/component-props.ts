export type ComponentProps<C> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof C]: C[P] extends Function ? never : C[P];
};
