import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';

interface ParentItemData {
  key: number;
  bookinfo: BookinfoItemData;
  expand: boolean;
}
interface BookinfoItemData {
  id: string;
  sort: Sortdata[];
  book_details: Book_detailsItemData[];
  book_picture: [],
  classification: 1,
  name: string,
  author: string,
  translator: string,
  publish_time: string,
  press: string,
  add_time: string,
  code: string,
  total_quantity: number,
  if_deleted: boolean;
  expand: boolean;
}
interface Book_detailsItemData {
  id: string;
  location1:any[];
  borrowed_Record: Borrowed_Record[];
  book: string;
  location: number,
  code: string,
  status: number,
  if_used: any,
  add_time: any,
  if_deleted: boolean
}
interface Borrowed_Record {
  id: number;
  book_datail: string;
  borrower: string;
  lending_time: string,
  pre_return_time: string,
  status: number,
  return_time: string,
  returnee: string,
  if_break: number,
  if_deleted: boolean
}
interface Sortdata{
  id:number;
  name: string;
  add_time: any;
  if_deleted: boolean;
}

@Component({
  selector: 'app-bookinfo',
  templateUrl: './bookinfo.component.html',
  styleUrls: ['./bookinfo.component.css']
})
export class BookinfoComponent implements OnInit {
  curpage:number=1;
  pagesize = 10;
  total!:number;
  url = 'http://127.0.0.1:8000/book/bookinfo/';
  
  searchValuee = '';
  tvisible = false;
  isdVisible = false;
  cvisible = false;
  isOkLoading = false;
  //嵌套子表格
  listOfParentData: ParentItemData[] = [];
  
  //table表格逻辑
  searchValue = '';
  visible = false;
  listOfData:any[]=[]
  book_details!: { id: string; book: string; location:string; code:string; status:string}[];
 
item!:any;

listOfDisplayData = [...this.listOfData];
searchForm = this.fb.group({
  classification:[''],
  name:[''],
  author:[''],
  translator:[''],
  press:['']
})

validateForm = this.fb.group({
  id:['', Validators.required],
  classification:['', Validators.required],
  name:['', Validators.required],
  author:['', Validators.required],
  translator:['无', Validators.required],
  publish_time:[''],
  press:[''],
  add_time:[''],
  code:[''],
  total_quantity:[''],
  if_deleted:[false]
})

constructor(private message:NzMessageService, private http:HttpClient, private fb:FormBuilder) { }

ngOnInit(): void {
  this.get()
}

  get(){
    return this.http.get(this.url).subscribe((res:any)=>{
      this.listOfParentData = [];
      this.listOfData = res.results;
      this.total = res.count;
      for (let i = 0; i < this.listOfData.length; ++i) {
        this.listOfParentData.push({
          key: i,
          bookinfo: this.listOfData[i],
          expand: false
        });
      }
     
    })
  }

searchsubmit(){
  //console.log(this.searchForm.value);
  let params = new HttpParams().set('classification',this.searchForm.value.classification).set('name',this.searchForm.value.name).set('author',this.searchForm.value.author).set('translator',this.searchForm.value.translator).set('press',this.searchForm.value.press);
    return this.http.get(this.url, {params}).subscribe((res:any)=>{
      this.listOfParentData =[];
      this.total = res.count;
      this.listOfData = res.results;
      for (let i = 0; i < this.listOfData.length; ++i) {
        this.listOfParentData.push({
          key: i,
          bookinfo: this.listOfData[i],
          expand: false
        });
      }
 
    })
}

getsearch(){
  //console.log(this.searchValuee)
  return this.http.get('http://127.0.0.1:8000/book/bookinfo/?search='+ this.searchValuee).subscribe((res:any)=>{
    this.listOfParentData =[];
    this.total = res.count;
    this.listOfData = res.results;
    for (let i = 0; i < this.listOfData.length; ++i) {
      this.listOfParentData.push({
        key: i,
        bookinfo: this.listOfData[i],
        expand: false
      });
    }
  this.searchValuee=''
  })
}

del(bookId:any){
  
 const values = { 
 "if_deleted": true}
 return this.http.patch<any>(this.url+bookId+'/', values).subscribe((res)=>{
   console.log(this.url+bookId)
   console.log(res);
   this.message.create('success','删除书籍信息成功') ;
   this.get();
 })  
}

dell(bookId:any){
 const values = { 
 "if_deleted": true}
 return this.http.patch<any>('http://127.0.0.1:8000/book/bookdetail/'+bookId+'/',values).subscribe((res)=>{
   console.log(this.url+bookId)
   console.log(res);
   this.message.create('success','删除书籍明细成功') ;
   this.get();
 })  
}

cancel(): void {
  this.message.info('点击取消成功');
}

showModal(): void {
  this.isdVisible = true;
  this.getclassification()
}

handleOk(): void {
  this.submitForm()
  console.log('Button ok clicked!');
  this.isdVisible = false;
}

handleCancel(): void {
  console.log('Button cancel clicked!');
  this.isdVisible = false;
}

submitForm() {
  this.validateForm.patchValue({code:this.validateForm.value.id})
  console.log(this.validateForm.value)
  return this.http.post<any>(this.url, this.validateForm.value).subscribe((res)=>{
    this.message.create('success','添加书籍成功') ;
    this.get();
    this.validateForm.reset();
  })  
 }

optionList! :any[]
log(value: any): void {
  console.log(value);
}

getclassification(){
  return this.http.get('http://127.0.0.1:8000/book/bookclassification/').subscribe((res:any)=>{
    this.optionList = res.results;
  })
}

changeinfoform(){}

submitdetail(){}

showModaldetail(): void {
  this.cvisible = true;
}

handleOkk(): void {
  this.isOkLoading = true;
  setTimeout(() => {
    this.cvisible = false;
    this.isOkLoading = false;
  }, 3000);
}

handleCancell(): void {
  this.cvisible = false;
}

}
  

