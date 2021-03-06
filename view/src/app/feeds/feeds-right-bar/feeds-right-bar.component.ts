import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { FollowServiceService } from './../../service/follow-service/follow-service.service';
import { DataSharedVarServiceService } from './../../service/data-shared-var-service/data-shared-var-service.service';
import { ProfilePictureCropperComponent } from './../../popups/profile-picture-cropper/profile-picture-cropper.component';
import { FollowViewAllComponent } from './../../popups/follow-view-all/follow-view-all.component';

import { SigninSignupServiceService } from './../../service/signin-signup-service/signin-signup-service.service';
import { ComponentConnectServiceService } from './../../service/component-connect-service.service';
import { TopicRoutingServiceService } from './../../service/topic-routing-service/topic-routing-service.service';

@Component({
  selector: 'app-feeds-right-bar',
  templateUrl: './feeds-right-bar.component.html',
  styleUrls: ['./feeds-right-bar.component.css']
})
export class FeedsRightBarComponent implements OnInit {


  ImageBaseUrl: String = 'http://localhost:3000/static/images';
  VideoBaseUrl: String = 'http://localhost:3000/static/videos';
  UserImageBaseUrl: String = 'http://localhost:3000/static/users';
  TopicImageBaseUrl: String = 'http://localhost:3000/static/topics';
  OtherImageBaseUrl: String = 'http://localhost:3000/static/others';


  scrollHeight;
  screenHeight: number;
  UserInfo: any;
  FollowingUsers: any[];
  FollowingTopics: any[];
  UserFollowingUsers: any[];
  YourTopics: any[];
  LoderOne: Boolean = true;
  LoderTwo: Boolean = true;
  LoderThree: Boolean = true;
  LoderFour: Boolean = true;

  UserCoinInfo: any[];
  SowCoinCount: Boolean = false;

  constructor(private router: Router,
    private FollowService: FollowServiceService,
    private ShareService: DataSharedVarServiceService,
    private _componentConnectService: ComponentConnectServiceService,
    private _topicRoutingService: TopicRoutingServiceService,
    private _signinService: SigninSignupServiceService,
    public dialog: MatDialog) {
                this.UserInfo = JSON.parse(localStorage.getItem('currentUser'));

                this.FollowService.FollowingTopics(this.UserInfo.data._id)
                .subscribe( topicdatas => {
                    if (topicdatas['status'] === 'True') {
                      this.LoderThree = false;
                      this.FollowingTopics = topicdatas['data'];
                    }else {
                      this.LoderThree = false;
                      console.log(topicdatas);
                    }
                });

                this._signinService.UserCoinCount(this.UserInfo.data._id)
                .subscribe( datas => {
                    if (datas['status'] === 'True') {
                      this.UserCoinInfo = datas;
                      this.SowCoinCount = true;
                    }else {
                      console.log(datas);
                    }
                });

                this.FollowService.FollowingUsers(this.UserInfo.data._id)
                .subscribe( userdatas => {
                    if (userdatas['status'] === 'True') {
                      this.LoderTwo = false;
                      this.FollowingUsers = userdatas['data'];
                    }else {
                      this.LoderTwo = false;
                      console.log(userdatas);
                    }
                });

                this.FollowService.UserFollowingUsers(this.UserInfo.data._id)
                .subscribe( userFollowdatas => {
                    if (userFollowdatas['status'] === 'True') {
                      this.LoderOne = false;
                      this.UserFollowingUsers = userFollowdatas['data'];
                    }else {
                      this.LoderOne = false;
                      console.log(userFollowdatas);
                    }
                });

                this.FollowService.YourTopics(this.UserInfo.data._id)
                .subscribe( topicdatas => {
                    if (topicdatas['status'] === 'True') {
                      this.LoderFour = false;
                      this.YourTopics = topicdatas['data'];
                    }else {
                      this.LoderFour = false;
                      console.log(topicdatas);
                    }
                });

            }



  ngOnInit() {
    this.screenHeight = window.innerHeight - 70;
    this.scrollHeight = this.screenHeight + 'px';
  }


  EditProfilePic() {
    const EditProfilePicDialogRef = this.dialog.open( ProfilePictureCropperComponent,
      {disableClose: true, maxWidth: '99%', position: {top: '50px'},  data: { Header: 'Form', type: 'Creat Form' } });
      EditProfilePicDialogRef.afterClosed().subscribe(result => this.postSubmit(result));
  }

  postSubmit(result) {
    if ( result === 'Close') {
      console.log(result);
    }else {
      this.UserInfo['data'].UserImage = result['data'].UserImage;
    }
  }



  AllFollowingTopics() {
    const DiscoverDialogRef = this.dialog.open(
      FollowViewAllComponent, {disableClose: true, maxWidth: '99%', position: {top: '50px'},
      data: { Header: 'Following Topics', Userid: this.UserInfo.data._id, type: 'FollowingTopics'} }
    );
    DiscoverDialogRef.afterClosed().subscribe(result => {
      if (result.status === 'GoToTopic') {
        this.ShareService.SetTopicQuestions(result.topicId);
        this._topicRoutingService.TopicRouting();
      }
    });
  }

  AllFollowingUsers() {
    const DiscoverDialogRef = this.dialog.open(
      FollowViewAllComponent, {disableClose: true, maxWidth: '99%', position: {top: '50px'},
      data: { Header: 'Following People', Userid: this.UserInfo.data._id, type: 'FollowingUsers'} }
    );
    DiscoverDialogRef.afterClosed().subscribe(result => {
      if (result.status === 'GoToProfile') {
        console.log('Go to Profile Page');
        this.GotoProfile(result.Id);
      }
    });
  }



  AllUserFollowingUsers() {
    const DiscoverDialogRef = this.dialog.open(
      FollowViewAllComponent, {disableClose: true, maxWidth: '99%', position: {top: '50px'},
      data: { Header: 'Followed By', Userid: this.UserInfo.data._id, type: 'UserFollowingUsers'} }
    );
    DiscoverDialogRef.afterClosed().subscribe(result => {
      if (result.status === 'GoToProfile') {
        console.log('Go to Profile Page');
        this.GotoProfile(result.Id);
      }
    });
  }

  AllYourTopics() {
    const DiscoverDialogRef = this.dialog.open(
      FollowViewAllComponent, {disableClose: true, maxWidth: '99%', position: {top: '50px'},
      data: { Header: 'Your Topics', Userid: this.UserInfo.data._id, type: 'AllUserTopics'} }
    );
    DiscoverDialogRef.afterClosed().subscribe(result => {
      if (result.status === 'GoToTopic') {
        this.ShareService.SetTopicQuestions(result.topicId);
        this._topicRoutingService.TopicRouting();
      }
    });
  }


  GotoProfile(Id) {
    this.ShareService.SetProfilePage(Id);
    this.router.navigate(['Profile']);
  }

  GotoTopic(Id) {
    this.ShareService.SetTopicQuestions(Id);
    this._topicRoutingService.TopicRouting();
  }


}
