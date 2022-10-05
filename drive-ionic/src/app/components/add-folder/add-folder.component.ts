import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FolderService } from 'src/app/services/folder.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss'],
})
export class AddFolderComponent implements OnInit {
  folderForm!: FormGroup;

  @Input() parentFolder: string;
  @Input() parentFolderId: string;
  constructor(
    private formBuilder: FormBuilder,
    private folderSer: FolderService,
    private authSer: AuthService,
    private sharedSer: SharedService
  ) {}

  ngOnInit() {
    console.log(this.parentFolder);
    this.folderForm = this.formBuilder.group({
      name: '',
    });
  }

  create() {
    let fData = this.folderForm.value;
    let json = {
      name: fData.name,
      email: this.authSer.login,
      parentFolderId: '',
    };

    if (!this.parentFolderId) {
      this.folderSer.createFolder(json).subscribe((res) => {
        console.log('main', res);
      });
    } else {
      let json = {
        name: fData.name,
        email: this.authSer.login,
        parentFolderId: this.parentFolderId,
      };
      this.folderSer.createSubFolder(json).subscribe((res) => {
        console.log('child', res);
      });
    }
  }
}
