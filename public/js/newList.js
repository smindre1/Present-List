const saveNewList = async (event) =>{
  event.preventDefault();
  // console.log("in the createnewlist!!!")
  let inputValue = document.getElementById("listValue")
  console.log(inputValue.value)
  const response = await fetch('/api/newList', {
    method: 'POST',
    body: JSON.stringify({ title: inputValue.value}),
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
