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

      const surgeryList = document.getElementById("surgery_list");
      surgeryList.innerHTML = "";
      data.todays_surgeries.forEach(surgery => {
        const li = document.createElement("li");
        li.textContent = `${surgery.name}: ${surgery.doctor}`;
        surgeryList.appendChild(li);
      });

      const doctorsList = document.getElementById("top_doctors_list");
      doctorsList.innerHTML = "";
      data.top_doctors_weekly.forEach(doctor => {
        const li = document.createElement("li");
        li.textContent = `${doctor.name}: ${doctor.count} مواعيد`;
        doctorsList.appendChild(li);
      });

      const surgeonsList = document.getElementById("top_surgeons_list");
      surgeonsList.innerHTML = "";
      data.top_surgeons_weekly.forEach(surgeon => {
        const li = document.createElement("li");
        li.textContent = `${surgeon.name}: ${surgeon.count} عمليات`;
        surgeonsList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("last_updated").textContent = "❌ خطأ في تحميل البيانات";
    }
  }

  document.getElementById("refresh_data").addEventListener("click", fetchData);

  function toggleList(buttonId, listId) {
    document.getElementById(buttonId).addEventListener("click", function () {
      const list = document.getElementById(listId);
      if (list.classList.contains("hidden")) {
        list.classList.remove("hidden");
        this.textContent = "🔼 إخفاء القائمة";
      } else {
        list.classList.add("hidden");
        this.textContent = "🔽 عرض القائمة";
      }
    });
  }

  toggleList("toggleSurgeryList", "surgery_list");
  toggleList("toggleDoctorsList", "top_doctors_list");
  toggleList("toggleSurgeonsList", "top_surgeons_list");

  fetchData();
});

