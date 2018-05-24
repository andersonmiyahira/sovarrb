import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportarArquivoService } from './importar-arquivo.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-importar-arquivo',
  templateUrl: './importar-arquivo.component.html',
  styleUrls: ['./importar-arquivo.component.css']
})
export class ImportarArquivoComponent implements OnInit {
  bancos: any;
  cnabs: any;
  importar: any;
  errors: any;
  sucessos: any;
  arquivosValidados: boolean;

  @ViewChild("fileInput") fileInput;

  constructor(private importarArquivoService: ImportarArquivoService) {
    this.importar = {};
    this.errors = [];
    this.sucessos = [];
    this.arquivosValidados = false;
  }

  ngOnInit() {
    this.obterBancos();
    this.obterCNAB();
    this.carregarErros();
    this.carregarSucessos();
  }

  carregarErros(){
      this.errors.push({ mensagem: "Erro! Posição 10 - Linha 100: formato de data errada", ehSucesso : false});
      this.errors.push({ mensagem: "Erro! Posição 20 - Linha 100: formato de data errada", ehSucesso: false});   
      this.errors.push({ mensagem: "Erro! Posição 30 - Linha 110: esperado valor numerico"});      
      this.errors.push({ mensagem: "Sucesso! Posição 30 - Linha 110: OK",  ehSucesso: true}); 
  }

  carregarSucessos(){
    this.sucessos.push({ tipo:"Detalhe", mensagem: "Posição 31 - Posição 35, Linha 111", ehSucesso: true}); 
    this.sucessos.push({ tipo:"Detalhe", mensagem: "Posição 32 - Posição 40, Linha 112", ehSucesso: true}); 
  }

  saveUpload(): void {
    let rawFiles: Array<any> = new Array<any>();
    this.uploader.queue.forEach(element => {
      rawFiles.push(element.file.rawFile);
    });
    this.importarArquivoService.upload(rawFiles, this.importar.bancoId)
      .subscribe(res => {
        this.uploader.queue.forEach(element => {
          element.isSuccess = true;
        });
        //this.fileInput.nativeElement.value = "";
        alert('Salvo com sucesso!');
        this.arquivosValidados = true;
      });
  }

  obterBancos() {
    this.importarArquivoService.obterBancos().subscribe(response => {
      console.log('res', response)
      this.bancos = response;
    });
  }

  obterCNAB() {
    this.importarArquivoService.obterTipoCNAB().subscribe(response => {
      console.log('res', response)
      this.cnabs = response;
    });
  }

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }




  public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];

  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }
}
