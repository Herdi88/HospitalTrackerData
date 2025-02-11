document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://raw.githubusercontent.com/Herdi88/HospitalTrackerData/main/hospital_data.json";

    function fetchData() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                updateDashboard(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                document.getElementById("update-time").innerText = "⚠️ خطأ في تحميل البيانات";
            });
    }

    function updateDashboard(data) {
        document.getElementById("today-appointments").innerText = data.today_appointments;
        document.getElementById("tomorrow-appointments").innerText = data.tomorrow_appointments;
        document.getElementById("handled-calls").innerText = data.handled_calls;
        document.getElementById("emergency-patients").innerText = data.emergency_patients;
        document.getElementById("admitted-patients").innerText = data.admitted_patients;

        document.getElementById("best-doctor").innerText = data.best_doctor || "غير متوفر";
        document.getElementById("best-surgeon").innerText = data.best_surgeon || "غير متوفر";
        
        document.getElementById("top-doctor-appointments").innerText = data.top_doctor_appointments || "غير متوفر";

        // Top Surgeries This Week
        const topSurgeriesList = document.getElementById("top-weekly-surgeries");
        topSurgeriesList.innerHTML = "";
        if (data.top_weekly_surgeries && data.top_weekly_surgeries.length > 0) {
            data.top_weekly_surgeries.forEach(surgery => {
                let listItem = document.createElement("li");
                listItem.innerText = `${surgery.surgery}: ${surgery.count} عمليات`;
                topSurgeriesList.appendChild(listItem);
            });
        } else {
            topSurgeriesList.innerHTML = "<li>غير متوفر</li>";
        }

        // Surgery Section
        document.getElementById("total-todays-surgeries").innerText = data.total_todays_surgeries;

        const surgeryList = document.getElementById("todays-surgeries");
        surgeryList.innerHTML = "";

        if (data.todays_surgeries && data.todays_surgeries.length > 0) {
            data.todays_surgeries.forEach(surgery => {
                let surgeryItem = document.createElement("li");
                surgeryItem.innerText = `🔹 ${surgery.name} - 👨‍⚕️ ${surgery.doctor}`;
                surgeryList.appendChild(surgeryItem);
            });
        } else {
            surgeryList.innerHTML = "<li>لا توجد عمليات اليوم</li>";
        }

        // Update Timestamp
        document.getElementById("update-time").innerText = `🗓️ آخر تحديث: ${data.last_updated}`;
    }

    document.getElementById("update-button").addEventListener("click", function () {
        fetchData();
    });

    fetchData();
});
