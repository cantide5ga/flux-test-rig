import { Rig, Intersect } from 'flux-test-rig';
import rewire = require('rewire');

function rerig<T> (storeFile: string, cbName: string): Rig<T> {
    const rewired = rewire<Intersect<T>>(storeFile);
    const cb = rewired.__get__(cbName);
    return new Rigged<T>(rewired, cb);
}

class Rigged<T> implements Rig<T> {
    private rewired: Intersect<T>;
    private cb: Function;

    constructor(rewired: Intersect<T>, cb: Function) {
        this.rewired = rewired;
        this.cb = cb;
    }

    public getStore(storeName: string): T {
        return this.rewired[storeName];
    }

    public invokeAction = (action: any): void => {
        return this.cb(action);
    }

    public get(_var: string): any {
        return this.rewired.__get__(_var);
    }
}
