import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-pdf-ui",
  templateUrl: "./pdf-ui.component.html",
  styleUrls: ["./pdf-ui.component.scss"]
})
export class PdfUiComponent implements OnInit {
  client = {
    name: "",
    address1: "",
    address2: "",
    city: "",
    pinCode: ""
  };
  modalOpen = false;
  headElements = [
    "position",
    "itemsDescription",
    "quantity",
    "rate",
    "cgst",
    "sgst",
    "amount"
  ];
  elements: any = [];
  item = {
    itemsDescription: "",
    quantity: null,
    rate: null
  };
  index = null;
  addFlag = true;
  updateFlag = false;
  totalAmount= 0;
  cgst = 0.09;
  sgst = 0.09;

  constructor(private router: Router) {}

    ngOnInit() {}

  add = () => {
    console.log(this.elements.length)
    this.elements.push({
      ...this.item,
      cgst: 0.09,
      sgst: 0.09,
      amount: this.item.rate * this.item.quantity,
      position: this.elements.length + 1
    });

    this.item = {
      itemsDescription: "",
      quantity: null,
      rate: null
    };  
  };

  toggleModal = flag => {
    this.modalOpen = flag;
  };

  generate = () => {

    for(let i = 0; i < this.elements.length; i++){
      this.totalAmount = this.totalAmount + this.elements[i].amount
    }

    localStorage.setItem("totalamount", JSON.stringify(this.totalAmount+this.sgst+this.cgst))

    localStorage.setItem(
      "data",
      JSON.stringify({ client: this.client, element: this.elements })
    );
    this.router.navigateByUrl(
      "/generate"
      // client: this.client,
      // element: this.elements
    );
  };

  modify = (index) => {
   console.log(index)
    for(let i = 0;  i < this.elements.length; i++){
      if(index === i){
        this.item.itemsDescription = this.elements[i].itemsDescription,
        this.item.quantity = this.elements[i].quantity,
        this.item.rate = this.elements[i].rate
        this.index = index
        this.addFlag = false;
        this.updateFlag = true;
      }
    }
  }

  update = () => {
    for(let i = 0; i < this.elements.length; i++){
      if(i === this.index){
        this.elements[i].position = i,
        this.elements[i].itemsDescription = this.item.itemsDescription,
        this.elements[i].quantity = this.item.quantity,
        this.elements[i].rate = this.item.rate,
        this.elements[i].cgst = 0.09,
        this.elements[i].sgst = 0.09,
        this.elements[i].amount = this.item.quantity*this.item.rate
        this.addFlag = true;
        this.updateFlag = false;
      }
    }
  }

  delete(index) {
    console.log(index);

    if (index !== -1) {
        this.elements.splice(index, 1);
    }
  }
}


