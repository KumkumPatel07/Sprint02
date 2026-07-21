const form = document.getElementById("expenseForm");

const salaryInput = document.getElementById("salary");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");

const salaryDisplay = document.getElementById("salaryDisplay");
const totalExpenseDisplay = document.getElementById("totalExpenseDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");

const expenseList = document.getElementById("expenseList");
const error = document.getElementById("error");

const downloadBtn = document.getElementById("downloadBtn");

// State
let totalSalary = 0;
let expenses = [];
let expenseChart;

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

    updateChart(totalExpenses);

}

function updateChart(totalExpenses){
    const remainingBalance = totalSalary - totalExpenses;
    const ctx = document.getElementById("expenseChart").getContext("2d");
    if(expenseChart){
        expenseChart.destroy();
    }
    expenseChart = new Chart(ctx,{
        type : "pie",
        data : {
            labels : ["Remaining Balance", "Total Expenses"],
            datasets : [{
                data : [remainingBalance, totalExpenses],
                backgroundColor: [
                    "#218cde",
                    "#ec2883"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

//PDF Function
function downloadReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.text("Expense Tracker Report", 20,y);

    y += 15;

    doc.setFontSize(12);
    doc.text(`Total Salary: Rs. ${totalSalary}`,20, y); 

    y += 10;

    let totalExpenses = 0;

    doc.text("Expenses: ",20,y);

    y += 10;

    expenses.forEach((expense) => {
        doc.text(
            `${expense.name} : Rs. ${expense.amount}`, 20,y );

        totalExpenses += expense.amount;

        y += 10;
    });

    const remainingBalance = totalSalary - totalExpenses;
    y += 10;
    doc.text(`Total Expenses: Rs. ${totalExpenses}`, 20, y);

    y += 10;

    doc.text(`Remaining Balance : Rs. ${remainingBalance}`, 20, y);

    doc.save("Expense_Report.pdf");

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

// downloadBtn.addEventListener("click", downloadReport);
document
   .getElementById("downloadBtn")
   .addEventListener("click",downloadReport);
renderData();