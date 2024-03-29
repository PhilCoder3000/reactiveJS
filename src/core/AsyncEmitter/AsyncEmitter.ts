type SetValueArg<T> = CanPromise<T> | ((value: T) => CanPromise<T>);

class AsyncEmitter<T> {
	private value

	constructor(value: CanPromise<T>) {
		this.value = Promise.resolve(value)
	}

	async getValue() {
		return this.value
	}

	setValue(arg: SetValueArg<T>) {
		if (typeof arg === 'function') {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/ban-types
			this.value = this.value.then(value => (arg as Function)(value))
		} else {
			this.value = Promise.resolve(arg)
		}
		return this
	}
}

export default AsyncEmitter
