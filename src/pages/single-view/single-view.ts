import { Component } from "@angular/core";
import { IonicPage, NavParams } from "ionic-angular";
import { NatureView } from "../../models/nature-view.model";

@IonicPage()
@Component({
  selector: "page-single-view",
  templateUrl: "single-view.html"
})
export class SingleViewPage {
  natureView: NatureView;

  constructor(public navParams: NavParams) {}

  ngOnInit() {
    this.natureView = this.navParams.get("natureView");
  }
}
