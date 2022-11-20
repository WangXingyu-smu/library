import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { BooksComponent } from '../pages/books/books.component';
import { AddbooksComponent } from '../pages/addbooks/addbooks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form'
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { BookinfoComponent } from '../pages/bookinfo/bookinfo.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { MyPipePipe } from '../pages/my-pipe.pipe';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  imports: [
    WelcomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzLayoutModule,
    NzMenuModule, 
    IconsProviderModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NzAutocompleteModule,
    NzCardModule,
    NzStatisticModule,
    NzDrawerModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTreeSelectModule,
    NzCollapseModule,
    NzBadgeModule,
    NzBreadCrumbModule,
    NzModalModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [WelcomeComponent, BooksComponent, AddbooksComponent, BookinfoComponent,MyPipePipe],
  providers: [{provide: NzMessageService}],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
