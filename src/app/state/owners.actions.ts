import { createAction, props } from '@ngrx/store';
import { Owner } from '../_interfaces/owner.model';

export const RetrieveOwnerList:string = '[API/Owner List] Retrieve Owner';
export const RemoveOwner:string = '[Owner List] Remove Book';

export const retrieveOwnerList = createAction(
    '[API/Owner List] Retrieve Owner',
    props<{Owner: Owner[]}>()
);

export const removeOwner = createAction(
    '[Owner List] Remove Book',
    props<{ownerId: string}>()
);