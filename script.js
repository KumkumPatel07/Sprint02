alert("JavaScript Loaded");
console.log("JavaScript Loaded");

const form =
 document.getElementById("expenseForm");

 const salaryInput = document.getElementById("salary");
 const expenseNameInput = document.getElementById("expenseName");
 const expenseAmountInput = document.getElementById("expenseAmount");

 const salaryDisplay = document.getElementById("salaryDisplay");
 const totalExpenseDisplay = document.getElementById("totalExpenseDisplay");
 const balanceDisplay = document.getElementById("balanceDisplay");

 const expenseList = document.getElementById("expenseList");

 const error = document.getElementById("error");

 //Variables
 let totalSalary = 0;
 let totalExpenses = 0;

 //Form Submit
 form.addEventListener("submit", function(event){

    event.preventDefault();
    alert("Form Submitted");
    console.log("Button Clicked");

    const salary = Number(salaryInput.value);
    const expenseName = expenseNameInput.value.trim();
    const expenseAmount = Number(expenseAmountInput.value);

    //Validation

    if(
        salaryInput.value === "" ||
        expenseName === "" ||
        expenseAmountInput.value === ""
    ){
        error.innerText="All fields are required.";
        return;
    }

    if (salary < 0 || expenseAmount < 0){
        error.innerText = "Negative values are not allowed."
        return;
    }

    error.innerText="";

    //Save salary
    totalSalary = salary;

    //Add expenses
    totalExpenses += expenseAmount;

    //Update Summary
    salaryDisplay.innerText = totalSalary;

    totalExpenseDisplay.innerText = totalExpenses;

    balanceDisplay.innerText = totalSalary-totalExpenses;

    //Create Expense List Item
    const li=document.createElement("li");

    li.innerText=expenseName+" : ₹"+expenseAmount;

    expenseList.appendChild(li);

    //Clear Expense Fields
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
 });