import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserService } from '../services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[];
  searchString = '';
  private notifier: NotifierService;

  constructor(private userService: UserService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data['users'];
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }

  searchName() {
    if (this.searchString === '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter(
        res => {
          return res.name.toLocaleLowerCase().match(this.searchString.toLocaleLowerCase());
        }
      );
    }
  }

  addUserEnter(id: number) {
    this.userService.addUserEnter(id).subscribe(
      data => {
        if (data['status'] === 200) {
          this.notifier.notify( 'success', 'ورود فرد ثبت شد' );
        } else {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، ورود ثبت نشد' );
        }
        console.log(data);
        this.getUsers();
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }

  addUserOut(id: number) {
    this.userService.addUserOut(id).subscribe(
      data => {
        if (data['status'] === 200) {
          this.notifier.notify( 'success', 'خروج فرد ثبت شد' );
        } else {
          this.notifier.notify( 'info', 'مشکلی پیش آمده، خروج ثبت نشد' );
        }
        console.log(data);
        this.getUsers();
      },
      error => {
        this.notifier.notify( 'warning', 'سرویس در دسترس نمی باشد' );
        console.log(error);
      }
    );
  }
}