import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = 'http://localhost:3000/api/v1'
  
  

  constructor(public _http: HttpClient, public cookie: CookieService) { }

  public createNewList(data: any): Observable<any> {
    const params = new HttpParams()
    .set('listName', data.listName)
    .set('listCreatorId', data.listCreatorId)
    .set('listCreatorName', data.listCreatorName)
    .set('listMode', data.listMode)
    .set('authToken', data.authToken)
    
    return this._http.post(`${this.baseUrl}/lists/addList`, params)
  }

  public getAllList(data: any) : Observable<any> {    
    return this._http.get(`${this.baseUrl}/lists/view/all/lists/${data.userId}?authToken=${data.authToken}`)
  }

  public getListDetail(data: any): Observable<any> {
    return this._http.get(`${this.baseUrl}/lists/${data.listId}/details?authToken=${data.authToken}`)
  }

  public getListItem(data: any) : Observable<any> {
    return this._http.get(`${this.baseUrl}/items/view/all/items/${data.listId}?authToken=${data.authToken}`)
  }

  public addItem(data: any) :Observable<any> {
    const params = new HttpParams()
    .set('listId', data.listId)
    .set('itemName', data.itemName)
    .set('itemCreatorId', data.itemCreatorId)
    .set('itemCreatorName', data.itemCreatorName)
    .set('authToken', data.authToken)

     return this._http.post(`${this.baseUrl}/items/additem`, params)
  }

  public getItemDetail(data: any): Observable<any> {
    return this._http.get(`${this.baseUrl}/items/${data.itemId}/details?authToken=${data.authToken}`)
  }

  public itemDone(data : any) : Observable<any> {
    const params = new HttpParams()
    .set('itemDone', data.itemDone)
    

    return this._http.put(`${this.baseUrl}/items/${data.itemId}/updateItem?authToken=${data.authToken}`, params)
  }
  public itemNotDone(data : any) : Observable<any> {
    const params = new HttpParams()
    .set('itemDone', data.itemDone)
    

    return this._http.put(`${this.baseUrl}/items/${data.itemId}/updateItem?authToken=${data.authToken}`, params)
  }
public updateItemName(data: any): Observable<any> {
  const params = new HttpParams()
    .set('itemName', data.itemName)
  return this._http.put(`${this.baseUrl}/items/${data.itemId}/updateItem?authToken=${data.authToken}`, params)
}

public fetchItemDetails(data: any): Observable<any> {
      return this._http.get(`${this.baseUrl}/items/${data.itemId}/details?authToken=${data.authToken}`)
}

public deleteItemId(data: any): Observable<any> {
  const params = new HttpParams()
  .set('authToken', data.authToken)
  return this._http.post(`${this.baseUrl}/items/${data.itemId}/delete`, params)
}

public deleteList(data : any): Observable<any>{

  const params = new HttpParams()
    .set('authToken',data.authToken)

  return this._http.post(`${this.baseUrl}/lists/${data.listId}/delete`, params);
}

public updateList(data: any): Observable<any>{

  const params = new HttpParams()
    .set('listName', data.listName)
    .set('listMode', data.listMode)
    .set('authToken',data.authToken)

  return this._http.put(`${this.baseUrl}/lists/${data.listId}/updateList`, params);
}

public addHistory(data): Observable<any>{
    
  const params = new HttpParams()
    .set('listId', data.listId)
    .set('key', data.key)
    .set('itemId', data.itemId)
    .set('authToken',data.authToken)
    
  return this._http.post(`${this.baseUrl}/history/addHistory`, params);
}

public getHistory(data): Observable<any>{
  
  const params = new HttpParams()
    .set('itemId', data.listId)
    .set('authToken',data.authToken)

  return this._http.post(`${this.baseUrl}/history/getHistory`, params);
}

}
