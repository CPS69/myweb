// ==========================
// NightSky Archive V5
// script.js
// ==========================

// ---------- SEARCH ----------
const searchBox = document.getElementById("searchBox");
const cards = document.querySelectorAll(".photo-card");

if (searchBox) {
    searchBox.addEventListener("keyup", () => {
        const text = searchBox.value.toLowerCase();

        cards.forEach(card => {
            const info = card.innerText.toLowerCase();

            card.style.display = info.includes(text) ? "block" : "none";
        });
    });
}

// ---------- MORE PHOTOS ----------
const moreBtn = document.getElementById("moreBtn");
const hiddenPhotos = document.querySelectorAll(".hidden");

let showMore = false;

if (moreBtn) {
    moreBtn.addEventListener("click", () => {
        showMore = !showMore;

        hiddenPhotos.forEach(photo => {
            photo.style.display = showMore ? "block" : "none";
        });

        moreBtn.textContent =
            showMore ? "Show Less" : "More Photos";
    });
}

// ---------- LIKE ----------
document.querySelectorAll(".likeBtn").forEach((btn, index) => {

    let count =
        Number(localStorage.getItem("like" + index)) || 0;

    const span = btn.querySelector("span");
    span.textContent = count;

    btn.onclick = () => {
        count++;
        span.textContent = count;
        localStorage.setItem("like" + index, count);
    };
});

// ---------- FAVORITE ----------
document.querySelectorAll(".favoriteBtn").forEach((btn, index) => {

    let saved =
        localStorage.getItem("fav" + index) === "true";

    if (saved) btn.textContent = "⭐ Saved";

    btn.onclick = () => {

        saved = !saved;

        localStorage.setItem("fav" + index, saved);

        btn.textContent =
            saved ? "⭐ Saved" : "⭐ Favorite";
    };
});

// ---------- LIGHTBOX ----------
const images =
    document.querySelectorAll(".photo-card img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const lightSave =
    document.getElementById("lightSave");

let current = 0;

function updateLightbox() {

    lightboxImage.src = images[current].src;

    lightSave.href = images[current].src;
}

images.forEach((img, index) => {

    img.onclick = () => {

        current = index;

        updateLightbox();

        lightbox.style.display = "flex";
    };

});

if (closeLightbox) {
    closeLightbox.onclick = () => {
        lightbox.style.display = "none";
    };
}

if (nextBtn) {
    nextBtn.onclick = () => {

        current++;

        if (current >= images.length)
            current = 0;

        updateLightbox();
    };
}

if (prevBtn) {
    prevBtn.onclick = () => {

        current--;

        if (current < 0)
            current = images.length - 1;

        updateLightbox();
    };
}

if (lightbox) {
    lightbox.onclick = (e) => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";
        }
    };
}

// ---------- SHARE ----------
document.querySelectorAll(".shareBtn").forEach((btn, index) => {

    btn.onclick = () => {

        const url = images[index].src;

        if (navigator.share) {

            navigator.share({
                title: "NightSky Archive",
                url: url
            });

        } else {

            navigator.clipboard.writeText(url);

            alert("Link copied!");
        }

    };

});

// ---------- BACK TO TOP ----------
const topBtn =
    document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";
    }

});

if (topBtn) {

    topBtn.onclick = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

}
// ---------- FLOATING STARS ----------
for (let i = 0; i < 120; i++) {

    const star =
        document.createElement("div");

    star.className = "star";

    star.style.left =
        Math.random() * 100 + "vw";

    star.style.animationDuration =
        (5 + Math.random() * 10) + "s";

    star.style.animationDelay =
        Math.random() * 5 + "s";

    document.body.appendChild(star);

}