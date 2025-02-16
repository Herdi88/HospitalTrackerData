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

            // Populate Top Doctors by Appointments
            const topDoctorsList = document.getElementById("top_doctors_list");
            topDoctorsList.innerHTML = "";
            data.top_doctors_weekly.forEach(doctor => {
                const li = document.createElement("li");
                li.textContent = `${doctor.name}: ${doctor.count} مواعيد`;
                topDoctorsList.appendChild(li);
            });

            // Populate Top Surgeons by Surgeries
            const topSurgeonsList = document.getElementById("top_surgeons_list");
            topSurgeonsList.innerHTML = "";
            data.top_surgeons_weekly.forEach(surgeon => {
                const li = document.createElement("li");
                li.textContent = `${surgeon.name}: ${surgeon.count} عمليات`;
                topSurgeonsList.appendChild(li);
            });

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
        toggleList("surgery_list", this, "🔼 إخفاء قائمة العمليات الجراحية", "🔽 عرض قائمة العمليات الجراحية");
    });

    // Toggle Top Doctors List Visibility
    document.getElementById("toggleTopDoctorsList").addEventListener("click", function () {
        toggleList("top_doctors_list", this, "🔼 إخفاء قائمة أفضل الأطباء", "🔽 عرض قائمة أفضل الأطباء حسب المواعید اسبوعیا");
    });

    // Toggle Top Surgeons List Visibility
    document.getElementById("toggleTopSurgeonsList").addEventListener("click", function () {
        toggleList("top_surgeons_list", this, "🔼 إخفاء قائمة أفضل الجراحين", "🔽 عرض قائمة أفضل الجراحين حسب عدد عملیات اسبوعیا");
    });

    // Helper function to toggle visibility
    function toggleList(listId, button, hideText, showText) {
        const list = document.getElementById(listId);
        if (list.classList.contains("hidden")) {
            list.classList.remove("hidden");
            button.textContent = hideText;
        } else {
            list.classList.add("hidden");
            button.textContent = showText;
        }
    }

    // Initial Data Fetch on Load
    fetchData();
});
