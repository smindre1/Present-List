// const saveCurrentList = async (event) => {
//     event.preventDefault();
//     alert("hello");
//     let body = [];
//     const NumOfRows = event.currentTarget.NumOfRows;
//     body.push({NumOfRows: NumOfRows});

//     for(i=0; i < NumOfRows; i++) {
//         const recipient = document.querySelector(`#recipient-${i}`);
//         const price = document.querySelector(`#price-${i}`);
//         const present = document.querySelector(`#present-${i}`);
//         const date = document.querySelector(`#date-${i}`);
//         body.push({
//             recipient: recipient,
//             price: price,
//             present: present,
//             date: date
//         });
        
//     }


//     const response = await fetch('/api/save', {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//     console.log("response 200");
//     } else {
//     alert(response.statusText);
//     }

//   };
  
  
//   document
//     .querySelector('#saveBtn')
//     .addEventListener('submit', saveCurrentList);