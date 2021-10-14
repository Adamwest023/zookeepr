const $animalForm = document.querySelector('#animal-form');

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  // adding fetch function that sends data from frontend to backend
  fetch('/api/animals',{
    //data entered will be posted
    //method is the type of request
    method:'POST',
    //headers property inform the request that this is going to be JSON data
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    //stringify to JSON as an animal object to the body property
    body: JSON.stringify(animalObject)
  })
  //responses will be returned and added into json()
  .then(response =>{
    if(response.ok){
      return response.json();
    }
    alert('Error:' + response.statusText);
  })
  //json object will then be added to the backend
  .then(postResponse => {
    console.log(postResponse);
    alert('Thank you for adding an animal!');
  });
};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
