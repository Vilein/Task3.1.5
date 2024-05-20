const deleteID = document.getElementById('deleteID');
const deleteName = document.getElementById('deleteName');
const deleteLastName = document.getElementById('deleteLastName');
const deleteAge = document.getElementById('deleteAge');
const deleteEmail = document.getElementById('deleteEmail');
const deleteRoles = document.getElementById('deleteRoles');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteButton = document.getElementById('closeDelete');
const bsDeleteModal = new bootstrap.Modal(deleteModal);

// Функция для отображения информации пользователя в модальном окне перед удалением
async function deleteModalData(id) {
    try {
        const response = await fetch('userss/' + id);
        if (!response.ok) {
            throw new Error('Error:', response.status);
        }
        const user = await response.json();

        deleteID.value = user.id;
        deleteName.value = user.name;
        deleteLastName.value = user.lastName;
        deleteAge.value = user.age;
        deleteEmail.value = user.userName;
        deleteRoles.value = user.roles.map(r => r.name).join(', ');

        bsDeleteModal.show();
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Функция для отправки запроса на удаление пользователя
async function deleteUser() {
    try {
        const response = await fetch('userss/' + deleteID.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error:', response.status);
        }
        closeDeleteButton.click();
        getAdminPage(); // Функция для обновления списка пользователей после удаления
    } catch (error) {
        console.error('Error:', error);
    }
}
