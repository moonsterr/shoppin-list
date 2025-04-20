//element area
const inp = document.querySelector('#item-input');
const btnAdd = document.querySelector('.btn');
const btnRemove = document.querySelector('.remove-item');
const btnClear = document.querySelector('.btn-clear');
const list = document.querySelector('#item-list');
const form = document.querySelector('#item-form');
const icon = document.querySelector('fa-solid.fa-xmark');
const filter = document.querySelector('.filter');

function displayItems() {
  const itemsFromStorage = getItemsFromstorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  clearUI();
}

function onItemSubmit(e) {
  e.preventDefault();
  if (inp.value.trim() === '') {
    return alert('you better fill it out first.');
  }
  const value = inp.value;
  let lis = Array.from(document.querySelectorAll('li'));
  lis = lis.map((li) => li.firstChild.textContent.toLowerCase());
  if (lis.includes(`${value.toLowerCase()}`) !== true) {
    addItemToDom(value);
    addItemToStorage(value);
    //   addItemToStorage();
    clearUI();
  } else {
    alert('remove that rn');
  }
}

function addItemToDom(item) {
  const li = document.createElement('li');
  const textNode = document.createTextNode(item);
  li.appendChild(textNode);

  li.addEventListener('click', () => {
    li.setAttribute('contenteditable', 'true');
    li.focus();
  });
  li.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      li.removeAttribute('contenteditable');
      saveEditedItem(li);
    }
  });
  li.addEventListener('blur', () => {
    if (li.isContentEditable) {
      li.removeAttribute('contenteditable');
      saveEditedItem(li);
    }
  });

  const button = document.createElement('button');
  button.classList.add('remove-item', 'btn-link', 'text-red');
  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-xmark');
  button.appendChild(icon);
  li.appendChild(button);
  list.appendChild(li);
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromstorage();
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromstorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

function saveEditedItem(item) {
  let liElements = Array.from(document.querySelectorAll('li'));
  liElements = liElements.map((el) => el.firstChild.textContent);
  localStorage.setItem('items', JSON.stringify(liElements));
}

//remove

list.addEventListener('click', function (e) {
  if (e.target.tagName === 'I') {
    const button = e.target.parentNode;
    const li = button.parentNode;
    const itemText = li.firstChild.textContent;
    li.remove();

    let itemsFromStorage = getItemsFromstorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== itemText);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  }
  clearUI();
});

//Clear all

function clearAll() {
  const lis = document.querySelectorAll('li');
  lis.forEach((li) => li.remove());
  clearUI();
  localStorage.clear();
}

//clear ui state
function clearUI() {
  const lis = document.querySelectorAll('li');
  if (lis.length === 0) {
    filter.style.display = 'none';
    btnClear.style.display = 'none';
  } else {
    filter.style.display = 'block';
    btnClear.style.display = 'block';
  }
}

//Filter

function filterItems(e) {
  const value = e.target.value.toLowerCase();
  const lis = document.querySelectorAll('li');

  lis.forEach((li) => {
    const itemName = li.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(value) != -1) {
      li.style.display = 'flex';
    } else {
      li.style.display = 'none';
    }
  });
}

//event listners
document.addEventListener('DOMContentLoaded', displayItems);
filter.addEventListener('input', filterItems);
btnClear.addEventListener('click', clearAll);
form.addEventListener('submit', onItemSubmit);
