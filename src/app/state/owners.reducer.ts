import { createReducer, on, Action } from '@ngrx/store' ;
import { Owner } from '../_interfaces/owner.model';

import {removeOwner, retrieveOwnerList } from './owners.actions';


export const initialState: Array<Owner> = [];

export const ownerReducer = createReducer(
    initialState,
    on(retrieveOwnerList, (state, {Owner}) => [...Owner]),
    on(removeOwner, (state, {ownerId}) => state.filter(owner => owner.id!==ownerId))
);