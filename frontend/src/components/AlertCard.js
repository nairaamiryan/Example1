// src/components/AlertCard.js

export function AlertCard({ title, message, type = 'info' }) {
  
  // Ստեղծում ենք HTML element
  const el = document.createElement('div');
  
  // CSS class ենք տալիս
  el.className = `alert-card alert-${type}`;
  /* src/App.css */

const styles = {
  .alert-card {
  padding: 14px 18px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.alert-info    { background: var(--blue-light);  color: var(--blue); }
.alert-warning { background: var(--amber-light); color: var(--amber); }
.alert-danger  { background: var(--red-light);   color: var(--red); }}

  // HTML բովանդակությունը
  el.innerHTML = `
    <div class="alert-title">${title}</div>
    <div class="alert-msg">${message}</div>
  `;
  
  return el; // վերադարձնում ենք element-ը
}
