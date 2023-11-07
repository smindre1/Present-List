const displayList = async (event) => {
  event.preventDefault();

  const id = event.currentTarget.getAttribute('listid');
  const selectedList = event.currentTarget.innerHTML;
  console.log(id, 'id');

  const response = await fetch(`/List/${id}`);

  if (response.ok) {
    console.log('response 200');
    const data = await response.json();
    console.log("data", data);

    let table = document.querySelector('#listTable');
    //Clears any previous list displayed
    let child = table.lastElementChild;
    while (child) {
      table.removeChild(child);
      child = table.lastElementChild;
    }

    const keyValues = ['recipient', 'price', 'present', 'date'];
    const titles = ['Recipient', 'Price', 'Present', 'Date'];

    //This displays the lists title
    let listTitle = document.createElement('input');
    listTitle.setAttribute('id', 'listTitle');
    listTitle.setAttribute('class', 'listTitle');
    listTitle.setAttribute('listId', `${id}`);
    listTitle.setAttribute('placeholder', `${selectedList}`);
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
    let saveBtn = document.createElement('button');
    saveBtn.setAttribute('id', 'saveBtn');
    saveBtn.setAttribute('class', `saveBtn`);
    saveBtn.setAttribute('NumOfRows', `${data.length}`);
    saveBtn.innerHTML = 'Save';
    table.appendChild(saveBtn);

    const saveButton = document.querySelector('#saveBtn');
    saveButton.addEventListener('click', saveCurrentList);
  } else {
    alert('Failed to create project');
  }
};
//////////////////////////////////////
const updateList = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document
    .querySelector('#project-funding')
    .value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const updateListItems = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document
    .querySelector('#project-funding')
    .value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
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

const ListButtons = document.querySelectorAll('.listBtn');

ListButtons.forEach(function(button) {
  button.addEventListener('click', displayList);
});

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);

//The function for the save button
const saveCurrentList = async (event) => {
  event.preventDefault();

  let body = [];
  const NumOfRows = event.currentTarget.getAttribute('numofrows')
  body.push({ NumOfRows: NumOfRows });
  for (i = 0; i < NumOfRows; i++) {
    const id = document.querySelector(`#row-${i}`);
    const listId = id.getAttribute("list-item");
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

    // console.log('body');
    // console.log(JSON.stringify(body));


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
