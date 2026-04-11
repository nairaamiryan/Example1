// src/components/AlertCard.js

export function AlertCard({ title, message, type = 'info' }) {
  
  // Ստեղծում ենք HTML element
  const el = document.createElement('div');
  
  // CSS class ենք տալիս
  el.className = `alert-card alert-${type}`;
  
  // HTML բովանդակությունը
  el.innerHTML = `
    <div class="alert-title">${title}</div>
    <div class="alert-msg">${message}</div>
  `;
  
  return el; // վերադարձնում ենք element-ը
}
