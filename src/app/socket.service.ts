import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
   private url = "http://localhost:3000/";
  

  public socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
   }


  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      });//On method
    });//end observable
  }//end verifyUser


  public setUser = (authToken) => {
    this.socket.emit('set-user', authToken);
  }


  public notifyUpdates = (data) => {
    this.socket.emit('notify-updates', data);
  }

  public notifyUpdatesItem = (data) => {
    this.socket.emit('notify-updates-item', data);
  }

  public exitSocket = () =>{
    this.socket.disconnect();
  }// end exit socket

  public disconnectedSocket = () => {

      this.socket.emit("disconnect", "");//end Socket

  }//end disconnectedSocket

  public getUpdatesFromUser = (userId) => {
    return Observable.create((observer) => {
      this.socket.on(userId, (data) => {
        observer.next(data);
      }); // end Socket
    }); // end Observable
  }
  public listenAuthError = () => {
    return Observable.create((observer) => {
      this.socket.on('auth-error', (data) => {
        observer.next(data);
      }); // end Socket
    }); // end Observable
  }

    
  public onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on('online-user-list', (userList) => {
        observer.next(userList);
      });//end On method
    });//end observable

  }
}
