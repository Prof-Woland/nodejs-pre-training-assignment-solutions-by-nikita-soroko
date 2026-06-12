/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
  if(typeof source === null || typeof source === undefined){
    throw new TypeError('Source is null or undefined');
  };

  let result: R[] = [];

  for(let i = 0; i < source.length; i++){
    result.push(mapper(source[i], i));
  }

  return result;
}

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
  if(typeof source === null || typeof source === undefined){
    throw new TypeError('Source is null or undefined');
  };

  let result: T[] = [];

  for(let i = 0; i < source.length; i++){
    if(predicate(source[i], i)){
      result.push(source[i]);
    }
  }

  return result;
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
  if(typeof source === null || typeof source === undefined){
    throw new TypeError('Source is null or undefined');
  };

  let result: R = initial;

  for(let i = 0; i < source.length; i++){
    result = reducer(result, source[i], i);
  }

  return result;
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  if(typeof source === null || typeof source === undefined){
    throw new TypeError('Source is null or undefined');
  };

  let result: [T[], T[]] = [[], []];

  for(let i = 0; i < source.length; i++){
    if(predicate(source[i])){
      result[0].push(source[i]);
    }
    else{
      result[1].push(source[i]);
    };
  };
  
  return result;
}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
  if(typeof source === null || typeof source === undefined){
    throw new TypeError('Source is null or undefined');
  };

  let result: Record<K, T[]> = {} as Record<K, T[]>;

  for(let i = 0; i < source.length; i++){
    let key: K = keySelector(source[i]);
    if(result.hasOwnProperty(key)){
      result[key].push(source[i]);
    }
    else{
      result[key] = [];
      result[key].push(source[i]);
    }
  }
  
  return result;
}
