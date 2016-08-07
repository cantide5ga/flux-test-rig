import { Dispatcher } from './Dispatcher';

class FluxAction {
    public pinNote(message:string): void {
        Dispatcher.dispatch({
            actionType: ActionTypes.PIN_UP,
            payload: message
        });
    }
    
    public clearNotes(): void {
        Dispatcher.dispatch({
            actionType: ActionTypes.PIN_UP
        });
    }
}

export const Action = new FluxAction();

export enum ActionTypes {
    PIN_UP,
    CLEAR
}