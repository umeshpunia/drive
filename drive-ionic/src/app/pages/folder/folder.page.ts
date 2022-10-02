import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddFolderComponent } from 'src/app/components/add-folder/add-folder.component';
import { AuthService } from 'src/app/services/auth.service';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  folderRes: any;
  folderData: any;
  constructor(
    private ar: ActivatedRoute,
    private folderSer: FolderService,
    private authSer: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    let id = this.ar.snapshot.paramMap.get('id');

    this.getFolder(id);
    this.getFilesAndFolder(id);
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
      console.log(res);
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
