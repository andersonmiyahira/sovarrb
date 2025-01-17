import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { LeiouteService } from 'app/telas-adm/leioute/leioute.service';
import { Layout } from '../../../models/layout';
import { LayoutList } from 'app/telas-adm/leioute/models/layout-list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValorEsperadoBancoService } from 'app/telas-adm/valor-esperado-banco/valor-esperado-banco.service';
import { ValorEsperado } from 'app/telas-adm/valor-esperado-banco/model/valor-esperado';
import { Banco } from 'app/telas-adm/banco/models/banco';

@Component({
  selector: 'app-editar-layout-cadastro-modal',
  templateUrl: './editar-layout-modal-cadastro.component.html',
  styleUrls: ['./editar-layout-modal-cadastro.component.css']
})
export class EditarLayoutModalCadastroComponent implements OnInit {

  @ViewChild('editarModal') modal: NgbModal;

  public form: FormGroup;

  model: Layout;
  leioutes: LayoutList;
  _options: IMultiSelectOption[];

  private modalReference: NgbModalRef;

  constructor(private modalService: NgbModal,
    private valorEsperadoService: ValorEsperadoBancoService) {
  }

  ngOnInit() { 
  }

  initFomControl() {

    this.form = new FormGroup({
      descricao: new FormControl(this.model.descricao, [
        Validators.required
      ]),
      posicaoDe: new FormControl(this.model.posicaoDe, [
        Validators.required
      ]),
      posicaoAte: new FormControl(this.model.posicaoAte, [
        Validators.required
      ]),
      obrigatorio: new FormControl(this.model.obrigatorio, [
        Validators.required
      ]),
      valorEsperado: new FormControl(this.model.valoresEsperados, [
        Validators.required
      ]),
      tipoCampoId: new FormControl(this.model.tipoCampoId, [
        Validators.required
      ]),
      idValoresEsperados: new FormControl(this.model.idValoresEsperados, [
        Validators.required
      ]),
      tipoRegistroFlag: new FormControl(this.model.tipoRegistroFlag, [
        Validators.required
      ])
    });
  }

  openModal(model) {

    this.model = model;
    this.initFomControl();
    this.modalReference = this.modalService.open(this.modal, { size: 'lg' });
  }

  salvar() {

    this.modalReference.close();
  }

  onChange(event) {

    let selectElementText = event.target['options']
    [event.target['options'].selectedIndex].text;

    this.model.tipoCampoDescricao = selectElementText;
  }

  onChangeValorEsperado($event) {
    const optionSelected = this._options.filter(_ => _.id == $event).map(_ => _.name).join(",");
    this.model.valoresEsperadosSelecionados = optionSelected;
  }
}
