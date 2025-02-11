document.addEventListener("DOMContentLoaded", function () {
    const dataUrl = "https://raw.githubusercontent.com/Herdi88/HospitalTrackerData/main/hospital_data.json";

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
            document.getElementById("last_updated").textContent = data.last_updated;

            // Populate Surgery List (Fixed Issue)
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

        } catch (error) {
            console.error("Error fetching data:", error);
            document.getElementById("last_updated").textContent = "❌ خطأ في تحميل البيانات";
        }
    }

    // Button to Refresh Data
    document.getElementById("refresh_data").addEventListener("click", fetchData);

    // Toggle Surgery List Visibility (Fixed Issue)
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

    // Load Data on Page Load
    fetchData();
});
