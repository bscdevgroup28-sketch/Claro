// Stripe donate button integration
// Replace STRIPE_PAYMENT_LINK with your actual Stripe Payment Link URL
// Create one at: https://dashboard.stripe.com/payment-links/create

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/9B65kE3ga0rufAm5XQbAs00';

document.addEventListener('DOMContentLoaded', () => {
  const donateBtn = document.getElementById('stripe-donate-btn');
  if (!donateBtn) return;

  if (STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== 'YOUR_STRIPE_PAYMENT_LINK_HERE') {
    donateBtn.href = STRIPE_PAYMENT_LINK;
    donateBtn.target = '_blank';
    donateBtn.rel = 'noopener';
  } else {
    // Placeholder behavior until Stripe is configured
    donateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Donations coming soon! Thank you for your support.');
    });
  }
});
