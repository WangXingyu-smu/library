import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  curpage:number=1;
  pagesize = 10;
  total!:number;
  url = 'http://127.0.0.1:8000/book/bookclassification/'
  listOfData!: {id:number; name:string; code:string; add_time:string; if_deleted:boolean}[]
  displayData!: {id:number; name:string; code:string; add_time:string; if_deleted:boolean}[]
  validateForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    code: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })
  changeableForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    code: new FormControl(null, [Validators.required, Validators.minLength(2)])
  })
  dsearchForm = this.fb.group({
    name:[''],
    code:['']
  })

  changeid: any;
  inputValue?: string;
  options: Array<{ value: string; category: string; count: number }> = [];
  searchValue = '';
  searchValuee = '';
  tvisible = false;
  isdVisible = false;

  constructor(private http:HttpClient,private message:NzMessageService,private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.get()
  }

  changeForm() {
    
    return this.http.patch<any>(this.url+this.changeid+'/', this.changeableForm.value).subscribe((res)=>{
      this.message.create('success','修改书籍成功') ;
      this.get();
      this.changeableForm.reset();
      this.visible = false;
    })
  };
  
  submitForm() {
    console.log(this.validateForm.value);
    return this.http.post<any>(this.url,this.validateForm.value).subscribe((res):void=>{
      console.log(res);
      this.message.create('success','添加书籍类型成功') ;
      this.get();
      this.validateForm.reset();
    })  
  }
  
  change(){
    this.changeForm()
  }
  
  cancel(): void {
    this.message.info('点击取消成功');
  }

  confirm(): void {
    this.message.info('点击确认成功');
  }

  

  

  dsubmitForm(){
  
    // console.log(this.dsearchForm.value.name, this.dsearchForm.value.code);
    let params = new HttpParams().set('name',this.dsearchForm.value.name).set('code',this.dsearchForm.value.code);
    return this.http.get(this.url, {params}).subscribe((res:any)=>{
      this.total = res.count;
      this.displayData = res.results;
    })
  }

  

  get(){
    let params = new HttpParams().set('page',this.curpage).set('size',this.pagesize);
    return this.http.get(this.url, {params}).subscribe((res:any)=>{
      this.total = res.count;
      this.listOfData = res.results;
      this.displayData = this.listOfData.filter( item => 
        {return item.if_deleted ===false})
        
    })
  }

  
  

  del(bookId:any){
     /* let params = new HttpParams().set('bookId',bookId)
    return this.http.delete<any>('http://127.0.0.1:8000/bookinfo/books/',{params}).subscribe((res)=>{
      this.message.create('success','删除书籍成功') 
    }) */
    
    const values = { 
    "if_deleted": true}
    return this.http.patch<any>(this.url+bookId+'/',values).subscribe((res)=>{
      console.log(this.url+bookId)
      console.log(res);
      this.message.create('success','删除书籍成功') ;
      this.get();
    })  
  }

  //抽屉
  visible = false;

  open(data:any,): void {
    this.visible = true;
    this.changeid = data.id
    //console.log(this.changeid)
    this.changeableForm.setValue({
      name:data.name,
      code:data.code
    })
  }

  close(): void {
    this.visible = false;
  }
//搜索框
onChange(e: Event): void {
  const value = (e.target as HTMLInputElement).value;
  this.options = new Array(this.getRandomInt(5, 15))
    .join('.')
    .split('.')
    .map((_item, idx) => ({
      value,
      category: `${value}${idx}`,
      count: this.getRandomInt(200, 100)
    }));
}

private getRandomInt(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

reset(): void {
  this.searchValue = '';
  this.search();
}

search(): void {
  this.tvisible = false;
  this.displayData = this.displayData.filter((item) => item.name.indexOf(this.searchValue) !== -1);
}

getsearch(){
  console.log(this.searchValuee)
  return this.http.get('http://127.0.0.1:8000/book/bookclassification/?search='+ this.searchValuee).subscribe((res:any)=>{
  this.displayData = res.results;
  this.searchValuee=''
  })
  
}

//对话框
showModal(): void {
  this.isdVisible = true;
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

}