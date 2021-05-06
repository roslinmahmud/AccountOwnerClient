import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import{ EMPTY } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { RepositoryService } from '../../shared/services/repository.service';

import * as OwnerActions from '../owners.actions';

@Injectable()
export class OwnerRemoveEffects{

    removeOwner = createEffect(
        ()=> this.actions.pipe(
            ofType<{ownerId, type}>(OwnerActions.RemoveOwner),
            exhaustMap(
                (action) => {
                    return this.repository.delete("api/owner/"+action.ownerId).pipe(
                    map(()=>OwnerActions.removeOwner({ownerId: action.ownerId as string})),
                    catchError(()=>EMPTY)
                )
                }
            )
        )
    );

    constructor(
        private actions: Actions,
        private repository: RepositoryService
    ){}
}