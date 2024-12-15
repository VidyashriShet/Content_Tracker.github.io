var selectedRow = null;

// Display alert messages
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear input fields
function clearFields() {
    document.querySelector("#contenttype").value = "";
    document.querySelector("#contentname").value = "";
    document.querySelector("#watchstatus").value = "";
    document.querySelector("#rating").value = "";
}

// Validate text or mix of text and numbers for content name
function isTextOrTextAndNumbers(input) {
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(input);
}

// Validate rating between 1 and 10, including decimals

// function isValidRating(input) {
//     const regex = /^([1-9](\.\d{1,2})?|10(\.0{1,2})?)$/;
//     return regex.test(input) && parseFloat(input) >= 1 && parseFloat(input) <= 10;
// }

function isValidRating(rating) {
    const regex = /^(?:\d(\.\d{1,2})?|10(\.0{1,2})?)$/; 
    return rating === '-' || regex.test(rating);
}


// Add content
document.querySelector("#content-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const contenttype = document.querySelector("#contenttype").value;
    const contentname = document.querySelector("#contentname").value;
    const watchstatus = document.querySelector("#watchstatus").value;
    const rating = document.querySelector("#rating").value;

    // Validate form fields
    if (contenttype === "" || contentname === "" || watchstatus === "" || rating === "") {
        showAlert("Please fill all fields", "danger");
    } else if (!isTextOrTextAndNumbers(contentname)) {
        showAlert("Please enter a valid name", "danger");
    } else if (!isValidRating(rating)) {
        showAlert("Please enter valid rating (1 - 10)", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector("#content-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${contenttype}</td>
                <td>${contentname}</td>
                <td>${watchstatus}</td>
                <td>${rating}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            showAlert("Content added", "success");
        } else {
            selectedRow.children[0].textContent = contenttype;
            selectedRow.children[1].textContent = contentname;
            selectedRow.children[2].textContent = watchstatus;
            selectedRow.children[3].textContent = rating;
            showAlert("Content updated", "info");
        }
        selectedRow = null;
        clearFields();
    }
});

// Edit content
document.querySelector("#content-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        selectedRow = e.target.parentElement.parentElement;
        document.querySelector("#contenttype").value = selectedRow.children[0].textContent;
        document.querySelector("#contentname").value = selectedRow.children[1].textContent;
        document.querySelector("#watchstatus").value = selectedRow.children[2].textContent;
        document.querySelector("#rating").value = selectedRow.children[3].textContent;
    }
});

// Delete content
document.querySelector("#content-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
        showAlert("Content deleted", "danger");
    }
});
