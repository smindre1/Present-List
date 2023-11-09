let createListSection = document.getElementById("createList")
const showListSection = async (event) => {

 
  console.log(createListSection)
  createListSection.classList.remove("hide")
  var saveButton = document.getElementById("saveList")
  saveButton.addEventListener("click", saveNewList)
};
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
    createListSection.classList.add("hide")
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('#newListButton')
  .addEventListener('click', showListSection);
