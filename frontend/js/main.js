const API_BASE = '/api';

async function submitLead(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const messageEl = document.getElementById('formMessage');
  const submitBtn = document.querySelector('.submit-btn');
  
  // Validate inputs
  if (!name || !email) {
    showMessage('Please fill in all required fields', 'error', messageEl);
    return;
  }

  if (!isValidEmail(email)) {
    showMessage('Please enter a valid email address', 'error', messageEl);
    return;
  }

  // Show loading state
  showMessage('Processing...', 'loading', messageEl);
  submitBtn.disabled = true;
  submitBtn.textContent = 'Joining...';

  try {
    const response = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || undefined,
        source: 'landing_page'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        showMessage('This email is already registered!', 'error', messageEl);
      } else {
        showMessage(data.error || 'An error occurred. Please try again.', 'error', messageEl);
      }
      return;
    }

    // Success
    showMessage('✅ Welcome to Escobar AI System! Check your email for next steps.', 'success', messageEl);
    
    // Reset form
    document.getElementById('leadForm').reset();
    submitBtn.textContent = 'Join System';

    // If phone was provided, open WhatsApp
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      setTimeout(() => {
        window.open(`https://wa.me/${cleanPhone}?text=Hi%20I%20just%20joined%20Escobar%20AI%20System`, '_blank');
      }, 2000);
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('Connection error. Please check your internet and try again.', 'error', messageEl);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Join System';
  }
}

function showMessage(text, type, element) {
  element.textContent = text;
  element.className = `form-message ${type}`;
  
  if (type === 'success') {
    setTimeout(() => {
      element.className = 'form-message';
    }, 5000);
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Update WhatsApp button href if available
window.addEventListener('DOMContentLoaded', () => {
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    // Replace with actual WhatsApp number
    whatsappBtn.href = 'https://wa.me/1234567890';
  }
});