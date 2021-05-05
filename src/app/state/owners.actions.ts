import { createAction, props } from '@ngrx/store';
import { Owner } from '../_interfaces/owner.model';

export const retrieveOwnerList = createAction(
    '[API/Owner List] Retrieve Owner',
    props<{Owner: Owner[]}>()
);

export const removeOwner = createAction(
    '[Owner List] Remove Book',
    props<{ownerId: string}>()
);