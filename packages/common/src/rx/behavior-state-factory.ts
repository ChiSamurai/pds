import { isIterable } from '../reflection/iterables';
import { isPrimitive, Primitive } from '../reflection/primitives';
import { ArrayBehaviorState, BehaviorState, PrimitiveBehaviorState } from './behavior-state';

/**
 * Infers the desired behavior state implementation for a given type parameter.
 * Will return either {@link BehaviorState}, {@link PrimitiveBehaviorState}
 * or {@link ArrayBehaviorState} depending on the input type
 */
export type InferredBehaviorState<T> = T extends Primitive
  ? PrimitiveBehaviorState<T>
  : T extends Iterable<infer U>
    ? ArrayBehaviorState<U>
    : BehaviorState<T>;

/**
 * Creates a behavior state instance by inferring the behavior states
 * implementation type.
 *
 * @param value The value that should be nested into a behavior state instance
 */
export function createBehaviorState<T>(value: T): InferredBehaviorState<T> {
  if (isPrimitive(value)) return new PrimitiveBehaviorState(value) as any;
  else if (isIterable(value)) return new ArrayBehaviorState(value) as any;
  else return new BehaviorState(value) as any;
}
