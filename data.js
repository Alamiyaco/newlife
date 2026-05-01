async function loadDashboardData() {
  if (!CONFIG.API_URL) {
    setConnectionStatus("غير متصل - لا يوجد رابط");
    throw new Error("API_URL غير موجود");
  }

  try {
    const response = await fetch(CONFIG.API_URL);

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    setConnectionStatus("متصل بنجاح ✅");
    return data;

  } catch (err) {
    setConnectionStatus("فشل الاتصال ❌");
    console.error(err);
    throw err;
  }
}

function setConnectionStatus(text) {
  const el = document.getElementById("connectionStatus");
  if (el) el.textContent = text;
}
