import { btn_loader } from "/js/client/config.js";
import RequestClient from "/js/client/RequestClient.js";
import UsersService from "/js/client/UsersService.js";

const requestClient = new RequestClient();
const usersService = new UsersService(requestClient);

window.getUsers = async function (role = null) {
    try {
        let data = {};
        if (role) data.role = role;
        const usersTable = await usersService.fetch(data);
        $("#usersContainer").html(usersTable);
        new DataTable('#usersTable');
    } catch (error) {
        console.error("Error loading user data:", error);
    }
};
window.saveProvider = async function (btn) {
    btn = $(btn);
    btn_loader(btn, true);

    let formData = new FormData();

    // Provider Details
    formData.append("middle_name", $("#middle_name").val());
    formData.append("first_name", $("#first_name").val());
    formData.append("last_name", $("#last_name").val());
    formData.append("country", $("#country").val());
    formData.append("email", $("#email").val());
    formData.append("phone", $("#phone").val());
    formData.append("phone", $("#phone").val());
    formData.append("code", $("#code").val());
    
    try {
        await usersService.save(formData);
    } finally {
        btn_loader(btn, false);
    }
};
window.deleteUser = async function (btn) {
    btn = $(btn);
    btn_loader(btn, true);

    const user = btn.data("username");
    const data = { user: user };

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#068f6d",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await usersService.delete(data);
                getUsers();
            } finally {
                btn_loader(btn, false);
            }
        } else {
            btn_loader(btn, false);
        }
    });
};
