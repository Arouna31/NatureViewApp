import { Component } from "@angular/core";
import {
  IonicPage,
  ViewController,
  NavParams,
  ToastController,
  LoadingController
} from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";

@IonicPage()
@Component({
  selector: "page-set-coordinates",
  templateUrl: "set-coordinates.html"
})
export class SetCoordinatesPage {
  longitude: number;
  latitude: number;
  marker: { latitude: number; longitude: number; draggable: true };

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private geolocation: Geolocation
  ) {}

  ngOnInit(): void {
    const recievedLatitude = this.navParams.get("latitude");
    const recievedLongitude = this.navParams.get("longitude");

    if (recievedLatitude) {
      this.latitude = recievedLatitude;
      this.longitude = recievedLongitude;
      this.marker = {
        latitude: recievedLatitude,
        longitude: recievedLongitude,
        draggable: true
      };
    } else {
      this.latitude = 5.2990141;
      this.longitude = -3.9719853;
    }
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

  onMapClicked($event) {
    this.marker = {
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true
    };
  }

  onSave() {
    this.viewCtrl.dismiss({
      latitude: this.marker.latitude,
      longitude: this.marker.longitude
    });
  }

  onLocateUser() {
    const loader = this.loadingCtrl.create({
      content: "recherche de votre position..."
    });

    loader.present();

    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        loader.dismiss();
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.marker = {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude,
          draggable: true
        };
      })
      .catch(error => {
        loader.dismiss();
        this.toastCtrl
          .create({
            message: error,
            duration: 3000,
            position: "bottom"
          })
          .present();
      });
  }
}
