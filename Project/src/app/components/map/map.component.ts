import {Component, Input, OnInit} from '@angular/core';
import {MapInfoService} from '../../shared/services/map-info.service';
import {AppGlobals} from "../../app.globals";
import {PublicDataService} from "../../shared/services/public-data.service";

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat = 40.177200;
  lng = 44.503490;
  myMap;

  btnRedMarkerFlag = false;
  btnGreenMarkerFlag = false;
  btnYellowMarkerFlag = false;
  btnBlueMarkerFlag = false;
  btnPurpleMarkerFlag = false;
  btnOrangeMarkerFlag = false;

  markersApartment: any = [];
  markersHouse: any = [];
  markersCommercial: any = [];
  markersLand: any = [];
  markersBusiness: any = [];
  markersNewlyBuilt: any = [];
  markersForApartmentRed = [];
  markersForHouseGreen = [];
  markersForCommercialYellow = [];
  markersForLandBlue = [];
  markersForBusinessPurple = [];
  markersForNewlyBuiltOrange = [];

  markersForApartmentForSale = [];
  markersForApartmentForRent = [];
  markersForApartmentForDailyRent = [];

  infoForApartmentForSale: any = [];
  infoForApartmentForRent: any = [];
  infoForApartmentForDailyRent: any = [];

  markersForHouseForSale = [];
  markersForHouseForRent = [];
  markersForHouseForDailyRent = [];

  infoForHouseForSale: any = [];
  infoForHouseForRent: any = [];
  infoForHouseForDailyRent: any = [];

  markersForCommercialForSale = [];
  markersForCommercialForRent = [];
  markersForCommercialForDailyRent = [];

  infoForCommercialForSale: any = [];
  infoForCommercialForRent: any = [];
  infoForCommercialForDailyRent: any = [];

  markersForLandForSale = [];
  markersForLandForRent = [];
  markersForLandForDailyRent = [];

  infoForLandForSale: any = [];
  infoForLandForRent: any = [];
  infoForLandForDailyRent: any = [];

  markersForBusinessForSale = [];
  markersForBusinessForRent = [];
  markersForBusinessForDailyRent = [];

  infoForBusinessForSale: any = [];
  infoForBusinessForRent: any = [];
  infoForBusinessForDailyRent: any = [];

  markersForNewlyBuiltForSale = [];
  markersForNewlyBuiltForRent = [];
  markersForNewlyBuiltForDailyRent = [];

  infoForNewlyBuiltForSale: any = [];
  infoForNewlyBuiltForRent: any = [];
  infoForNewlyBuiltForDailyRent: any = [];

  currentInfo = null;
  markersArray = [];
  url;
  user: string;

  selectedTransaction = [];
  transactions = [
    {label: 'Վաճառք', value: 'Վաճառք'},
    {label: 'Վարձակալություն', value: 'Վարձակալություն'},
    {label: 'Օրավարձով', value: 'Օրավարձով'}
  ];
  transactions2 = [
    {label: 'Վաճառք', value: 'Վաճառք'},
    {label: 'Վարձակալություն', value: 'Վարձակալություն'}
  ];
  transactions3 = [
    {label: 'Վաճառք', value: 'Վաճառք'}
  ];

  selectedActualUseCommercial: any = [];
  actualUseCommercials: any = [];

  // Հասարակական
  commercialArrayPublicSale = [];
  infoCommercialArrayPublicSale: any = [];
  commercialArrayPublicRent = [];
  infoCommercialArrayPublicRent: any = [];
  // Հասարակական

  // Առևտրային
  commercialArrayCommercialSale = [];
  infoCommercialArrayCommercialSale: any = [];
  commercialArrayCommercialRent = [];
  infoCommercialArrayCommercialRent: any = [];
  // Առևտրային

  // Տեխսպասարկում
  commercialArrayMaintenanceSale = [];
  infoCommercialArrayMaintenanceSale: any = [];
  commercialArrayMaintenanceRent = [];
  infoCommercialArrayMaintenanceRent: any = [];
  // Տեխսպասարկում

  // Բենզալցակայան
  commercialArrayPetrolStationSale = [];
  infoCommercialArrayPetrolStationSale: any = [];
  commercialArrayPetrolStationRent = [];
  infoCommercialArrayPetrolStationRent: any = [];
  // Բենզալցակայան

  // ԱԳԼՃԿ
  commercialArrayGasStationSale = [];
  infoCommercialArrayGasStationSale: any = [];
  commercialArrayGasStationRent = [];
  infoCommercialArrayGasStationRent: any = [];
  // ԱԳԼՃԿ

  // Արտադրական
  commercialArrayProductionSale = [];
  infoCommercialArrayProductionSale: any = [];
  commercialArrayProductionRent = [];
  infoCommercialArrayProductionRent: any = [];
  // Արտադրական

  // Հիդրոէլեկտրակայան
  commercialArrayHydroelectricSale = [];
  infoCommercialArrayHydroelectricSale: any = [];
  commercialArrayHydroelectricRent = [];
  infoCommercialArrayHydroelectricRent: any = [];
  // Հիդրոէլեկտրակայան

  // Ընդերքի օգտագործում
  commercialArraySubsoilSale = [];
  infoCommercialArraySubsoilSale: any = [];
  commercialArraySubsoilRent = [];
  infoCommercialArraySubsoilRent: any = [];
  // Ընդերքի օգտագործում

  // Անասնապահական
  commercialArrayLivestockSale = [];
  infoCommercialArrayLivestockSale: any = [];
  commercialArrayLivestockRent = [];
  infoCommercialArrayLivestockRent: any = [];
  // Անասնապահական

  // Թռչնաֆաբրիկա
  commercialArrayPoultrySale = [];
  infoCommercialArrayPoultrySale: any = [];
  commercialArrayPoultryRent = [];
  infoCommercialArrayPoultryRent: any = [];
  // Թռչնաֆաբրիկա

  // Ձկնաբուծարան
  commercialArrayFishSale = [];
  infoCommercialArrayFishSale: any = [];
  commercialArrayFishRent = [];
  infoCommercialArrayFishRent: any = [];
  // Ձկնաբուծարան

  // Ջերմոց
  commercialArrayGreenhouseSale = [];
  infoCommercialArrayGreenhouseSale: any = [];
  commercialArrayGreenhouseRent = [];
  infoCommercialArrayGreenhouseRent: any = [];
  // Ջերմոց

  // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
  commercialArrayHotelMotelSale = [];
  infoCommercialArrayHotelMotelSale: any = [];
  commercialArrayHotelMotelRent = [];
  infoCommercialArrayHotelMotelRent: any = [];
  // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն

  // Ռեստորան-հյուրանոց
  commercialArrayRestaurantHotelSale = [];
  infoCommercialArrayRestaurantHotelSale: any = [];
  commercialArrayRestaurantHotelRent = [];
  infoCommercialArrayRestaurantHotelRent: any = [];
  // Ռեստորան-հյուրանոց

  // Ռեստորան
  commercialArrayRestaurantSale = [];
  infoCommercialArrayRestaurantSale: any = [];
  commercialArrayRestaurantRent = [];
  infoCommercialArrayRestaurantRent: any = [];
  // Ռեստորան

  // Սրճարան
  commercialArrayCafeSale = [];
  infoCommercialArrayCafeSale: any = [];
  commercialArrayCafeRent = [];
  infoCommercialArrayCafeRent: any = [];
  // Սրճարան

  // Նկուղ, կիսանկուղ
  commercialArrayBasementSale = [];
  infoCommercialArrayBasementSale: any = [];
  commercialArrayBasementRent = [];
  infoCommercialArrayBasementRent: any = [];
  // Նկուղ, կիսանկուղ

  // Սառնարան
  commercialArrayRefrigeratorSale = [];
  infoCommercialArrayRefrigeratorSale: any = [];
  commercialArrayRefrigeratorRent = [];
  infoCommercialArrayRefrigeratorRent: any = [];
  // Սառնարան

  // Սպորտային համալիր
  commercialArraySportComplexSale = [];
  infoCommercialArraySportComplexSale: any = [];
  commercialArraySportComplexRent = [];
  infoCommercialArraySportComplexRent: any = [];
  // Սպորտային համալիր

  constructor(private mapInfoService: MapInfoService, private globals: AppGlobals,
              private publicDataService: PublicDataService) {
    this.url = this.globals.url + '/uploads/';
  }

  ngOnInit() {
    this.actualUseCommercials = this.publicDataService.actualUseCommercial;

    this.mapInfoService.getMarkers('Բնակարան').subscribe((data) => {
      this.markersApartment = data;

      for (let i = 0; i < this.markersApartment.length; i++) {
        this.markersForApartmentRed.push({
          lat: this.markersApartment[i].mapDetails.lat,
          lng: this.markersApartment[i].mapDetails.lng,
          transactions: this.markersApartment[i].transactions
        });
      }

      for (let i = 0; i < this.markersForApartmentRed.length; i++) {
        for (let j = 0; j < this.markersForApartmentRed[i].transactions.length; j++) {
          if (this.markersForApartmentRed[i].transactions[j] == 'Վաճառք') {
            this.markersForApartmentForSale.push(this.markersForApartmentRed[i]);
            this.infoForApartmentForSale.push(this.markersApartment[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForApartmentRed.length; i++) {
        for (let j = 0; j < this.markersForApartmentRed[i].transactions.length; j++) {
          if (this.markersForApartmentRed[i].transactions[j] == 'Վարձակալություն') {
            this.markersForApartmentForRent.push(this.markersForApartmentRed[i]);
            this.infoForApartmentForRent.push(this.markersApartment[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForApartmentRed.length; i++) {
        for (let j = 0; j < this.markersForApartmentRed[i].transactions.length; j++) {
          if (this.markersForApartmentRed[i].transactions[j] == 'Օրավարձով') {
            this.markersForApartmentForDailyRent.push(this.markersForApartmentRed[i]);
            this.infoForApartmentForDailyRent.push(this.markersApartment[i]);
          }
        }
      }
    });

    this.mapInfoService.getMarkers('Առանձնատուն').subscribe((data) => {
      this.markersHouse = data;

      for (let i = 0; i < this.markersHouse.length; i++) {
        this.markersForHouseGreen.push({
          lat: this.markersHouse[i].mapDetails.lat,
          lng: this.markersHouse[i].mapDetails.lng,
          transactions: this.markersHouse[i].transactions
        });
      }

      for (let i = 0; i < this.markersForHouseGreen.length; i++) {
        for (let j = 0; j < this.markersForHouseGreen[i].transactions.length; j++) {
          if (this.markersForHouseGreen[i].transactions[j] == 'Վաճառք') {
            this.markersForHouseForSale.push(this.markersForHouseGreen[i]);
            this.infoForHouseForSale.push(this.markersHouse[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForHouseGreen.length; i++) {
        for (let j = 0; j < this.markersForHouseGreen[i].transactions.length; j++) {
          if (this.markersForHouseGreen[i].transactions[j] == 'Վարձակալություն') {
            this.markersForHouseForRent.push(this.markersForHouseGreen[i]);
            this.infoForHouseForRent.push(this.markersHouse[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForHouseGreen.length; i++) {
        for (let j = 0; j < this.markersForHouseGreen[i].transactions.length; j++) {
          if (this.markersForHouseGreen[i].transactions[j] == 'Օրավարձով') {
            this.markersForHouseForDailyRent.push(this.markersForHouseGreen[i]);
            this.infoForHouseForDailyRent.push(this.markersHouse[i]);
          }
        }
      }
    });

    this.mapInfoService.getMarkers('Կոմերցիոն').subscribe((data) => {
      this.markersCommercial = data;

      for (let i = 0; i < this.markersCommercial.length; i++) {
        this.markersForCommercialYellow.push({
          lat: this.markersCommercial[i].mapDetails.lat,
          lng: this.markersCommercial[i].mapDetails.lng,
          transactions: this.markersCommercial[i].transactions,
          actualUse: this.markersCommercial[i].actualUse
        });
      }

      //Հասարակական++++++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Հասարակական') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
        //  if (this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayPublicSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayPublicSale.push(this.markersCommercial[i]);
        //  }
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Հասարակական') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
         // if (this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
            this.commercialArrayPublicRent.push(this.markersForCommercialYellow[i]);
            this.infoCommercialArrayPublicRent.push(this.markersCommercial[i]);
         // }
        }
      }
      //Հասարակական++++++++++++++++++
      //Առևտրային++++++++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Առևտրային') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayCommercialSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayCommercialSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Առևտրային') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayCommercialRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayCommercialRent.push(this.markersCommercial[i]);
        }
      }
      //Առևտրային++++++++++++++++++++
      //Տեխսպասարկում++++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Տեխսպասարկում') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayMaintenanceSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayMaintenanceSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Տեխսպասարկում') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayMaintenanceRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayMaintenanceRent.push(this.markersCommercial[i]);
        }
      }
      //Տեխսպասարկում++++++++++++++++

      // Բենզալցակայան+++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Տեխսպասարկում') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayPetrolStationSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayPetrolStationSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Տեխսպասարկում') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayPetrolStationRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayPetrolStationRent.push(this.markersCommercial[i]);
        }
      }
      // Բենզալցակայան+++++++++++++++

      // ԱԳԼՃԿ++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('ԱԳԼՃԿ') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayGasStationSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayGasStationSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('ԱԳԼՃԿ') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayGasStationRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayGasStationRent.push(this.markersCommercial[i]);
        }
      }
      // ԱԳԼՃԿ++++++++++++++

      // Արտադրական++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Արտադրական') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayProductionSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayProductionSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Արտադրական') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayProductionRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayProductionRent.push(this.markersCommercial[i]);
        }
      }
      // Արտադրական++++++++++++++

      // Հիդրոէլեկտրակայան++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Հիդրոէլեկտրակայան') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayHydroelectricSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayHydroelectricSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Հիդրոէլեկտրակայան') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayHydroelectricRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayHydroelectricRent.push(this.markersCommercial[i]);
        }
      }
      // Հիդրոէլեկտրակայան++++++++++++++

      // Ընդերքի օգտագործում++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Ընդերքի օգտագործում') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArraySubsoilSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArraySubsoilSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Ընդերքի օգտագործում') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArraySubsoilRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArraySubsoilRent.push(this.markersCommercial[i]);
        }
      }
      // Ընդերքի օգտագործում++++++++++++++

      // Անասնապահական++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Անասնապահական') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayLivestockSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayLivestockSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Անասնապահական') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayLivestockRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayLivestockRent.push(this.markersCommercial[i]);
        }
      }
      // Անասնապահական++++++++++++++

      // Թռչնաֆաբրիկա++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Թռչնաֆաբրիկա') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayPoultrySale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayPoultrySale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Թռչնաֆաբրիկա') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayPoultryRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayPoultryRent.push(this.markersCommercial[i]);
        }
      }
      // Թռչնաֆաբրիկա++++++++++++++

      // Ձկնաբուծարան++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Ձկնաբուծարան') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayFishSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayFishSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Ձկնաբուծարան') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayFishRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayFishRent.push(this.markersCommercial[i]);
        }
      }
      // Ձկնաբուծարան++++++++++++++
      // stexic
      // Ջերմոց++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Ջերմոց') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayGreenhouseSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayGreenhouseSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Ջերմոց') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayGreenhouseRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayGreenhouseRent.push(this.markersCommercial[i]);
        }
      }
      // Ջերմոց++++++++++++++


      // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Հյուրանոց /հոթել, մոթել/, հանգստյան տուն') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayHotelMotelSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayHotelMotelSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Հյուրանոց /հոթել, մոթել/, հանգստյան տուն') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayHotelMotelRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayHotelMotelRent.push(this.markersCommercial[i]);
        }
      }
      // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն++++++++++++++

      // Ռեստորան-հյուրանոց++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Ռեստորան-հյուրանոց') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayRestaurantHotelSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayRestaurantHotelSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Ռեստորան-հյուրանոց') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayRestaurantHotelRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayRestaurantHotelRent.push(this.markersCommercial[i]);
        }
      }
      // Ռեստորան-հյուրանոց++++++++++++++

      // Ռեստորան++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Ռեստորան') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayRestaurantSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayRestaurantSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Ռեստորան') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayRestaurantRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayRestaurantRent.push(this.markersCommercial[i]);
        }
      }
      // Ռեստորան++++++++++++++

      // Սրճարան++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Սրճարան') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayCafeSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayCafeSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Սրճարան') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayCafeRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayCafeRent.push(this.markersCommercial[i]);
        }
      }
      // Սրճարան++++++++++++++

      // Նկուղ, կիսանկուղ++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Նկուղ, կիսանկուղ') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayBasementSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayBasementSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Նկուղ, կիսանկուղ') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayBasementRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayBasementRent.push(this.markersCommercial[i]);
        }
      }
      // Նկուղ, կիսանկուղ++++++++++++++

      // Սառնարան++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Սառնարան') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArrayRefrigeratorSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayRefrigeratorSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Սառնարան') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArrayRefrigeratorRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArrayRefrigeratorRent.push(this.markersCommercial[i]);
        }
      }
      // Սառնարան++++++++++++++

      // Սպորտային համալիր++++++++++++++
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Սպորտային համալիր') && this.markersForCommercialYellow[i].transactions.includes('Վաճառք')) {
          this.commercialArraySportComplexSale.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArraySportComplexSale.push(this.markersCommercial[i]);
        }
      }
      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        if (this.markersForCommercialYellow[i].actualUse.includes('Սպորտային համալիր') && this.markersForCommercialYellow[i].transactions.includes('Վարձակալություն')) {
          this.commercialArraySportComplexRent.push(this.markersForCommercialYellow[i]);
          this.infoCommercialArraySportComplexRent.push(this.markersCommercial[i]);
        }
      }
      // Սպորտային համալիր++++++++++++++


      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        for (let j = 0; j < this.markersForCommercialYellow[i].transactions.length; j++) {
          if (this.markersForCommercialYellow[i].transactions[j] == 'Վաճառք') {
            this.markersForCommercialForSale.push(this.markersForCommercialYellow[i]);
            this.infoForCommercialForSale.push(this.markersCommercial[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        for (let j = 0; j < this.markersForCommercialYellow[i].transactions.length; j++) {
          if (this.markersForCommercialYellow[i].transactions[j] == 'Վարձակալություն') {
            this.markersForCommercialForRent.push(this.markersForCommercialYellow[i]);
            this.infoForCommercialForRent.push(this.markersCommercial[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
        for (let j = 0; j < this.markersForCommercialYellow[i].transactions.length; j++) {
          if (this.markersForCommercialYellow[i].transactions[j] == 'Օրավարձով') {
            this.markersForCommercialForDailyRent.push(this.markersForCommercialYellow[i]);
            this.infoForCommercialForDailyRent.push(this.markersCommercial[i]);
          }
        }
      }
    });

    this.mapInfoService.getMarkers('Հողամաս').subscribe((data) => {
      this.markersLand = data;

      for (let i = 0; i < this.markersLand.length; i++) {
        this.markersForLandBlue.push({
          lat: this.markersLand[i].mapDetails.lat,
          lng: this.markersLand[i].mapDetails.lng,
          transactions: this.markersLand[i].transactions
        });
      }

      for (let i = 0; i < this.markersForLandBlue.length; i++) {
        for (let j = 0; j < this.markersForLandBlue[i].transactions.length; j++) {
          if (this.markersForLandBlue[i].transactions[j] == 'Վաճառք') {
            this.markersForLandForSale.push(this.markersForLandBlue[i]);
            this.infoForLandForSale.push(this.markersLand[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForLandBlue.length; i++) {
        for (let j = 0; j < this.markersForLandBlue[i].transactions.length; j++) {
          if (this.markersForLandBlue[i].transactions[j] == 'Վարձակալություն') {
            this.markersForLandForRent.push(this.markersForLandBlue[i]);
            this.infoForLandForRent.push(this.markersLand[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForLandBlue.length; i++) {
        for (let j = 0; j < this.markersForLandBlue[i].transactions.length; j++) {
          if (this.markersForLandBlue[i].transactions[j] == 'Օրավարձով') {
            this.markersForLandForDailyRent.push(this.markersForLandBlue[i]);
            this.infoForLandForDailyRent.push(this.markersLand[i]);
          }
        }
      }
    });

    this.mapInfoService.getMarkers('Բիզնես').subscribe((data) => {
      this.markersBusiness = data;

      for (let i = 0; i < this.markersBusiness.length; i++) {
        this.markersForBusinessPurple.push({
          lat: this.markersBusiness[i].mapDetails.lat,
          lng: this.markersBusiness[i].mapDetails.lng,
          transactions: this.markersBusiness[i].transactions
        });
      }

      for (let i = 0; i < this.markersForBusinessPurple.length; i++) {
        for (let j = 0; j < this.markersForBusinessPurple[i].transactions.length; j++) {
          if (this.markersForBusinessPurple[i].transactions[j] == 'Վաճառք') {
            this.markersForBusinessForSale.push(this.markersForBusinessPurple[i]);
            this.infoForBusinessForSale.push(this.markersBusiness[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForBusinessPurple.length; i++) {
        for (let j = 0; j < this.markersForBusinessPurple[i].transactions.length; j++) {
          if (this.markersForBusinessPurple[i].transactions[j] == 'Վարձակալություն') {
            this.markersForBusinessForRent.push(this.markersForBusinessPurple[i]);
            this.infoForBusinessForRent.push(this.markersBusiness[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForBusinessPurple.length; i++) {
        for (let j = 0; j < this.markersForBusinessPurple[i].transactions.length; j++) {
          if (this.markersForBusinessPurple[i].transactions[j] == 'Օրավարձով') {
            this.markersForBusinessForDailyRent.push(this.markersForBusinessPurple[i]);
            this.infoForBusinessForDailyRent.push(this.markersBusiness[i]);
          }
        }
      }
    });

    this.mapInfoService.getMarkers('Նորակառույց').subscribe((data) => {
      this.markersNewlyBuilt = data;

      for (let i = 0; i < this.markersNewlyBuilt.length; i++) {
        this.markersForNewlyBuiltOrange.push({
          lat: this.markersNewlyBuilt[i].mapDetails.lat,
          lng: this.markersNewlyBuilt[i].mapDetails.lng,
          transactions: this.markersNewlyBuilt[i].transactions
        });
      }

      for (let i = 0; i < this.markersForNewlyBuiltOrange.length; i++) {
        for (let j = 0; j < this.markersForNewlyBuiltOrange[i].transactions.length; j++) {
          if (this.markersForNewlyBuiltOrange[i].transactions[j] == 'Վաճառք') {
            this.markersForNewlyBuiltForSale.push(this.markersForNewlyBuiltOrange[i]);
            this.infoForNewlyBuiltForSale.push(this.markersNewlyBuilt[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForNewlyBuiltOrange.length; i++) {
        for (let j = 0; j < this.markersForNewlyBuiltOrange[i].transactions.length; j++) {
          if (this.markersForNewlyBuiltOrange[i].transactions[j] == 'Վարձակալություն') {
            this.markersForNewlyBuiltForRent.push(this.markersForNewlyBuiltOrange[i]);
            this.infoForNewlyBuiltForRent.push(this.markersNewlyBuilt[i]);
          }
        }
      }

      for (let i = 0; i < this.markersForNewlyBuiltOrange.length; i++) {
        for (let j = 0; j < this.markersForNewlyBuiltOrange[i].transactions.length; j++) {
          if (this.markersForNewlyBuiltOrange[i].transactions[j] == 'Օրավարձով') {
            this.markersForNewlyBuiltForDailyRent.push(this.markersForNewlyBuiltOrange[i]);
            this.infoForNewlyBuiltForDailyRent.push(this.markersNewlyBuilt[i]);
          }
        }
      }
    });

    this.initMap();
  }

  initMap() {
    const opt = {
      center: {lat: +this.lat, lng: +this.lng},
      zoom: 13,
      gestureHandling: 'cooperative'
    };

    this.myMap = new google.maps.Map(document.getElementById('map'), opt);

    const searchBox = new google.maps.places.SearchBox(document.getElementById('mapSearch'));

    google.maps.event.addListener(searchBox, 'places_changed', () => {
      const places = searchBox.getPlaces();
      const bounds = new google.maps.LatLngBounds();
      let i;
      let place;

      for (i = 0; place = places[i]; i++) {
        bounds.extend(place.geometry.location);
      }

      this.myMap.fitBounds(bounds);
      this.myMap.setZoom(15);
    });
  }

  onActualUseCommercialChange(event) {
   // console.log(event);

    if(event == 'Հասարակական' && this.selectedTransaction.length == 0){
      this.showMarkersCommercialArrayPublicSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++0Հասարակական
    if(event == 'Հասարակական' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayPublicSale();
    }
    if(event == 'Հասարակական' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayPublicRent();
    }
    if(event == 'Հասարակական' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayPublicSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Հասարակական


    if(event == 'Առևտրային' && this.selectedTransaction.length == 0){
      this.showMarkersCommercialArrayCommercialSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Առևտրային
    if(event == 'Առևտրային' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayCommercialSale();
    }
    if(event == 'Առևտրային' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayCommercialRent();
    }
    if(event == 'Առևտրային' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayCommercialSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Առևտրային


    if(event == 'Տեխսպասարկում'){
      this.showMarkersCommercialArrayMaintenanceSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Տեխսպասարկում
    if(event == 'Տեխսպասարկում' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayMaintenanceSale();
    }
    if(event == 'Տեխսպասարկում' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayMaintenanceRent();
    }
    if(event == 'Տեխսպասարկում' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayMaintenanceSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Տեխսպասարկում

    if(event == 'Բենզալցակայան'){
    this.showMarkersCommercialArrayPetrolStationSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Բենզալցակայան
    if(event == 'Բենզալցակայան' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayPetrolStationSale();
    }
    if(event == 'Բենզալցակայան' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayPetrolStationRent();
    }
    if(event == 'Բենզալցակայան' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayPetrolStationSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Բենզալցակայան

    if(event == 'ԱԳԼՃԿ'){
      this.showMarkersCommercialArrayGasStationSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ԱԳԼՃԿ
    if(event == 'ԱԳԼՃԿ' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayGasStationSale();
    }
    if(event == 'ԱԳԼՃԿ' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayGasStationRent();
    }
    if(event == 'ԱԳԼՃԿ' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayGasStationSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ԱԳԼՃԿ

    if(event == 'Արտադրական'){
      this.showMarkersCommercialArrayProductionSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Արտադրական
    if(event == 'Արտադրական' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayProductionSale();
    }
    if(event == 'Արտադրական' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayProductionRent();
    }
    if(event == 'Արտադրական' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayProductionSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Արտադրական

    if(event == 'Հիդրոէլեկտրակայան'){
      this.showMarkersCommercialArrayHydroelectricSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Հիդրոէլեկտրակայան
    if(event == 'Հիդրոէլեկտրակայան' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayHydroelectricSale();
    }
    if(event == 'Հիդրոէլեկտրակայան' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayHydroelectricRent();
    }
    if(event == 'Հիդրոէլեկտրակայան' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayHydroelectricSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Հիդրոէլեկտրակայան

    if(event == 'Ընդերքի օգտագործում'){
      this.showMarkersCommercialArraySubsoilSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Ընդերքի օգտագործում
    if(event == 'Ընդերքի օգտագործում' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArraySubsoilSale();
    }
    if(event == 'Ընդերքի օգտագործում' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArraySubsoilRent();
    }
    if(event == 'Ընդերքի օգտագործում' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArraySubsoilSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Ընդերքի օգտագործում

    if(event == 'Անասնապահական'){
      this.showMarkersCommercialArrayLivestockSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Անասնապահական
    if(event == 'Անասնապահական' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayLivestockSale();
    }
    if(event == 'Անասնապահական' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayLivestockRent();
    }
    if(event == 'Անասնապահական' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayLivestockSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Անասնապահական

    if(event == 'Թռչնաֆաբրիկա'){
      this.showMarkersCommercialArrayPoultrySaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Թռչնաֆաբրիկա
    if(event == 'Թռչնաֆաբրիկա' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayPoultrySale();
    }
    if(event == 'Թռչնաֆաբրիկա' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayPoultryRent();
    }
    if(event == 'Թռչնաֆաբրիկա' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayPoultrySaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Թռչնաֆաբրիկա

    if(event == 'Ձկնաբուծարան'){
      this.showMarkersCommercialArrayFishSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Ձկնաբուծարան
    if(event == 'Ձկնաբուծարան' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayFishSale();
    }
    if(event == 'Ձկնաբուծարան' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayFishRent();
    }
    if(event == 'Ձկնաբուծարան' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayFishSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Ձկնաբուծարան

    if(event == 'Ջերմոց'){
      this.showMarkersCommercialArrayGreenhouseSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Ջերմոց
    if(event == 'Ջերմոց' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayGreenhouseSale();
    }
    if(event == 'Ջերմոց' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayGreenhouseRent();
    }
    if(event == 'Ջերմոց' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayGreenhouseSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Ջերմոց

    if(event == 'Հյուրանոց /հոթել, մոթել/, հանգստյան տուն'){
      this.showMarkersCommercialArrayHotelMotelSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
    if(event == 'Հյուրանոց /հոթել, մոթել/, հանգստյան տուն' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayHotelMotelSale();
    }
    if(event == 'Հյուրանոց /հոթել, մոթել/, հանգստյան տուն' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayHotelMotelRent();
    }
    if(event == 'Հյուրանոց /հոթել, մոթել/, հանգստյան տուն' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayHotelMotelSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Հյուրանոց /հոթել, մոթել/, հանգստյան տուն

    if(event == 'Ռեստորան-հյուրանոց'){
      this.showMarkersCommercialArrayRestaurantHotelSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Ռեստորան-հյուրանոց
    if(event == 'Ռեստորան-հյուրանոց' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayRestaurantHotelSale();
    }
    if(event == 'Ռեստորան-հյուրանոց' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayRestaurantHotelRent();
    }
    if(event == 'Ռեստորան-հյուրանոց' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayRestaurantHotelSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Ռեստորան-հյուրանոց

    if(event == 'Ռեստորան'){
      this.showMarkersCommercialArrayRestaurantSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Ռեստորան
    if(event == 'Ռեստորան' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayRestaurantSale();
    }
    if(event == 'Ռեստորան' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayRestaurantRent();
    }
    if(event == 'Ռեստորան' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayRestaurantSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Ռեստորան

    if(event == 'Սրճարան'){
      this.showMarkersCommercialArrayCafeSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Սրճարան
    if(event == 'Սրճարան' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayCafeSale();
    }
    if(event == 'Սրճարան' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayCafeRent();
    }
    if(event == 'Սրճարան' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayCafeSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Սրճարան

    if(event == 'Նկուղ, կիսանկուղ'){
      this.showMarkersCommercialArrayBasementSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Նկուղ, կիսանկուղ
    if(event == 'Նկուղ, կիսանկուղ' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayBasementSale();
    }
    if(event == 'Նկուղ, կիսանկուղ' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayBasementRent();
    }
    if(event == 'Նկուղ, կիսանկուղ' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayBasementSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Նկուղ, կիսանկուղ

    if(event == 'Սառնարան'){
      this.showMarkersCommercialArrayRefrigeratorSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Սառնարան
    if(event == 'Սառնարան' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArrayRefrigeratorSale();
    }
    if(event == 'Սառնարան' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArrayRefrigeratorRent();
    }
    if(event == 'Սառնարան' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArrayRefrigeratorSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Սառնարան

    if(event == 'Սպորտային համալիր'){
      this.showMarkersCommercialArraySportComplexSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Սպորտային համալիր
    if(event == 'Սպորտային համալիր' && this.selectedTransaction[0] == 'Վաճառք'){
      this.showMarkersCommercialArraySportComplexSale();
    }
    if(event == 'Սպորտային համալիր' && this.selectedTransaction[0] == 'Վարձակալություն'){
      this.showMarkersCommercialArraySportComplexRent();
    }
    if(event == 'Սպորտային համալիր' && this.selectedTransaction.length > 1){
      this.showMarkersCommercialArraySportComplexSaleAndRent();
    }
    // ifer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Սպորտային համալիր


    if(event == null){
      this.showYellowMarkers();
     // console.log('sax ')
    }
  }

  onTransactionChange(event) {
    if (event) {
      if (this.btnRedMarkerFlag) {
        if (event.length == 0) {
          this.showRedMarkers();
        } else if (event.length == 1) {
          if (event.includes('Վաճառք'))
            this.showRedMarkersSale();
          else if (event.includes('Վարձակալություն'))
            this.showRedMarkersRent();
          else if (event.includes('Օրավարձով'))
            this.showRedMarkersDailyRent();
        } else if (event.length == 2) {
          if (event.includes('Վաճառք') && event.includes('Վարձակալություն')) {
            this.showRedMarkersSaleAndRent();
          } else if (event.includes('Վաճառք') && event.includes('Օրավարձով')) {
            this.showRedMarkersSaleAndDailyRent();
          } else if (event.includes('Վարձակալություն') && event.includes('Օրավարձով')) {
            this.showRedMarkersRentAndDailyRent();
          }
        } else if (event.length == 3) {
          this.showRedMarkersSaleAndRentAndDailyRent();
        }
      }
      else if (this.btnGreenMarkerFlag) {
        if (event.length == 0) {
          this.showGreenMarkers();
        } else if (event.length == 1) {
          if (event.includes('Վաճառք'))
            this.showGreenMarkersSale();
          else if (event.includes('Վարձակալություն'))
            this.showGreenMarkersRent();
          else if (event.includes('Օրավարձով'))
            this.showGreenMarkersDailyRent();
        } else if (event.length == 2) {
          if (event.includes('Վաճառք') && event.includes('Վարձակալություն')) {
            this.showGreenMarkersSaleAndRent();
          } else if (event.includes('Վաճառք') && event.includes('Օրավարձով')) {
            this.showGreenMarkersSaleAndDailyRent();
          } else if (event.includes('Վարձակալություն') && event.includes('Օրավարձով')) {
            this.showGreenMarkersRentAndDailyRent();
          }
        } else if (event.length == 3) {
          this.showGreenMarkersSaleAndRentAndDailyRent();
        }
      }
      else if (this.btnYellowMarkerFlag) {
        if (event.length == 0) {
          // stex +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++0
          // Հասարակական
          if (this.selectedActualUseCommercial == 'Հասարակական'){
            this.showMarkersCommercialArrayPublicSaleAndRent();
          }
          // Հասարակական
          // Առևտրային
          else if (this.selectedActualUseCommercial == 'Առևտրային'){
            this.showMarkersCommercialArrayCommercialSaleAndRent();
          }
          // Առևտրային
          // Տեխսպասարկում
          else if (this.selectedActualUseCommercial == 'Տեխսպասարկում'){
            this.showMarkersCommercialArrayMaintenanceSaleAndRent();
          }
          // Տեխսպասարկում
          // Բենզալցակայան
          else if (this.selectedActualUseCommercial == 'Բենզալցակայան'){
            this.showMarkersCommercialArrayPetrolStationSaleAndRent();
          }
          // Բենզալցակայան
          // ԱԳԼՃԿ
          else if (this.selectedActualUseCommercial == 'ԱԳԼՃԿ'){
            this.showMarkersCommercialArrayGasStationSaleAndRent();
          }
          // ԱԳԼՃԿ
          // Արտադրական
          else if (this.selectedActualUseCommercial == 'Արտադրական'){
            this.showMarkersCommercialArrayProductionSaleAndRent();
          }
          // Արտադրական
          // Հիդրոէլեկտրակայան
          else if (this.selectedActualUseCommercial == 'Հիդրոէլեկտրակայան'){
            this.showMarkersCommercialArrayHydroelectricSaleAndRent();
          }
          // Հիդրոէլեկտրակայան
          // Ընդերքի օգտագործում
          else if (this.selectedActualUseCommercial == 'Ընդերքի օգտագործում'){
            this.showMarkersCommercialArraySubsoilSaleAndRent();
          }
          // Ընդերքի օգտագործում
          // Անասնապահական
          else if (this.selectedActualUseCommercial == 'Անասնապահական'){
            this.showMarkersCommercialArrayLivestockSaleAndRent();
          }
          // Անասնապահական
          // Թռչնաֆաբրիկա
          else if (this.selectedActualUseCommercial == 'Թռչնաֆաբրիկա'){
            this.showMarkersCommercialArrayPoultrySaleAndRent();
          }
          // Թռչնաֆաբրիկա
          // Ձկնաբուծարան
          else if (this.selectedActualUseCommercial == 'Ձկնաբուծարան'){
            this.showMarkersCommercialArrayFishSaleAndRent();
          }
          // Ձկնաբուծարան

          // Ջերմոց
          else if (this.selectedActualUseCommercial == 'Ջերմոց'){
            this.showMarkersCommercialArrayGreenhouseSaleAndRent();
          }
          // Ջերմոց
// kkkkkkkkkkkkkkkkkkkkkkkkkk
          // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
          else if (this.selectedActualUseCommercial == 'Հյուրանոց /հոթել, մոթել/, հանգստյան տուն'){
            this.showMarkersCommercialArrayHotelMotelSaleAndRent();
          }
          // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն

          // Ռեստորան-հյուրանոց
          else if (this.selectedActualUseCommercial == 'Ռեստորան-հյուրանոց'){
            this.showMarkersCommercialArrayRestaurantHotelSaleAndRent();
          }
          // Ռեստորան-հյուրանոց

          // Ռեստորան
          else if (this.selectedActualUseCommercial == 'Ռեստորան'){
            this.showMarkersCommercialArrayRestaurantSaleAndRent();
          }
          // Ռեստորան

          // Սրճարան
          else if (this.selectedActualUseCommercial == 'Սրճարան'){
            this.showMarkersCommercialArrayCafeSaleAndRent();
          }
          // Սրճարան

          // Նկուղ, կիսանկուղ
          else if (this.selectedActualUseCommercial == 'Նկուղ, կիսանկուղ'){
            this.showMarkersCommercialArrayBasementSaleAndRent();
          }
          // Նկուղ, կիսանկուղ

          // Սառնարան
          else if (this.selectedActualUseCommercial == 'Սառնարան'){
            this.showMarkersCommercialArrayRefrigeratorSaleAndRent();
          }
          // Սառնարան

          // Սպորտային համալիր
          else if (this.selectedActualUseCommercial == 'Սպորտային համալիր'){
            this.showMarkersCommercialArraySportComplexSaleAndRent();
          }
          // Սպորտային համալիր


          // stex +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

          else {
           // console.log("?????????")
            this.showYellowMarkers();
          }
        // else if(this.selectedActualUseCommercial == null){
        //     console.log("?????????")
        //     this.showYellowMarkers();
        //   }
        //
        // else{
        //     //showYellowMarkersSaleOnly
        //     this.showYellowMarkersSaleRent();
        //     console.log("only Rent")
        //     //showYellowMarkersSaleRent
        //   }

        }
        else if (event.length == 1) {
          if (event.includes('Վաճառք')){
            // stex +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++000000000000
            // Հասարակական
            if(this.selectedActualUseCommercial == 'Հասարակական'){
              this.showMarkersCommercialArrayPublicSale();
            }
            // Հասարակական
            // Առևտրային
            if(this.selectedActualUseCommercial == 'Առևտրային'){
              this.showMarkersCommercialArrayCommercialSale();
            }
            // Առևտրային
            // Տեխսպասարկում
            if(this.selectedActualUseCommercial == 'Տեխսպասարկում'){
              this.showMarkersCommercialArrayMaintenanceSale();
            }
            // Տեխսպասարկում
            // Բենզալցակայան
            if(this.selectedActualUseCommercial == 'Բենզալցակայան'){
              this.showMarkersCommercialArrayPetrolStationSale();
            }
            // Բենզալցակայան
            // ԱԳԼՃԿ
            if(this.selectedActualUseCommercial == 'ԱԳԼՃԿ'){
              this.showMarkersCommercialArrayGasStationSale();
            }
            // ԱԳԼՃԿ
            // Արտադրական
            if(this.selectedActualUseCommercial == 'Արտադրական'){
              this.showMarkersCommercialArrayProductionSale();
            }
            // Արտադրական
            // Հիդրոէլեկտրակայան
            if(this.selectedActualUseCommercial == 'Հիդրոէլեկտրակայան'){
              this.showMarkersCommercialArrayHydroelectricSale();
            }
            // Հիդրոէլեկտրակայան
            // Ընդերքի օգտագործում
            if(this.selectedActualUseCommercial == 'Ընդերքի օգտագործում'){
              this.showMarkersCommercialArraySubsoilSale();
            }
            // Ընդերքի օգտագործում
            // Անասնապահական
            if(this.selectedActualUseCommercial == 'Անասնապահական'){
              this.showMarkersCommercialArrayLivestockSale();
            }
            // Անասնապահական
            // Թռչնաֆաբրիկա
            if(this.selectedActualUseCommercial == 'Թռչնաֆաբրիկա'){
              this.showMarkersCommercialArrayPoultrySale();
            }
            // Թռչնաֆաբրիկա
            // Ձկնաբուծարան
            if(this.selectedActualUseCommercial == 'Ձկնաբուծարան'){
              this.showMarkersCommercialArrayFishSale();
            }
            // Ձկնաբուծարան
            // Ջերմոց
            if(this.selectedActualUseCommercial == 'Ջերմոց'){
              this.showMarkersCommercialArrayGreenhouseSale();
            }

            // Ջերմոց
// kkkkkkkkkkkkkkkkkkkkkkkkkk
            // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
            if(this.selectedActualUseCommercial == 'Հյուրանոց /հոթել, մոթել/, հանգստյան տուն'){
              this.showMarkersCommercialArrayHotelMotelSale();
            }
            // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
            // Ռեստորան-հյուրանոց
            if(this.selectedActualUseCommercial == 'Ռեստորան-հյուրանոց'){
              this.showMarkersCommercialArrayRestaurantHotelSale();
            }
            // Ռեստորան-հյուրանոց
            // Ռեստորան
            if(this.selectedActualUseCommercial == 'Ռեստորան'){
              this.showMarkersCommercialArrayRestaurantSale();
            }
            // Ռեստորան
            // Սրճարան
            if(this.selectedActualUseCommercial == 'Սրճարան'){
              this.showMarkersCommercialArrayCafeSale();
            }
            // Սրճարան
            // Նկուղ, կիսանկուղ
            if(this.selectedActualUseCommercial == 'Նկուղ, կիսանկուղ'){
              this.showMarkersCommercialArrayBasementSale();
            }
            // Նկուղ, կիսանկուղ
            // Սառնարան
            if(this.selectedActualUseCommercial == 'Սառնարան'){
              this.showMarkersCommercialArrayRefrigeratorSale();
            }
            // Սառնարան
            // Սպորտային համալիր
            if(this.selectedActualUseCommercial == 'Սպորտային համալիր'){
              this.showMarkersCommercialArraySportComplexSale();
            }
            // Սպորտային համալիր
            else if(this.selectedActualUseCommercial == ''){
              this.showYellowMarkersSaleOnly();
             // console.log("only Sale")
            }
            // else{
            //   //showYellowMarkersSaleOnly
            //   //this.showYellowMarkersSaleOnly();
            //   console.log("only Sale")
            //   //showYellowMarkersSaleRent
            // }


            // stex +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          }
          else if (event.includes('Վարձակալություն')) {
           // this.showYellowMarkersRent();
            // stex +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++000000000
            // Հասարակական
            if(this.selectedActualUseCommercial == 'Հասարակական'){
              this.showMarkersCommercialArrayPublicRent();
            }
            // Հասարակական
            // Առևտրային
            if(this.selectedActualUseCommercial == 'Առևտրային'){
              this.showMarkersCommercialArrayCommercialRent();
            }
            // Առևտրային
            // Տեխսպասարկում
            if(this.selectedActualUseCommercial == 'Տեխսպասարկում'){
              this.showMarkersCommercialArrayMaintenanceRent();
            }
            // Տեխսպասարկում
            // Բենզալցակայան
            if(this.selectedActualUseCommercial == 'Բենզալցակայան'){
              this.showMarkersCommercialArrayPetrolStationRent();
            }
            // Բենզալցակայան
            // ԱԳԼՃԿ
            if(this.selectedActualUseCommercial == 'ԱԳԼՃԿ'){
              this.showMarkersCommercialArrayGasStationRent();
            }
            // ԱԳԼՃԿ
            // Արտադրական
            if(this.selectedActualUseCommercial == 'Արտադրական'){
              this.showMarkersCommercialArrayProductionRent();
            }
            // Արտադրական
            // Հիդրոէլեկտրակայան
            if(this.selectedActualUseCommercial == 'Հիդրոէլեկտրակայան'){
              this.showMarkersCommercialArrayHydroelectricRent();
            }
            // Հիդրոէլեկտրակայան
            // Ընդերքի օգտագործում
            if(this.selectedActualUseCommercial == 'Ընդերքի օգտագործում'){
              this.showMarkersCommercialArraySubsoilRent();
            }
            // Ընդերքի օգտագործում
            // Անասնապահական
            if(this.selectedActualUseCommercial == 'Անասնապահական'){
              this.showMarkersCommercialArrayLivestockRent();
            }
            // Անասնապահական
            // Թռչնաֆաբրիկա
            if(this.selectedActualUseCommercial == 'Թռչնաֆաբրիկա'){
              this.showMarkersCommercialArrayPoultryRent();
            }
            // Թռչնաֆաբրիկա
            // Ձկնաբուծարան
            if(this.selectedActualUseCommercial == 'Ձկնաբուծարան'){
              this.showMarkersCommercialArrayFishRent();
            }
            // Ձկնաբուծարան
            // Ջերմոց
            if(this.selectedActualUseCommercial == 'Ջերմոց'){
              this.showMarkersCommercialArrayGreenhouseRent();
            }
            // Ջերմոց
            // kkkkkkkkkkkkkkkkkkkkkkkkkk
            // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
            if(this.selectedActualUseCommercial == 'Հյուրանոց /հոթել, մոթել/, հանգստյան տուն'){
              this.showMarkersCommercialArrayHotelMotelRent();
            }
            // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
            // Ռեստորան-հյուրանոց
            if(this.selectedActualUseCommercial == 'Ռեստորան-հյուրանոց'){
              this.showMarkersCommercialArrayRestaurantHotelRent();
            }
            // Ռեստորան-հյուրանոց
            // Ռեստորան
            if(this.selectedActualUseCommercial == 'Ռեստորան'){
              this.showMarkersCommercialArrayRestaurantRent();
            }
            // Ռեստորան
            // Սրճարան
            if(this.selectedActualUseCommercial == 'Սրճարան'){
              this.showMarkersCommercialArrayCafeRent();
            }
            // Սրճարան
            // Նկուղ, կիսանկուղ
            if(this.selectedActualUseCommercial == 'Նկուղ, կիսանկուղ'){
              this.showMarkersCommercialArrayBasementRent();
            }
            // Նկուղ, կիսանկուղ
            // Սառնարան
            if(this.selectedActualUseCommercial == 'Սառնարան'){
              this.showMarkersCommercialArrayRefrigeratorRent();
            }
            // Սառնարան
            // Սպորտային համալիր
            if(this.selectedActualUseCommercial == 'Սպորտային համալիր'){
              this.showMarkersCommercialArraySportComplexRent();
            }
            // Սպորտային համալիր

            // else{
            //   //showYellowMarkersSaleOnly
            //   //this.showYellowMarkersSaleRent();
            //   console.log("only Rent")
            //   //showYellowMarkersSaleRent
            // }

            else if(this.selectedActualUseCommercial == ''){
              this.showYellowMarkersSaleRent();
             // console.log("only Rent")
            }
            // else{
            //   //showYellowMarkersSaleOnly
            //   //this.showYellowMarkersSaleOnly();
            //   console.log("only Sale")
            //   //showYellowMarkersSaleRent
            // }


            // stex +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          }
          else if (event.includes('Օրավարձով'))
            this.showYellowMarkersDailyRent();
        }
        else if (event.length == 2) {
         // stex +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++0000000000000000
          // Հասարակական
          if(this.selectedActualUseCommercial == 'Հասարակական'){
            this.showMarkersCommercialArrayPublicSaleAndRent();
          }
          // Հասարակական
          // Առևտրային
          if(this.selectedActualUseCommercial == 'Առևտրային'){
            this.showMarkersCommercialArrayCommercialSaleAndRent();
          }
          // Առևտրային
          // Տեխսպասարկում
          if(this.selectedActualUseCommercial == 'Տեխսպասարկում'){
            this.showMarkersCommercialArrayMaintenanceSaleAndRent();
          }
          // Տեխսպասարկում
          // Բենզալցակայան
          if(this.selectedActualUseCommercial == 'Բենզալցակայան'){
            this.showMarkersCommercialArrayPetrolStationSaleAndRent();
          }
          // Բենզալցակայան
          // ԱԳԼՃԿ
          if(this.selectedActualUseCommercial == 'ԱԳԼՃԿ'){
            this.showMarkersCommercialArrayGasStationSaleAndRent();
          }
          // ԱԳԼՃԿ
          // Արտադրական
          if(this.selectedActualUseCommercial == 'Արտադրական'){
            this.showMarkersCommercialArrayProductionSaleAndRent();
          }
          // Արտադրական
          // Հիդրոէլեկտրակայան
          if(this.selectedActualUseCommercial == 'Հիդրոէլեկտրակայան'){
            this.showMarkersCommercialArrayHydroelectricSaleAndRent();
          }
          // Հիդրոէլեկտրակայան
          // Ընդերքի օգտագործում
          if(this.selectedActualUseCommercial == 'Ընդերքի օգտագործում'){
            this.showMarkersCommercialArraySubsoilSaleAndRent();
          }
          // Ընդերքի օգտագործում
          // Անասնապահական
          if(this.selectedActualUseCommercial == 'Անասնապահական'){
            this.showMarkersCommercialArrayLivestockSaleAndRent();
          }
          // Անասնապահական
          // Թռչնաֆաբրիկա
          if(this.selectedActualUseCommercial == 'Թռչնաֆաբրիկա'){
            this.showMarkersCommercialArrayPoultrySaleAndRent();
          }
          // Թռչնաֆաբրիկա
          // Ձկնաբուծարան
          if(this.selectedActualUseCommercial == 'Ձկնաբուծարան'){
            this.showMarkersCommercialArrayFishSaleAndRent();
          }
          // Ձկնաբուծարան
          // Ջերմոց
          if(this.selectedActualUseCommercial == 'Ջերմոց'){
            this.showMarkersCommercialArrayGreenhouseSaleAndRent();
          }
          // Ջերմոց
          // kkkkkkkkkkkkkkkkkkkkkkkkkk
          // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
          if(this.selectedActualUseCommercial == 'Հյուրանոց /հոթել, մոթել/, հանգստյան տուն'){
            this.showMarkersCommercialArrayHotelMotelSaleAndRent();
          }
          // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
          // Ռեստորան-հյուրանոց
          if(this.selectedActualUseCommercial == 'Ռեստորան-հյուրանոց'){
            this.showMarkersCommercialArrayRestaurantHotelSaleAndRent();
          }
          // Ռեստորան-հյուրանոց
          // Ռեստորան
          if(this.selectedActualUseCommercial == 'Ռեստորան'){
            this.showMarkersCommercialArrayRestaurantSaleAndRent();
          }
          // Ռեստորան
          // Սրճարան
          if(this.selectedActualUseCommercial == 'Սրճարան'){
            this.showMarkersCommercialArrayCafeSaleAndRent();
          }
          // Սրճարան
          // Նկուղ, կիսանկուղ
          if(this.selectedActualUseCommercial == 'Նկուղ, կիսանկուղ'){
            this.showMarkersCommercialArrayBasementSaleAndRent();
          }
          // Նկուղ, կիսանկուղ
          // Սառնարան
          if(this.selectedActualUseCommercial == 'Սառնարան'){
            this.showMarkersCommercialArrayRefrigeratorSaleAndRent();
          }
          // Սառնարան
          // Սպորտային համալիր
          if(this.selectedActualUseCommercial == 'Սպորտային համալիր'){
            this.showMarkersCommercialArraySportComplexSaleAndRent();
          }
          // Սպորտային համալիր


          // stex +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          if (event.includes('Վաճառք') && event.includes('Վարձակալություն')) {
           // this.showYellowMarkersSaleAndRent();
            // stex +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++000000000000
            // Հասարակական
            if(this.selectedActualUseCommercial == 'Հասարակական'){
              this.showMarkersCommercialArrayPublicSaleAndRent();
            }
            // Հասարակական
            // Առևտրային
            if(this.selectedActualUseCommercial == 'Առևտրային'){
              this.showMarkersCommercialArrayCommercialSaleAndRent();
            }
            // Առևտրային
            // Տեխսպասարկում
            if(this.selectedActualUseCommercial == 'Տեխսպասարկում'){
              this.showMarkersCommercialArrayMaintenanceSaleAndRent();
            }
            // Տեխսպասարկում
            // Բենզալցակայան
            if(this.selectedActualUseCommercial == 'Բենզալցակայան'){
              this.showMarkersCommercialArrayPetrolStationSaleAndRent();
            }
            // Բենզալցակայան
            // ԱԳԼՃԿ
            if(this.selectedActualUseCommercial == 'ԱԳԼՃԿ'){
              this.showMarkersCommercialArrayGasStationSaleAndRent();
            }
            // ԱԳԼՃԿ
            // Արտադրական
            if(this.selectedActualUseCommercial == 'Արտադրական'){
              this.showMarkersCommercialArrayProductionSaleAndRent();
            }
            // Արտադրական
            // Հիդրոէլեկտրակայան
            if(this.selectedActualUseCommercial == 'Հիդրոէլեկտրակայան'){
              this.showMarkersCommercialArrayHydroelectricSaleAndRent();
            }
            // Հիդրոէլեկտրակայան
            // Ընդերքի օգտագործում
            if(this.selectedActualUseCommercial == 'Ընդերքի օգտագործում'){
              this.showMarkersCommercialArraySubsoilSaleAndRent();
            }
            // Ընդերքի օգտագործում
            // Անասնապահական
            if(this.selectedActualUseCommercial == 'Անասնապահական'){
              this.showMarkersCommercialArrayLivestockSaleAndRent();
            }
            // Անասնապահական
            // Թռչնաֆաբրիկա
            if(this.selectedActualUseCommercial == 'Թռչնաֆաբրիկա'){
              this.showMarkersCommercialArrayPoultrySaleAndRent();
            }
            // Թռչնաֆաբրիկա
            // Ձկնաբուծարան
            if(this.selectedActualUseCommercial == 'Ձկնաբուծարան'){
              this.showMarkersCommercialArrayFishSaleAndRent();
            }
            // Ձկնաբուծարան
            // Ջերմոց
            if(this.selectedActualUseCommercial == 'Ջերմոց'){
              this.showMarkersCommercialArrayGreenhouseSaleAndRent();
            }
            // Ջերմոց
            //kkkkkkkkkkkkkkkkkkk
            // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
            if(this.selectedActualUseCommercial == 'Հյուրանոց /հոթել, մոթել/, հանգստյան տուն'){
              this.showMarkersCommercialArrayHotelMotelSaleAndRent();
            }
            // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն
            // Ռեստորան-հյուրանոց
            if(this.selectedActualUseCommercial == 'Ռեստորան-հյուրանոց'){
              this.showMarkersCommercialArrayRestaurantHotelSaleAndRent();
            }
            // Ռեստորան-հյուրանոց
            // Ռեստորան
            if(this.selectedActualUseCommercial == 'Ռեստորան'){
              this.showMarkersCommercialArrayRestaurantSaleAndRent();
            }
            // Ռեստորան
            // Սրճարան
            if(this.selectedActualUseCommercial == 'Սրճարան'){
              this.showMarkersCommercialArrayCafeSaleAndRent();
            }
            // Սրճարան
            // Նկուղ, կիսանկուղ
            if(this.selectedActualUseCommercial == 'Նկուղ, կիսանկուղ'){
              this.showMarkersCommercialArrayBasementSaleAndRent();
            }
            // Նկուղ, կիսանկուղ
            // Սառնարան
            if(this.selectedActualUseCommercial == 'Սառնարան'){
              this.showMarkersCommercialArrayRefrigeratorSaleAndRent();
            }
            // Սառնարան
            // Սպորտային համալիր
            if(this.selectedActualUseCommercial == 'Սպորտային համալիր'){
              this.showMarkersCommercialArraySportComplexSaleAndRent();
            }
            // Սպորտային համալիր

            // stex +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          } else if (event.includes('Վաճառք') && event.includes('Օրավարձով')) {
            this.showYellowMarkersSaleAndDailyRent();
          } else if (event.includes('Վարձակալություն') && event.includes('Օրավարձով')) {
            this.showYellowMarkersRentAndDailyRent();
          }
        }
        else if (event.length == 3) {
          this.showYellowMarkersSaleAndRentAndDailyRent();
        }
      }
      else if (this.btnBlueMarkerFlag) {
        if (event.length == 0) {
          this.showBlueMarkers();
        } else if (event.length == 1) {
          if (event.includes('Վաճառք'))
            this.showBlueMarkersSale();
          else if (event.includes('Վարձակալություն'))
            this.showBlueMarkersRent();
          else if (event.includes('Օրավարձով'))
            this.showBlueMarkersDailyRent();
        } else if (event.length == 2) {
          if (event.includes('Վաճառք') && event.includes('Վարձակալություն')) {
            this.showBlueMarkersSaleAndRent();
          } else if (event.includes('Վաճառք') && event.includes('Օրավարձով')) {
            this.showBlueMarkersSaleAndDailyRent();
          } else if (event.includes('Վարձակալություն') && event.includes('Օրավարձով')) {
            this.showBlueMarkersRentAndDailyRent();
          }
        } else if (event.length == 3) {
          this.showBlueMarkersSaleAndRentAndDailyRent();
        }
      }
      else if (this.btnPurpleMarkerFlag) {
        if (event.length == 0) {
          this.showPurpleMarkers();
        } else if (event.length == 1) {
          if (event.includes('Վաճառք'))
            this.showPurpleMarkersSale();
          else if (event.includes('Վարձակալություն'))
            this.showPurpleMarkersRent();
          else if (event.includes('Օրավարձով'))
            this.showPurpleMarkersDailyRent();
        } else if (event.length == 2) {
          if (event.includes('Վաճառք') && event.includes('Վարձակալություն')) {
            this.showPurpleMarkersSaleAndRent();
          } else if (event.includes('Վաճառք') && event.includes('Օրավարձով')) {
            this.showPurpleMarkersSaleAndDailyRent();
          } else if (event.includes('Վարձակալություն') && event.includes('Օրավարձով')) {
            this.showPurpleMarkersRentAndDailyRent();
          }
        } else if (event.length == 3) {
          this.showPurpleMarkersSaleAndRentAndDailyRent();
        }
      }
      else if (this.btnOrangeMarkerFlag) {
        if (event.length == 0) {
          this.showOrangeMarkers();
        } else if (event.length == 1) {
          if (event.includes('Վաճառք'))
            this.showOrangeMarkersSale();
          else if (event.includes('Վարձակալություն'))
            this.showOrangeMarkersRent();
          else if (event.includes('Օրավարձով'))
            this.showOrangeMarkersDailyRent();
        } else if (event.length == 2) {
          if (event.includes('Վաճառք') && event.includes('Վարձակալություն')) {
            this.showOrangeMarkersSaleAndRent();
          } else if (event.includes('Վաճառք') && event.includes('Օրավարձով')) {
            this.showOrangeMarkersSaleAndDailyRent();
          } else if (event.includes('Վարձակալություն') && event.includes('Օրավարձով')) {
            this.showOrangeMarkersRentAndDailyRent();
          }
        } else if (event.length == 3) {
          this.showOrangeMarkersSaleAndRentAndDailyRent();
        }
      }
    }
  }

  setMapOnAll(map) {
    for (let i = 0; i < this.markersArray.length; i++) {
      this.markersArray[i].setMap(map);
    }
  }

  setMarkersRed(map) {
    for (let i = 0; i < this.markersForApartmentRed.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.markersApartment[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.markersApartment[i].mapDetails.address +
          '</a>'
      });

      const markersRed = new google.maps.Marker({
        position: {lat: +this.markersForApartmentRed[i].lat, lng: +this.markersForApartmentRed[i].lng},
        map: map,
        icon: '../../assets/marker-icons/iconRed40.png'
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.markersApartment[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersRedSale(map) {
    for (let i = 0; i < this.markersForApartmentForSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoForApartmentForSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoForApartmentForSale[i].mapDetails.address +
          '</a>'
      });
      // for size add =====
      var iconApartmentSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Bnakaran_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====
      const markersRed = new google.maps.Marker({
        position: {lat: +this.markersForApartmentForSale[i].lat, lng: +this.markersForApartmentForSale[i].lng},
        map: map,
        icon: iconApartmentSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForApartmentForSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersRedRent(map) {
    for (let i = 0; i < this.markersForApartmentForRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoForApartmentForRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoForApartmentForRent[i].mapDetails.address +
          '</a>'
      });
      // for size add =====
      var iconApartmentRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Bnakaran_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====
      const markersRed = new google.maps.Marker({
        position: {lat: +this.markersForApartmentForRent[i].lat, lng: +this.markersForApartmentForRent[i].lng},
        map: map,
        icon: iconApartmentRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForApartmentForRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersRedDailyRent(map) {
    for (let i = 0; i < this.markersForApartmentForDailyRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoForApartmentForDailyRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoForApartmentForDailyRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconApartmentDailyRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Bnakaran_Or_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====
      const markersRed = new google.maps.Marker({
        position: {
          lat: +this.markersForApartmentForDailyRent[i].lat,
          lng: +this.markersForApartmentForDailyRent[i].lng
        },
        map: map,
        icon: iconApartmentDailyRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForApartmentForDailyRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setRedMarkersAll() {
    this.setMarkersRedSale(this.myMap);
    this.setMarkersRedRent(this.myMap);
    this.setMarkersRedDailyRent(this.myMap);
  }

  setMarkersGreen(map) {
    for (let i = 0; i < this.markersForHouseGreen.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.markersHouse[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.markersHouse[i].mapDetails.address +
          '</a>'
      });

      const markersGreen = new google.maps.Marker({
        position: {lat: +this.markersForHouseGreen[i].lat, lng: +this.markersForHouseGreen[i].lng},
        map: map,
        icon: '../../assets/marker-icons/iconGreen40.png'
      });

      this.markersArray.push(markersGreen);

      google.maps.event.addListener(markersGreen, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.markersHouse[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersGreen);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersGreenSale(map) {
    for (let i = 0; i < this.markersForHouseForSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForHouseForSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForHouseForSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconHouseSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Arandznatun_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersGreen = new google.maps.Marker({
        position: {lat: +this.markersForHouseForSale[i].lat, lng: +this.markersForHouseForSale[i].lng},
        map: map,
        icon: iconHouseSale
      });

      this.markersArray.push(markersGreen);

      google.maps.event.addListener(markersGreen, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForHouseForSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersGreen);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersGreenRent(map) {
    for (let i = 0; i < this.markersForHouseForRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForHouseForRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForHouseForRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconHouseRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Arandznatun_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersGreen = new google.maps.Marker({
        position: {lat: +this.markersForHouseForRent[i].lat, lng: +this.markersForHouseForRent[i].lng},
        map: map,
        icon: iconHouseRent
      });

      this.markersArray.push(markersGreen);

      google.maps.event.addListener(markersGreen, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForHouseForRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersGreen);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersGreenDailyRent(map) {
    for (let i = 0; i < this.markersForHouseForDailyRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForHouseForDailyRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForHouseForDailyRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconHouseDailyRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Arandznatun_Or_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersGreen = new google.maps.Marker({
        position: {
          lat: +this.markersForHouseForDailyRent[i].lat,
          lng: +this.markersForHouseForDailyRent[i].lng
        },
        map: map,
        icon: iconHouseDailyRent
      });

      this.markersArray.push(markersGreen);

      google.maps.event.addListener(markersGreen, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForHouseForDailyRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersGreen);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setGreenMarkersAll() {
    this.setMarkersGreenSale(this.myMap);
    this.setMarkersGreenRent(this.myMap);
    this.setMarkersGreenDailyRent(this.myMap);
  }

  setMarkersYellow(map) {
    for (let i = 0; i < this.markersForCommercialYellow.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.markersCommercial[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.markersCommercial[i].mapDetails.address +
          '</a>'
      });

      const markersYellow = new google.maps.Marker({
        position: {lat: +this.markersForCommercialYellow[i].lat, lng: +this.markersForCommercialYellow[i].lng},
        map: map,
        icon: '../../assets/marker-icons/iconYellow40.png'
      });
      this.markersArray.push(markersYellow);

      google.maps.event.addListener(markersYellow, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.markersCommercial[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersYellow);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersYellowSale(map) {
    for (let i = 0; i < this.markersForCommercialForSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForCommercialForSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForCommercialForSale[i].mapDetails.address +
          '</a>'
      });

      const markersYellow = new google.maps.Marker({
        position: {lat: +this.markersForCommercialForSale[i].lat, lng: +this.markersForCommercialForSale[i].lng},
        map: map,
        icon: '../../assets/marker-icons/markersCommercial/iconYellowS40.png'
      });
      this.markersArray.push(markersYellow);

      google.maps.event.addListener(markersYellow, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForCommercialForSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersYellow);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersYellowRent(map) {
    for (let i = 0; i < this.markersForCommercialForRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForCommercialForRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForCommercialForRent[i].mapDetails.address +
          '</a>'
      });

      const markersYellow = new google.maps.Marker({
        position: {lat: +this.markersForCommercialForRent[i].lat, lng: +this.markersForCommercialForRent[i].lng},
        map: map,
        icon: '../../assets/marker-icons/markersCommercial/iconYellowR40.png'
      });
      this.markersArray.push(markersYellow);

      google.maps.event.addListener(markersYellow, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForCommercialForRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersYellow);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersYellowDailyRent(map) {
    for (let i = 0; i < this.markersForCommercialForDailyRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForCommercialForDailyRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForCommercialForDailyRent[i].mapDetails.address +
          '</a>'
      });

      const markersYellow = new google.maps.Marker({
        position: {
          lat: +this.markersForCommercialForDailyRent[i].lat,
          lng: +this.markersForCommercialForDailyRent[i].lng
        },
        map: map,
        icon: '../../assets/marker-icons/markersCommercial/iconYellowD40.png'
      });
      this.markersArray.push(markersYellow);

      google.maps.event.addListener(markersYellow, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForCommercialForDailyRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersYellow);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  // Հասարակական=====================
  setMarkersCommercialArrayPublicSale(map) {
    for (let i = 0; i < this.commercialArrayPublicSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayPublicSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayPublicSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconCommercialSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Hasarakakan_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayPublicSale[i].lat, lng: +this.commercialArrayPublicSale[i].lng},
        map: map,
        icon: iconCommercialSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayPublicSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayPublicRent(map) {
    for (let i = 0; i < this.commercialArrayPublicRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
        '<img src="' + this.url + this.infoCommercialArrayPublicRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
        '<br>\n' +
        this.infoCommercialArrayPublicRent[i].mapDetails.address +
        '</a>'
      });

      // for size add =====
      var iconCommercialRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Hasarakakan_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayPublicRent[i].lat, lng: +this.commercialArrayPublicRent[i].lng},
        map: map,
        icon: iconCommercialRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayPublicRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Հասարակական=====================
  // Առևտրային=====================
  setMarkersCommercialArrayCommercialSale(map) {
    for (let i = 0; i < this.commercialArrayCommercialSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayCommercialSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayCommercialSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconCommercialSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Arevtrayin_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayCommercialSale[i].lat, lng: +this.commercialArrayCommercialSale[i].lng},
        map: map,
        icon: iconCommercialSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayCommercialSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayCommercialRent(map) {
    for (let i = 0; i < this.commercialArrayCommercialRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayCommercialRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayCommercialRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconCommercialRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Arevtrayin_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayCommercialRent[i].lat, lng: +this.commercialArrayCommercialRent[i].lng},
        map: map,
        icon: iconCommercialRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayCommercialRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Առևտրային=====================
  // Տեխսպասարկում=====================
  setMarkersCommercialArrayMaintenanceSale(map) {
    for (let i = 0; i < this.commercialArrayMaintenanceSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayMaintenanceSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayMaintenanceSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconMaintenanceSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Texspasarkum_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayMaintenanceSale[i].lat, lng: +this.commercialArrayMaintenanceSale[i].lng},
        map: map,
        icon: iconMaintenanceSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayMaintenanceSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayMaintenanceRent(map) {
    for (let i = 0; i < this.commercialArrayMaintenanceRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayMaintenanceRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayMaintenanceRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconMaintenanceRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Texspasarkum_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayMaintenanceRent[i].lat, lng: +this.commercialArrayMaintenanceRent[i].lng},
        map: map,
        icon: iconMaintenanceRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayMaintenanceRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Տեխսպասարկում=====================
  // Բենզալցակայան=====================
  setMarkersCommercialArrayPetrolStationSale(map) {
    for (let i = 0; i < this.commercialArrayPetrolStationSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayPetrolStationSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayPetrolStationSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconPetrolSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Benzalcakayan_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayPetrolStationSale[i].lat, lng: +this.commercialArrayPetrolStationSale[i].lng},
        map: map,
        icon: iconPetrolSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayPetrolStationSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayPetrolStationRent(map) {
    for (let i = 0; i < this.commercialArrayPetrolStationRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayPetrolStationRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayPetrolStationRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconPetrolSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Benzalcakayan_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayPetrolStationRent[i].lat, lng: +this.commercialArrayPetrolStationRent[i].lng},
        map: map,
        icon: iconPetrolSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayPetrolStationRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Բենզալցակայան=====================
  // ԱԳԼՃԿ=====================
 // commercialArrayGasStationRent
  setMarkersCommercialArrayGasStationSale(map) {
    for (let i = 0; i < this.commercialArrayGasStationSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayGasStationSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayGasStationSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconGasSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Gazalcakayan_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayGasStationSale[i].lat, lng: +this.commercialArrayGasStationSale[i].lng},
        map: map,
        icon: iconGasSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayGasStationSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayGasStationRent(map) {
    for (let i = 0; i < this.commercialArrayGasStationRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayGasStationRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayGasStationRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconGasRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Gazalcakayan_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayGasStationRent[i].lat, lng: +this.commercialArrayGasStationRent[i].lng},
        map: map,
        icon: iconGasRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayGasStationRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // ԱԳԼՃԿ=====================
  // Արտադրական=====================
  setMarkersCommercialArrayProductionSale(map) {
    for (let i = 0; i < this.commercialArrayProductionSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayProductionSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayProductionSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconProductionSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Artadrakan_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayProductionSale[i].lat, lng: +this.commercialArrayProductionSale[i].lng},
        map: map,
        icon: iconProductionSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayProductionSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayProductionRent(map) {
    for (let i = 0; i < this.commercialArrayProductionRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayProductionRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayProductionRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconProductionSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Artadrakan_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayProductionRent[i].lat, lng: +this.commercialArrayProductionRent[i].lng},
        map: map,
        icon: iconProductionSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayProductionRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Արտադրական=====================
  // Հիդրոէլեկտրակայան=====================
  setMarkersCommercialArrayHydroelectricSale(map) {
    for (let i = 0; i < this.commercialArrayHydroelectricSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayHydroelectricSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayHydroelectricSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconHydroelectricSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/HEK_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayHydroelectricSale[i].lat, lng: +this.commercialArrayHydroelectricSale[i].lng},
        map: map,
        icon: iconHydroelectricSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayHydroelectricSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayHydroelectricRent(map) {
    for (let i = 0; i < this.commercialArrayHydroelectricRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayHydroelectricRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayHydroelectricRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconHydroelectricRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/HEK_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayHydroelectricRent[i].lat, lng: +this.commercialArrayHydroelectricRent[i].lng},
        map: map,
        icon: iconHydroelectricRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayHydroelectricRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Հիդրոէլեկտրակայան=====================
  // Ընդերքի օգտագործում=====================
  setMarkersCommercialArraySubsoilSale(map) {
    for (let i = 0; i < this.commercialArraySubsoilSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArraySubsoilSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArraySubsoilSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconSubsoilSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Hanq_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArraySubsoilSale[i].lat, lng: +this.commercialArraySubsoilSale[i].lng},
        map: map,
        icon: iconSubsoilSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArraySubsoilSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArraySubsoilRent(map) {
    for (let i = 0; i < this.commercialArraySubsoilRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArraySubsoilRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArraySubsoilRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconSubsoilRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Hanq_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArraySubsoilRent[i].lat, lng: +this.commercialArraySubsoilRent[i].lng},
        map: map,
        icon: iconSubsoilRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArraySubsoilRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Ընդերքի օգտագործում=====================
  // Անասնապահական=====================
  setMarkersCommercialArrayLivestockSale(map) {
    for (let i = 0; i < this.commercialArrayLivestockSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayLivestockSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayLivestockSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconLivestockSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Anasnapahakan_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayLivestockSale[i].lat, lng: +this.commercialArrayLivestockSale[i].lng},
        map: map,
        icon: iconLivestockSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayLivestockSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayLivestockRent(map) {
    for (let i = 0; i < this.commercialArrayLivestockRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayLivestockRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayLivestockRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconLivestockRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Anasnapahakan_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayLivestockRent[i].lat, lng: +this.commercialArrayLivestockRent[i].lng},
        map: map,
        icon: iconLivestockRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayLivestockRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Անասնապահական=====================
  // Թռչնաֆաբրիկա=====================
  setMarkersCommercialArrayPoultrySale(map) {
    for (let i = 0; i < this.commercialArrayPoultrySale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayPoultrySale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayPoultrySale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconPoultrySale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Trchnafabrika_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayPoultrySale[i].lat, lng: +this.commercialArrayPoultrySale[i].lng},
        map: map,
        icon: iconPoultrySale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayPoultrySale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayPoultryRent(map) {
    for (let i = 0; i < this.commercialArrayPoultryRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayPoultryRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayPoultryRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconPoultryRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Trchnafabrika_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayPoultryRent[i].lat, lng: +this.commercialArrayPoultryRent[i].lng},
        map: map,
        icon: iconPoultryRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayPoultryRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Թռչնաֆաբրիկա=====================
  // Ձկնաբուծարան=====================
  setMarkersCommercialArrayFishSale(map) {
    for (let i = 0; i < this.commercialArrayFishSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayFishSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayFishSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconFishSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Dzknabucaran_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayFishSale[i].lat, lng: +this.commercialArrayFishSale[i].lng},
        map: map,
        icon: iconFishSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayFishSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayFishRent(map) {
    for (let i = 0; i < this.commercialArrayFishRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayFishRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayFishRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconFishRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Dzknabucaran_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayFishRent[i].lat, lng: +this.commercialArrayFishRent[i].lng},
        map: map,
        icon: iconFishRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayFishRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Ձկնաբուծարան=====================
  // Ջերմոց=====================
  setMarkersCommercialArrayGreenhouseSale(map) {
    for (let i = 0; i < this.commercialArrayGreenhouseSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayGreenhouseSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayGreenhouseSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconGreenhouseSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Jermoc_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayGreenhouseSale[i].lat, lng: +this.commercialArrayGreenhouseSale[i].lng},
        map: map,
        icon: iconGreenhouseSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayGreenhouseSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayGreenhouseRent(map) {
    for (let i = 0; i < this.commercialArrayGreenhouseRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayGreenhouseRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayGreenhouseRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconGreenhouseRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Jermoc_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayGreenhouseRent[i].lat, lng: +this.commercialArrayGreenhouseRent[i].lng},
        map: map,
        icon: iconGreenhouseRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayGreenhouseRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Ջերմոց=====================
  // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն=====================
  setMarkersCommercialArrayHotelMotelSale(map) {
    for (let i = 0; i < this.commercialArrayHotelMotelSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayHotelMotelSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayHotelMotelSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconHotelMotelSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/RestoranHyuranic_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayHotelMotelSale[i].lat, lng: +this.commercialArrayHotelMotelSale[i].lng},
        map: map,
        icon: iconHotelMotelSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayHotelMotelSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayHotelMotelRent(map) {
    for (let i = 0; i < this.commercialArrayHotelMotelRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayHotelMotelRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayHotelMotelRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconHotelMotelRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/RestoranHyuranic_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayHotelMotelRent[i].lat, lng: +this.commercialArrayHotelMotelRent[i].lng},
        map: map,
        icon: iconHotelMotelRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayHotelMotelRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Հյուրանոց /հոթել, մոթել/, հանգստյան տուն=====================
  // Ռեստորան-հյուրանոց=====================
  setMarkersCommercialArrayRestaurantHotelSale(map) {
    for (let i = 0; i < this.commercialArrayRestaurantHotelSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayRestaurantHotelSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayRestaurantHotelSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconHotelMotelSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/RestoranHyuranic_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayRestaurantHotelSale[i].lat, lng: +this.commercialArrayRestaurantHotelSale[i].lng},
        map: map,
        icon: iconHotelMotelSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayRestaurantHotelSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayRestaurantHotelRent(map) {
    for (let i = 0; i < this.commercialArrayRestaurantHotelRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayRestaurantHotelRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayRestaurantHotelRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconHotelMotelRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/RestoranHyuranic_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayRestaurantHotelRent[i].lat, lng: +this.commercialArrayRestaurantHotelRent[i].lng},
        map: map,
        icon: iconHotelMotelRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayRestaurantHotelRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Ռեստորան-հյուրանոց=====================
  // Ռեստորան=====================
  setMarkersCommercialArrayRestaurantSale(map) {
    for (let i = 0; i < this.commercialArrayRestaurantSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayRestaurantSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayRestaurantSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconRestaurantSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Restoran_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayRestaurantSale[i].lat, lng: +this.commercialArrayRestaurantSale[i].lng},
        map: map,
        icon: iconRestaurantSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayRestaurantSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayRestaurantRent(map) {
    for (let i = 0; i < this.commercialArrayRestaurantRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayRestaurantRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayRestaurantRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconRestaurantRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Restoran_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayRestaurantRent[i].lat, lng: +this.commercialArrayRestaurantRent[i].lng},
        map: map,
        icon: iconRestaurantRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayRestaurantRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Ռեստորան=====================
  // Սրճարան=====================
  setMarkersCommercialArrayCafeSale(map) {
    for (let i = 0; i < this.commercialArrayCafeSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayCafeSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayCafeSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconCafeSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Srcharan_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayCafeSale[i].lat, lng: +this.commercialArrayCafeSale[i].lng},
        map: map,
        icon: iconCafeSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayCafeSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayCafeRent(map) {
    for (let i = 0; i < this.commercialArrayCafeRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayCafeRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayCafeRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconCafeRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Srcharan_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayCafeRent[i].lat, lng: +this.commercialArrayCafeRent[i].lng},
        map: map,
        icon: iconCafeRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayCafeRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Սրճարան=====================
  // Նկուղ, կիսանկուղ=====================
  setMarkersCommercialArrayBasementSale(map) {
    for (let i = 0; i < this.commercialArrayBasementSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayBasementSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayBasementSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconBasementSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Nkugh_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayBasementSale[i].lat, lng: +this.commercialArrayBasementSale[i].lng},
        map: map,
        icon: iconBasementSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayBasementSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayBasementRent(map) {
    for (let i = 0; i < this.commercialArrayBasementRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayBasementRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayBasementRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconBasementRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Nkugh_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayBasementRent[i].lat, lng: +this.commercialArrayBasementRent[i].lng},
        map: map,
        icon: iconBasementRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayBasementRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Նկուղ, կիսանկուղ=====================
  // Սառնարան=====================
  setMarkersCommercialArrayRefrigeratorSale(map) {
    for (let i = 0; i < this.commercialArrayRefrigeratorSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayRefrigeratorSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayRefrigeratorSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconRefrigeratorSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Sarnaran_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayRefrigeratorSale[i].lat, lng: +this.commercialArrayRefrigeratorSale[i].lng},
        map: map,
        icon: iconRefrigeratorSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayRefrigeratorSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArrayRefrigeratorRent(map) {
    for (let i = 0; i < this.commercialArrayRefrigeratorRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArrayRefrigeratorRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArrayRefrigeratorRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconRefrigeratorRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Sarnaran_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArrayRefrigeratorRent[i].lat, lng: +this.commercialArrayRefrigeratorRent[i].lng},
        map: map,
        icon: iconRefrigeratorRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArrayRefrigeratorRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Սառնարան=====================
  // Սպորտային համալիր=====================
  setMarkersCommercialArraySportComplexSale(map) {
    for (let i = 0; i < this.commercialArraySportComplexSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArraySportComplexSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArraySportComplexSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconSportComplexSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Sportayin_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArraySportComplexSale[i].lat, lng: +this.commercialArraySportComplexSale[i].lng},
        map: map,
        icon: iconSportComplexSale
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArraySportComplexSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  setMarkersCommercialArraySportComplexRent(map) {
    for (let i = 0; i < this.commercialArraySportComplexRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.infoCommercialArraySportComplexRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.infoCommercialArraySportComplexRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconSportComplexRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Commercial/Sportayin_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersRed = new google.maps.Marker({
        position: {lat: +this.commercialArraySportComplexRent[i].lat, lng: +this.commercialArraySportComplexRent[i].lng},
        map: map,
        icon: iconSportComplexRent
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoCommercialArraySportComplexRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }
  // Սպորտային համալիր=====================
  setYellowMarkersOnlySale(){
    this.setMarkersCommercialArrayPublicSale(this.myMap);
    this.setMarkersCommercialArrayCommercialSale(this.myMap);
    this.setMarkersCommercialArrayMaintenanceSale(this.myMap);
    this.setMarkersCommercialArrayPetrolStationSale(this.myMap);
    this.setMarkersCommercialArrayGasStationSale(this.myMap);
    this.setMarkersCommercialArrayProductionSale(this.myMap);
    this.setMarkersCommercialArrayHydroelectricSale(this.myMap);
    this.setMarkersCommercialArraySubsoilSale(this.myMap);
    this.setMarkersCommercialArrayLivestockSale(this.myMap);
    this.setMarkersCommercialArrayPoultrySale(this.myMap);
    this.setMarkersCommercialArrayFishSale(this.myMap);
    this.setMarkersCommercialArrayGreenhouseSale(this.myMap);
    this.setMarkersCommercialArrayHotelMotelSale(this.myMap);
    this.setMarkersCommercialArrayRestaurantHotelSale(this.myMap);
    this.setMarkersCommercialArrayRestaurantSale(this.myMap);
    this.setMarkersCommercialArrayCafeSale(this.myMap);
    this.setMarkersCommercialArrayBasementSale(this.myMap);
    this.setMarkersCommercialArrayRefrigeratorSale(this.myMap);
    this.setMarkersCommercialArraySportComplexSale(this.myMap);
  }
  setYellowMarkersOnlyRent(){
    this.setMarkersCommercialArrayPublicRent(this.myMap);
    this.setMarkersCommercialArrayCommercialRent(this.myMap);
    this.setMarkersCommercialArrayMaintenanceRent(this.myMap);
    this.setMarkersCommercialArrayPetrolStationRent(this.myMap);
    this.setMarkersCommercialArrayGasStationRent(this.myMap);
    this.setMarkersCommercialArrayProductionRent(this.myMap);
    this.setMarkersCommercialArrayHydroelectricRent(this.myMap);
    this.setMarkersCommercialArraySubsoilRent(this.myMap);
    this.setMarkersCommercialArrayLivestockRent(this.myMap);
    this.setMarkersCommercialArrayPoultryRent(this.myMap);
    this.setMarkersCommercialArrayFishRent(this.myMap);
    this.setMarkersCommercialArrayGreenhouseRent(this.myMap);
    this.setMarkersCommercialArrayHotelMotelRent(this.myMap);
    this.setMarkersCommercialArrayRestaurantHotelRent(this.myMap);
    this.setMarkersCommercialArrayRestaurantRent(this.myMap);
    this.setMarkersCommercialArrayCafeRent(this.myMap);
    this.setMarkersCommercialArrayBasementRent(this.myMap);
    this.setMarkersCommercialArrayRefrigeratorRent(this.myMap);
    this.setMarkersCommercialArraySportComplexRent(this.myMap);
  }
  setYellowMarkersAll() {
    this.setMarkersCommercialArrayPublicSale(this.myMap);
    this.setMarkersCommercialArrayPublicRent(this.myMap);
    this.setMarkersCommercialArrayCommercialSale(this.myMap);
    this.setMarkersCommercialArrayCommercialRent(this.myMap);
    this.setMarkersCommercialArrayMaintenanceSale(this.myMap);
    this.setMarkersCommercialArrayMaintenanceRent(this.myMap);
    this.setMarkersCommercialArrayPetrolStationSale(this.myMap);
    this.setMarkersCommercialArrayPetrolStationRent(this.myMap);
    this.setMarkersCommercialArrayGasStationSale(this.myMap);
    this.setMarkersCommercialArrayGasStationRent(this.myMap);
    this.setMarkersCommercialArrayProductionSale(this.myMap);
    this.setMarkersCommercialArrayProductionRent(this.myMap);
    this.setMarkersCommercialArrayHydroelectricSale(this.myMap);
    this.setMarkersCommercialArrayHydroelectricRent(this.myMap);
    this.setMarkersCommercialArraySubsoilSale(this.myMap);
    this.setMarkersCommercialArraySubsoilRent(this.myMap);
    this.setMarkersCommercialArrayLivestockSale(this.myMap);
    this.setMarkersCommercialArrayLivestockRent(this.myMap);
    this.setMarkersCommercialArrayPoultrySale(this.myMap);
    this.setMarkersCommercialArrayPoultryRent(this.myMap);
    this.setMarkersCommercialArrayFishSale(this.myMap);
    this.setMarkersCommercialArrayFishRent(this.myMap);
    this.setMarkersCommercialArrayGreenhouseSale(this.myMap);
    this.setMarkersCommercialArrayGreenhouseRent(this.myMap);
    this.setMarkersCommercialArrayHotelMotelSale(this.myMap);
    this.setMarkersCommercialArrayHotelMotelRent(this.myMap);
    this.setMarkersCommercialArrayRestaurantHotelSale(this.myMap);
    this.setMarkersCommercialArrayRestaurantHotelRent(this.myMap);
    this.setMarkersCommercialArrayRestaurantSale(this.myMap);
    this.setMarkersCommercialArrayRestaurantRent(this.myMap);
    this.setMarkersCommercialArrayCafeSale(this.myMap);
    this.setMarkersCommercialArrayCafeRent(this.myMap);
    this.setMarkersCommercialArrayBasementSale(this.myMap);
    this.setMarkersCommercialArrayBasementRent(this.myMap);
    this.setMarkersCommercialArrayRefrigeratorSale(this.myMap);
    this.setMarkersCommercialArrayRefrigeratorRent(this.myMap);
    this.setMarkersCommercialArraySportComplexSale(this.myMap);
    this.setMarkersCommercialArraySportComplexRent(this.myMap);
  }

  setMarkersBlue(map) {
    for (let i = 0; i < this.markersForLandBlue.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +

          '<img src="' + this.url + this.markersLand[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.markersLand[i].mapDetails.address +
          '</a>'
      });

      const markersBlue = new google.maps.Marker({
        position: {lat: +this.markersForLandBlue[i].lat, lng: +this.markersForLandBlue[i].lng},
        map: map,
        icon: '../../assets/marker-icons/iconBlue40.png'
      });
      this.markersArray.push(markersBlue);

      google.maps.event.addListener(markersBlue, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.markersLand[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersBlue);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersBlueSale(map) {
    for (let i = 0; i < this.markersForLandForSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +

          '<img src="' + this.url + this.infoForLandForSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForLandForSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconLandSale = {
        url: "../../assets/marker-icons-new/mapMarkers/Hoghamas_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersBlue = new google.maps.Marker({
        position: {lat: +this.markersForLandForSale[i].lat, lng: +this.markersForLandForSale[i].lng},
        map: map,
        icon: iconLandSale
      });
      this.markersArray.push(markersBlue);

      google.maps.event.addListener(markersBlue, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForLandForSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersBlue);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersBlueRent(map) {
    for (let i = 0; i < this.markersForLandForRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +

          '<img src="' + this.url + this.infoForLandForRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForLandForRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconLandRent = {
        url: "../../assets/marker-icons-new/mapMarkers/Hoghamas_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersBlue = new google.maps.Marker({
        position: {lat: +this.markersForLandForRent[i].lat, lng: +this.markersForLandForRent[i].lng},
        map: map,
        icon: iconLandRent
      });
      this.markersArray.push(markersBlue);

      google.maps.event.addListener(markersBlue, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForLandForRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersBlue);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersBlueDailyRent(map) {
    for (let i = 0; i < this.markersForLandForDailyRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +

          '<img src="' + this.url + this.infoForLandForDailyRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForLandForDailyRent[i].mapDetails.address +
          '</a>'
      });

      const markersBlue = new google.maps.Marker({
        position: {lat: +this.markersForLandForDailyRent[i].lat, lng: +this.markersForLandForDailyRent[i].lng},
        map: map,
        icon: '../../assets/marker-icons/markersLand/iconBlueD40.png'
      });
      this.markersArray.push(markersBlue);

      google.maps.event.addListener(markersBlue, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForLandForDailyRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersBlue);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setBlueMarkersAll() {
    this.setMarkersBlueSale(this.myMap);
    this.setMarkersBlueRent(this.myMap);
    this.setMarkersBlueDailyRent(this.myMap);
  }

  setMarkersPurple(map) {
    for (let i = 0; i < this.markersForBusinessPurple.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.markersBusiness[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.markersBusiness[i].mapDetails.address +
          '</a>'
      });

      const markersPurple = new google.maps.Marker({
        position: {lat: +this.markersForBusinessPurple[i].lat, lng: +this.markersForBusinessPurple[i].lng},
        map: map,
        icon: '../../assets/marker-icons/iconPurple40.png'
      });
      this.markersArray.push(markersPurple);

      google.maps.event.addListener(markersPurple, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.markersBusiness[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersPurple);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersPurpleSale(map) {
    for (let i = 0; i < this.markersForBusinessForSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForBusinessForSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForBusinessForSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconBusinessSale= {
        url: "../../assets/marker-icons-new/mapMarkers/Business_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersPurple = new google.maps.Marker({
        position: {lat: +this.markersForBusinessForSale[i].lat, lng: +this.markersForBusinessForSale[i].lng},
        map: map,
        icon: iconBusinessSale
      });
      this.markersArray.push(markersPurple);

      google.maps.event.addListener(markersPurple, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForBusinessForSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersPurple);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersPurpleRent(map) {
    for (let i = 0; i < this.markersForBusinessForRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForBusinessForRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForBusinessForRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconBusinessRent= {
        url: "../../assets/marker-icons-new/mapMarkers/Business_vardz.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersPurple = new google.maps.Marker({
        position: {lat: +this.markersForBusinessForRent[i].lat, lng: +this.markersForBusinessForRent[i].lng},
        map: map,
        icon: iconBusinessRent
      });
      this.markersArray.push(markersPurple);

      google.maps.event.addListener(markersPurple, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForBusinessForRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersPurple);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersPurpleDailyRent(map) {
    for (let i = 0; i < this.markersForBusinessForDailyRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForBusinessForDailyRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForBusinessForDailyRent[i].mapDetails.address +
          '</a>'
      });

      const markersPurple = new google.maps.Marker({
        position: {lat: +this.markersForBusinessForDailyRent[i].lat, lng: +this.markersForBusinessForDailyRent[i].lng},
        map: map,
        icon: '../../assets/marker-icons/markersBusiness/iconPurpleD40.png'
      });
      this.markersArray.push(markersPurple);

      google.maps.event.addListener(markersPurple, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForBusinessForDailyRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersPurple);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setPurpleMarkersAll() {
    this.setMarkersPurpleSale(this.myMap);
    this.setMarkersPurpleRent(this.myMap);
    this.setMarkersPurpleDailyRent(this.myMap);
  }

  setMarkersOrange(map) {
    for (let i = 0; i < this.markersForNewlyBuiltOrange.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.markersNewlyBuilt[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.markersNewlyBuilt[i].mapDetails.address +
          '</a>'
      });

      const markersOrange = new google.maps.Marker({
        position: {
          lat: +this.markersForNewlyBuiltOrange[i].lat,
          lng: +this.markersForNewlyBuiltOrange[i].lng
        },
        map: map,
        icon: '../../assets/marker-icons/iconOrange40.png'
      });
      this.markersArray.push(markersOrange);

      google.maps.event.addListener(markersOrange, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.markersNewlyBuilt[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersOrange);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersOrangeSale(map) {
    for (let i = 0; i < this.markersForNewlyBuiltForSale.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForNewlyBuiltForSale[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForNewlyBuiltForSale[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconNewlyBuiltRent= {
        url: "../../assets/marker-icons-new/mapMarkers/Norakaruyc_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersOrange = new google.maps.Marker({
        position: {
          lat: +this.markersForNewlyBuiltForSale[i].lat,
          lng: +this.markersForNewlyBuiltForSale[i].lng
        },
        map: map,
        icon: iconNewlyBuiltRent
      });
      this.markersArray.push(markersOrange);

      google.maps.event.addListener(markersOrange, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForNewlyBuiltForSale[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersOrange);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersOrangeRent(map) {
    for (let i = 0; i < this.markersForNewlyBuiltForRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForNewlyBuiltForRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForNewlyBuiltForRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconNewlyBuiltRent= {
        url: "../../assets/marker-icons-new/mapMarkers/Norakaruyc_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersOrange = new google.maps.Marker({
        position: {
          lat: +this.markersForNewlyBuiltForRent[i].lat,
          lng: +this.markersForNewlyBuiltForRent[i].lng
        },
        map: map,
        icon: iconNewlyBuiltRent
      });
      this.markersArray.push(markersOrange);

      google.maps.event.addListener(markersOrange, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForNewlyBuiltForRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersOrange);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersOrangeDailyRent(map) {
    for (let i = 0; i < this.markersForNewlyBuiltForDailyRent.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details">\n' +
          '<img src="' + this.url + this.infoForNewlyBuiltForDailyRent[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

          '<br>\n' +
          this.infoForNewlyBuiltForDailyRent[i].mapDetails.address +
          '</a>'
      });

      // for size add =====
      var iconNewlyBuiltRent= {
        url: "../../assets/marker-icons-new/mapMarkers/Norakaruyc_vacharq.png",
        scaledSize: new google.maps.Size(25, 25)
      };
      // for size add =====

      const markersOrange = new google.maps.Marker({
        position: {
          lat: +this.markersForNewlyBuiltForDailyRent[i].lat,
          lng: +this.markersForNewlyBuiltForDailyRent[i].lng
        },
        map: map,
        icon: iconNewlyBuiltRent
      });
      this.markersArray.push(markersOrange);

      google.maps.event.addListener(markersOrange, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.infoForNewlyBuiltForDailyRent[i]));
        if (this.currentInfo) {
          this.currentInfo.close();
        }

        infoWindow.open(map, markersOrange);

        this.currentInfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setOrangeMarkersAll() {
    this.setMarkersOrangeSale(this.myMap);
    this.setMarkersOrangeRent(this.myMap);
    this.setMarkersOrangeDailyRent(this.myMap);
  }

  showRedMarkers() {
    this.setMapOnAll(null);
    // this.setMarkersRed(this.myMap);
    this.setRedMarkersAll();

    this.btnRedMarkerFlag = true;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = false;

    this.selectedTransaction = [];
  }

  showRedMarkersSale() {
    this.setMapOnAll(null);
    this.setMarkersRedSale(this.myMap);
  }

  showRedMarkersRent() {
    this.setMapOnAll(null);
    this.setMarkersRedRent(this.myMap);
  }

  showRedMarkersDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersRedDailyRent(this.myMap);
  }

  showRedMarkersSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersRedSale(this.myMap);
    this.setMarkersRedRent(this.myMap);
  }

  showRedMarkersSaleAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersRedSale(this.myMap);
    this.setMarkersRedDailyRent(this.myMap);
  }

  showRedMarkersRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersRedRent(this.myMap);
    this.setMarkersRedDailyRent(this.myMap);
  }

  showRedMarkersSaleAndRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersRedSale(this.myMap);
    this.setMarkersRedRent(this.myMap);
    this.setMarkersRedDailyRent(this.myMap);
  }

  showGreenMarkers() {
    this.setMapOnAll(null);
    // this.setMarkersGreen(this.myMap);
    this.setGreenMarkersAll();

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = true;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = false;

    this.selectedTransaction = [];
  }

  showGreenMarkersSale() {
    this.setMapOnAll(null);
    this.setMarkersGreenSale(this.myMap);
  }

  showGreenMarkersRent() {
    this.setMapOnAll(null);
    this.setMarkersGreenRent(this.myMap);
  }

  showGreenMarkersDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersGreenDailyRent(this.myMap);
  }

  showGreenMarkersSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersGreenSale(this.myMap);
    this.setMarkersGreenRent(this.myMap);
  }

  showGreenMarkersSaleAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersGreenSale(this.myMap);
    this.setMarkersGreenDailyRent(this.myMap);
  }

  showGreenMarkersRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersGreenRent(this.myMap);
    this.setMarkersGreenDailyRent(this.myMap);
  }

  showGreenMarkersSaleAndRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersGreenSale(this.myMap);
    this.setMarkersGreenRent(this.myMap);
    this.setMarkersGreenDailyRent(this.myMap);
  }

  showYellowMarkers() {
    this.setMapOnAll(null);
    this.setYellowMarkersAll();
    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = true;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = false;
    this.selectedTransaction = [];
    //console.log("GGGGGGGGGGGGGGGGGGGGG")
    this.selectedActualUseCommercial = '';
  }
  showYellowMarkersSaleOnly() {
    this.setMapOnAll(null);
    this.setYellowMarkersOnlySale();
    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = true;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = false;
    //this.selectedTransaction = [];
  }
  showYellowMarkersSaleRent() {
    this.setMapOnAll(null);
    this.setYellowMarkersOnlyRent();
    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = true;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = false;
   // this.selectedTransaction = [];
  }

  showYellowMarkersSale() {
    this.setMapOnAll(null);
    this.setMarkersYellowSale(this.myMap);
  }

  showYellowMarkersRent() {
    this.setMapOnAll(null);
    this.setMarkersYellowRent(this.myMap);
  }

  showYellowMarkersDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersYellowDailyRent(this.myMap);
  }

  showYellowMarkersSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersYellowSale(this.myMap);
    this.setMarkersYellowRent(this.myMap);
  }

  showYellowMarkersSaleAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersYellowSale(this.myMap);
    this.setMarkersYellowDailyRent(this.myMap);
  }

  showYellowMarkersRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersYellowRent(this.myMap);
    this.setMarkersYellowDailyRent(this.myMap);
  }

  showYellowMarkersSaleAndRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersYellowSale(this.myMap);
    this.setMarkersYellowRent(this.myMap);
    this.setMarkersYellowDailyRent(this.myMap);
  }

  // Հասարակական ================
  showMarkersCommercialArrayPublicSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayPublicSale(this.myMap);
  }
  showMarkersCommercialArrayPublicRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayPublicRent(this.myMap);
  }
  showMarkersCommercialArrayPublicSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayPublicSale(this.myMap);
    this.setMarkersCommercialArrayPublicRent(this.myMap);
  }
// Հասարակական ================
  // Առևտրային ================
  showMarkersCommercialArrayCommercialSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayCommercialSale(this.myMap);
  }
  showMarkersCommercialArrayCommercialRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayCommercialRent(this.myMap);
  }
  showMarkersCommercialArrayCommercialSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayCommercialSale(this.myMap);
    this.setMarkersCommercialArrayCommercialRent(this.myMap);
  }
// Առևտրային ================
  // Տեխսպասարկում ================
  showMarkersCommercialArrayMaintenanceSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayMaintenanceSale(this.myMap);
  }
  showMarkersCommercialArrayMaintenanceRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayMaintenanceRent(this.myMap);
  }
  showMarkersCommercialArrayMaintenanceSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayMaintenanceSale(this.myMap);
    this.setMarkersCommercialArrayMaintenanceRent(this.myMap);
  }
// Տեխսպասարկում ================
// Բենզալցակայան ================
  showMarkersCommercialArrayPetrolStationSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayPetrolStationSale(this.myMap);
  }
  showMarkersCommercialArrayPetrolStationRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayPetrolStationRent(this.myMap);
  }
  showMarkersCommercialArrayPetrolStationSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayPetrolStationSale(this.myMap);
    this.setMarkersCommercialArrayPetrolStationRent(this.myMap);
  }
// Բենզալցակայան ================
// ԱԳԼՃԿ ================
  showMarkersCommercialArrayGasStationSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayGasStationSale(this.myMap);
  }
  showMarkersCommercialArrayGasStationRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayGasStationRent(this.myMap);
  }
  showMarkersCommercialArrayGasStationSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayGasStationSale(this.myMap);
    this.setMarkersCommercialArrayGasStationRent(this.myMap);
  }
// ԱԳԼՃԿ ================
// Արտադրական ================
  showMarkersCommercialArrayProductionSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayProductionSale(this.myMap);
  }
  showMarkersCommercialArrayProductionRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayProductionRent(this.myMap);
  }
  showMarkersCommercialArrayProductionSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayProductionSale(this.myMap);
    this.setMarkersCommercialArrayProductionRent(this.myMap);
  }
// Արտադրական ================
// Հիդրոէլեկտրակայան ================
  showMarkersCommercialArrayHydroelectricSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayHydroelectricSale(this.myMap);
  }
  showMarkersCommercialArrayHydroelectricRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayHydroelectricRent(this.myMap);
  }
  showMarkersCommercialArrayHydroelectricSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayHydroelectricSale(this.myMap);
    this.setMarkersCommercialArrayHydroelectricRent(this.myMap);
  }
// Հիդրոէլեկտրակայան ================
// Ընդերքի օգտագործում ================
  showMarkersCommercialArraySubsoilSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArraySubsoilSale(this.myMap);
  }
  showMarkersCommercialArraySubsoilRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArraySubsoilRent(this.myMap);
  }
  showMarkersCommercialArraySubsoilSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArraySubsoilSale(this.myMap);
    this.setMarkersCommercialArraySubsoilRent(this.myMap);
  }
// Ընդերքի օգտագործում ================
// Անասնապահական ================
  showMarkersCommercialArrayLivestockSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayLivestockSale(this.myMap);
  }
  showMarkersCommercialArrayLivestockRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayLivestockRent(this.myMap);
  }
  showMarkersCommercialArrayLivestockSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayLivestockSale(this.myMap);
    this.setMarkersCommercialArrayLivestockRent(this.myMap);
  }
// Անասնապահական ================
// Թռչնաֆաբրիկա ================
  showMarkersCommercialArrayPoultrySale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayPoultrySale(this.myMap);
  }
  showMarkersCommercialArrayPoultryRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayPoultryRent(this.myMap);
  }
  showMarkersCommercialArrayPoultrySaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayPoultrySale(this.myMap);
    this.setMarkersCommercialArrayPoultryRent(this.myMap);
  }
// Թռչնաֆաբրիկա ================
// Ձկնաբուծարան ================
  showMarkersCommercialArrayFishSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayFishSale(this.myMap);
  }
  showMarkersCommercialArrayFishRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayFishRent(this.myMap);
  }
  showMarkersCommercialArrayFishSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayFishSale(this.myMap);
    this.setMarkersCommercialArrayFishRent(this.myMap);
  }
// Ձկնաբուծարան ================
// Ջերմոց ================
  showMarkersCommercialArrayGreenhouseSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayGreenhouseSale(this.myMap);
  }
  showMarkersCommercialArrayGreenhouseRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayGreenhouseRent(this.myMap);
  }
  showMarkersCommercialArrayGreenhouseSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayGreenhouseSale(this.myMap);
    this.setMarkersCommercialArrayGreenhouseRent(this.myMap);
  }
// Ջերմոց ================
// Հյուրանոց /հոթել, մոթել/, հանգստյան տուն ================
  showMarkersCommercialArrayHotelMotelSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayHotelMotelSale(this.myMap);
  }
  showMarkersCommercialArrayHotelMotelRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayHotelMotelRent(this.myMap);
  }
  showMarkersCommercialArrayHotelMotelSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayHotelMotelSale(this.myMap);
    this.setMarkersCommercialArrayHotelMotelRent(this.myMap);
  }
// Հյուրանոց /հոթել, մոթել/, հանգստյան տուն ================
// Ռեստորան-հյուրանոց ================
  showMarkersCommercialArrayRestaurantHotelSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayRestaurantHotelSale(this.myMap);
  }
  showMarkersCommercialArrayRestaurantHotelRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayRestaurantHotelRent(this.myMap);
  }
  showMarkersCommercialArrayRestaurantHotelSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayRestaurantHotelSale(this.myMap);
    this.setMarkersCommercialArrayRestaurantHotelRent(this.myMap);
  }
// Ռեստորան-հյուրանոց  ================
// Ռեստորան  ================
  showMarkersCommercialArrayRestaurantSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayRestaurantSale(this.myMap);
  }
  showMarkersCommercialArrayRestaurantRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayRestaurantRent(this.myMap);
  }
  showMarkersCommercialArrayRestaurantSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayRestaurantSale(this.myMap);
    this.setMarkersCommercialArrayRestaurantRent(this.myMap);
  }
// Ռեստորան  ================
// Սրճարան  ================
  showMarkersCommercialArrayCafeSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayCafeSale(this.myMap);
  }
  showMarkersCommercialArrayCafeRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayCafeRent(this.myMap);
  }
  showMarkersCommercialArrayCafeSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayCafeSale(this.myMap);
    this.setMarkersCommercialArrayCafeRent(this.myMap);
  }
// Սրճարան  ================
// Նկուղ, կիսանկուղ  ================
  showMarkersCommercialArrayBasementSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayBasementSale(this.myMap);
  }
  showMarkersCommercialArrayBasementRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayBasementRent(this.myMap);
  }
  showMarkersCommercialArrayBasementSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayBasementSale(this.myMap);
    this.setMarkersCommercialArrayBasementRent(this.myMap);
  }
// Նկուղ, կիսանկուղ  ================
// Սառնարան  ================
  showMarkersCommercialArrayRefrigeratorSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayRefrigeratorSale(this.myMap);
  }
  showMarkersCommercialArrayRefrigeratorRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayRefrigeratorRent(this.myMap);
  }
  showMarkersCommercialArrayRefrigeratorSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArrayRefrigeratorSale(this.myMap);
    this.setMarkersCommercialArrayRefrigeratorRent(this.myMap);
  }
// Սառնարան  ================
// Սպորտային համալիր  ================
  showMarkersCommercialArraySportComplexSale() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArraySportComplexSale(this.myMap);
  }
  showMarkersCommercialArraySportComplexRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArraySportComplexRent(this.myMap);
  }
  showMarkersCommercialArraySportComplexSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersCommercialArraySportComplexSale(this.myMap);
    this.setMarkersCommercialArraySportComplexRent(this.myMap);
  }
// Սպորտային համալիր  ================






  // Հասարակական + Առևտրային ================
  // showMarkersCommercialArrayPublicSaleAndCommercial() {
  //   this.setMapOnAll(null);
  //   this.setMarkersCommercialArrayPublicSale(this.myMap);
  //   this.setMarkersCommercialArrayCommercialSale(this.myMap);
  // }
// Հասարակական + Առևտրային ================

  showBlueMarkers() {
    this.setMapOnAll(null);
    // this.setMarkersBlue(this.myMap);
    this.setBlueMarkersAll();

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = true;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = false;

    this.selectedTransaction = [];
  }

  showBlueMarkersSale() {
    this.setMapOnAll(null);
    this.setMarkersBlueSale(this.myMap);
  }

  showBlueMarkersRent() {
    this.setMapOnAll(null);
    this.setMarkersBlueRent(this.myMap);
  }

  showBlueMarkersDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersBlueDailyRent(this.myMap);
  }

  showBlueMarkersSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersBlueSale(this.myMap);
    this.setMarkersBlueRent(this.myMap);
  }

  showBlueMarkersSaleAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersBlueSale(this.myMap);
    this.setMarkersBlueDailyRent(this.myMap);
  }

  showBlueMarkersRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersBlueRent(this.myMap);
    this.setMarkersBlueDailyRent(this.myMap);
  }

  showBlueMarkersSaleAndRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersBlueSale(this.myMap);
    this.setMarkersBlueRent(this.myMap);
    this.setMarkersBlueDailyRent(this.myMap);
  }

  showPurpleMarkers() {
    this.setMapOnAll(null);
    // this.setMarkersPurple(this.myMap);
    this.setPurpleMarkersAll();

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = true;
    this.btnOrangeMarkerFlag = false;

    this.selectedTransaction = [];
  }

  showPurpleMarkersSale() {
    this.setMapOnAll(null);
    this.setMarkersPurpleSale(this.myMap);
  }

  showPurpleMarkersRent() {
    this.setMapOnAll(null);
    this.setMarkersPurpleRent(this.myMap);
  }

  showPurpleMarkersDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersPurpleDailyRent(this.myMap);
  }

  showPurpleMarkersSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersPurpleSale(this.myMap);
    this.setMarkersPurpleRent(this.myMap);
  }

  showPurpleMarkersSaleAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersPurpleSale(this.myMap);
    this.setMarkersPurpleDailyRent(this.myMap);
  }

  showPurpleMarkersRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersPurpleRent(this.myMap);
    this.setMarkersPurpleDailyRent(this.myMap);
  }

  showPurpleMarkersSaleAndRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersPurpleSale(this.myMap);
    this.setMarkersPurpleRent(this.myMap);
    this.setMarkersPurpleDailyRent(this.myMap);
  }

  showOrangeMarkers() {
    this.setMapOnAll(null);
    // this.setMarkersOrange(this.myMap);
    this.setOrangeMarkersAll();

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = true;

    this.selectedTransaction = [];
  }

  showOrangeMarkersSale() {
    this.setMapOnAll(null);
    this.setMarkersOrangeSale(this.myMap);
  }

  showOrangeMarkersRent() {
    this.setMapOnAll(null);
    this.setMarkersOrangeRent(this.myMap);
  }

  showOrangeMarkersDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersOrangeDailyRent(this.myMap);
  }

  showOrangeMarkersSaleAndRent() {
    this.setMapOnAll(null);
    this.setMarkersOrangeSale(this.myMap);
    this.setMarkersOrangeRent(this.myMap);
  }

  showOrangeMarkersSaleAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersOrangeSale(this.myMap);
    this.setMarkersOrangeDailyRent(this.myMap);
  }

  showOrangeMarkersRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersOrangeRent(this.myMap);
    this.setMarkersOrangeDailyRent(this.myMap);
  }

  showOrangeMarkersSaleAndRentAndDailyRent() {
    this.setMapOnAll(null);
    this.setMarkersOrangeSale(this.myMap);
    this.setMarkersOrangeRent(this.myMap);
    this.setMarkersOrangeDailyRent(this.myMap);
  }

}
