const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaries = document.getElementById('show-millionaries');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');


let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money 
async function getRandomUser(){
  const res = await fetch('https://randomuser.me/api');
   const data = await res.json();


   const user = data.results[0];
   const newUser ={
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000)
   };
   

   addData(newUser);
   
}

 // Double everone's money 
    function doubleMoney(){
      data =  data.map((user) => {
         return { ...user , money: user * 2};

      } );

         updateDOM();
       
    } 
  

//Add  new object to the data arr

function addData(obj){
   data.push(obj);

     updateDOM();

      
}

//sort users by richest 

 function sortByRichest(){
     
  data.sort((a,b) => b.money -a.money);

  updateDOM();

 }
  // Filter only millionaries
  function showMillionaries(){
      data = data.filter(user => user.money > 1000000);

    updateDOM();
  }


// Update Dom
function updateDOM(providedData = data){
     //clear the main div 
     main.innerHTML = ' <h2><strong>Person</strong>Wealth</h2>'
       
      providedData.forEach(item => {
    
        const element = document.createElement('div');
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);


      });
      
}

// Format number as money 
function formatMoney(number){
     

   return  '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);   
showMillionariesBtn.addEventListener('click', showMillionaries);   
   
