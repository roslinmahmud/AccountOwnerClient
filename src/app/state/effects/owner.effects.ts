import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import{ EMPTY } from 'rxjs';
import { map, catchError, exhaustMap, mergeMap, concatMap } from 'rxjs/operators';
import { RepositoryService } from '../../shared/services/repository.service';
import { Owner } from '../../_interfaces/owner.model';

import * as OwnerActions from '../owners.actions';

@Injectable()
export class OwnerEffects{

    loadOwner = createEffect(
        ()=> this.actions.pipe(
            ofType(OwnerActions.RetrieveOwnerList),
            exhaustMap(
                ()=>{
                    return this.repository.get("api/owner").pipe(
                    map(owners=>OwnerActions.retrieveOwnerList({Owner: owners as Owner[]})),
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