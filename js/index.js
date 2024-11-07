let fullName = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let formEmp = document.querySelector("#formEmp");
let tableBody = document.querySelector("#tableBody");
let editButton = document.querySelector("#update");
let submitButton = document.querySelector("#submit");


// Storage class for managing localStorage operations
class Storage {
  static addStorage() {
    localStorage.setItem("employees", JSON.stringify(employees));
  }

  static getStorage() {
    return JSON.parse(localStorage.getItem("employees")) || [];
  }

  static removeData(id) {
    employees = employees.filter((employee) => employee.id !== id);
    Storage.addStorage();
  }

  static editData(id) {
    let editEmployee = employees.find((emp) => emp.id === id);
    fullName.value = editEmployee.fullName
    email.value = editEmployee.email
    phone.value = editEmployee.phone
  }
}

let employees = Storage.getStorage(); 

let id = 0 

class Employee {
  constructor(fullName, email, phone) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.id = id++
  }

  showData() {
    const trEl = document.createElement("tr");
    trEl.dataset.id = this.id;

    trEl.innerHTML = `
            <td>${this.fullName}</td>
            <td>${this.email}</td>
            <td>${this.phone}</td>
            <td>
                <button class="btn btn-danger delete-btn">Supprimer</button>
                <button class="btn btn-primary edit-btn">Editer</button>
            </td>
        `;

    trEl.querySelector(".delete-btn").addEventListener("click", () => {
      Storage.removeData(this.id);
      trEl.remove();
    });

    trEl.querySelector(".edit-btn").addEventListener("click", () => {
            editButton.removeAttribute("hidden");
            submitButton.setAttribute("hidden","")

      Storage.editData(this.id);
    });

    tableBody.appendChild(trEl);
  }
}

function displayData() {
  tableBody.innerHTML = "";
  employees.forEach((employeeData) => {
    const emp = new Employee(
      employeeData.fullName,
      employeeData.email,
      employeeData.phone
    );
    emp.showData();
  });
}

displayData(); // Initially display data from local storage

// Form submission event listener for adding new employees
formEmp.addEventListener("submit", (e) => {
  e.preventDefault();

  // Create a new employee object
  const employee = new Employee(fullName.value, email.value, phone.value);
  employees.push(employee);
  employee.showData(); // Add the new employee to the table
  Storage.addStorage(); // Update localStorage with the new employee list

  // Reset form fields
  fullName.value = "";
  email.value = "";
  phone.value = "";
});
