import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Owner } from 'src/app/_interfaces/owner.model';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  public owner: Owner;
  public errorMessage: string = '';
  
  constructor(private repository: RepositoryService,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getOwnerDetails();
  }

  private getOwnerDetails = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    
    let apiUrl: string = `api/owner/${id}/account`;
    this.repository.get(apiUrl)
    .subscribe(res=>{
      this.owner = res as Owner;
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

}
