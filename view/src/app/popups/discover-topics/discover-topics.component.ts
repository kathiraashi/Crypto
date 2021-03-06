import { Component, Directive, Inject, OnInit } from '@angular/core';

import { FollowServiceService } from './../../service/follow-service/follow-service.service';

import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';

@Component({
  selector: 'app-discover-topics',
  templateUrl: './discover-topics.component.html',
  styleUrls: ['./discover-topics.component.css']
})
export class DiscoverTopicsComponent implements OnInit {

  ImageBaseUrl: String = 'http://localhost:3000/static/images';
  VideoBaseUrl: String = 'http://localhost:3000/static/videos';
  UserImageBaseUrl: String = 'http://localhost:3000/static/users';
  TopicImageBaseUrl: String = 'http://localhost:3000/static/topics';
  OtherImageBaseUrl: String = 'http://localhost:3000/static/others';

  UserInfo: any;
  DiscoverTopics: any[];
  LoadingTopics: Boolean = true;

  Header;

  constructor(
    private Service: FollowServiceService,
    private dialogRef: MatDialogRef<DiscoverTopicsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any ) {
        this.UserInfo = JSON.parse(localStorage.getItem('currentUser'));
        this.Header = this.data.Header;
        this.Service.AllUnFollowingTopics(this.UserInfo.data._id)
        .subscribe( datas =>  {
          if (datas['status'] === 'True') {
            this.LoadingTopics = false;
            this.DiscoverTopics = datas['data'];
          }else {
            this.LoadingTopics = false;
            console.log(datas);
          }
        });


      }

  ngOnInit() {

  }

  followTopic(Id: String) {
    const data =  { 'UserId' : this.UserInfo.data._id, 'FollowingTopicId' : Id };
    const index = this.DiscoverTopics.findIndex(x => x._id === Id);
      this.Service.FollowTopic(data)
        .subscribe( datas => {
          if (datas.status === 'True') {
            this.DiscoverTopics.splice(index , 1);
          }else {
            console.log(datas);
          }
      });
  }



  close() {
    this.dialogRef.close({status: 'Close'});
  }
}
