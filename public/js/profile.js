const displayList = async (event) => {
  event.preventDefault();

  const id = event.currentTarget.getAttribute("listid");
  console.log(id, "id");

  const response = await fetch(`/List/${id}`);

  if (response.ok) {
    console.log("response 200");
    const data = await response.json();
    console.log(data)
    // let table = document.querySelector('#listTable')
    // let newTable = table.appendChild.createElement("p");
    // newTable.innerHTML = "Testing 1, 2 3...";
    // table.setAttribute('id', 'table');
    // table.append("Testing 1, 2, 3...");
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

const ListButtons = document
.querySelectorAll('.listBtn');

ListButtons.forEach(function(button) {
  button.addEventListener('click', displayList);
});


// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
