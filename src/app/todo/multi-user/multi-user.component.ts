import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './../../app.service';
import { TodoService } from './../../todo.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocketService } from "./../../socket.service";
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-multi-user',
  templateUrl: './multi-user.component.html',
  styleUrls: ['./multi-user.component.css']
})
export class MultiUserComponent implements OnInit, OnDestroy {
  public userId: string;
  public userName: string;
  public userInfo: any;
  public authToken: string;
  public userDetails: any;
  public cookieFriends:any;
  public userFriendsTemp: any = []
  public userFriends: any = []
  public hidden: boolean;
  public selectedListId;
  public selectedList;
  public allLists = [];
  public allItems = [];
  public selectedListDetail: any;
  public itemName: any;
  public currentItemDetail;
  
   

  constructor(public fb: FormBuilder, public appService: AppService, public router: Router, public toastr: ToastrManager, public socketService: SocketService, public cookie: CookieService, public todoService: TodoService) { }

  ngOnInit() {
    this.authToken = this.cookie.get('authToken');
    this.userId = this.cookie.get('userId');
    this.userName = this.cookie.get('userName');
    this.userInfo = this.appService.getUserInfoFromLocalStorage()
    $(document).ready(function () {
      $('#createListForm').hide()
    });
    let KeyPress = (e) => {
      var evtobj = window.event? event : e
      if (evtobj.keyCode == 90 && evtobj.ctrlKey)  this.fetchHistory()    ;
}

     document.onkeydown = KeyPress;

    this.userInfo = this.appService.getUserInfoFromLocalStorage()
    
    this.userFriendsTemp.push(this.userId)

    for (let x of this.userInfo.friends) {
      this.userFriendsTemp.push(x.friendId)
      this.userFriends.push(x.friendId) 
    }

    

  }

  ngOnDestroy() {
    this.socketService.exitSocket()
  }

  public fetchHistory = () => {
    let data = {
      listId: this.selectedListId,
      authToken: this.authToken
    }
    this.todoService.getHistory(data).subscribe(apiResponse => {

    })
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

  createListForm = this.fb.group({
    listName: [null, Validators.required],
    listType: ['private', Validators.required]
  })

  addItemForm = this.fb.group({
    itemName: [null, Validators.required]
  })

  showForm() {
    $('#createListForm').slideToggle()
  }

  eventHandler($event: any) {
    if ($event.keycode == 13) {
      this.onSubmit()
    }
  }
  itemNameEvent($event: any) {
    if ($event.keycode == 13) {
      this.addItem()
    }
  }





  onSubmit() {
   delete this.selectedListId
   delete this.selectedList
    let data = {
      listName: this.createListForm.value.listName,
      listCreatorId: this.userId,
      listCreatorName: this.userName,
      listMode: this.createListForm.value.listType,
      authToken: this.authToken

    }
    this.todoService.createNewList(data).subscribe(apiResponse => {
      if (apiResponse.status === 200) {
        this.toastr.successToastr("List Created")
        this.createListForm.reset()
        this.showForm()
        this.getAllListFunction()
      } else {
        this.toastr.errorToastr(apiResponse.message)
        this.createListForm.reset()
        this.showForm()

      }
    }, (error) => {
      this.toastr.errorToastr(error)

    })
  }
  public getAllListFunction = () => { 
    this.allLists = []
    if (this.userId && this.authToken) {
      let data = {
        userId: this.userId,
        authToken: this.authToken
      }
      this.todoService.getAllList(data).subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.allLists = apiResponse.data;
          this.allLists.reverse()
        }
        else {
          this.toastr.infoToastr(apiResponse.message, "Update is done");
          this.allLists.length = 0;
        }
      },
        (error) => {
          if (error.status == 400) {
            this.toastr.warningToastr("Lists Failed to Update", "Either user or List not found");
            this.allLists.length = 0;
          }
          else {
            this.toastr.errorToastr("Some Error Occurred", "Error!");
            this.router.navigate(['/serverError']);

          }
        }
      );

    }
    else {
      this.toastr.infoToastr("Missing Authorization Key", "Please login again");
      this.router.navigate(['/user/login']);

    }

  }

  public deleteList() {
    let data = {
      listId: this.selectedListId,
      authToken: this.authToken
    }
    this.todoService.deleteList(data).subscribe(apiResponse => {
      if(apiResponse.status === 200) {
        this.toastr.successToastr('list deleted')
        delete this.selectedList
        delete this.selectedListId
        this.getAllListFunction()
      } else {
        this.toastr.errorToastr(apiResponse.message)
        
      }
    }, error => {
      this.toastr.errorToastr(error.message)
      this.router.navigate(['/server-error'])
    })
  }

  getUpdatesFromContainer(data) {

    let dataForNotify = {
      message: data.message,
      userId: this.userFriends,
      listId:data.listId
    }

  }
  public updateList= (listMode) => {
    
  
    let data = {
      listId: this.selectedListDetail.listId,
      listName : this.selectedListDetail.listName,
      listMode: listMode,
      authToken: this.authToken
    }
    if(listMode == 'private') {
      delete this.selectedListId
      delete this.selectedList
      this.allLists.length = 0
    }
    this.todoService.updateList(data).subscribe(apiResponse => {
      if(apiResponse.status === 200) {
        this.getListDetails(this.selectedListId)
        this.toastr.successToastr('list updated')
      } else {
        this.toastr.errorToastr(apiResponse.message)
      }
    }, error => {
      this.toastr.errorToastr(error.message)
    })
  
  }
    

  public getListItems = (listId, listName) => {
    
    this.getListDetails(listId)
      this.selectedListId = listId
      this.selectedList = listName
      let data = {
        listId: listId,
        authToken: this.authToken
      }
      this.todoService.getListItem(data).subscribe(apiResponse => {
        this.allItems = []
        if (apiResponse.status === 200) {
          this.allItems = apiResponse.data
          this.allItems.reverse()
          this.toastr.infoToastr('list details fetched')
          
        } else {
          this.toastr.errorToastr(apiResponse.message)
        }
      }, (error) => {
        this.toastr.errorToastr(error.message, 'Error')
      })
    }
    public getListDetails = (listId) => {
      let data = {
        listId: listId,
        authToken: this.authToken
      }
      this.todoService.getListDetail(data).subscribe(apiResponse => {
        this.selectedListDetail = '';
        if (apiResponse.status === 200) {
          this.selectedListDetail = apiResponse.data
          this.toastr.successToastr('List details fetched')   
        } else  {
          this.toastr.errorToastr(apiResponse.message, 'Error')
        }
      }, (error) => {
        this.toastr.errorToastr(error.message, 'Error')
      })
    }  
    public deleteItem(itemId) {
      let data = {
        authToken: this.authToken,
        itemId: this.currentItemDetail.itemId
      }
      this.todoService.deleteItemId(data).subscribe(apiResponse => {
        if(apiResponse.status === 200) {
          this.toastr.successToastr('item deleted')
          this.getListItems(this.selectedListId, this.selectedList)
          this.pushToHistory(itemId)
        } else {
          this.toastr.errorToastr(apiResponse.message)
        }
      }, error => {
        this.toastr.errorToastr(error.message);
        
      })
    }
    public pushToHistory = (itemId) => {
       let data = {
         listId: this.selectedListId,
         key: 'details updated',
         itemId: itemId,      
         authToken: this.authToken
       }
       this.todoService.addHistory(data).subscribe(apiResponse => {
       })
     }

    public itemDone = (itemId) => {
       let data = {
         authToken: this.authToken,
         itemId: itemId,
         itemDone: 'yes'
       }
   
       this.todoService.itemDone(data).subscribe(apiResponse => {
         if (apiResponse.status === 200) {
           this.getListItems(this.selectedListId, this.selectedList)
           this.toastr.successToastr('item Done')
         } else {
           this.toastr.errorToastr(apiResponse.message)
         }
       }, (error) => {
         this.toastr.errorToastr(error.message)
       })
     }
   
     itemNotDone = (itemId) => {
       let data = {
         authToken: this.authToken,
         itemId: itemId,
         itemDone: 'no'
       }
   
       this.todoService.itemNotDone(data).subscribe(apiResponse => {
         if (apiResponse.status === 200) {
           this.getListItems(this.selectedListId, this.selectedList)
           this.toastr.successToastr('item not Done')
         } else {
           this.toastr.errorToastr(apiResponse.message)
         }
       }, (error) => {
         this.toastr.errorToastr(error.message)
       })
     }

     public addItem = () => {
   
       let data = {
         listId: this.selectedListId,
         itemName: this.itemName,
         itemCreatorId: this.userId,
         itemCreatorName: this.userName,
         authToken: this.authToken
       }
   
       this.todoService.addItem(data).subscribe(apiResponse => {
         if (apiResponse.status === 200) {
           this.toastr.successToastr('Item added')
           this.getListItems(this.selectedListId, this.selectedList)
           this.allItems = []
           this.allItems = apiResponse.data;
           delete this.itemName
         } else {
           this.toastr.errorToastr(apiResponse.message, 'Error')
         }
       }, (error) => {
         this.toastr.errorToastr(error.message)
       })
   
     }

}
