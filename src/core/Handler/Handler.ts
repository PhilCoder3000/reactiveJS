import { PrimitiveValue } from '../Emitter/types';
import { EmitterValue, MapCb } from './types';

export class Handler {
  #emitter: EmitterValue;
  #mapCbs: MapCb[] = [];

  constructor(emitter: EmitterValue) {
    this.#emitter = emitter;
  }

  getValue(): PrimitiveValue | PrimitiveValue[] {
    let result = this.#unwrapValue()
    if (this.#mapCbs.length > 0) {
      result = this.#mapCbs.reduce((acc, cb) => cb(acc), result)
    }
    return result
  }

  #unwrapValue(): PrimitiveValue | PrimitiveValue[] {
    if (Array.isArray(this.#emitter)) {
      return this.#emitter.flatMap((e) => e.getValue())
    } else {
      return this.#emitter.getValue();
    }
  }

  map(fn: MapCb) {
    this.#mapCbs.push(fn)
  }
}