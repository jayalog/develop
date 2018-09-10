import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoreInfoModal } from '../more-info-component/more-info-component.component';
import { UrlExtractorService } from '../../../services/url.extractor.service';

@Component({
  selector: 'fury-project-details-grid',
  templateUrl: './project-details-grid.component.html',
  styleUrls: ['./project-details-grid.component.scss']
})
export class ProjectDetailsGridComponent implements OnInit {
  @Input() portfolio: any[] = [];
  @Output() editProject: EventEmitter<any> = new EventEmitter();
  @Output() deleteProject: EventEmitter<any> = new EventEmitter();
  @Output() onAddProject: EventEmitter<any> = new EventEmitter();
  dialogRef: any;
  addProject: Object[] = [];
  constructor(private moreInfoModal: MoreInfoModal, private urlService: UrlExtractorService) { }

  ngOnInit() {
    // this.updateAddPro();
  }

  getThubmnailImage(url) {
    let thumbnailUrl = this.urlService.getThumbnailUrl(url);
    if (thumbnailUrl) {
      return thumbnailUrl;
    } else {
      return 'assets/img/backgrounds/video-thumbnail-default.png';
    }

  }

  showMoreDetails(portfolioItem) {
    this.dialogRef = this.moreInfoModal.open();
    this.dialogRef.componentInstance.portfolio = portfolioItem;
  }

  addProjectEvent(i) {
    this.onAddProject.emit(i);
  }

  deleteProjectEvent(i) {
    this.deleteProject.emit(i);
  }

  // updateAddPro() {
  //   this.addProject = [];
  //   if (this.portfolio.length < 3) {
  //     for (let i = 0; i < 3 - this.portfolio.length; i++) {
  //       this.addProject.push({});
  //     }
  //   }
  // }

}
