import { Component } from '@angular/core';
import { DataserviceService } from './dataservice.service';
import { todoinfo } from './todoinfo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  items: todoinfo[] = [];
  info: string = "";
  item: todoinfo = new todoinfo();
  src: string = "";
  constructor(private data: DataserviceService) {
    this.refresh();
  }

  refresh() {
    this.data.getList().subscribe(l => this.items = l.filter((p: todoinfo) => p.info.indexOf(this.src) != -1));
  }

  saveNew() {
    this.data.saveItem(this.item).subscribe(o => this.refresh());
  }

  delete(id: number) {
    this.data.deleteItem(id).subscribe(o => this.refresh());
  }

  checkchange(event: any, id: number) {
    console.log(event, id);
    let item = this.items.find(p => p.id == id);
    if (item != null) {
      //item.done = !item.done;
      this.data.saveItem(item).subscribe(o => this.refresh());
    }
  }
}
