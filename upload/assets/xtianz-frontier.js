"use strict";
(() => {
 const form = document.getElementById("download-form");
 if (!form) return;
 const size = document.getElementById("game-size"), speed = document.getElementById("net-speed"), efficiency = document.getElementById("efficiency");
 const result = document.getElementById("download-result"), detail = document.getElementById("download-detail");
 function calculate(event) {
  if (event) event.preventDefault();
  document.getElementById("efficiency-value").textContent = efficiency.value + "%";
  if (!form.checkValidity()) { result.textContent = "Check your inputs"; detail.textContent = "Enter a positive size and speed within the displayed limits."; return; }
  const effective = Number(speed.value) * Number(efficiency.value) / 100;
  const seconds = Number(size.value) * 8000 / effective;
  const minutes = Math.ceil(seconds / 60), hours = Math.floor(minutes / 60), mins = minutes % 60;
  result.textContent = seconds < 60 ? "Under 1 minute" : hours ? hours + " hr" + (mins ? " " + mins + " min" : "") : mins + " min";
  detail.textContent = "At " + Number(effective.toFixed(2)).toLocaleString() + " Mbps effective throughput · excludes installation";
 }
 form.addEventListener("submit", calculate);
 efficiency.addEventListener("input", calculate);
 calculate();
})();
