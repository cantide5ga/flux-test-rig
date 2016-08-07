import { Rig } from 'flux-test-rig';
import { rig } from '../FluxTestRig';
import { IStore, Store } from './flux/Store';
import { Action, ActionTypes } from './flux/Action';

describe('FluxTestRig', () => {
    it('works', () => {
        const rigged = rig<IStore>('./flux/Store.js', 'cb');
        
        const store = rigged.getStore('Store');
        const doAction = rigged.invokeAction;
        
        const addNote = rigged.getSpy('addNote').and.callThrough();
                       
        doAction({
            actionType: ActionTypes.PIN_UP,
            payload: 'Do laundry'
        });
        
        expect(addNote).toHaveBeenCalled();
        expect(rigged.get('notes')['length']).toEqual(1);
        expect(rigged.get('notes')).toEqual(['Do laundry']);        
        expect(store.getNotes()).toEqual(['Do laundry']);
        
        const clearAllNotes = rigged.getSpy('clearAllNotes').and.callThrough();
                       
        doAction({ actionType: ActionTypes.CLEAR });
        
        expect(clearAllNotes).toHaveBeenCalled();
        expect(rigged.get('notes')['length']).toEqual(0);
        expect(rigged.get('notes')).toEqual([]);        
        expect(store.getNotes()).toEqual([]);
    });
    
    it('invokes a noop when optional cbName not provided', () => {
        const rigged = rig<IStore>('./flux/Store.js');
        
        const addNote = rigged.get('addNote');
        addNote('Do laundry');
        
        const notes = rigged.get('notes'); 
        expect(notes).toEqual(['Do laundry']);
        
        const doAction = rigged.invokeAction;
        expect(() => { doAction({
            actionType: ActionTypes.PIN_UP,
            payload: 'Pick up milk'
        })}).not.toThrowError();
        
        expect(notes['length']).toEqual(1);
    });
});

