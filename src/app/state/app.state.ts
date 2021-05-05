import { Owner } from '../_interfaces/owner.model';

export interface AppState{
    owners: ReadonlyArray<Owner>;
}