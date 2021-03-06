import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { AppState } from 'src/app/state/app.state';
import { removeOwner, RetrieveOwnerList, retrieveOwnerList } from 'src/app/state/owners.actions';
import { Owner } from 'src/app/_interfaces/owner.model'

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  
  owners$ = this.store.select('owners');
  errorMessage: string = '';

  constructor(private repository: RepositoryService,
     private errorHandler: ErrorHandlerService,
     private router: Router,
     private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch({type: RetrieveOwnerList});
  }

  public getOwnerDetails = (Id) => {
    this.router.navigate(["owner/details/"+Id]);
  }

  public deleteOwner = (Id) => {
    this.store.dispatch(removeOwner({ownerId: Id as string}));
    $('#successModal').modal();
  }

  public redirectToOwnerUpdate = (Id) => {
    this.router.navigate(["/owner/update/"+Id]);
  }

}


  /* public getAllOwners = () => {
    let apiAddress = "api/owner";

    this.repository.get(apiAddress)
    .subscribe((res)=>{
      this.store.dispatch(retrieveOwnerList({Owner: res as Owner[]}));
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  } */


    /* this.repository.delete("api/owner/"+Id)
    .subscribe( res=> {
      $('#successModal').modal();
      this.store.dispatch(removeOwner({ownerId: Id as string}));
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    }) */