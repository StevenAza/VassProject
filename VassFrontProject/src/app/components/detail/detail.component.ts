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
  isEditable: boolean;
  idPerson: string;
  dataPostReverse;
  idCurrentPost;
  postResponse : Array<object> = [];
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
    this.isEditable = false;
  }
  addPost() {
     let formComplete = this.formGroup.value;
     formComplete.idUser = this.idPerson;
     if(this.isEditable) {
      let objUp = this.formGroup.value;
      objUp.idUser = this.idPerson; 
      this.servicesJ.updatePost(this.idCurrentPost, objUp).subscribe((dataI:any)=> {
        let objFil = this.dataPost.find(el => el.id == this.idCurrentPost);
        objFil.title= dataI.title;
        objFil.body= dataI.body;
      });
     }
     else {
      this.servicesJ.addPost(this.formGroup.value).subscribe((postR:any)=> {
        this.dataPost.push(postR);
        this.dataPost.reverse();
     });
     }
  }
  deletePost(idPost) {
    this.servicesJ.deteleUser(idPost).subscribe((dataI:any)=> {
      this.dataPost = this.dataPost.filter(function(i) {
          return i.id !== idPost;
        })
    });
  }
  clearForm(){
    this.formGroup.patchValue({
      title: '',
      body: ''
    })
  }
  showUpdate(idPost) {
    this.isEditable = true;
    this.postvisible = true;
    this.servicesJ.getPost(idPost).subscribe((dataShow: any) => {
      this.idCurrentPost = dataShow.id;
      this.formGroup.patchValue({
        title: dataShow.title,
        body: dataShow.body
      })
    })
  }
  private buildForm() {
    this.formGroup = this.formBuilder.group({
      title: '',
      body: ''
    });
  }
}