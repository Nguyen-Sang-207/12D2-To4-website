const formRegister = document.getElementById("formRegister");
const nickNameElement = document.getElementById("nickName");
const userNameElement = document.getElementById("userName");
const passwordElement = document.getElementById("password");
const repasswordElement = document.getElementById("repassword");

const nickNameError = document.getElementById("nickNameError");
const userNameError = document.getElementById("userNameError");
const passwordError = document.getElementById("passwordError");
const repasswordError = document.getElementById("repasswordError");

const modalElement = document.querySelector(".js-modal");
const modalClose = document.getElementById("close-btn");

function validateUserName(userName) {
    const res = /^[a-z0-9._]+$/.test(userName);
    return res;
}

formRegister.addEventListener("submit", async function (e) {
    e.preventDefault();

    let isValid = true;

    userNameError.style.display = "none";
    nickNameError.style.display = "none";
    passwordError.style.display = "none";
    repasswordError.style.display = "none";

    if (!userNameElement.value) {
        userNameError.style.display = "block";
        userNameError.innerHTML = "Tên đăng nhập không được để trống";
        isValid = false;
    } else if (!validateUserName(userNameElement.value)) {
        userNameError.style.display = "block";
        userNameError.innerHTML = "Tên đăng nhập không đúng định dạng";
        isValid = false;
    }

    if (!nickNameElement.value) {
        nickNameError.style.display = "block";
        nickNameError.innerHTML = "Nickname không được để trống";
        isValid = false;
    }

    if (!passwordElement.value) {
        passwordError.style.display = "block";
        passwordError.innerHTML = "Mật khẩu không được để trống";
        isValid = false;
    }

    if (!repasswordElement.value) {
        repasswordError.style.display = "block";
        repasswordError.innerHTML = "Xác nhận mật khẩu không được để trống";
        isValid = false;
    } else if (passwordElement.value !== repasswordElement.value) {
        repasswordError.style.display = "block";
        repasswordError.innerHTML = "Mật khẩu xác nhận không khớp";
        isValid = false;
    }

    if (!isValid) {
        modalElement.style.display = "flex";
        return;
    }

    
    const user = {
        username: userNameElement.value,
        nickname: nickNameElement.value, 
        password: passwordElement.value,
    };

    try {
        const response = await fetch('https://12d2-to4-website-backend.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Đăng ký thành công!');
            setTimeout(function () {
                window.location.href = "../pages/login.html";
            }, 1000);
        } else {
            
            if (data.message === 'Tên đăng nhập đã tồn tại') {
                userNameError.style.display = "block";
                userNameError.innerHTML = "Tên đăng nhập đã tồn tại";
            } else {
                userNameError.style.display = "block";
                userNameError.innerHTML = data.message || "Lỗi không xác định";
            }
            modalElement.style.display = "flex";
        }
    } catch (error) {
        userNameError.style.display = "block";
        userNameError.innerHTML = "Có lỗi xảy ra, vui lòng thử lại!";
        modalElement.style.display = "flex";
        console.error('Lỗi:', error);
    }
});

modalClose.addEventListener("click", function () {
    modalElement.style.display = "none";
});
