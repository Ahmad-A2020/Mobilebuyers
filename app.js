'use strict';

let allUsers=[];
let table=document.getElementById('table');
let form=document.getElementById('form');
let tableHeaderArray=['User','Type','Price','Condition']


function randomPrice() {
    let max=500;
    let min=100;
    return Math.floor(Math.random() * (max - min + 1)) + min;    
}

function mobile(name,type) {
    this.name=name;
    this.type=type;
    this.price= randomPrice();
    this.condition=function () {
        if(this.price<200){
            return 'Used'
        }else{
            return 'New'
        }        
    }
    allUsers.push(this);   
}

// render function 
mobile.prototype.render=function () {

    // create row
    let row=document.createElement('tr');
    table.appendChild(row);
    // name data
    let thName=document.createElement('td');
    row.appendChild(thName);
    thName.textContent=this.name;
    // type data
    let thType=document.createElement('td');
    row.appendChild(thType);
    thType.textContent=this.type;
    // type data
    let thPrice=document.createElement('td');
    row.appendChild(thPrice);
    thPrice.textContent=this.price;
    // type condition
    let thcondition=document.createElement('td');
    row.appendChild(thcondition);
    thcondition.textContent=this.condition();    
}
// render of the header 
function tableHeaderRender() {
    let rowHeader=document.createElement('tr');
    table.appendChild(rowHeader);
    for (let i=0;i<tableHeaderArray.length;i++){
        let thX=document.createElement('th');
        rowHeader.appendChild(thX);
        thX.textContent=tableHeaderArray[i];
    }     
}
tableHeaderRender()
// // test
// let test=new mobile('Ahmad','apple');
// test.render();

// Add the condition 
form.addEventListener('submit',addToTable);
function addToTable(event) {    
    event.preventDefault();
    let name=event.target.user.value;
    let type=event.target.type.value;
    let newUser= new mobile(name,type);
    newUser.render(); 
    storeDate();   
}
// Store at the local storage
function storeDate(params) {
    let data=JSON.stringify(allUsers);
    localStorage.setItem('Mobile Users Data',data);        
}
// get items out of local storage 

function gettingItem() {
    let data=localStorage.getItem('Mobile Users Data');
    let convertedData=JSON.parse(data);
    if (convertedData){
        for(let i=0;i<convertedData.length;i++){
            new mobile(convertedData[i].name,convertedData[i].type)
        }
    }    
}
gettingItem();
// this is to render the data from the storage 
for(let i=0;i<allUsers.length;i++){
    allUsers[i].render();
}

let button=document.getElementById('button');
button.addEventListener('click',eraseAll);
function eraseAll(event) {

    event.preventDefault();
    table.textContent=''
    localStorage.clear();
    
}
