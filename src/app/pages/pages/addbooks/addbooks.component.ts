import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.css']
})
export class AddbooksComponent implements OnInit {
 
  curpage:number=1;
  pagesize = 10;
  total!:number;
  url = 'http://127.0.0.1:8000/book/bookposition/'
  listOfData!: any[]
  displayData!: any[]
  validateForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    shelfCode: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    cellCode: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })

  changeableForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    shelfCode: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    cellCode: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })

  changeid: any;
  inputValue?: string;
  options: Array<{ value: string; category: string; count: number }> = [];
  searchValue = '';
  tvisible = false;

  changeForm() {
    
    return this.http.patch<any>(this.url+this.changeid+'/', this.changeableForm.value).subscribe((res)=>{
      this.message.create('success','修改图书位置信息成功') ;
      this.get();
      this.changeableForm.reset();
      this.visible = false;
    })
  };
  
  submitForm() {
    console.log(this.validateForm.value);
    return this.http.post<any>(this.url,this.validateForm.value).subscribe((res):void=>{
      //console.log(res);
      this.message.create('success','添加图书位置成功') ;
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

  constructor(private http:HttpClient,private message:NzMessageService) { }

  ngOnInit(): void {
    this.get()

  }

  get(){
    let params = new HttpParams().set('page',this.curpage).set('size',this.pagesize);
    return this.http.get(this.url,{params}).subscribe((res:any)=>{
      this.total = res.count;
      this.listOfData = res.results;
      this.displayData = this.listOfData;
      //console.log(this.displayData)
    })
  }

  
  

  del(bookId:any){
    const values = { 
    "if_deleted": true}
    return this.http.patch<any>(this.url+bookId+'/',values).subscribe((res)=>{
      // console.log(this.url+bookId)
      // console.log(res);
      this.message.create('success','删除书籍成功') ;
      this.get();
    })  
  }

  //抽屉
  visible = false;

  open(_bookId:any): void {
    this.visible = true;
    this.changeid = _bookId
    
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
  }

