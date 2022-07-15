// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".overlay");

// fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

// Insert employees
function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
    });
    gridContainer.innerHTML = employeeHTML;
}

// Insert employees modal
function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
        <img class="avatarLarge" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

// Display modal - on click
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

// Close modal - on click
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

//Search functionality
document.getElementById("searchbar").addEventListener("keyup", searchEmployees);
function searchEmployees() {
    let card = document.querySelectorAll('.card')
    let input = document.getElementById('searchbar');
    let searchFilter = input.value.toUpperCase();
    for (let i = 0; i < card.length; i++) {
        let names = card[i].querySelector('.name');
        let nameValue = names.textContent || names.innerText;
        if (nameValue.toUpperCase().indexOf(searchFilter) > -1) { 
            card[i].style.display = "";
        } else {
            card[i].style.display ="none";
        }
    }
}
