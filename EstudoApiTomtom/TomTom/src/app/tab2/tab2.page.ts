import { Component } from '@angular/core';
import tt from "@tomtom-international/web-sdk-maps";
import {HttpClient} from "@angular/common/http";
import { Geolocation, Position } from '@capacitor/geolocation';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  map!: any;
  input: any;
  latitude: any;
  longitude: any;
  reverseGeoCoded: any;
  resultado!: any;
  searchResultMarker: any;

  constructor(private http: HttpClient) {
    this.map = tt.map({
      key: "Lb4TsGDFHoP5ldvIcvjZEkKHPXx88xZk",
      container: "map",
      center: new tt.LngLat(-35.2604, -5.90606 ),
      zoom: 10,
    });
    let maker = new tt.Marker()
      .setLngLat(new tt.LngLat(-35.206, 5.0906))
      .addTo(this.map)
    this.input = 'Pizza'
  }
  async getCordenadas(){
    const coordinates:Position = await
      Geolocation.getCurrentPosition();
    console.log('Posição atual é', coordinates)
    let maker2 = new tt.Marker({color: 'red'})
      .setLngLat([coordinates.coords.longitude, coordinates.coords.latitude])
      .addTo(this.map);
  }
  async getEndereco(localizacaoAtual: any){
      const res: any = await   this.http.get(`https://api.tomtom.com/search/2/reverseGeocode/${localizacaoAtual.latitude}%2C${localizacaoAtual.longitude}.json?key=Lb4TsGDFHoP5ldvIcvjZEkKHPXx88xZk`)
        .toPromise();
      this.reverseGeoCoded = res.addresses[0].address.freeformAddress + ' ' + res.addresses[0].address.countryCodeISO3;
  }
  async buscador(query: any) {
    const coordinates: Position =
      await Geolocation.getCurrentPosition();
    const res: any =
      await this.http.get (`https://api.tomtom.com/search/2/search/${query}.json? lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&key=Lb4TsGDFHoP5ldvIcvjZEkKHPXx88xZk`).toPromise();
    console.log(res.results);
    this.resultado = res.results
  }
  locateResult(place: any) {
    this.searchResultMarker = new tt.Marker({ color: 'orange' }).setLngLat([place.position.lon, place.position.lat]).addTo(this.map);
    this.map.setCenter({ lng: place.position.lon, lat: place.position.lat });
    this.map.setZoom(15);
  }
}
