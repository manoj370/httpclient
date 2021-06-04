import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { ServiceService } from '../service.service';
import { filter, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  login: any;
  details: any;
  subscribe: Subject<any> = new Subject<any>();
  navigationSubscription: any;
  dataProvider:any;
  constructor(private activateroute:ActivatedRoute,private service:ServiceService,) {
    this.activateroute.params.subscribe((params: Params) => this.login = params['login']);
    console.log(this.login);
   }
   
  ngOnInit() {
this.getProfileById();

//     let chart = am4core.create("chartdiv", am4charts.PieChart3D);
// chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

// chart.data = [
//   {
//     country: "Lithuania",
//     litres: 501.9
//   },
//   {
//     country: "Czech Republic",
//     litres: 301.9
//   },
//   {
//     country: "Ireland",
//     litres: 201.1
//   },
//   {
//     country: "Germany",
//     litres: 165.8
//   },
//   {
//     country: "Australia",
//     litres: 139.9
//   },
//   {
//     country: "Austria",
//     litres: 128.3
//   }
// ];

// chart.innerRadius = am4core.percent(40);
// chart.depth = 120;

// chart.legend = new am4charts.Legend();

// let series = chart.series.push(new am4charts.PieSeries3D());
// series.dataFields.value = "litres";
// series.dataFields.depthValue = "litres";
// series.dataFields.category = "country";
// series.slices.template.cornerRadius = 5;
// series.colors.step = 3;



  }
  getProfileById(){
    this.service.getRequestById(this.login).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
      console.log(res.followers)
      this.details=res.followers;
      this.barChart()
    },error=>{
      console.log(error);
      
    })
  };
  barChart() {
    const barchart = am4core.create('barchart', am4charts.PieChart);
    // Add and configure Series
    const pieSeries = barchart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value =  this.details;
    pieSeries.dataFields.category =  this.details;

    // Let's cut a hole in our Pie chart the size of 30% the radius
    barchart.innerRadius = am4core.percent(10);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: 'cursor',
        value: 'pointer'
      }
    ];

    pieSeries.labels.template.disabled = true;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    const shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    const hoverState = pieSeries.slices.template.states.getKey('hover');
    // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    // const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    // hoverShadow.opacity = 0.7;
    // // hoverShadow.blur = 5;
     this.dataProvider = [];
    console.log(this.details);
    // tslint:disable-next-line: forin
    for (const key in this.details) {
      this.dataProvider.push({
        Heading: key,
        Data: this.details[0][key]
      });
    }
  
  }
}
