import { Component, OnInit, OnDestroy } from "@angular/core";
import { NatureViewService } from "../../services/nature-view.service";
import { NatureView } from "../../models/nature-view.model";
import { Subscription } from "rxjs/Subscription";
import { NewViewPage } from "../new-view/new-view";
import { NavController } from "ionic-angular";
import { SingleViewPage } from "../single-view/single-view";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit, OnDestroy {
  natureViewList: NatureView[];
  natureViewListSubscription: Subscription;
  newViewPage: any = NewViewPage;

  constructor(
    private natureViewService: NatureViewService,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.natureViewListSubscription = this.natureViewService.natureView$.subscribe(
      (list: NatureView[]) => {
        this.natureViewList = list;
      }
    );
    this.natureViewService.emitNatureViewList();
  }

  ngOnDestroy(): void {
    this.natureViewListSubscription.unsubscribe();
  }

  onLoadNatureView(view: NatureView) {
    this.navCtrl.push(SingleViewPage, { natureView: view });
  }
}
