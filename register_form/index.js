// Selecting elements
const registrationForm = document.getElementById("registration-form");
const tbody = document.querySelector("tbody");
const registeredUsersTable = document.querySelector(".table");

//load data from localStorage
function loadDataFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  savedData.forEach(function (userData) {
    appendUserToTable(userData);
  });
}


function appendUserToTable(userData) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${userData.firstName}</td>
    <td>${userData.lastName}</td>
    <td>${userData.orderNumber}</td>
    <td>
      <button class="btn btn-primary btn-sm edit-button">Edit</button>
      <button class="btn btn-danger btn-sm delete-button">Delete</button>
    </td>
  `;
  tbody.appendChild(newRow);
}


function saveDataToLocalStorage(userData) {
  const savedData = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  savedData.push(userData);
  localStorage.setItem("registeredUsers", JSON.stringify(savedData));
}


registrationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const orderNumber = document.getElementById("orderNumber").value;

  const userData = {
    firstName: firstName,
    lastName: lastName,
    orderNumber: orderNumber,
  };

  
  saveDataToLocalStorage(userData);

  
  appendUserToTable(userData);

  
  registrationForm.reset();
});

//(Edit and Delete)
registeredUsersTable.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-button")) {
    const row = e.target.closest("tr");
    const cells = row.querySelectorAll("td");
    const firstName = cells[0].textContent;
    const lastName = cells[1].textContent;
    const orderNumber = cells[2].textContent;

    // Populate the form fields for editing
    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("orderNumber").value = orderNumber;
  } else if (e.target.classList.contains("delete-button")) {
    const row = e.target.closest("tr");
    const cells = row.querySelectorAll("td");
    const firstName = cells[0].textContent;
    const lastName = cells[1].textContent;
    const orderNumber = cells[2].textContent;

    const savedData = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Filter out the deleted item and update localStorage
    const updatedData = savedData.filter(function (userData) {
      return (
        userData.firstName !== firstName ||
        userData.lastName !== lastName ||
        userData.orderNumber !== orderNumber
      );
    });

    localStorage.setItem("registeredUsers", JSON.stringify(updatedData));

    // Remove the row from the table
    tbody.removeChild(row);
  }
});


loadDataFromLocalStorage();
