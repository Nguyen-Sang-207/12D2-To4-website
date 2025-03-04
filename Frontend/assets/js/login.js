const formLogin = document.getElementById("formLogin");
const userNameElement = document.getElementById("userName");
const passwordElement = document.getElementById("password");
const alertError = document.getElementById("alertError");

formLogin.addEventListener("submit", async function (e) {
    e.preventDefault();

    alertError.style.display = "none";

    const userData = {
        username: userNameElement.value,
        password: passwordElement.value,
    };

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userLogin", JSON.stringify({
                username: data.user.username, 
                nickname: data.user.nickname  
            }));
            alert("Đăng nhập thành công!");
            window.location.href = "../index.html";
        } else {
            alertError.style.display = "block";
            alertError.innerHTML = data.message || "Tên đăng nhập hoặc mật khẩu không chính xác!";
        }
    } catch (error) {
        alertError.style.display = "block";
        alertError.innerHTML = "Có lỗi xảy ra, vui lòng thử lại!";
        console.error("Lỗi:", error);
    }
});