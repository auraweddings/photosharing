const cloudName = "dqqbcesbi";
const unsignedUploadPreset = "wedding2026";

// Initialize Upload Widget with Safety
let myWidget;

function initWidget() {
    if (typeof cloudinary === 'undefined') {
        console.log('Cloudinary library not loaded yet. Retrying...');
        setTimeout(initWidget, 500);
        return;
    }

    myWidget = cloudinary.createUploadWidget({
        cloudName: cloudName,
        uploadPreset: unsignedUploadPreset,
        sources: ['local', 'camera'],
        resourceType: 'image',
        clientAllowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
        multiple: true,
        maxFiles: 20,
        defaultSource: 'local',
        showAdvancedOptions: false,
        cropping: false,
        showSkipCropButton: true,
        singleUploadAutoClose: false,
        showCompletedButton: true,
        styles: {
            palette: {
                window: "#f5f1e8",
                windowBorder: "#a37e2c",
                tabIcon: "#a37e2c",
                menuIcons: "#a37e2c",
                textDark: "#9d7e3a",
                textLight: "#666666",
                link: "#a37e2c",
                action: "#a37e2c",
                inactiveTabIcon: "#c9a961",
                error: "#f44235",
                inProgress: "#a37e2c",
                complete: "#20b832",
                sourceBg: "#ede6d9"
            },
            fonts: {
                default: null,
                "'Dancing Script', cursive": "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
            }
        },
        text: {
            en: {
                queue: {
                    "title": "Wedding Gallery",
                    "title_uploading_with_counter": "Sharing {{count}} photos..."
                },
                menu: {
                    "files": "From Phone",
                    "camera": "Take Live Photo"
                },
                local: {
                    "browse": "Pick Wedding Photos",
                    "dd_title_single": "Share a Moment with Us"
                }
            }
        }
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Photo Shared!');
        }
    });
}

initWidget();

document.getElementById("upload_widget").onclick = () => {
    if (myWidget) {
        myWidget.open();
    } else {
        console.error("Widget not initialized yet.");
    }
};

// Countdown Timer Logic
function updateCountdown() {
    const weddingDate = new Date('March 29, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    } else {
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.innerHTML = '<p style="font-size: 2rem; color: #a37e2c; font-family: \'Playfair Display\', serif;">🎉 It\'s Our Wedding Day! 🎉</p>';
        }
    }
}

// Initial call and interval
updateCountdown();
setInterval(updateCountdown, 1000);

// Simple Intersection Observer for scroll reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
