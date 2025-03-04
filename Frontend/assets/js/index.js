document.addEventListener("DOMContentLoaded", () => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin") || "null");
    const userLoginElement = document.getElementById("userLogin");
    const logRegElement = document.getElementById("log-reg-js");
    const userProfileElement = document.getElementById("user-profile");
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const profileDropdown = document.getElementById("profile-dropdown");
    const profileInfoBtn = document.getElementById("profile-info");
    const profileLogoutBtn = document.getElementById("profile-logout");

    const currentPath = window.location.pathname;
    const isPages = currentPath.includes("/pages/");
    const basePath = isPages ? "../" : "./";

    if (userLogin && userLogin.nickname) {
        userLoginElement.innerHTML = userLogin.nickname;
        userLoginElement.style.display = "block";
        userProfileElement.style.display = "flex";
        logRegElement.style.display = "none";
        menuBtn.style.display = "none";
        mobileMenu.style.display = "none";
        mobileMenu.innerHTML = `
            <ul class="nav-list-mobile">
                <li class="nav-item"><a class="nav-link" href="${basePath}index.html">Trang chủ</a></li>
                <li class="nav-item"><a class="nav-link" href="${basePath}pages/info.html">Thông tin</a></li>
                <li class="nav-item"><a class="nav-link" href="${basePath}pages/member-card.html">Thành viên</a></li>
                <li class="nav-item"><a class="nav-link" href="${basePath}pages/add.html">thêm <i class='bx bxs-chevron-down'></i></a></li>
            </ul>`;
    } else {
        userProfileElement.style.display = "none";
        userLoginElement.style.display = "none";
        userLoginElement.innerHTML = "Vô danh";
        logRegElement.style.display = "flex";
        menuBtn.style.display = "block";
        mobileMenu.innerHTML = `
            <ul class="nav-list-mobile">
                <li class="nav-item"><a class="nav-link" href="${basePath}index.html">Trang chủ</a></li>
                <li class="nav-item"><a class="nav-link" href="${basePath}pages/info.html">Thông tin</a></li>
                <li class="nav-item"><a class="nav-link" href="${basePath}pages/member-card.html">Thành viên</a></li>
                <li class="nav-item"><a class="nav-link" href="${basePath}pages/add.html">thêm <i class='bx bxs-chevron-down'></i></a></li>
            </ul>
            <a href="${basePath}pages/login.html">Đăng nhập</a>
            <a href="${basePath}pages/register.html">Đăng ký</a>`;
    }


    const isVisible = (element) => window.getComputedStyle(element).display !== "none";

   
    menuBtn?.addEventListener("click", () => {
        const isMenuVisible = isVisible(mobileMenu);
        mobileMenu.style.display = isMenuVisible ? "none" : "block";
        if (isMenuVisible || profileDropdown) {
            profileDropdown.style.display = "none"; 
        }
    });

   
    userProfileElement?.addEventListener("click", () => {
        const isDropdownVisible = isVisible(profileDropdown);
        profileDropdown.style.display = isDropdownVisible ? "none" : "block";
        if (isDropdownVisible || mobileMenu) {
            mobileMenu.style.display = "none"; 
        }
    });

   
    profileInfoBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Xem thông tin người dùng: " + (userLogin?.nickname || "Không có nickname"));
    });

  
    profileLogoutBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("userLogin");
        window.location.href = `${basePath}index.html`;
    });
});
/* Video section */
document.getElementById('play-video').addEventListener('click', function(e) {
    e.preventDefault(); 

    const thumbnail = document.querySelector('.video-holder .thumbnail');
    const video = document.querySelector('.video-holder .video-player');

    thumbnail.style.display = 'none';
    video.style.display = 'block';

    video.play();


    video.addEventListener('ended', function() {
        thumbnail.style.display = 'block';
        video.style.display = 'none';
    });
});


/* Audio section */
document.querySelector('.music-btn').addEventListener('click', function(e) {
    e.preventDefault(); 
    const audio = document.getElementById('background-music');
    const musicBtn = this;

    if (audio.paused) {
        audio.play();
        musicBtn.classList.add('playing'); 
    } else {
        audio.pause();
        musicBtn.classList.remove('playing'); 
    }
});