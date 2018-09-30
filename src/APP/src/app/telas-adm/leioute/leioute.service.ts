import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { tap, map } from 'rxjs/operators';
import { ServiceBase } from 'app/shared/services/service-base';
import { Layout } from './models/layout';

@Injectable()
export class LeiouteService extends ServiceBase {
  constructor(private apiService: ApiService) {
    super("layout");
  }

  obterLeioutes() {

    return this.apiService.get(this.urlAPI).pipe(
      map((res: any) => {
        return res.data;
      }));
   }

   excluirBanco(model: Layout) {

    return this.apiService.delete(this.urlAPI, model.idLayout).pipe(
      map((res: any) => {
        return res;
      }));
  }
}
