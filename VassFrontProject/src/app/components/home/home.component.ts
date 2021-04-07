import { Component, OnInit } from '@angular/core';
import { JsonplaceServicesService } from '../../jsonplace-services.service';
@Component({
  selector: 'view-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataPeople: any;
  constructor(private servicesJson: JsonplaceServicesService) { }

  ngOnInit(): void {
     this.servicesJson.getAllUsers().subscribe((dataP: any) => {
        this.dataPeople = dataP;
    })
  }

}
