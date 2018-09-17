import { NgModule } from '@angular/core';
import { GtranslatePipe } from './gtranslate/gtranslate';
import { GtranslateProvider } from '../providers/gtranslate/gtranslate';
@NgModule({
	declarations: [GtranslatePipe],
	imports: [],
	exports: [GtranslatePipe],
	providers: [GtranslateProvider]
})
export class PipesModule {}
