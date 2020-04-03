import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PdfUiComponent } from "./pdf-ui/pdf-ui.component";
import { PdfGeneratorComponent } from "./pdf-generator/pdf-generator.component";

const routes: Routes = [
  { path: "", component: PdfUiComponent },
  { path: "generate", component: PdfGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
