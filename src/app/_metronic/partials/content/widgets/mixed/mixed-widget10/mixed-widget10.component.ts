import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { VendorService } from 'src/app/modules/vendor/vendor.services';
import { getCSSVariableValue } from '../../../../../kt/_utils';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { M } from 'src/app/enum/enum';
@Component({
  selector: 'app-mixed-widget10',
  templateUrl: './mixed-widget10.component.html',
})
export class MixedWidget10Component implements OnInit {
  @Input() chartColor: string = '';
  @Input() chartHeight: string;

  maserie:number[]=[];

  mesjours=[];

  total:number=0;


  chartOptions: any = {};

  constructor(public vendorService:VendorService,private changeDetectorRef:ChangeDetectorRef,public modalService: NgbModal) {

    this.loadData();
  }

  ngOnInit(): void {

    this.chartOptions = getChartOptions(this.chartHeight, this.chartColor,this.maserie,this.mesjours);
  }

  loadData(){
    this.vendorService.vente_mois().pipe(
      // retry a failed request up to 3 times
         catchError(M.handleError) // then handle the error
       ).subscribe((data:any) => {
         console.log(data);

         data.forEach((element:never)=> {

          var monval=element['montant']/1000;
          this.total=this.total+parseInt(element['montant']);

          console.log(this.total);
          
                    this.maserie.push(monval);
                    this.mesjours.push(element['day']);

                    

         });

         console.log(this.mesjours);

         this.chartOptions = getChartOptions(this.chartHeight, this.chartColor,this.maserie,this.mesjours);
      
         this.changeDetectorRef.detectChanges()

   
       })

    
  } 
}


function getChartOptions(chartHeight: string, chartColor: string, serie:number[], jour:string[]) {
  const labelColor = getCSSVariableValue('--bs-gray-800');
  const strokeColor = getCSSVariableValue('--bs-gray-300');
  const baseColor = getCSSVariableValue('--bs-' + chartColor);
  const lightColor = getCSSVariableValue('--bs-light-' + chartColor);

  return {
    series: [
      {
        name: 'Profit net',
        data: serie // [7500, 2500, 0, 0, 0, 0]    //[15, 25, 15, 40, 20, 50], // serie
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: jour ,   // ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return '' + val*1000 + '  FCFA';
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };


  
}
