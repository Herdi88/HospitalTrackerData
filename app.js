<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة إدارة المستشفى</title>
    <link rel="stylesheet" href="style.css">
    <link rel="manifest" href="manifest.json">
    <script defer src="app.js"></script>
</head>
<body>
    <div class="container">
        <h1>🏥 لوحة إدارة المستشفى</h1>

        <p>📅 إجمالي المواعيد اليوم: <span id="today_appointments">-</span></p>
        <p>📆 مواعيد الغد: <span id="tomorrow_appointments">-</span></p>
        <p>📞 المكالمات المستلمة: <span id="handled_calls">-</span></p>
        <p>🚑 مرضى الطوارئ: <span id="emergency_patients">-</span></p>
        <p>🛏️ المرضى الراقدين: <span id="admitted_patients">-</span></p>

        <h2>🔬 العمليات الجراحية اليوم: <span id="total_surgeries">-</span></h2>
        <button id="toggleSurgeryList" class="toggle-button">🔽 عرض قائمة العمليات الجراحية</button>
        <ul id="surgery_list" class="hidden"></ul>

        <h2>🔝 أفضل العمليات الجراحية لهذا الأسبوع</h2>
        <div id="top_weekly_surgeries"></div>

        <h2>🏆 أفضل الأطباء حسب المواعيد (الأسبوع الماضي)</h2>
        <div id="top_doctors_appointments"></div>

        <h2>🔪 أفضل الجراحين حسب العمليات (الأسبوع الماضي)</h2>
        <div id="top_surgeons"></div>

        <p>📅 آخر تحديث: <span id="last_updated">-</span></p>
        <button id="refresh_data">🔄 تحديث البيانات</button>
    </div>
</body>
</html>
