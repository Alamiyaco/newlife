async function loadDashboardData() {
  if (!CONFIG.API_URL) {
    setConnectionStatus("غير متصل - لم يتم وضع رابط Apps Script");
    throw new Error("لم يتم وضع رابط Google Apps Script داخل ملف config.js");
  }

  const data = await loadByJsonp(CONFIG.API_URL);

  if (data.error) {
    throw new Error(data.error);
  }

  setConnectionStatus("متصل بنجاح");
  return data;
}

function loadByJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = "jsonpCallback_" + Date.now();

    window[callbackName] = function(data) {
      resolve(data);
      cleanup();
    };

    const script = document.createElement("script");
    const separator = url.includes("?") ? "&" : "?";

    script.src = url + separator + "callback=" + callbackName + "&t=" + Date.now();

    script.onerror = function() {
      reject(new Error("تعذر الاتصال بملف Google Sheet"));
      cleanup();
    };

    function cleanup() {
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    document.body.appendChild(script);
  });
}

function setConnectionStatus(text) {
  const el = document.getElementById("connectionStatus");

  if (el) {
    el.textContent = text;
  }
}
