import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocketService } from "./../../socket.service";
import { CookieService } from 'ngx-cookie-service';
import { AppService } from "./../../app.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-manage-friends',
  templateUrl: './manage-friends.component.html',
  styleUrls: ['./manage-friends.component.css'],
  providers: [SocketService]
})
export class ManageFriendsComponent implements OnInit {
  public authToken;
  public userName;
  public userId;
  public allUsers = [];
  public allFriends = [];
  public myDetail = [];
  public myFriends = [];
  public friendRequestRecieved = [];
  public friendRequestSent = [];

  constructor(public router: Router, public toastr: ToastrManager, public socketService: SocketService, public Cookie: CookieService, public appService: AppService) { }

  ngOnInit() {
    this.authToken = this.Cookie.get('authToken');
    this.userName= this.Cookie.get('userName')
    this.userId = this.Cookie.get('userId')
    this.verifyUserConfirmation()

  }

  public verifyUserConfirmation: any = () => {
    this.socketService.verifyUser()
      .subscribe(() => {
        this.socketService.setUser(this.authToken);
      },
        (err) => {
          this.toastr.errorToastr(err, "Some error occured");
        });
  }

  public logOut() {
    this.appService.logout(this.userId,this.authToken).subscribe(apiResponse => {
      if(apiResponse.status === 200) {
        this.toastr.successToastr('logged out successfull')
        this.router.navigate(['/login'])
      } else {
        this.toastr.errorToastr(apiResponse.message)
      }
    }, error => {
      this.toastr.errorToastr(error.message);
      
    })
    
  }

public addFriend(userId, userName) {
  let data = {
    senderId: this.userId,
    senderName: this.userName,
    recieverId: userId,
    recieverName: userName,
    authToken: this.authToken
  }
  this.appService.sendFriendRequest(data).subscribe(apiResponse => {
    if(apiResponse.status === 200) {
      this.toastr.successToastr('Friend request sent')
    } else {
      this.toastr.errorToastr(apiResponse.message)
    }
  }, error => {
    this.toastr.errorToastr(error.messsage)
  })
}

public cancelFriendRequest(userId, userName) {
  let data = {
    senderId: this.userId,
    senderName: this.userName,
    recieverId: userId,
    recieverName: userName,
    authToken: this.authToken
  }

  this.appService.cancelFriendRequest(data).subscribe(apiResponse => {
    if(apiResponse.status === 200) {
      this.toastr.successToastr('friend request cancel')
     
    } else  {
      this.toastr.errorToastr(apiResponse.message)
    }
  }, error => {
    this.toastr.errorToastr(error.message);    
  })
}

public rejectFriendRequest(userId, userName) {
  let data = {
    senderId: userId,
    senderName: userName,
    recieverId: this.userId,
    recieverName: this.userName,
    authToken: this.authToken
  }

  this.appService.rejectFriendRequest(data).subscribe(apiResponse => {
    if(apiResponse.status === 200) {
      this.toastr.successToastr('friend request cancel')
     
     
    } else  {
      this.toastr.errorToastr(apiResponse.message)
    }
  }, error => {
    this.toastr.errorToastr(error.message);    
  })
}

public acceptFriendRequest(friendId, friendName) {
  let data = {
    senderId: friendId,
    senderName: friendName,
    recieverId: this.userId,
    recieverName: this.userName,
    authToken: this.authToken
  }

  this.appService.acceptFriendRequest(data).subscribe(apiResponse => {
    if(apiResponse.status === 200 ) {
      this.toastr.successToastr('friend request accepted')
    } else {
      this.toastr.errorToastr(apiResponse.message)
    }
  }, error => {
    this.toastr.errorToastr(error.message)
  })
}


}
