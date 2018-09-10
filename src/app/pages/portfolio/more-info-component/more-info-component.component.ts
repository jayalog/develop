import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TeamDetails } from '../add-project-modal/team-details-vo';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UrlExtractorService } from '../../../services/url.extractor.service';

@Component({
  selector: 'fury-add-project-modal',
  templateUrl: './more-info-component.component.html',
  styleUrls: ['./more-info-component.component.scss']
})
export class MoreInfoComponent implements OnInit {
  teamColumns: string[] = ['name', 'phone', 'email', 'role'];
  teamDetails: TeamDetails[] = [];
  portfolio: any;
  projecturl: SafeResourceUrl;
  constructor(public dialogRef: MatDialogRef<MoreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private urlService: UrlExtractorService) { }

  ngOnInit() {
    if (this.portfolio) {
      let url = this.urlService.getEmbedUrl(this.portfolio.url);
      if (url)
        this.projecturl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      else
        this.projecturl = url;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

@Injectable()
export class MoreInfoModal {
  private dialogRef: MatDialogRef<MoreInfoComponent>;
  constructor(public dialog: MatDialog) { }

  open(): MatDialogRef<MoreInfoComponent> {
    this.dialogRef = this.dialog.open(MoreInfoComponent, {
      panelClass: 'dialog-wide',
      disableClose: true
    });
    return this.dialogRef;
  }
}
