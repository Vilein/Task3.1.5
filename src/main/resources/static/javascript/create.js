const form_new = document.getElementById('formForNewUser');
const role_new = document.querySelector('#roles').selectedOptions;

form_new.addEventListener('submit', addUser);

async function addUser(event) {
    event.preventDefault();
    const urlNew = 'userss/addUser';
    let listOfRole = [];
    for (let i = 0; i < role_new.length; i++) {
        listOfRole.push({
            id:role_new[i].value
        });
    }
    let method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: form_new.firstname.value,
            lastName: form_new.lastname.value,
            age: form_new.age.value,
            userName: form_new.email.value,
            password: form_new.password.value,
            roles: listOfRole
        })
    }
    console.log(urlNew, method);
    await fetch(urlNew, method).then(() => {
        form_new.reset();
        getAdminPage();
        // Переключение на вкладку "All Users" после обновления страницы
        $('#adminPanel a[href="#allUsers"]').tab('show');
    });

}





