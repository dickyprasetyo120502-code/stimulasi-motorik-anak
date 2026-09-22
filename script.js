/* =========================================================
   STIMULAKIDS
   SCRIPT.JS
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener(
            "click",
            function () {

                mobileMenu.classList.toggle("show");


                const icon =
                    mobileMenuButton.querySelector("i");


                if (mobileMenu.classList.contains("show")) {

                    icon.classList.remove("fa-bars");

                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            }
        );


        /* Tutup menu setelah memilih menu */

        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove("show");


                    const icon =
                        mobileMenuButton.querySelector("i");


                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }
            );

        });

    }
/* =====================================================
   FAVORITE BUTTON NAVBAR
   MEMBUKA DAFTAR AKTIVITAS FAVORIT
====================================================== */

const favoriteButton = document.getElementById("favoriteButton");

if (favoriteButton) {

    favoriteButton.addEventListener("click", function () {

        const oldFavoriteModal =
            document.querySelector(".favorite-modal");

        if (oldFavoriteModal) {
            oldFavoriteModal.remove();
        }


        /* Ambil tombol favorit yang aktif */

        const favoriteButtons =
            document.querySelectorAll(
                ".favorite-activity.favorite-active"
            );


        /* Buat popup */

        const modal =
            document.createElement("div");

        modal.className = "favorite-modal";


        /* =================================================
           JIKA BELUM ADA FAVORIT
        ================================================== */

        if (favoriteButtons.length === 0) {

            modal.innerHTML = `

                <div class="favorite-overlay"></div>

                <div class="favorite-box">

                    <button
                        class="favorite-close"
                        type="button"
                        aria-label="Tutup favorit"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div class="favorite-title">

                        <div class="favorite-title-icon">
                            <i class="fa-solid fa-heart"></i>
                        </div>

                        <div>

                            <span>
                                Aktivitas Saya
                            </span>

                            <h3>
                                Aktivitas Favorit
                            </h3>

                        </div>

                    </div>

                    <div class="favorite-empty">

                        <i class="fa-regular fa-heart"></i>

                        <h4>
                            Belum ada aktivitas favorit
                        </h4>

                        <p>
                            Tekan ikon ❤️ pada aktivitas
                            yang ingin kamu simpan.
                        </p>

                    </div>

                </div>

            `;

        }


        /* =================================================
           JIKA SUDAH ADA FAVORIT
        ================================================== */

        else {

            let favoriteList = "";


            favoriteButtons.forEach(function (button) {

                const card =
                    button.closest(".activity-card");

                if (!card) {
                    return;
                }


                const title =
                    card.querySelector("h3")?.textContent.trim();

                const category =
                    card.querySelector("span")?.textContent.trim();

                const iconElement =
                    card.querySelector(".activity-icon");

                const icon =
                    iconElement
                        ? iconElement.innerHTML
                        : "❤️";


                favoriteList += `

                    <div
                        class="favorite-item"
                        data-title="${title || ""}"
                    >

                        <div class="favorite-item-icon">
                            ${icon}
                        </div>

                        <div class="favorite-item-content">

                            <span>
                                ${category || "Aktivitas"}
                            </span>

                            <h4>
                                ${title || "Aktivitas"}
                            </h4>

                        </div>

                        <i class="fa-solid fa-heart favorite-item-heart"></i>

                    </div>

                `;

            });


            modal.innerHTML = `

                <div class="favorite-overlay"></div>

                <div class="favorite-box">

                    <button
                        class="favorite-close"
                        type="button"
                        aria-label="Tutup favorit"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>


                    <div class="favorite-title">

                        <div class="favorite-title-icon">
                            <i class="fa-solid fa-heart"></i>
                        </div>

                        <div>

                            <span>
                                Aktivitas Saya
                            </span>

                            <h3>
                                Aktivitas Favorit
                            </h3>

                        </div>

                    </div>


                    <p class="favorite-count">
                        ${favoriteButtons.length}
                        aktivitas tersimpan
                    </p>


                    <div class="favorite-list">

                        ${favoriteList}

                    </div>

                </div>

            `;

        }


        /* =================================================
           TAMPILKAN POPUP
        ================================================== */

        document.body.appendChild(modal);

        document.body.style.overflow = "hidden";


        /* =================================================
           FUNGSI TUTUP
        ================================================== */

        const closeFavorite = function () {

            modal.remove();

            document.body.style.overflow = "";

        };


        /* =================================================
           KLIK AKTIVITAS FAVORIT
        ================================================== */

        const favoriteItems =
            modal.querySelectorAll(".favorite-item");


        favoriteItems.forEach(function (item) {

            item.addEventListener("click", function () {

                const title =
                    item.getAttribute("data-title");


                const activityCards =
                    document.querySelectorAll(".activity-card");


                activityCards.forEach(function (card) {

                    const cardTitle =
                        card.querySelector("h3")
                            ?.textContent
                            .trim();


                    if (cardTitle === title) {

                        closeFavorite();

                        card.click();

                    }

                });

            });

        });


        /* =================================================
           TOMBOL X
        ================================================== */

        modal
            .querySelector(".favorite-close")
            .addEventListener(
                "click",
                closeFavorite
            );


        /* =================================================
           KLIK BACKGROUND
        ================================================== */

        modal
            .querySelector(".favorite-overlay")
            .addEventListener(
                "click",
                closeFavorite
            );


        /* =================================================
           TUTUP DENGAN ESC
        ================================================== */

        const escapeHandler = function (event) {

            if (event.key === "Escape") {

                closeFavorite();

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );

            }

        };


        document.addEventListener(
            "keydown",
            escapeHandler
        );

    });

}
   /* =====================================================
   AGE CARD
====================================================== */

const ageCards = document.querySelectorAll(".age-card");


const ageData = {

    "0-6": {
        title: "Stimulasi Usia 0–6 Bulan",
        description:
            "Aktivitas sederhana untuk membantu bayi mengenal lingkungan, melatih gerakan tubuh, dan membangun interaksi dengan orang tua.",
        activities: [
            "Tummy time dengan pendampingan orang tua",
            "Mengajak bayi mengikuti benda dengan mata",
            "Mengajak bayi berbicara dan tersenyum",
            "Memberikan benda aman untuk diraih"
        ]
    },


    "6-12": {
        title: "Stimulasi Usia 6–12 Bulan",
        description:
            "Bantu bayi mengembangkan kemampuan bergerak, meraih benda, berkomunikasi, dan mengenali lingkungan sekitar.",
        activities: [
            "Bermain mengambil dan memasukkan benda",
            "Merangkak menuju mainan",
            "Bermain cilukba",
            "Mengajak bayi meniru suara sederhana"
        ]
    },


    "1-2": {
        title: "Stimulasi Usia 1–2 Tahun",
        description:
            "Aktivitas bermain yang membantu perkembangan motorik, bahasa, koordinasi, dan kemandirian anak.",
        activities: [
            "Berjalan dan mengambil benda",
            "Menyusun balok sederhana",
            "Menirukan suara dan kata",
            "Bermain memasukkan benda ke dalam wadah"
        ]
    },


    "2-3": {
        title: "Stimulasi Usia 2–3 Tahun",
        description:
            "Ajak anak aktif bergerak sambil mengembangkan kemampuan berpikir, berbicara, dan berinteraksi.",
        activities: [
            "Menendang dan melempar bola",
            "Menyusun puzzle sederhana",
            "Menggambar dengan krayon",
            "Mengajak anak menyebutkan nama benda"
        ]
    },


    "3-4": {
        title: "Stimulasi Usia 3–4 Tahun",
        description:
            "Aktivitas untuk membantu anak mengembangkan koordinasi, kreativitas, bahasa, dan kemampuan memecahkan masalah.",
        activities: [
            "Melompat dengan kedua kaki",
            "Menggambar dan mewarnai",
            "Bermain mencocokkan bentuk",
            "Bercerita bersama orang tua"
        ]
    },


    "4-5": {
        title: "Stimulasi Usia 4–5 Tahun",
        description:
            "Berikan kesempatan anak bergerak, bermain kreatif, berkomunikasi, dan belajar menyelesaikan tugas sederhana.",
        activities: [
            "Bermain lempar tangkap bola",
            "Menggunting dengan pengawasan",
            "Menggambar sesuai imajinasi",
            "Bermain permainan mencocokkan"
        ]
    },


    "5-6": {
        title: "Stimulasi Usia 5–6 Tahun",
        description:
            "Aktivitas yang membantu kesiapan anak menuju tahap sekolah melalui permainan yang melatih motorik, bahasa, dan kemampuan berpikir.",
        activities: [
            "Melompat dan menjaga keseimbangan",
            "Menggambar dan menulis sederhana",
            "Bermain berhitung sambil bermain",
            "Bercerita dan menjawab pertanyaan"
        ]
    }

};


/* =====================================================
   HASIL PILIHAN USIA
====================================================== */

let ageResult = document.getElementById("ageResult");


if (!ageResult) {

    ageResult = document.createElement("div");

    ageResult.id = "ageResult";

    ageResult.style.width = "min(1200px, 92%)";
    ageResult.style.margin = "35px auto 0";
    ageResult.style.padding = "30px";
    ageResult.style.borderRadius = "25px";
    ageResult.style.background = "#effaf5";
    ageResult.style.border = "1px solid #dceee7";
    ageResult.style.display = "none";

    const ageSection =
        document.querySelector(".age-section");

    if (ageSection) {
        ageSection.appendChild(ageResult);
    }

}


/* =====================================================
   KETIKA KARTU USIA DIKLIK
====================================================== */

ageCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const age =
            card.getAttribute("data-age");


        const data =
            ageData[age];


        if (!data) {
            return;
        }


        /* Hapus pilihan sebelumnya */

        ageCards.forEach(function (item) {

            item.classList.remove("selected");

        });


        /* Tandai kartu yang dipilih */

        card.classList.add("selected");


        /* =================================================
           BUAT DAFTAR AKTIVITAS
        ================================================== */

        const activityList =
            data.activities
                .map(function (activity) {

                    return `
                        <li>
                            <i class="fa-solid fa-check"></i>
                            <span>${activity}</span>
                        </li>
                    `;

                })
                .join("");


        /* =================================================
           TAMPILKAN HASIL
        ================================================== */

        ageResult.innerHTML = `

            <span style="
                color:#0d9b68;
                font-size:11px;
                font-weight:900;
                text-transform:uppercase;
                letter-spacing:.8px;
            ">
                Tahap Perkembangan
            </span>


            <h3 style="
                margin-top:8px;
                color:#173b32;
                font-size:24px;
            ">
                ${data.title}
            </h3>


            <p style="
                margin-top:10px;
                color:#789089;
                font-size:14px;
                line-height:1.7;
            ">
                ${data.description}
            </p>


            <ul style="
                margin-top:20px;
                padding:0;
                list-style:none;
                display:grid;
                grid-template-columns:repeat(2, 1fr);
                gap:10px;
            ">
                ${activityList}
            </ul>

        `;


        /* =================================================
           STYLE ITEM AKTIVITAS
        ================================================== */

        const listItems =
            ageResult.querySelectorAll("li");


        listItems.forEach(function (item) {

            item.style.padding = "12px 14px";
            item.style.borderRadius = "12px";
            item.style.background = "#ffffff";
            item.style.color = "#49665d";
            item.style.fontSize = "13px";

            item.style.display = "flex";
            item.style.alignItems = "center";

        });


        const icons =
            ageResult.querySelectorAll("li i");


        icons.forEach(function (icon) {

            icon.style.marginRight = "8px";
            icon.style.color = "#0d9b68";
            icon.style.flexShrink = "0";

        });


        /* =================================================
           TAMPILKAN HASIL
        ================================================== */

        ageResult.style.display = "block";


        /* =================================================
           SCROLL KE HASIL
        ================================================== */

        setTimeout(function () {

            ageResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    });

});

    /* =====================================================
       SEARCH
    ====================================================== */

    const searchInput =
        document.getElementById("searchInput");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const keyword =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const cards =
                    document.querySelectorAll(
                        ".content-card, .activity-card"
                    );


                cards.forEach(function (card) {

                    const text =
                        card.textContent
                            .toLowerCase();


                    if (
                        keyword === "" ||
                        text.includes(keyword)
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                });

            }
        );

    }



    /* =====================================================
       NAVBAR ACTIVE LINK
    ====================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.forEach(function (item) {

                    item.classList.remove("active");

                });


                link.classList.add("active");

            }
        );

    });



    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                if (
                    targetId === "#" ||
                    !targetId
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });



    /* =====================================================
       SCROLL ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const id =
                            entry.target.getAttribute(
                                "id"
                            );


                        navLinks.forEach(
                            function (link) {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) === "#" + id
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(function (section) {

        observer.observe(section);

    });



    /* =====================================================
   BUTTON MATERI
====================================================== */

const textButtons = document.querySelectorAll(".text-button");


const materialData = [
    {
        title: "Mengenal Perkembangan Motorik",
        category: "Motorik",
        icon: "fa-person-running",
        content: `
            <p>
                Perkembangan motorik adalah kemampuan anak
                dalam menggerakkan tubuh dan menggunakan
                bagian tubuhnya untuk melakukan berbagai aktivitas.
            </p>

            <h4>Motorik Kasar</h4>

            <p>
                Motorik kasar berkaitan dengan gerakan tubuh
                yang menggunakan otot besar, seperti duduk,
                merangkak, berjalan, berlari, melompat,
                dan menjaga keseimbangan.
            </p>

            <h4>Motorik Halus</h4>

            <p>
                Motorik halus berkaitan dengan gerakan kecil
                yang membutuhkan koordinasi tangan dan mata,
                seperti memegang benda, menyusun balok,
                menggambar, dan menggunakan alat tulis.
            </p>

            <div class="material-tip">
                <i class="fa-solid fa-lightbulb"></i>
                <div>
                    <strong>Tips untuk Orang Tua</strong>
                    <p>
                        Berikan kesempatan anak bermain dan
                        bergerak sesuai kemampuan serta usianya.
                        Dampingi anak selama aktivitas berlangsung.
                    </p>
                </div>
            </div>
        `
    },

    {
        title: "Aktivitas Stimulasi Anak",
        category: "Stimulasi",
        icon: "fa-puzzle-piece",
        content: `
            <p>
                Stimulasi dapat dilakukan melalui aktivitas
                bermain sederhana bersama anak setiap hari.
                Tidak harus menggunakan alat yang mahal.
            </p>

            <h4>Contoh Aktivitas</h4>

            <ul>
                <li>
                    <i class="fa-solid fa-check"></i>
                    Bermain bola untuk melatih koordinasi.
                </li>

                <li>
                    <i class="fa-solid fa-check"></i>
                    Menyusun balok untuk melatih motorik halus.
                </li>

                <li>
                    <i class="fa-solid fa-check"></i>
                    Membaca buku bersama untuk mengembangkan bahasa.
                </li>

                <li>
                    <i class="fa-solid fa-check"></i>
                    Bernyanyi dan bergerak mengikuti lagu.
                </li>

                <li>
                    <i class="fa-solid fa-check"></i>
                    Bermain mencocokkan warna dan bentuk.
                </li>
            </ul>

            <div class="material-tip">
                <i class="fa-solid fa-heart"></i>
                <div>
                    <strong>Yang Terpenting</strong>
                    <p>
                        Jadikan aktivitas sebagai permainan
                        yang menyenangkan. Berikan pujian
                        dan dukungan ketika anak mencoba.
                    </p>
                </div>
            </div>
        `
    },

    {
        title: "Peran Orang Tua",
        category: "Orang Tua",
        icon: "fa-people-roof",
        content: `
            <p>
                Orang tua memiliki peran penting dalam
                menciptakan lingkungan yang aman dan
                mendukung tumbuh kembang anak.
            </p>

            <h4>Yang Dapat Dilakukan Orang Tua</h4>

            <ul>
                <li>
                    <i class="fa-solid fa-check"></i>
                    Luangkan waktu bermain bersama anak.
                </li>

                <li>
                    <i class="fa-solid fa-check"></i>
                    Ajak anak berbicara dan berkomunikasi.
                </li>

                <li>
                    <i class="fa-solid fa-check"></i>
                    Berikan kesempatan anak mencoba sendiri.
                </li>

                <li>
                    <i class="fa-solid fa-check"></i>
                    Berikan pujian atas usaha anak.
                </li>

                <li>
                    <i class="fa-solid fa-check"></i>
                    Pastikan lingkungan bermain tetap aman.
                </li>
            </ul>

            <div class="material-tip">
                <i class="fa-solid fa-house"></i>
                <div>
                    <strong>Ingat</strong>
                    <p>
                        Stimulasi tidak harus dilakukan
                        dalam waktu lama. Interaksi sederhana
                        bersama anak setiap hari juga berarti.
                    </p>
                </div>
            </div>
        `
    }
];


textButtons.forEach(function (button, index) {

    button.addEventListener("click", function () {

        const material = materialData[index];

        if (!material) return;


        /* Hapus popup lama jika ada */

        const oldModal =
            document.querySelector(".material-modal");

        if (oldModal) {
            oldModal.remove();
        }


        /* Buat popup */

        const modal =
            document.createElement("div");

        modal.className = "material-modal";


        modal.innerHTML = `

            <div class="material-overlay"></div>

            <div class="material-box">

                <button
                    class="material-close"
                    aria-label="Tutup materi"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="material-header">

                    <div class="material-icon">
                        <i class="fa-solid ${material.icon}"></i>
                    </div>

                    <div>

                        <span>
                            ${material.category}
                        </span>

                        <h3>
                            ${material.title}
                        </h3>

                    </div>

                </div>

                <div class="material-content">

                    ${material.content}

                </div>

            </div>

        `;


        document.body.appendChild(modal);

        document.body.style.overflow = "hidden";


        /* Tutup popup */

        const closeModal = function () {

            modal.remove();

            document.body.style.overflow = "";

        };


        modal.querySelector(".material-close")
            .addEventListener("click", closeModal);


        modal.querySelector(".material-overlay")
            .addEventListener("click", closeModal);


        /* Tutup dengan tombol ESC */

        document.addEventListener(
            "keydown",
            function escapeHandler(event) {

                if (event.key === "Escape") {

                    closeModal();

                    document.removeEventListener(
                        "keydown",
                        escapeHandler
                    );

                }

            }
        );

    });

});

/* =====================================================
   ACTIVITY DETAIL + FAVORITE ACTIVITIES
====================================================== */

const activityCards =
    document.querySelectorAll(".activity-card");


const activityData = [

    {
        title: "Latihan Tengkurap",
        category: "Motorik Kasar",
        icon: "fa-person",

        description:
            "Latihan tengkurap dapat menjadi salah satu aktivitas sederhana untuk membantu bayi berlatih mengangkat kepala dan memperkuat otot tubuh.",

        steps: [
            "Letakkan bayi pada permukaan yang datar dan aman.",
            "Posisikan bayi dalam keadaan tengkurap.",
            "Ajak bayi melihat wajah atau mainan di depannya.",
            "Lakukan dalam waktu singkat dan tetap dampingi bayi."
        ],

        tip:
            "Selalu awasi bayi selama melakukan aktivitas dan hentikan jika bayi terlihat tidak nyaman."
    },


    {
        title: "Meraih Mainan",
        category: "Motorik Halus",
        icon: "fa-puzzle-piece",

        description:
            "Bermain meraih mainan membantu anak melatih koordinasi antara mata dan tangan sekaligus mengenal benda di sekitarnya.",

        steps: [
            "Gunakan mainan yang aman dan sesuai usia.",
            "Letakkan mainan dalam jangkauan anak.",
            "Ajak anak memperhatikan dan mencoba meraih mainan.",
            "Berikan pujian ketika anak berhasil mencoba."
        ],

        tip:
            "Gunakan benda yang berukuran cukup besar agar tidak mudah tertelan."
    },


    {
        title: "Belajar Berjalan",
        category: "Motorik Kasar",
        icon: "fa-person-walking",

        description:
            "Aktivitas berjalan membantu anak melatih keseimbangan, koordinasi tubuh, dan kepercayaan diri dalam bergerak.",

        steps: [
            "Pastikan area bermain aman dan bebas dari benda berbahaya.",
            "Ajak anak berdiri dengan dukungan yang aman.",
            "Berikan kesempatan anak melangkah menuju orang tua.",
            "Dampingi anak tanpa memaksanya."
        ],

        tip:
            "Biarkan anak berkembang sesuai kemampuannya dan berikan dukungan saat mencoba."
    },


    {
        title: "Bermain Bola",
        category: "Koordinasi",
        icon: "fa-futbol",

        description:
            "Bermain bola merupakan aktivitas menyenangkan untuk melatih koordinasi mata dan tangan serta kemampuan bergerak.",

        steps: [
            "Gunakan bola yang ringan dan sesuai ukuran anak.",
            "Ajak anak menggulirkan bola kepada orang tua.",
            "Coba lempar dan tangkap bola secara perlahan.",
            "Ajak anak menendang bola ke arah yang aman."
        ],

        tip:
            "Jadikan permainan menyenangkan dan jangan memaksa anak jika belum siap."
    }

];



/* =====================================================
   FAVORITE ACTIVITIES
====================================================== */

const favoriteActivityButtons =
    document.querySelectorAll(".favorite-activity");


favoriteActivityButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        /* Mencegah kartu aktivitas ikut terbuka */
        event.stopPropagation();


        const icon =
            button.querySelector("i");


        /* Ubah status favorit */
        button.classList.toggle("favorite-active");


        if (
    button.classList.contains("favorite-active")
) {

    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");


    /* Simpan favorit */
    const card =
        button.closest(".activity-card");

    const title =
        card?.querySelector("h3")?.textContent.trim();

    if (title) {

        const favorites =
            JSON.parse(
                localStorage.getItem(
                    "stimulakidsFavorites"
                ) || "[]"
            );

        if (!favorites.includes(title)) {

            favorites.push(title);

        }

        localStorage.setItem(
            "stimulakidsFavorites",
            JSON.stringify(favorites)
        );

    }


} else {

    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");


    /* Hapus dari favorit */
    const card =
        button.closest(".activity-card");

    const title =
        card?.querySelector("h3")?.textContent.trim();

    if (title) {

        let favorites =
            JSON.parse(
                localStorage.getItem(
                    "stimulakidsFavorites"
                ) || "[]"
            );

        favorites =
            favorites.filter(function (item) {

                return item !== title;

            });

        localStorage.setItem(
            "stimulakidsFavorites",
            JSON.stringify(favorites)
        );

    }

}

    });

});

/* =====================================================
   LOAD FAVORIT DARI LOCAL STORAGE
====================================================== */

const savedFavorites =
    JSON.parse(
        localStorage.getItem("stimulakidsFavorites") || "[]"
    );


favoriteActivityButtons.forEach(function (button) {

    const card =
        button.closest(".activity-card");

    if (!card) {
        return;
    }

    const title =
        card.querySelector("h3")?.textContent.trim();

    if (
        title &&
        savedFavorites.includes(title)
    ) {

        button.classList.add("favorite-active");

        const icon =
            button.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

        }

    }

});

/* =====================================================
   ACTIVITY DETAIL POPUP
====================================================== */

activityCards.forEach(function (card, index) {

    card.addEventListener("click", function () {

        const activity =
            activityData[index];


        if (!activity) {
            return;
        }


        /* Hapus popup lama */

        const oldModal =
            document.querySelector(
                ".activity-modal"
            );


        if (oldModal) {
            oldModal.remove();
        }



        /* Buat popup */

        const modal =
            document.createElement("div");


        modal.className =
            "activity-modal";



        /* =================================================
           BUAT DAFTAR LANGKAH
        ================================================== */

        const stepList =
            activity.steps
                .map(function (step) {

                    return `
                        <li>
                            <i class="fa-solid fa-check"></i>
                            <span>${step}</span>
                        </li>
                    `;

                })
                .join("");



        /* =================================================
           ISI POPUP
        ================================================== */

        modal.innerHTML = `

            <div class="activity-overlay"></div>


            <div class="activity-box">


                <button
                    class="activity-close"
                    aria-label="Tutup aktivitas"
                    type="button"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>



                <div class="activity-header">


                    <div class="activity-modal-icon">

                        <i
                            class="fa-solid ${activity.icon}"
                        ></i>

                    </div>



                    <div>

                        <span
                            class="activity-modal-category"
                        >
                            ${activity.category}
                        </span>


                        <h3>
                            ${activity.title}
                        </h3>

                    </div>


                </div>



                <div class="activity-modal-content">


                    <p class="activity-description">
                        ${activity.description}
                    </p>



                    <h4>
                        Cara Melakukan
                    </h4>



                    <ul class="activity-steps">

                        ${stepList}

                    </ul>



                    <div class="activity-tip">


                        <i
                            class="fa-solid fa-lightbulb"
                        ></i>


                        <div>

                            <strong>
                                Tips untuk Orang Tua
                            </strong>


                            <p>
                                ${activity.tip}
                            </p>

                        </div>


                    </div>


                </div>


            </div>

        `;



        document.body.appendChild(modal);


        document.body.style.overflow =
            "hidden";



        /* =================================================
           TUTUP POPUP
        ================================================== */

        const closeActivity =
            function () {

                modal.remove();

                document.body.style.overflow =
                    "";

            };



        /* Tombol X */

        modal
            .querySelector(".activity-close")
            .addEventListener(
                "click",
                closeActivity
            );



        /* Klik background */

        modal
            .querySelector(".activity-overlay")
            .addEventListener(
                "click",
                closeActivity
            );



        /* =================================================
           TUTUP DENGAN ESC
        ================================================== */

        const escapeHandler =
            function (event) {

                if (event.key === "Escape") {

                    closeActivity();

                    document.removeEventListener(
                        "keydown",
                        escapeHandler
                    );

                }

            };


        document.addEventListener(
            "keydown",
            escapeHandler
        );

    });

});




    /* =====================================================
       VIDEO BUTTON
    ====================================================== */

    const videoButtons =
        document.querySelectorAll(
            ".video-content .btn"
        );


    videoButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const videoSection =
                    document.getElementById(
                        "video"
                    );


                if (videoSection) {

                    videoSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });
/* =====================================================
   ULASAN ORANG TUA
===================================================== */

const reviewName = document.getElementById("reviewName");
const reviewText = document.getElementById("reviewText");
const reviewStars = document.getElementById("reviewStars");
const submitReview = document.getElementById("submitReview");
const reviewList = document.getElementById("reviewList");

let selectedRating = 0;


/* =====================================================
   PILIH RATING BINTANG
===================================================== */

if (reviewStars) {

    const stars =
        reviewStars.querySelectorAll("button");

    stars.forEach(function (star) {

        star.addEventListener("click", function () {

            selectedRating =
                Number(star.dataset.rating);

            stars.forEach(function (item) {

                const rating =
                    Number(item.dataset.rating);

                if (rating <= selectedRating) {

                    item.classList.add("active");

                } else {

                    item.classList.remove("active");

                }

            });

        });

    });

}


/* =====================================================
   TAMPILKAN ULASAN
===================================================== */

function renderReviews() {

    if (!reviewList) {
        return;
    }

    const reviews =
        JSON.parse(
            localStorage.getItem("stimulakidsReviews") || "[]"
        );

    reviewList.innerHTML = "";

    if (reviews.length === 0) {

        reviewList.innerHTML = `
            <div class="review-empty">
                <i class="fa-regular fa-comment"></i>

                <h3>
                    Belum ada ulasan
                </h3>

                <p>
                    Jadilah orang pertama yang memberikan ulasan.
                </p>
            </div>
        `;

        return;
    }


    reviews.forEach(function (review) {

        let stars = "";

        for (let i = 1; i <= 5; i++) {

            stars += `
                <span class="${i <= review.rating ? "active" : ""}">
                    ★
                </span>
            `;

        }


        const card =
            document.createElement("div");

        card.className = "review-card";

        card.innerHTML = `

            <div class="review-card-top">

                <div class="review-avatar">
                    ${review.name.charAt(0).toUpperCase()}
                </div>

                <div class="review-user">

                    <h3>
                        ${review.name}
                    </h3>

                    <div class="review-rating">
                        ${stars}
                    </div>

                </div>

            </div>

            <p class="review-message">
                ${review.text}
            </p>

        `;

        reviewList.appendChild(card);

    });

}


/* =====================================================
   KIRIM ULASAN
===================================================== */

if (submitReview) {

    submitReview.addEventListener("click", function () {

        const name =
            reviewName.value.trim();

        const text =
            reviewText.value.trim();


        if (!name) {

            alert("Silakan masukkan nama terlebih dahulu.");

            reviewName.focus();

            return;
        }


        if (selectedRating === 0) {

            alert("Silakan pilih rating bintang.");

            return;
        }


        if (!text) {

            alert("Silakan tulis ulasan terlebih dahulu.");

            reviewText.focus();

            return;
        }


        const reviews =
            JSON.parse(
                localStorage.getItem("stimulakidsReviews") || "[]"
            );


        reviews.unshift({

            name: name,

            rating: selectedRating,

            text: text,

            date: new Date().toLocaleDateString("id-ID")

        });


        localStorage.setItem(
            "stimulakidsReviews",
            JSON.stringify(reviews)
        );


        /* Reset form */

        reviewName.value = "";
        reviewText.value = "";

        selectedRating = 0;


        const stars =
            reviewStars.querySelectorAll("button");

        stars.forEach(function (star) {

            star.classList.remove("active");

        });


        renderReviews();


        alert("Terima kasih! Ulasan kamu berhasil dikirim.");

    });

}


/* =====================================================
   LOAD ULASAN
===================================================== */

renderReviews();

});