import { ApiResponse } from './../api-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authEvent: Subject<boolean> = new Subject<boolean>();

    constructor(private httpClient: HttpClient){}

    signup(email: string, password: string)
    {
        this.httpClient.post<ApiResponse>(environment.api_url+'/users', {email:email, password: password})
                        .subscribe((response: ApiResponse)=>{
                            console.log(response);
                        });
    }

    authListener()
    {
        return this.authEvent.asObservable();
    }
}