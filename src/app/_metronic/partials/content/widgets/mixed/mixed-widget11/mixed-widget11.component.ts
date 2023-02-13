import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { M } from 'src/app/enum/enum';
import { VendorService } from 'src/app/modules/vendor/vendor.services';
import { getCSSVariableValue } from '../../../../../kt/_utils';
@Component({
  selector: 'app-mixed-widget11',
  templateUrl: './mixed-widget11.component.html',
})
export class MixedWidget11Component implements OnInit {
  @Input() chartColor: string = '';
  @Input() chartHeight: string;
  chartOptions: any = {};

  maserie:number[]=[];

  mesjours=[];

  total:number=0;

  debut:string=""

  fin:string=""

  constructor(public vendorService:VendorService,private changeDetectorRef:ChangeDetectorRef,) {

    this.loadData()
  }

  ngOnInit(): void {
    this.chartOptions = getChartOptions(this.chartHeight, this.chartColor,this.maserie,this.mesjours);
  }


  loadData(){
    this.vendorService.vente_dernier_mois().pipe(
      // retry a failed request up to 3 times
         catchError(M.handleError) // then handle the error
       ).subscribe((data:any) => {
         console.log(data);

         data.forEach((element:never)=> {

          var monval=element['montant']/1000;
           this.total=this.total+parseInt(element['montant']);

           console.log(this.total);
          
                    this.maserie.push(monval);
                    this.mesjours.push(element['mois']);

                    

         });

         console.log(this.mesjours);

         this.debut=this.mesjours[0];
         this.fin=this.mesjours[this.mesjours.length-1];


         this.chartOptions = getChartOptions(this.chartHeight, this.chartColor,this.maserie,this.mesjours);
      
         this.changeDetectorRef.detectChanges()

   
       })

    
  } 
}

function getChartOptions(chartHeight: string, chartColor: string,serie:number[], jour:string[]) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const secondaryColor = getCSSVariableValue('--bs-gray-300');
  const baseColor = getCSSVariableValue('--bs-' + chartColor);

  return {
    series: [
      {
        name: 'Montant total',
        data:  serie,      //[50, 60, 70, 80, 60, 50, 70, 60],
      },
     /*  {
        name: 'Revenue',
        data: [50, 60, 70, 80, 60, 50, 70, 60],
      }, */
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: chartHeight,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories:  jour,// ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: 'solid',
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
          return  + val*1000 + ' F CFA';
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      padding: {
        top: 10,
      },
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}
