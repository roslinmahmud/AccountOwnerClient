import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Owner } from 'src/app/_interfaces/owner.model';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css']
})
export class OwnerUpdateComponent implements OnInit {
  public ownerForm: FormGroup;
  public owner: Owner;
  public errorMessage: string;

  constructor(private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
    
    this.getOwnerById();
  }

  public getOwnerById() {
    let ownerId: string = this.activeRoute.snapshot.params['id'];
    this.repository.get('api/owner/'+ownerId+'/account')
    .subscribe(res=>{
      this.owner = res as Owner;
      this.ownerForm.patchValue(this.owner);
      $('#dateOfBirth').val(this.datePipe.transform(this.owner.dateOfBirth, 'MM/dd/yyyy'));
    },
    (error)=>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public validateControl = (controlName: string) => {
    if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched)
      return true;
  
    return false;
  }
  
  public hasError = (controlName: string, errorName: string)  => {
    if (this.ownerForm.controls[controlName].hasError(errorName))
      return true;
  
    return false;
  }
  
  public executeDatePicker = (event) => {
    this.ownerForm.patchValue({ 'dateOfBirth': event });
  }
  
  public redirectToOwnerList = () => {
    this.router.navigate(['/owner/list']);
  }

  public updateOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue);
    }
  }
  
  private executeOwnerUpdate = (ownerFormValue) => {
    const date = new Date(ownerFormValue.dateOfBirth);
    this.owner.name = ownerFormValue.name;
    this.owner.dateOfBirth = this.datePipe.transform(date, "yyyy-MM-dd");
    this.owner.address = ownerFormValue.address;
  
    let apiUrl = `api/owner/${this.owner.id}`;
    this.repository.update(apiUrl, this.owner)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }

}
