let list = document.querySelector('.history');
let searchInput = document.querySelector('.searchInput');
let searchSubmit = document.querySelector('.searchSubmit');

list.innerHTML = '';

let myHistory = [];

searchSubmit.onclick = function() {
    if (searchInput.value !== '') {
        myHistory.unshift(searchInput.value);

        list.innerHTML = '';

        for (let i =0; i < myHistory.length; i++){
            let itemText = myHistory[i];
            let listItem = document.createElement('li');
            listItem.textContent = itemText;
            list.appendChild(listItem);
        }
    }

    if (myHistory.length >= 5){
        myHistory.pop();
    }

    searchInput.focus();
}