import { NatureView } from "../models/nature-view.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class NatureViewService {
  private natureViewList: NatureView[];
  natureView$ = new Subject<NatureView[]>(); // $ at the end to show that it's a subject

  constructor(private storage: Storage) {}

  emitNatureViewList() {
    this.natureView$.next(this.natureViewList);
  }

  addNatureView(natureView: NatureView) {
    this.natureViewList.push(natureView);
    this.saveList();
    this.emitNatureViewList();
  }

  saveList() {
    this.storage.set("views", this.natureViewList);
  }

  fetchList() {
    this.storage.get("views").then(list => {
      if (list && list.length) {
        this.natureViewList = list.slice();
      }
      this.emitNatureViewList();
    });
  }
}
