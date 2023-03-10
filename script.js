// ui items
const itemFormUI = document.getElementById('item-form');
const itemInputUI = document.getElementById('item-input');
const submitUI = document.querySelector('.btn');
const itemListUI = document.getElementById('item-list');
const clearAllUI = document.getElementById('clear');
const itemFilterUI = document.getElementById('filter');

// ui state:
function uiState() {
  itemListUI.firstElementChild
    ? ((clearAllUI.style.display = 'inline-block'),
      (itemFilterUI.style.display = 'inline-block'))
    : ((clearAllUI.style.display = 'none'),
      (itemFilterUI.style.display = 'none'));
}

uiState();
// add and remove items:

// create li w/ button n' icon ; add item:
function addItem(e) {
  e.preventDefault();
  // Validate Input:
  if (itemInputUI.value === '') {
    alert('Please enter an item');
    return;
  }
  // create li and append text
  const itemLi = document.createElement('li');
  itemLi.appendChild(document.createTextNode(itemInputUI.value));

  // create button and append to li
  const button = createButton('remove-item btn-link text-red');
  itemLi.appendChild(button);

  // append item to item list
  itemListUI.appendChild(itemLi);

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

// delete item
function deleteItem(e) {
  if (e.target.tagName === 'I') {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  uiState();
}

// clear all items
function clearAll() {
  if (confirm('Are you sure you wish to clear all items?'))
    while (itemListUI.firstChild) {
      itemListUI.removeChild(itemListUI.firstChild);
    }
  uiState();
}

// filter
function filter() {}

// event listeners
itemFormUI.addEventListener('submit', addItem);
itemListUI.addEventListener('click', deleteItem);
clearAllUI.addEventListener('click', clearAll);
itemFilterUI.addEventListener('keyup', filter);
