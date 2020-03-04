function setUserName(){
    let myName = prompt('输入名字');
    if(!myName || myName === null){
        setUserName();
    } else {
        localStorage.setItem('name', myName);
        myHeading.textContent = 'Mozilla,' + myName;
    }
}

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');
 
if(!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla,' + storedName;
}

myButton.onclick = function() {
    setUserName();
}