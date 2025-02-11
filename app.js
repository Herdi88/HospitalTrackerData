const apiUrl = "https://raw.githubusercontent.com/Herdi88/HospitalTrackerData/main/hospital_data.json";

async function updateData() {
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        document.getElementById("today_appointments").innerText = data.today_appointments;
        document.getElementById("tomorrow_appointments").innerText = data.tomorrow_appointments;
        document.getElementById("handled_calls").innerText = data.handled_calls;
        document.getElementById("emergency_patients").innerText = data.emergency_patients;
        document.getElementById("admitted_patients").innerText = data.admitted_patients;
        document.getElementById("best_doctor").innerText = data.best_doctor || "غير متوفر";
        document.getElementById("best_surgeon").innerText = data.best_surgeon || "غير متوفر";
    } catch (error) {
        alert("⚠️ خطأ في تحميل البيانات");
        console.error("Error fetching data:", error);
    }
}

// Load data when the page opens
updateData();
