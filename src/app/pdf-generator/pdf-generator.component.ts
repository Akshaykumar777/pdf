import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import html2canvas from 'html2canvas'
import jsPDF from "jspdf"

@Component({
  selector: "app-pdf-generator",
  templateUrl: "./pdf-generator.component.html",
  styleUrls: ["./pdf-generator.component.scss"]
})
export class PdfGeneratorComponent implements OnInit {
  base64Data = null;
  data = JSON.parse(localStorage.getItem("data"));
  headElements = [
    "position",
    "itemsDescription",
    "quantity",
    "rate",
    "cgst",
    "sgst",
    "amount"
  ];
  currentDate = new Date().getDate()+"/"+new Date().getMonth()+"/"+new Date().getFullYear()
  totalAmount = JSON.parse(localStorage.getItem("totalamount")).toFixed(2);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log("data = ", this.data)
    this.http
      .get("assets/invoice.png", { responseType: "blob" })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          var base64data = reader.result;
          this.base64Data = base64data;
        };
        reader.readAsDataURL(res);
        console.log(res);
      });
  }

    handleDownload = async() => {

      // document.getElementById("capture").className = "a4";
      await html2canvas(document.getElementById('capture')).then(canvas => {
      
        window.scrollTo(0, 0);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'in',
          format: [874, 1040]
        });
        pdf.addImage(imgData, 'JPG', 0, 0);
        pdf.save("download.pdf");
      });
    }

//     handleDownload = () => {
      
//       html2canvas(document.getElementById("capture")).then(function(canvas) {
//         // document.body.appendChid(canvas);

//         const pdf = new jsPDF();
//         var img = canvas.toDataURL("image/jpeg", [...])
// // ...
// pdf.addImage(imgData, 'JPEG', 0, 0, 210, height, 'someAlias', 'FAST');
//         pdf.addImage(canvas, 'JPG', 0, 0);
//         pdf.save("download.pdf");
//       });
//     }
}


