async function loadDashboardData() {
  if (!CONFIG.API_URL) {
    setConnectionStatus("غير متصل - لا يوجد رابط");
    throw new Error("API_URL غير موجود");
  }

  return new Promise((resolve, reject) => {
    const callbackName = "cb_" + Date.now();

    window[callbackName] = function(data) {
      setConnectionStatus("متصل بنجاح ✅");
      resolve(data);
      delete window[callbackName];
    };

    const script = document.createElement("script");
    script.src = CONFIG.API_URL + "?callback=" + callbackName + "&t=" + Date.now();

    script.onerror = function() {
      setConnectionStatus("فشل الاتصال ❌");
      reject(new Error("فشل تحميل البيانات"));
      delete window[callbackName];
    };

    document.body.appendChild(script);
  });
}

function setConnectionStatus(text) {
  const el = document.getElementById("connectionStatus");
  if (el) el.textContent = text;
}
