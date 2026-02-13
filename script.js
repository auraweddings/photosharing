const cloudName = "dqqbcesbi";
const unsignedUploadPreset = "wedding2026";

// Initialize Upload Widget
// Full configuration for the widget to ensure stability
let myWidget;

function initWidget() {
    if (typeof cloudinary === 'undefined') {
        console.error('Cloudinary library not loaded yet. Retrying...');
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
                windowBorder: "#d4af37",
                tabIcon: "#d4af37",
                menuIcons: "#d4af37",
                textDark: "#9d7e3a",
                textLight: "#666666",
                link: "#d4af37",
                action: "#d4af37",
                inactiveTabIcon: "#c9a961",
                error: "#f44235",
                inProgress: "#d4af37",
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
        alert("Upload widget is still loading. Please try again in a moment.");
    }
};

// Save the Date Functionality
document.getElementById("save-the-date").onclick = () => {
    const event = {
        title: "Paul & Fakiha's Wedding",
        start: "20260329T130000Z",
        end: "20260329T230000Z",
        description: "Join us for our special day!",
        location: "To be announced"
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-save-the-date.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
