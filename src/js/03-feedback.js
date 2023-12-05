import throttle from 'lodash.throttle';
const formFeedback = document.querySelector('form.feedback-form');

loadFeedback();

formFeedback.addEventListener('input', throttle(saveFeedback, 500));
formFeedback.addEventListener('submit', submitFeedback);

function loadFeedback() {
  let feedback = localStorage.getItem('feedback-form-state');
  if (feedback !== null) {
    try {
      feedback = JSON.parse(feedback);
      formFeedback.elements['email'].value = feedback.email;
      formFeedback.elements['message'].value = feedback.message;
    } catch (error) {
      console.log(error);
    }
  }
}

function getFeedback() {
  const email = formFeedback.elements['email'].value;
  const message = formFeedback.elements['message'].value;
  const feedback = { email: email, message: message };
  return feedback;
}

function saveFeedback() {
  const feedback = getFeedback();
  localStorage.setItem(
    'feedback-form-state',
    `{ "email": "${feedback.email}", "message": "${feedback.message}" }`
  );
}

function submitFeedback(event) {
  event.preventDefault();
  const feedback = getFeedback();
  if (feedback.email !== '' && feedback.message !== '') {
    console.log(feedback);
    formFeedback.elements['email'].value = '';
    formFeedback.elements['message'].value = '';
    localStorage.clear();
  }
}
