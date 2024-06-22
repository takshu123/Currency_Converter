const baseurl="https://v6.exchangerate-api.com/v6/15f233c4c29adf684b4d830a/latest/USD";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");

const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(let select of dropdown){
    for(currcode in countryList){
       let newoption=document.createElement("option");
       newoption.innerText=currcode;
       newoption.value=currcode;
       select.append(newoption)
       if(select.name ==="from" && currcode==="USD"){
        newoption.selected="selected";

       }
       else if(select.name==="to" && currcode==="INR"){
        newoption.selected="selected"

       }
       else select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);


    });

}

const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newsrc
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountvalue=amount.value;
  if(amountvalue<1){
    amountvalue=1;
    amount.value="1";

  }

const url=`https://v6.exchangerate-api.com/v6/15f233c4c29adf684b4d830a/latest/${fromcurr.value}`;

let tocurrval=tocurr.value;

let response=await fetch(url);
let data=await response.json();
let fromvalue=data.conversion_rates[fromcurr.value];
let tovalue=data.conversion_rates[tocurr.value]

let result=fromvalue*tovalue*amountvalue;
console.log(result)
msg.innerText=`${amountvalue}${fromcurr.value} = ${result}${tocurr.value}`


});