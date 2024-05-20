const editUserForm = document.getElementById('editUserForm');
const editID = document.getElementById('editID');
const editName = document.getElementById('editName');
const editLastName = document.getElementById('editLastName');
const editAge = document.getElementById('editAge');
const editEmail = document.getElementById('editEmail');
const editModal = document.getElementById("editModal");
const closeEditButton = document.getElementById("editClose")
const bsEditModal = new bootstrap.Modal(editModal);
const roleUpdate = document.querySelector('#editRoles').selectedOptions;

async function loadDataForEditModal(id) {
    const  urlDataEd = 'userss/' + id;
    let usersPageEd = await fetch(urlDataEd);
    if (usersPageEd.ok) {
        // let userData =
            await usersPageEd.json().then(user => {
                console.log('userData', JSON.stringify(user))
                editID.value = `${user.id}`;
                editName.value = `${user.name}`;
                editLastName.value = `${user.lastName}`;
                editAge.value = `${user.age}`;
                editEmail.value = `${user.userName}`;
            })
        console.log("id_ed: " + editID.value + " !!")
        bsEditModal.show();
    } else {
        alert(`Error, ${usersPageEd.status}`)
    }
}
async function editUser() {
    const urlEdit = 'userss/addUser';
    let listOfRole = [];
    for (let i = 0; i < roleUpdate.length; i++) {
        listOfRole.push({
            id:roleUpdate[i].value
        });
    }
    let method = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: editUserForm.editID.value,
            name: editUserForm.editName.value,
            lastName: editUserForm.editLastName.value,
            age: editUserForm.editAge.value,
            userName: editUserForm.editEmail.value,
            password: editUserForm.editPassword.value,
            roles: listOfRole
        })
    }
    console.log(urlEdit,method)
    await fetch(urlEdit,method).then(() => {
        closeEditButton.click();
        getAdminPage();
    })
}
