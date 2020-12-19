export type ComponentProps<C> = {
  [P in keyof C]: C[P] extends Function ? never : C[P];
};
