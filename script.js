// UI consts
const itemFormUI = document.getElementById('item-form'),
  itemInputUI = document.getElementById('item-input'),
  submitUI = document.querySelector('.btn'),
  itemListUI = document.getElementById('item-list'),
  clearAllUI = document.getElementById('clear'),
  itemFilterUI = document.getElementById('filter');
let isEditMode = false;

// ui state:
function uiState() {
  itemListUI.firstElementChild
    ? ((clearAllUI.style.display = 'inline-block'),
      (itemFilterUI.style.display = 'inline-block'))
    : ((clearAllUI.style.display = 'none'),
      (itemFilterUI.style.display = 'none'));

  isEditMode = false;

  itemListUI
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  submitUI.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
  submitUI.style.backgroundColor = '#333333';
  itemInputUI.value = '';
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

  // check for edit mode
  if (isEditMode) {
    const oldItem = document.querySelector('.edit-mode').firstChild.textContent;
    editItem(newItem);
    removeItemFromStorage(oldItem);
  } else {
    // create item dom element
    addItemToDOM(newItem);

    // add item to local storage
    addItemToStorage(newItem);
  }

  // update ui
  uiState();

  itemInputUI.value = '';
}
// edit item and change storage
function editItem(item) {
  document.querySelector('.edit-mode').firstChild.textContent = item;
  editItemFromStorage(item);
}
function editItemFromStorage(item) {
  addItemToStorage(item);
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
  if (e.target.tagName === 'LI') {
    setItemToEdit(e.target);
  }
}
function setItemToEdit(item) {
  isEditMode = true;
  itemInputUI.focus();

  itemListUI
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  submitUI.innerHTML = '<i class="fa-solid fa-pen"></i> Update item';
  submitUI.style.backgroundColor = '#228B22';
  itemInputUI.value = item.textContent;
}

// remove item
function removeItem(item) {
  if (confirm('Are you sure?')) {
    // remove from dom
    item.remove();
    // remove from storage
    removeItemFromStorage(item.textContent);

    uiState();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // filter out
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

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
