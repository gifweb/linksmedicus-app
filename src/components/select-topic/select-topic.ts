import { Component, Output, Input, EventEmitter } from '@angular/core';
import { WpProvider } from '../../providers/wp/wp';

@Component({
  selector: 'select-topic',
  templateUrl: 'select-topic.html'
})
export class SelectTopicComponent {

  specialties: any[];
  specialtiesLoading: boolean = false;

  @Output() onSelectTopic: EventEmitter<any> = new EventEmitter<any>();

  _specialtie: any = 177;
  @Input() get specialtie(): number {
    return this._specialtie;
  }
  set specialtie(value: number) {
    console.log('set')
    //this.newsPage = 1;
    //this.loadNews(value, true);
    this.onSelectTopic.emit(value);

    this._specialtie = value;
  }

  constructor(
    private wp: WpProvider,
  ) {
    console.log('Hello SelectTopicComponent Component');
    this.loadSpecialties();
  }

  loadSpecialties() {
    this.specialtiesLoading = true;
    this.wp.getSpecialties().subscribe((data) => {
      this.specialtiesLoading = false;
      console.log('getSpecialties', data);
      this.specialties = data;
      //this.specialtie = 177;
    })
  }


}
