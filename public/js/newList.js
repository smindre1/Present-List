const saveNewList = async (event) =>{
  event.preventDefault();
  let inputValue = document.getElementById("listValue")

  let title;
  inputValue.value.length > 0 ? title = inputValue.value : title = 'Untitled';

  const response = await fetch('/api/newList', {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('#saveList')
  .addEventListener('click', saveNewList);
