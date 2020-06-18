import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
   private baseUrl = 'http://localhost:3000/api/v1';
  


  constructor( private _http: HttpClient) { }

  public getCountryNames(): Observable<any> {
    return this._http.get('./../assets/countryNames.json');
  }

  public getCountryNumbers(): Observable<any> {
    return this._http.get('./../assets/countryPhoneCodes.json');
  }

  public signupFunction(data: any): Observable<any> {
    const params = new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('email', data.email)
    .set('country', data.country)
    .set('mobile', data.mobile)
    .set('password', data.password)
    return this._http.post(`${this.baseUrl}/users/signup`, params)
  }
public loginFunction(data: any): Observable<any> {
 // console.log(data)
  const params = new HttpParams()
  .set('email', data.email)
  .set('password', data.password)
  return this._http.post(`${this.baseUrl}/users/login`, params)
}

public setUserInfoInLocalStorage = (data: any) => {
  localStorage.setItem('userInfo', JSON.stringify(data));
}//end of setlocalstorage Function

public getUserInfoFromLocalStorage: any = () => {
  return JSON.parse(localStorage.getItem('userInfo'));
}//end getlocalstorage function

public logout(userId,authToken): Observable<any>{

  const params = new HttpParams()
    .set('authToken',authToken)

  return this._http.post(`${this.baseUrl}/users/${userId}/logout`, params);
}//end deleteMeeting

public resetPassword(data: any): Observable<any>{
  const params = new HttpParams()
    .set('email', data.email)
  return this._http.post(`${this.baseUrl}/users/reset-link`, params);
}//end resetPasswordLInk

public updatePassword(data: any): Observable<any> {
  const params = new HttpParams()
  .set('validationToken', data.secret)
  .set('password', data.password)
  return this._http.post(`${this.baseUrl}/users/update-password`, params)
} 

public getAllRequestSent(data): Observable<any> {
  return this._http.get(`${this.baseUrl}/friends/view/friend/request/sent/${data.userId}?authToken=${data.authToken}`)
}

public sendFriendRequest(data): Observable<any>{

  const params = new HttpParams()
    .set('senderId',data.senderId)
    .set('senderName',data.senderName)
    .set('recieverId',data.recieverId)
    .set('recieverName',data.recieverName)
    .set('authToken',data.authToken)
    

  return this._http.post(`${this.baseUrl}/friends/send/friend/request`, params);
}//end sendFriendRequest

public rejectFriendRequest(data): Observable<any>{

  const params = new HttpParams()
    .set('senderId',data.senderId)
    .set('senderName',data.senderName)
    .set('recieverId',data.recieverId)
    .set('recieverName',data.recieverName)
    .set('authToken',data.authToken)
    

  return this._http.post(`${this.baseUrl}/friends/reject/friend/request`, params);
}

public cancelFriendRequest(data): Observable<any>{

  const params = new HttpParams()
    .set('senderId',data.senderId)
    .set('senderName',data.senderName)
    .set('recieverId',data.recieverId)
    .set('recieverName',data.recieverName)
    .set('authToken',data.authToken)
    

  return this._http.post(`${this.baseUrl}/friends/cancel/friend/request`, params);
}

public acceptFriendRequest(data): Observable<any>{

  const params = new HttpParams()
    .set('senderId',data.senderId)
    .set('senderName',data.senderName)
    .set('recieverId',data.recieverId)
    .set('recieverName',data.recieverName)
    .set('authToken',data.authToken)
    

  return this._http.post(`${this.baseUrl}/friends/accept/friend/request`, params);
}

public unfriendUser(data): Observable<any>{

  const params = new HttpParams()
    .set('senderId',data.senderId)
    .set('senderName',data.senderName)
    .set('recieverId',data.recieverId)
    .set('recieverName',data.recieverName)
    .set('authToken',data.authToken)
    

  return this._http.post(`${this.baseUrl}/friends/unfriend/user`, params);
}

public addHistory(data): Observable<any>{
  
  const params = new HttpParams()
    .set('listId', data.listId)
    .set('key', data.key)
    .set('itemId', data.itemId)
    .set('subItemId', data.subItemId)
    .set('authToken',data.authToken)
    
  return this._http.post(`${this.baseUrl}/history/addHistory`, params);
} 

public getHistory(data): Observable<any>{
  
  const params = new HttpParams()
    .set('listId', data.listId)
    .set('authToken',data.authToken)

  return this._http.post(`${this.baseUrl}/history/deleteHistory`, params);
}

}


