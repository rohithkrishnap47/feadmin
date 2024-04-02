
var selectuserid;
var user = []
displayuser()
function displayuser() {
    fetch("http://localhost:5001/user/listusers")
        .then(response => response.json())
        .then(data => {
            user = data.data
            console.log("deiiiii", data.data);
            setUser()
        })
        .catch(error => {
            console.error("the error is:", error);
        });
}
function setUser() {
    const tbody = document.getElementById("data-body");
    user?.forEach(item => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = user.indexOf(item) + 1;
        row.appendChild(idCell);

        const userCell = document.createElement("td");
        userCell.textContent = item.firstname;;
        row.appendChild(userCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = item.emailaddress;
        row.appendChild(emailCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = item.userStatus;
        row.appendChild(statusCell);



        // DELETE BUTTON
        const buttCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-info");
        deleteButton.textContent = "BLOCK";
        deleteButton.addEventListener("click", function () {
            Swal.fire({
                title: 'You Sure?',
                text: "This user will be BLOCKED !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#1CC88A',
                cancelButtonColor: '#d33',
                confirmButtonText: 'YES'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch("http://localhost:5001/user/userDelete/" + item._id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            location.reload();
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    console.log("DELETE button  clicked!!");
                }
            });
        });


        buttCell.appendChild(deleteButton);
        row.appendChild(buttCell);



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






















// // Sample data for banners (replace this with your actual data)


// function setBanners() {
//     const tbody = document.getElementById("banner-body");

//     banners.forEach(banner => {
//         const row = document.createElement("tr");

//         const idCell = document.createElement("td");
//         idCell.textContent = banner.id;
//         row.appendChild(idCell);

//         const imageCell = document.createElement("td");
//         const imageElement = document.createElement("img");
//         imageElement.src = banner.imageUrl;
//         imageElement.alt = banner.altText;
//         imageElement.className = "banner-image"; // Add CSS class for styling if needed
//         imageCell.appendChild(imageElement);
//         row.appendChild(imageCell);

//         const altTextCell = document.createElement("td");
//         altTextCell.textContent = banner.altText;
//         row.appendChild(altTextCell);

//         const editCell = document.createElement("td");

//         row.appendChild(editCell);

//         const deleteCell = document.createElement("td");
//         // Add delete button or any other action button if needed
//         // For example:
//         // const deleteButton = document.createElement("button");
//         // deleteButton.textContent = "Delete";
//         // deleteButton.onclick = () => deleteBanner(banner.id);
//         // deleteCell.appendChild(deleteButton);
//         row.appendChild(deleteCell);

//         tbody.appendChild(row);
//     });
// }

// // Call the function to populate the table
// setBanners();