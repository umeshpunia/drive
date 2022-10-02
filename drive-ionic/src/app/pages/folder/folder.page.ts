import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  folderRes: any;
  folderData: any;
  constructor(private ar: ActivatedRoute, private folderSer: FolderService) {}

  ngOnInit() {
    let id = this.ar.snapshot.paramMap.get('id');

    this.getFolder(id);
  }

  getFolder(id: string) {
    this.folderSer.getInsideFolder(id).subscribe((res) => {
      this.folderRes = res;
      if (this.folderRes.status == 200) {
        this.folderData = this.folderRes.msg;
      }
    });
  }
}
