import { AppServiceService } from './app-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'SpaceX';
    yearArr = []
    currentYear;
    launchData;
    launch_success: boolean;
    isLoading  = false;
    constructor(private router: Router, public appservice: AppServiceService, private route: ActivatedRoute) {

    }
    ngOnInit() {
        for (let i = 2006; i <= 2020; i++) {
            this.yearArr.push(i)
        }
        
        this.router.events.subscribe((event) => {
            setTimeout(() => {
                this.isLoading = true;
            if (event instanceof NavigationEnd) {
                this.route.queryParams.pipe(shareReplay(1)).subscribe(params => {
                    let queryParams = ''
                    for (let param in params) {
                        queryParams += `&${param}=${params[param]}`
                    }
                    this.appservice.getData(queryParams).subscribe(result => {
                        this.launchData = this.transForm(result)
                        this.isLoading = false
                    })
                })
            }
              }, 1000)
            
        })
    }

    transForm(data) {
        let transformedData = []
        data.forEach(item => {
            transformedData.push({
                flight_number: item.flight_number,
                launch_success: item.launch_success,
                launch_year: item.launch_year,
                mission_id: item.mission_id,
                links: item.links,
                land_success: item.land_success,
                mission_name: item.mission_name
            })
        })
        return transformedData
    }
}
