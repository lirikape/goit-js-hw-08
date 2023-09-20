import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

function saveFormData() {
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
        const formData = JSON.parse(savedData);
        emailInput.value = formData.email;
        messageInput.value = formData.message;
    }
}

feedbackForm.addEventListener('input', throttle(saveFormData, 500));
window.addEventListener('load', loadFormData);

feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    console.log(formData);
    localStorage.removeItem(localStorageKey);
    emailInput.value = '';
    messageInput.value = '';
});
