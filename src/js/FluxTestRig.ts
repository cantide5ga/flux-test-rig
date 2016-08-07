import { Rig, Intersect } from 'flux-test-rig';
import { dirname } from 'path';
import stack = require('callsite');
import rewire = require('rewire');

export function rig<T> (storeFile: string, cbName?: string): Rig<T> {
    const callerDir = dirname(stack()[1].getFileName());
    const rewired = rewire<Intersect<T>>(`${callerDir}/${storeFile}`);
    const cb = cbName ? rewired.__get__(cbName): () => { };
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
    
    public getSpy(name: string): jasmine.Spy {
        const spy = jasmine.createSpy(name, this.get(name));
        this.rewired.__set__(name, spy);
        return this.get(name);
    }
}


