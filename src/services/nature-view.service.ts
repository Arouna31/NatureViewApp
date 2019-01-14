import { NatureView } from "../models/nature-view.model";
import { Subject } from "rxjs/Subject";

export class NatureViewService {
  private natureViewList: NatureView[];
  natureView$ = new Subject<NatureView[]>(); // $ at the end to show that it's a subject

  emitNatureViewList() {
    this.natureView$.next(this.natureViewList);
  }

  addNatureView(natureView: NatureView) {
    this.natureViewList.push(natureView);
    this.emitNatureViewList();
  }
}
