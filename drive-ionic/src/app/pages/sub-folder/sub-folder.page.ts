import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddFolderComponent } from 'src/app/components/add-folder/add-folder.component';
import { AuthService } from 'src/app/services/auth.service';
import { FolderService } from 'src/app/services/folder.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sub-folder',
  templateUrl: './sub-folder.page.html',
  styleUrls: ['./sub-folder.page.scss'],
})
export class SubFolderPage implements OnInit {
  folderRes: any;
  folderData: any;
  subFolderRes: any;
  subFolderData: any;
  constructor(
    private ar: ActivatedRoute,
    private folderSer: FolderService,
    private authSer: AuthService,
    private modalController: ModalController,
    private sharedSer: SharedService
  ) {}

  id: any;

  ngOnInit() {
    let id = this.ar.snapshot.paramMap.get('id');
    this.id = id;
    this.getFolder(id);
    this.getFilesAndFolder(id);

    this.sharedSer.isFolderCreated.subscribe((res) => {
      if (res) {
        this.getFilesAndFolder(id);
      }
    });
  }

  // refresher
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getFilesAndFolder(this.id);
    }, 2000);
  }

  getFolder(id: string) {
    this.folderSer.getInsideFolder(id).subscribe((res) => {
      this.folderRes = res;
      console.log(res);
      if (this.folderRes.status == 200) {
        this.folderData = this.folderRes.msg;
      }
    });
  }

  getFilesAndFolder(id: string) {
    let json = {
      id,
      email: this.authSer.login,
    };
    this.folderSer.getInsideFolderFiles(json).subscribe((res) => {
      this.subFolderRes = res;
      if (this.subFolderRes.status == 200) {
        this.subFolderData = this.subFolderRes.msg;
        console.log(this.subFolderData);
      }
    });
  }

  // modal
  //  folder
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddFolderComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      componentProps: {
        parentFolder: this.folderData.name,
        parentFolderId: this.folderData._id,
      },
    });
    await modal.present();
  }
}
