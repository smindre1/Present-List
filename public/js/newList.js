const createNewList = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/newList', {
    method: 'POST',
    body: JSON.stringify({ title: 'New List!' }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('#newListButton')
  .addEventListener('click', createNewList);
