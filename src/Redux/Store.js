import { createStore } from "redux";
import * as At from './Actiontype/Actiontype';

const init = (state) =>{
    counter=0;
}

export const Counterstore = () =>{
    
    let store = createStore(state=init,action);
        return{
            switch (action.type) {
                case At.INCREEMENT_COUNTE:{
                    return{
                        ...state,
                        state + 1;
                    }
                }

 
            }
        }
}
