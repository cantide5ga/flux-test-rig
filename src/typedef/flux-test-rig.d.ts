import { Rewire } from 'rewire';

declare namespace FluxTestRig {
    type Intersect<T> = { [instance: string]: T } & Rewire;
    
    interface Rig<T> {
        getStore(storeName: string): T,
        invokeAction(action: any): void,
        get(_var: string): any
        getSpy(name: string): jasmine.Spy;
    }

    function rig<T> (storeFile: string, cbName?: string): Rig<T>;
}

export = FluxTestRig;

