const displayList = async (event) => {
  event.preventDefault();

  const id = event.currentTarget.getAttribute('listid');
  console.log(id, 'id');

  const response = await fetch(`/List/${id}`);

  if (response.ok) {
    console.log('response 200');
    const data = await response.json();
    console.log(data);

    let table = document.querySelector('#listTable');
    //Clears any previous list displayed
    let child = table.lastElementChild;
    while (child) {
      table.removeChild(child);
      child = table.lastElementChild;
    }

    const keyValues = ['recipient', 'price', 'present', 'date'];
    const titles = ['Recipient', 'Price', 'Present', 'Date'];

    //Creates the div container for all the user's list column titles
    let titleRow = document.createElement('div');
    titleRow.setAttribute('id', 'titleRow');
    titleRow.setAttribute('class', 'flexRow');
    table.appendChild(titleRow);
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
      let rowNumber = i + 1;
      tableRow.setAttribute('id', `row-${rowNumber}`);
      tableRow.setAttribute('class', `listRow`);
      table.appendChild(tableRow);
      //Creates the destination for all the item data to be sent
      let row = document.querySelector(`#row-${rowNumber}`);
      //Displays the recipient data for every item of the list
      let newElement = document.createElement('textarea');
      newElement.setAttribute('type', 'recipient');
      newElement.innerHTML = data[i].recipient;
      row.appendChild(newElement);
      //Displays the price data for every item of the list
      let newElementTwo = document.createElement('textarea');
      newElementTwo.setAttribute('type', 'price');
      newElementTwo.innerHTML = data[i].price;
      row.appendChild(newElementTwo);
      //Displays the present data for every item of the list
      let newElementThree = document.createElement('textarea');
      newElementThree.setAttribute('type', 'present');
      newElementThree.innerHTML = data[i].present;
      row.appendChild(newElementThree);
      //Displays the date data for every item of the list
      let newElementFour = document.createElement('textarea');
      newElementFour.setAttribute('type', 'date');
      newElementFour.innerHTML = data[i].date;
      row.appendChild(newElementFour);
    }
  } else {
    alert('Failed to create project');
  }
};

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
