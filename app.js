document.addEventListener("DOMContentLoaded", function () {
    fetch("hospital_data.json")
        .then(response => response.json())
        .then(data => {
            // General hospital stats
            document.getElementById("today_appointments").innerText = data.today_appointments;
            document.getElementById("tomorrow_appointments").innerText = data.tomorrow_appointments;
            document.getElementById("handled_calls").innerText = data.handled_calls;
            document.getElementById("emergency_patients").innerText = data.emergency_patients;
            document.getElementById("admitted_patients").innerText = data.admitted_patients;

            // Best doctor & best surgeon of last week
            document.getElementById("best_doctor").innerText = data.best_doctor || "غير متوفر";
            document.getElementById("best_surgeon").innerText = data.best_surgeon || "غير متوفر";

            // Last update timestamp
            document.getElementById("last_updated").innerText = `📅 آخر تحديث: ${data.last_updated}`;

            // Surgery Section - Show total surgeries and create a collapsible list
            let surgeriesContainer = document.getElementById("surgeries_section");
            let surgeryList = document.getElementById("surgery_list");
            let toggleButton = document.getElementById("toggle_surgery_list");

            if (data.todays_surgeries.length > 0) {
                // Show total surgeries
                surgeriesContainer.style.display = "block";
                toggleButton.innerText = `عرض قائمة العمليات الجراحية ⬇️ (${data.total_todays_surgeries})`;

                // Populate the surgery list (up to 20 surgeries)
                surgeryList.innerHTML = "";
                data.todays_surgeries.slice(0, 20).forEach(surgery => {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `<b>🩺 ${surgery.name}</b> - الجراح: ${surgery.doctor}`;
                    surgeryList.appendChild(listItem);
                });

                // Toggle Surgery List Visibility
                toggleButton.addEventListener("click", function () {
                    if (surgeryList.style.display === "none") {
                        surgeryList.style.display = "block";
                        toggleButton.innerText = "إخفاء قائمة العمليات الجراحية ⬆️";
                    } else {
                        surgeryList.style.display = "none";
                        toggleButton.innerText = `عرض قائمة العمليات الجراحية ⬇️ (${data.total_todays_surgeries})`;
                    }
                });

            } else {
                // Hide the section if no surgeries are available
                surgeriesContainer.style.display = "none";
            }
        })
        .catch(error => {
            console.error("Error fetching hospital data:", error);
            document.getElementById("error_message").innerText = "⚠️ خطأ في تحميل البيانات";
        });
});
