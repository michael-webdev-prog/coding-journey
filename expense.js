const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");

const text = document.getElementById("text");
const amount = document.getElementById("amount");

const addTransaction = document.getElementById("addTransaction");
const list = document.getElementById("list");

// Load saved transactions
const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
const transactions = savedTransactions || [];

// Add a new transaction
addTransaction.addEventListener("click", function () {

    if (text.value.trim() === "" || amount.value === "") {
        alert("Please enter a description and an amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value.trim(),
        amount: Number(amount.value)
    };

    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    addTransactionToDOM(transaction);

    updateValues();

    text.value = "";
    amount.value = "";

});

// Display a transaction
function addTransactionToDOM(transaction) {

    const item = document.createElement("li");

    item.setAttribute("data-id", transaction.id);

    // Green for income, red for expense
    if (transaction.amount < 0) {
        item.style.borderRight = "5px solid red";
    } else {
        item.style.borderRight = "5px solid green";
    }

    item.innerHTML = `
        <span>${transaction.text}</span>

        <span>
            $${transaction.amount.toFixed(2)}
            <button class="delete-btn">Delete</button>
        </span>
    `;

    list.appendChild(item);

    item.querySelector(".delete-btn").addEventListener("click", function () {

        const index = transactions.findIndex(function (t) {
            return t.id === transaction.id;
        });

        if (index !== -1) {
            transactions.splice(index, 1);
        }

        localStorage.setItem("transactions", JSON.stringify(transactions));

        item.remove();

        updateValues();

    });

}

// Update totals
function updateValues() {

    const amounts = transactions.map(function (transaction) {
        return transaction.amount;
    });

    const total = amounts.reduce(function (acc, item) {
        return acc + item;
    }, 0);

    const income = amounts
        .filter(function (item) {
            return item > 0;
        })
        .reduce(function (acc, item) {
            return acc + item;
        }, 0);

    const expense = amounts
        .filter(function (item) {
            return item < 0;
        })
        .reduce(function (acc, item) {
            return acc + item;
        }, 0);

    balance.innerText = `$${total.toFixed(2)}`;
    moneyPlus.innerText = `$${income.toFixed(2)}`;
    moneyMinus.innerText = `$${Math.abs(expense).toFixed(2)}`;

}

// Load saved transactions when page opens
transactions.forEach(function (transaction) {
    addTransactionToDOM(transaction);
});

updateValues();