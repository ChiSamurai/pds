/** Selector function to determine the value of a group key */
export type GroupBySelectorFn<T> = (obj: T) => any;
/**
 * The "multi" result of a {@link groupBy} call. Describes an array holding exactly 2 values. The first value stores
 * the accumulation result of the main grouping mechanism inside a plain object the second value preserves any
 * foreign values that could be associated with a group
 */
export type GroupByResult<T, K extends string> = [
  /** Holds all values that could be associated with a group under their respective {@link GroupBySelectorFn} keys */
  Record<K, T[]>,
  /** Holds all foreign values that couldn't be associated with any group */
  T[]
];

/**
 * Groups the values of an {@link Iterable} into a {@link Record} of respective {@link GroupBySelectorFn} key results,
 * while preserving any non associated value in an {@link Array} of foreign values
 *
 * @param iterable The {@link Iterable} values that should be grouped by their respective keys
 * @param groupBySelectorFn The selector function that should resolve the desired group key values
 */
export function groupBy<T, K extends string = string>(
  iterable: Iterable<T>,
  groupBySelectorFn: GroupBySelectorFn<T>
): GroupByResult<T, K> {
  const foreign: T[] = [];
  const groups = Array.from(iterable).reduce<Record<K, T[]>>((acc, obj) => {
    const groupKey = groupBySelectorFn(obj);
    const group = acc[groupKey] || [];

    if (!groupKey) {
      foreign.push(obj);
      return acc;
    } else {
      return { ...acc, [groupKey]: [...group, obj] };
    }
  }, {} as any);

  return [groups, foreign];
}
