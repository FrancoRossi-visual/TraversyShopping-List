// ui items
const itemFormUI = document.getElementById('item-form');
const itemInputUI = document.getElementById('item-input');
const submitUI = document.querySelector('.btn');
const itemListUI = document.getElementById('item-list');

// components:

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

// event listeners
itemFormUI.addEventListener('submit', addItem);
