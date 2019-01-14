import { Component, OnInit, OnDestroy } from "@angular/core";
import { NatureViewService } from "../../services/nature-view.service";
import { NatureView } from "../../models/nature-view.model";
import { Subscription } from "rxjs/Subscription";
import { NewViewPage } from "../new-view/new-view";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit, OnDestroy {
  natureViewList: NatureView[];
  natureViewListSubscription: Subscription;
  newViewPage: any = NewViewPage;

  constructor(private natureViewService: NatureViewService) {}

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
}
