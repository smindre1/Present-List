//Clears any list displayed on the profile page
const clearList = () => {
  let table = document.querySelector('#listTable');
  //Clears any previous list displayed
  let child = table.lastElementChild;
  while (child) {
    table.removeChild(child);
    child = table.lastElementChild;
  }
};
//Grabs the list contents from the database using a List Id
const getListData = async (listId) => {
  const response = await fetch(`/List/${listId}`);

  if (response.ok) {
    console.log('response 200');
    const data = await response.json();
    console.log('data', data);
    return data;
  } else {
    alert('Failed to create project');
  }
};

//This function loads the selected list onto the page after a list button is clicked
const displayList = async (event) => {
  event.preventDefault();
  const id = event.currentTarget.getAttribute('listid');
  const selectedList = event.currentTarget.innerHTML;
  buildListDisplay(id, selectedList);
};

//This button builds a specified list onto the page
const buildListDisplay = async (id, selectedList) => {
  //This function gets the selected list's data
  const data = await getListData(id);

  let table = document.querySelector('#listTable');
  //Clears any previous list displayed
  clearList();

  const keyValues = ['recipient', 'price', 'present', 'date'];
  const titles = ['Recipient', 'Price', 'Present', 'Date'];

  //This displays the list's title
  let listTitle = document.createElement('input');
  listTitle.setAttribute('id', 'listTitle');
  listTitle.setAttribute('class', 'listTitle');
  listTitle.setAttribute('listId', `${id}`);
  listTitle.setAttribute('value', `${selectedList}`);
  table.appendChild(listTitle);

  //Creates the div container for all the user's list column titles
  let titleRow = document.createElement('div');
  titleRow.setAttribute('id', 'titleRow');
  titleRow.setAttribute('class', 'flexRow');
  table.appendChild(titleRow);
  //Creates a destination for the column titles
  let destination = document.querySelector('#titleRow');
  //Creates the titles for all the user's columns
  for (i = 0; i < 4; i++) {
    let tableColumnTitle = document.createElement('ul');
    tableColumnTitle.setAttribute('id', 'column-title');
    tableColumnTitle.innerHTML = titles[i];
    destination.appendChild(tableColumnTitle);
  }
  //Creates rows based on the data of each list_item in the user's list
  for (i = 0; i < data.length; i++) {
    //Creates the container for each item row
    let tableRow = document.createElement('div');
    let rowNumber = i;
    tableRow.setAttribute('id', `row-${rowNumber}`);
    tableRow.setAttribute('list-item', `${data[i].id}`);
    tableRow.setAttribute('class', `listRow`);
    table.appendChild(tableRow);
    //Creates the destination for all the item data to be sent
    let row = document.querySelector(`#row-${rowNumber}`);
    //Displays the recipient data for every item of the list
    let newElement = document.createElement('textarea');
    newElement.setAttribute('id', `recipient-${i}`);
    newElement.innerHTML = data[i].recipient;
    row.appendChild(newElement);
    //Displays the price data for every item of the list
    let newElementTwo = document.createElement('textarea');
    newElementTwo.setAttribute('id', `price-${i}`);
    newElementTwo.innerHTML = data[i].price;
    row.appendChild(newElementTwo);
    //Displays the present data for every item of the list
    let newElementThree = document.createElement('textarea');
    newElementThree.setAttribute('id', `present-${i}`);
    newElementThree.innerHTML = data[i].present;
    row.appendChild(newElementThree);
    //Displays the date data for every item of the list
    let newElementFour = document.createElement('textarea');
    newElementFour.setAttribute('id', `date-${i}`);
    newElementFour.innerHTML = data[i].date;
    row.appendChild(newElementFour);
  }
  //Creates a save button for the selected list
  let saveBtn = document.createElement('button');
  saveBtn.setAttribute('id', 'saveBtn');
  saveBtn.setAttribute('class', `saveBtn`);
  saveBtn.setAttribute('NumOfRows', `${data.length}`);
  saveBtn.innerHTML = 'Save';
  table.appendChild(saveBtn);

  const saveButton = document.querySelector('#saveBtn');
  saveButton.addEventListener('click', saveCurrentList);

  //Creates a button that makes new rows for the current list
  const container = document.querySelector('#listTable');
  let newRow = document.createElement('button');
  newRow.setAttribute('id', 'newRowBtn');
  newRow.setAttribute('class', `newRowBtn`);
  newRow.setAttribute('listId', `${id}`);
  newRow.innerHTML = 'New Row';
  container.appendChild(newRow);

  const newRowBtn = document.querySelector('#newRowBtn');
  newRowBtn.addEventListener('click', addNewRow);
};

//The function to add a new row to the current list
const addNewRow = async (event) => {
  event.preventDefault();
  const listId = document.querySelector('#listTitle');
  const selectedList = listId.getAttribute('value');
  const listNumber = listId.getAttribute('listid');
  const body = { list_id: listNumber };
  const response = await fetch('/api/newRow', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    //Rebuilds the list with the new row added
    buildListDisplay(listNumber, selectedList);
  } else {
    alert('Failed to delete project');
  }
};

//////////////////////////////////////
const deleteRow = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

//Creates a list of all of the user's lists, making each a clickable event
const ListButtons = document.querySelectorAll('.listBtn');
ListButtons.forEach(function(button) {
  button.addEventListener('click', displayList);
});

//The function for the save button. It saves any changes made to the list
const saveCurrentList = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#listTitle');

  let body = [];
  const NumOfRows = event.currentTarget.getAttribute('numofrows');
  const listNumber = title.getAttribute('listid');
  body.push({ NumOfRows: NumOfRows });
  body.push({ title: title.value, listId: listNumber });
  for (i = 0; i < NumOfRows; i++) {
    const id = document.querySelector(`#row-${i}`);
    const listId = id.getAttribute('list-item');
    const recipient = document.querySelector(`#recipient-${i}`);
    const recipientValue = recipient.value;
    const price = document.querySelector(`#price-${i}`);
    const priceValue = price.value;
    const present = document.querySelector(`#present-${i}`);
    const presentValue = present.value;
    const date = document.querySelector(`#date-${i}`);
    const dateValue = date.value;
    body.push({
      id: listId,
      recipient: recipientValue,
      price: priceValue,
      present: presentValue,
      date: dateValue
    });
  }

  const response = await fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    console.log('response 200');
  } else {
    alert(response.statusText);
  }
};
