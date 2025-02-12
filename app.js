document.addEventListener("DOMContentLoaded", function () {
    const dataUrl = "https://raw.githubusercontent.com/Herdi88/HospitalTrackerData/main/hospital_data.json";
    let lastUpdatedTime = "";

    async function fetchData() {
        try {
            const response = await fetch(dataUrl);
            const data = await response.json();

            document.getElementById("today_appointments").textContent = data.today_appointments;
            document.getElementById("tomorrow_appointments").textContent = data.tomorrow_appointments;
            document.getElementById("handled_calls").textContent = data.handled_calls;
            document.getElementById("emergency_patients").textContent = data.emergency_patients;
            document.getElementById("admitted_patients").textContent = data.admitted_patients;
            document.getElementById("total_surgeries").textContent = data.total_todays_surgeries;
            document.getElementById("last_updated").textContent = `🗓 ${data.last_updated}`;

            // Populate Surgery List
            const surgeryList = document.getElementById("surgery_list");
            surgeryList.innerHTML = "";
            data.todays_surgeries.forEach(surgery => {
                const li = document.createElement("li");
                li.textContent = `${surgery.name}: ${surgery.doctor}`;
                surgeryList.appendChild(li);
            });

            // Populate Top Weekly Surgeries
            const topSurgeriesDiv = document.getElementById("top_weekly_surgeries");
            topSurgeriesDiv.innerHTML = "";
            data.top_weekly_surgeries.forEach(surgery => {
                const div = document.createElement("div");
                div.innerHTML = `🔸 ${surgery.surgery}: ${surgery.count} عمليات`;
                div.classList.add("highlight");
                topSurgeriesDiv.appendChild(div);
            });

            // Populate Top Doctors by Appointments
            document.getElementById("top_doctors_appointments").textContent = `👨‍⚕️ ${data.top_doctor_appointments}`;

            // Populate Top Surgeons by Surgeries
            document.getElementById("top_surgeons").textContent = `🔪 ${data.best_surgeon}`;

            lastUpdatedTime = data.last_updated;
        } catch (error) {
            console.error("Error fetching data:", error);
            document.getElementById("last_updated").textContent = "❌ خطأ في تحميل البيانات";
        }
    }

    // Button to Refresh Data
    document.getElementById("refresh_data").addEventListener("click", fetchData);

    // Toggle Surgery List Visibility
    document.getElementById("toggleSurgeryList").addEventListener("click", function () {
        const list = document.getElementById("surgery_list");
        if (list.classList.contains("hidden")) {
            list.classList.remove("hidden");
            this.textContent = "🔼 إخفاء قائمة العمليات الجراحية";
        } else {
            list.classList.add("hidden");
            this.textContent = "🔽 عرض قائمة العمليات الجراحية";
        }
    });

    // Auto-refresh when `hospital_data.json` is updated
    function checkForUpdates() {
        setInterval(async () => {
            try {
                const response = await fetch(dataUrl);
                const data = await response.json();
                if (data.last_updated !== lastUpdatedTime) {
                    console.log("🔄 تحديث جديد متاح! يتم إعادة تحميل الصفحة...");
                    location.reload();
                }
            } catch (error) {
                console.error("خطأ في فحص التحديثات:", error);
            }
        }, 30000); // Check every 30 seconds
    }

    // Force-refresh when HTML, CSS, or JS is updated
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(reg => {
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log("🔄 تحديث متاح للتطبيق! يتم إعادة تحميل الصفحة...");
                        location.reload();
                    }
                });
            });
        });
    }

    // Load Data on Page Load
    fetchData();
    checkForUpdates(); // Start checking for updates automatically
});
