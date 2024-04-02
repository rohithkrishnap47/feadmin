
var selectuserid;
var user = []
displayuser()
function displayuser() {
    fetch("http://localhost:5001/user/show-orders")
        .then(response => response.json())
        .then(data => {
            user = data
            console.log(user);
            showOrders()
        })
        .catch(error => {
            console.error("the error is:", error);
        });
}
function showOrders() {
    const tbody = document.getElementById("data-body");

    user.forEach((item, index) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = index + 1;
        row.appendChild(idCell);

        const productCell = document.createElement("td");
        productCell.textContent = item._id;
        row.appendChild(productCell);

        const payMtdCell = document.createElement("td");
        payMtdCell.textContent = item.PaymentMethod;
        row.appendChild(payMtdCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = item.paymentStatus;
        row.appendChild(statusCell);

        const orderDate = document.createElement("td");
        orderDate.textContent = item.orderedDate; // Placeholder value, replace with actual order date
        row.appendChild(orderDate);

        const deliveryStatus = document.createElement("td");
        const deliveryDropdown = document.createElement("select");
        deliveryDropdown.classList.add("form-select");

        // Define options
        const deliveryOptions = ["Pending", "Delivered", "Cancelled"];

        // Create options and append to dropdown
        deliveryOptions.forEach(optionText => {
            const option = document.createElement("option");
            option.textContent = optionText;
            option.value = optionText; // set the value to lowercase of option text
            deliveryDropdown.appendChild(option);
        });
        deliveryDropdown.value = item.deliveryStatus
        deliveryDropdown.addEventListener("change", function () {
            // Get the selected value
            const selectedValue = this.value;
            // Here, you can perform any actions based on the selected value
            console.log("Selected delivery status:", selectedValue);
            changeStatus(selectedValue, item._id)
        });
        // Append dropdown to cell
        deliveryStatus.appendChild(deliveryDropdown);
        row.appendChild(deliveryStatus);

        const detail = document.createElement("td");
        detail.textContent = "Detail"; // Placeholder value, replace with actual order date
        row.appendChild(detail);

        // BLOCK BUTTON
        // const buttCell = document.createElement("td");
        // const deleteButton = document.createElement("button");
        // deleteButton.classList.add("btn", "btn-info");
        // deleteButton.textContent = "BLOCK";
        // deleteButton.addEventListener("click", function () {
        //     Swal.fire({
        //         title: 'You Sure?',
        //         text: "This user will be BLOCKED !",
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonColor: '#1CC88A',
        //         cancelButtonColor: '#d33',
        //         confirmButtonText: 'YES'
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             fetch("http://localhost:5001/user/userDelete/" + item._id, {
        //                 method: 'DELETE',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //             })
        //                 .then(response => response.json())
        //                 .then(data => {
        //                     console.log(data);
        //                     location.reload();
        //                 })
        //                 .catch(error => {
        //                     console.error('Error:', error);
        //                 });
        //             console.log("DELETE button  clicked!!");
        //         }
        //     });
        // });

        // buttCell.appendChild(deleteButton);
        // row.appendChild(buttCell);

        tbody.appendChild(row);
    })
}


// ---------------------------------------------------------------------------------------------------
// UPDATE USER FUNCTION
function updateBanner() {
    // var categoryName = document.getElementById("categoryname").value;
    // var description = document.getElementById("categorydescription").value;
    let body = {
        bannerTitle: document.getElementById("bannername").value,
        description: document.getElementById("bannerdescription").value,
        bannerImage: document.getElementById("bannerimage").value,
    }
    fetch("http://localhost:5001/banner/updateBanner/" + selectuserid, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(data => {
            selectuserid = ""
            console.log(data);
            location.reload()
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// -----------------------------------------------------

// create BANNER
function createBanner() {
    let body = {
        bannerTitle: document.getElementById("bannername").value,
        description: document.getElementById("bannerdescription").value,
        bannerImage: document.getElementById("bannerimage").value,
    }
    console.log(body);
    fetch("http://localhost:5001/banner/createBanner", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            banner = data.data
            console.log(data);
            if (data.statusCode === 400) {
                Swal.fire({
                    icon: 'ERROR !',
                    title: 'Please fill ...',
                    text: "Required fields :" + data.error.missing
                })
            }
            else {
                location.reload()
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// ----------------------------------------------------------
// UPDATE-ORDER-STATUS
async function changeStatus(status, id) {
    try {
        const response = await fetch('http://localhost:5001/user/update-order-status/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                deliveryStatus: status
            })
        });

        const data = await response.json();

        console.log('Updated status:', data.deliveryStatus);
    } catch (error) {
        console.error('Error updating status:', error);
    }
}


// -----------------------------------------------------------------------------------------------
// ADMIN-INFO
document.addEventListener("DOMContentLoaded", function () {
    var adminInfo = localStorage.getItem("admin-Info");

    if (adminInfo) {
        var adminData = JSON.parse(adminInfo);

        var adminNameElement = document.getElementById("adminName");
        if (adminNameElement) {
            adminNameElement.textContent = adminData.fullName.toUpperCase();
            adminNameElement.style.fontWeight = "bold";
        }
    }
});

// LOG-OUT
function logout() {
    localStorage.clear();
    window.location.reload()
}

// -----------------------------------------------------------------------------------------------