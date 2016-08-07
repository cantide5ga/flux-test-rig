import { EventEmitter } from 'events';
import { ActionTypes } from './Action';

let notes = new Array<string>();

const addNote = (message:string) => {
    notes.push(message);
}

const clearAllNotes = () => {
    notes.length = 0;
} 

export interface IStore {
    getNotes(): Array<string>;
}

class StoreStatic extends EventEmitter implements IStore {
    public getNotes(): Array<string> {
        return notes;
    }
}

export const Store = new StoreStatic();

const cb = (action: { actionType: ActionTypes, payload?: any }): void => {
    switch(action.actionType) {
        case ActionTypes.PIN_UP:
        addNote(action.payload);
        break;
        
        case ActionTypes.CLEAR:
        clearAllNotes();
        break;
    }
    
}