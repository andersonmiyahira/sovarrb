import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ApiService } from 'app/services/api.service';
import { ImportarArquivo } from './models/importar-arquivo';

@Injectable()
export class ImportarArquivoService {
  
  constructor(private http: HttpClient,
    private apiService: ApiService) {
  }

  upload(model: ImportarArquivo): Observable<any> {
    const urlRecurso: string = "ImportarArquivo/Importar";
    let input = new FormData();

    input.append("bancoId", model.bancoId.toString());
    input.append("tipoCNABId", model.tipoCNABId.toString());
    input.append("tipoBoletoId", model.tipoBoletoId.toString());
    
    for (var i = 0; i < model.fileToUpload.length; i++) {
      input.append("formFiles", model.fileToUpload[i]);
    }

    const url = `${environment.urlWebAPI}${urlRecurso}`;

    return this.http.post(url, input);
    //   .catch(error => {
    //     this.notificationToastr.error(error);
    //     return Observable.throw(error);
    // });
  }

  obterBancos() {
   // return this.apiService.get("http://localhost:52854/api/banco");

   return this.http.get<any[]>("http://localhost:52854/api/banco")
   .pipe(
     tap(banco => {})
   );
  }

  obterTipoCNAB() {
    //return this.apiService.get("http://localhost:52854/api/TipoCNAB");

    return this.http.get<any[]>("http://localhost:52854/api/tipoCNAB")
    .pipe(
      tap(cnab => {})
    );
  }

  obterResultadoValidacao(id: number): any {
    return this.http.get<any[]>("http://localhost:52854/api/resultadoValidacao")
    .pipe(
      tap(()=>{})
    );
  }
}
