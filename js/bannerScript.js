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
// // -----------------------------------------------------


var selecteBannerid;
var banner = []
displaybanner()
function displaybanner() {
    fetch("http://localhost:5001/banner/getAllBanners")
        .then(response => response.json())
        .then(data => {
            banner = data.data
            console.log(data);
            setBanner()
        })
        .catch(error => {
            console.error("the error is:", error);
        });
}
function setBanner() {
    const tbody = document.getElementById("data-body");
    banner.forEach(item => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = banner.indexOf(item) + 1;
        row.appendChild(idCell);

        const titleCell = document.createElement("td");
        titleCell.textContent = item.bannerTitle;;
        row.appendChild(titleCell);

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = item.description;
        row.appendChild(descriptionCell);

        const imageCell = document.createElement("td");
        const imageElement = document.createElement("img");
        imageElement.src = item.bannerImage;
        imageElement.alt = "Banner Image";
        imageElement.width = 150;
        imageElement.height = 150;
        imageCell.appendChild(imageElement)
        row.appendChild(imageCell);

        //EDIT BUTTON
        const buttonCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-success");
        editButton.textContent = "EDIT";
        editButton.addEventListener("click", function () {
            selecteBannerid = item._id
            document.querySelector(".modal-title").innerHTML = "Update banner"
            document.getElementById("bannername").value = item.bannerTitle
            document.getElementById("bannerdescription").value = item.description
            document.getElementById("clicktype").value = item.clickType
            document.getElementById("categoryDropdown").value = item.relatedItemId
            // document.getElementById("bannerimage").value = item.bannerImage
            console.log("BANNER UPDATE BUTTON clicked");
            $('#myModal').modal('show')
        });
        buttonCell.appendChild(editButton);
        row.appendChild(buttonCell);


        // DELETE BUTTON
        const buttCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.textContent = "DELETE";
        deleteButton.addEventListener("click", function () {
            Swal.fire({
                title: 'You Sure?',
                text: "This banner will be permanently deleted !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#1CC88A',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch("http://localhost:5001/banner/deleteBanner/" + item._id, {
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
// UPDATE BAnner FUNCTION
function updateBanner() {
    let formData = new FormData();
    formData.append('bannerTitle', document.getElementById("bannername").value);
    formData.append('description', document.getElementById("bannerdescription").value);
    formData.append('bannerimage', document.getElementById("bannerimage").value);
    formData.append('clickType', document.getElementById("clicktype").value);
    formData.append('relatedItemId', document.getElementById("clicktype").value);


    // const bannerIdDisplay = document.getElementById("bannerIdDisplay");
    // bannerIdDisplay.innerText = `Selected Banner ID: ${selecteBannerid}`

    // Get the image file from the input element
    let imageInput = document.getElementById("bannerimage");
    let imageFile = imageInput.files[0]; // Assuming the input is of type 'file'

    // Append the image file to FormData
    formData.append('file', imageFile);

    fetch("http://localhost:5001/banner/updateBanner/"+selecteBannerid, {
        method: 'PUT',
        body: formData // Set the FormData object as the body
    })
        .then(response => response.json())
        .then(data => {
            selecteBannerid = ""
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
    // let body = {
    //     bannerTitle: document.getElementById("bannername").value,
    //     description: document.getElementById("bannerdescription").value,
    //     bannerimage: document.getElementById("bannerimage").value,
    //     bannerClicktype: document.getElementById("clicktype").value,
    // }
    let formData = new FormData();
    formData.append('bannerTitle', document.getElementById("bannername").value);
    formData.append('description', document.getElementById("bannerdescription").value);
    formData.append('relatedItemId', document.getElementById("categoryDropdown").value);
    formData.append('clickType', document.getElementById("clicktype").value);

    console.log(formData);


    let imageInput = document.getElementById("bannerimage");
    let imageFile = imageInput.files[0];

    // Append the image file to FormData
    formData.append('file', imageFile);

    console.log(formData);

    // Send the request with FormData
    fetch("http://localhost:5001/banner/createbanner", {
        method: 'POST',
        body: formData
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
// -------------------------------------------------------------------------
// get all categories
var selectedProductid;
var products = []
var category_list = []


const clicktype = document.getElementById("clicktype");
const roleSelect = document.getElementById("categoryDropdown");
const clicklist = document.getElementById("clicklist");

clicktype.addEventListener("change", () => {
    const selectedValue = clicktype.value;
    roleSelect.innerHTML = " "
    roleSelect.style.display = "block"
    console.log(selectedValue);
    if (selectedValue === "category") {
        getCategory()
        clicklist.textContent = "Category"
    }
    else if (selectedValue === "product") {
        getProducts()
        clicklist.textContent = "Products"

    }

})



function getCategory() {

    fetch('http://localhost:5001/category/categoryAll')
        .then(response => response.json())
        .then(data => {
            category_list = data.data
            console.log(data);
            const roleSelect = document.getElementById("categoryDropdown");
            for (const i of category_list) {
                const option = document.createElement("option");
                option.value = i._id;
                option.textContent = i.categoryName;
                roleSelect.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

}
// ------------------------------------------------------

function getProducts() {

    fetch('http://localhost:5001/product/productsAll')
        .then(response => response.json())
        .then(data => {
            product_list = data.data
            console.log(data);
            const roleSelect = document.getElementById("categoryDropdown");
            for (const i of product_list) {
                const option = document.createElement("option");
                option.value = i._id;
                option.textContent = i.name;
                roleSelect.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

}


// --------------------SHOW SELECTED IMAGE-------------------------------
function addBannerImage() {
    let imageInput = document.getElementById("productimage");
    const input = document.getElementById('bannerimage');
    const selectedImage = document.getElementById('selectedImage');

    // Check if any file is selected
    if (input.files && input.files.length > 0) {
        // Assuming you only want to display the first selected image
        const file = input.files[0];

        // Create a FileReader to read the image
        const reader = new FileReader();

        // Set the callback for when the image is loaded
        reader.onload = function (e) {
            selectedImage.src = e.target.result;
        };

        // Read the image as a data URL
        reader.readAsDataURL(file);
    } else {
        // No file selected, clear the displayed image
        selectedImage.src = '';
    }
}
// -------------------CROPPER.JS---------------------------------------
let cropper;

  function handleImageUpload() {
    const input = document.getElementById('productimage');
    const selectedImage = document.getElementById('selectedImage');
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      selectedImage.src = e.target.result;


      cropper = new Cropper(selectedImage, {
        aspectRatio: 1, 
        viewMode: 2,
      });
    };
    reader.readAsDataURL(file);
  }

  function cropImage() {
    console.log("crop button clicked");
    // Get the cropped data
    const croppedCanvas = cropper.getCroppedCanvas();
    const croppedDataUrl = croppedCanvas.toDataURL('image/jpeg'); // Adjust the format as needed

    // Display the cropped image
    const croppedImage = document.createElement('img');
    croppedImage.src = croppedDataUrl;

    // Add the cropped image to the page or send it to the server as needed
    document.body.appendChild(croppedImage);
  }








































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