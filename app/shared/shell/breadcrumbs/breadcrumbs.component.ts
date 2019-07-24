import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  label: string = '';

  constructor(private router: Router, public title: Title, public meta: Meta) {
    this.getDataRoute().subscribe((data: any) => {
      // console.log(data, router, title, meta);

      this.label = data.title;
      this.title.setTitle(this.label);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.label
      };

      this.meta.updateTag(metaTag);
    });
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter((evento: any) => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

  ngOnInit() {}
}
