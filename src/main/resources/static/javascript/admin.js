const adminurl = '/userss';

async function getAdminPage() {
    let page = await fetch(adminurl);

    if(page.ok) {
        let listAllUser = await page.json();
        loadTableData(listAllUser);
    } else {
        alert('Error, ' + page.status); // Исправлено
    }
}



// Добавляем обработчик событий для всех кнопок удаления
document.querySelectorAll('.btn-danger').forEach(button => {
    button.addEventListener('click', () => {
        const userId = button.getAttribute('data-user-id');
        deleteUser(userId);
    });
});

function loadTableData(listAllUser) {
    const tableBody = document.getElementById('admintbody');
    if (!tableBody) return; // Проверка на существование элемента
    let dataHtml = '';
    for (let user of listAllUser) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(" " + role.name.toString().replaceAll("ROLE_", ""));
        }
        dataHtml +=
            `<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.lastName}</td>
    <td>${user.age}</td>
    <td>${user.userName}</td>
    <td>${roles.join(', ')}</td> 
    <td>
        <button type="button" class="btn btn-info" 
        data-toggle="modal" 
        data-target="#editModal"
        onclick="loadDataForEditModal(${user.id})">Edit</button>
    </td>
    <td>
        <button type="button" class="btn btn-danger" 
        data-toggle="modal" 
        data-target="#deleteModal" 
        onclick="deleteModalData(${user.id})">Delete</button>
    </td>
</tr>`;
    }
    tableBody.innerHTML = dataHtml;
}


// Предполагается, что функции getAdminPage и getUserPage определены в другом месте кода.
getAdminPage();
getUserPage(); // Закомментировано для предотвращения ошибки, если функция не определена