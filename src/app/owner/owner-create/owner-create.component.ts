import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { OwnerForCreation } from 'src/app/_interfaces/owner-create.model';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent implements OnInit {
  public errorMessage: string = '';
  public ownerForm: FormGroup;

  constructor(private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private dataPipe: DatePipe) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    })
  }

  public validateControl = (controlName: string) => {
    return (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  public executeDatePicker = (event) => {
    this.ownerForm.patchValue({'dateOfBirth': event});
  }

  public createOwner = (ownerFormValue) => {
    if(this.ownerForm.valid){
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  private executeOwnerCreation(ownerFormValue) {
    const owner: OwnerForCreation = {
      name: ownerFormValue.name,
      dateOfBirth: this.dataPipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: ownerFormValue.address
    }

    const apiUrl = 'api/owner';
    this.repository.create(apiUrl, owner)
    .subscribe(res => {
      $('#successModal').modal();
    },
    (error)=>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public redirectToOwnerList(){
    this.router.navigate(['/owner/list']);
  }

}
