import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CiudadModel } from '@models/ciudad.model';
import { DepartamentoModel } from '@models/departamento.model';
import { SedeModel } from '@models/sede.model';

@Component({
  selector: 'app-sede-list',
  templateUrl: './sede-list.component.html',
  styleUrls: ['./sede-list.component.scss']
})
export class SedeListComponent{

   @Input() sedes:SedeModel[];
   @Input() ciudades:CiudadModel[];
   @Input() departamentos:DepartamentoModel[];

   @Output() delete = new EventEmitter<number>();
   @Output() create = new EventEmitter<void>();
   @Output() update = new EventEmitter<SedeModel>();
   @Output() info = new EventEmitter<void>();
   @Output() depId = new EventEmitter<number>();
   @Output() ciudadId = new EventEmitter<number>();

  departamento:DepartamentoModel;
  ciudadSelect:boolean=true;
  nombreSede:string='';

  numRegistros:number=10;
  pageActual:number=0
  constructor(){
    this.ciudades=[];
  }
  enviarNumeroRegistros(num: number){
    this.numRegistros = num;
  }
  actualizar(sede:SedeModel){
    this.update.emit(sede);
  }
  eliminar(id:number){
    this.delete.emit(id);
  }
  agregar(){
    this.create.emit();
  }
  verInfo(){
    this.info.emit();
  }
  enviarIdDep(idDep:number){
      if(idDep>0){
        this.ciudadSelect=false;
      }else{
        this.ciudadSelect=true;
        this.ciudadId.emit(0);
      }
      this.depId.emit(idDep);
  }
  enviaridCiudad(idCiudad:number){
    this.ciudadId.emit(idCiudad);
  }
  //revisar
  buscarSede(){
    const busqueda:SedeModel = this.sedes.find(sede=>
        sede.nombreSede.toUpperCase()===this.nombreSede.toUpperCase());
    this.sedes=[busqueda];
  }

}
