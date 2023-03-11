// UI consts
const itemFormUI = document.getElementById('item-form'),
  itemInputUI = document.getElementById('item-input'),
  submitUI = document.querySelector('.btn'),
  itemListUI = document.getElementById('item-list'),
  clearAllUI = document.getElementById('clear'),
  itemFilterUI = document.getElementById('filter');

// ui state:
function uiState() {
  itemListUI.firstElementChild
    ? ((clearAllUI.style.display = 'inline-block'),
      (itemFilterUI.style.display = 'inline-block'))
    : ((clearAllUI.style.display = 'none'),
      (itemFilterUI.style.display = 'none'));
}

// create li w/ button n' icon ; add item:
function OnAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInputUI.value;
  // Validate Input:
  if (newItem === '') {
    alert('Please enter an item');
    return;
  }
  // create item dom element
  addItemToDOM(newItem);

  // add item to local storage
  addItemToStorage(newItem);

  // update ui
  uiState();

  itemInputUI.value = '';
}
// Add to DOM
function addItemToDOM(item) {
  // create li and append text
  const itemLi = document.createElement('li');
  itemLi.appendChild(document.createTextNode(item));

  // create button and append to li
  const button = createButton('remove-item btn-link text-red');
  itemLi.appendChild(button);

  // append item to item list
  itemListUI.appendChild(itemLi);
}
// Local storage
function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

function renderItemsFromStorage() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  uiState();
}

// create button w/ icon:
function createButton(buttonClass) {
  const button = document.createElement('button');
  button.classList = buttonClass;
  // create icon and append to button
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// create icon:
function createIcon(iconClass) {
  const icon = document.createElement('i');
  icon.classList = iconClass;
  return icon;
}

// add item to storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  // add new item to array
  itemsFromStorage.push(item);

  // convert to json string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
// Item delegatory function
function onClickItem(e) {
  if (e.target.tagName === 'I') {
    removeItem(e.target.parentElement.parentElement);
  }
}

// remove item
function removeItem(item) {
  if (confirm('Are you sure?')) {
    // remove from dom
    item.remove();
    // remove from storage
    removeItemFromStorate(item.textContent);

    uiState();
  }
}

function removeItemFromStorate(item) {
  let itemsFromStorage = getItemsFromStorage();
  console.log(itemsFromStorage);
  // filter out
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  console.log(itemsFromStorage);

  // reset to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// clear all items
function clearAll() {
  if (confirm('Are you sure you wish to clear all items?'))
    while (itemListUI.firstChild) {
      itemListUI.removeChild(itemListUI.firstChild);
      // clear from localStorage
      localStorage.removeItem('items');
      uiState();
    }
}

// filter
function filter(e) {
  const text = e.target.value.toLowerCase();
  const items = document.querySelectorAll('li');

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// initialize app
function init() {
  // event listeners
  itemFormUI.addEventListener('submit', OnAddItemSubmit);
  itemListUI.addEventListener('click', onClickItem);
  clearAllUI.addEventListener('click', clearAll);
  itemFilterUI.addEventListener('input', filter);
  document.addEventListener('DOMContentLoaded', renderItemsFromStorage);

  uiState();
}

init();
