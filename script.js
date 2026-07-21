const form = document.getElementById("expenseForm");

const salaryInput = document.getElementById("salary");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");

const salaryDisplay = document.getElementById("salaryDisplay");
const totalExpenseDisplay = document.getElementById("totalExpenseDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");

const expenseList = document.getElementById("expenseList");
const error = document.getElementById("error");

// State
let totalSalary = 0;
let expenses = [];

//Load local Storage
if(localStorage.getItem("salary")){

    totalSalary = JSON.parse(localStorage.getItem("salary"));

}

if(localStorage.getItem("expenses")){

    expenses = JSON.parse(localStorage.getItem("expenses"));

}

// Save
function saveData(){

    localStorage.setItem("salary",JSON.stringify(totalSalary));

    localStorage.setItem("expenses",JSON.stringify(expenses));

}

// Render 
function renderData(){

    salaryDisplay.innerText = totalSalary;

    expenseList.innerHTML="";

    let totalExpenses = 0;

    expenses.forEach(function(expense,index){

        totalExpenses += expense.amount;

        const li=document.createElement("li");

        li.innerHTML=`
            <span>${expense.name} - ₹${expense.amount}</span>

            <button class="delete-btn" onclick="deleteExpense(${index})">
                🗑️
            </button>
        `;

        expenseList.appendChild(li);

    });

    totalExpenseDisplay.innerText = totalExpenses;

    balanceDisplay.innerText = totalSalary-totalExpenses;

}

// Delete
function deleteExpense(index){

    expenses.splice(index,1);

    saveData();

    renderData();

}

//Submit
form.addEventListener("submit",function(e){

    e.preventDefault();

    const salary=Number(salaryInput.value);

    const expenseName=expenseNameInput.value.trim();

    const expenseAmount=Number(expenseAmountInput.value);

    if(
        salaryInput.value===""||
        expenseName===""||
        expenseAmountInput.value===""){
            error.innerText="All fields are required.";
            return;
        }

    if(salary<0||expenseAmount<0){

        error.innerText="Negative values are not allowed.";

        return;

    }
    if(salary<expenseAmount){
        error.innerText="Expense can not be more than Salary.";
        return;
    }

    error.innerText="";

    totalSalary=salary;

    expenses.push({

        name:expenseName,

        amount:expenseAmount

    });

    saveData();

    renderData();

    expenseNameInput.value="";

    expenseAmountInput.value="";

});

renderData();