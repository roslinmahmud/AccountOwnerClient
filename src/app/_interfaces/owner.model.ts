import { Account } from "./account.model";

export interface Owner{
    Id: string;
    Name: string;
    DateOfBirth: string;
    Address: string;

    Accounts?:Account[];
}