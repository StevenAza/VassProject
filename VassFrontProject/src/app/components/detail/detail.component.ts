import { Component, OnInit } from '@angular/core';
import { JsonplaceServicesService } from '../../jsonplace-services.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  dataPeople: any;
  public formGroup: FormGroup;
  dataPost: any;
  idPerson: string;
  postResponse: any;
  postvisible:boolean = false;
  constructor(private servicesJ : JsonplaceServicesService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.idPerson = this.route.snapshot.paramMap.get("id");
    this.servicesJ.getUser(this.idPerson).subscribe((data:any) => {
      this.dataPeople = data;
    });
    this.servicesJ.getPostUser(this.idPerson).subscribe((posts:any)=> {
      this.dataPost = posts;
    })
  }
  showDialog() {
    this.postvisible = true;
  }
  addPost() {
     this.servicesJ.addPost(this.formGroup.value).subscribe((postR:any)=> {
       console.log(postR);
     });
  }
  private buildForm() {
    this.formGroup = this.formBuilder.group({
      title: '',
      body: ''
    });
  }
}