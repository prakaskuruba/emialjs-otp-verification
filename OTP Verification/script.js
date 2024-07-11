// script.js
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const mobileNo = document.getElementById('mobileNo').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const fullNameRegex = /[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{1,20}$/;
    const mobileNoRegex = /^[789]\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,20}$/;

    if (!fullNameRegex.test(fullName)) {
        toastr.error('Full name must contain at least 3 letters!');
        return;
    }

    if (!emailRegex.test(email)) {
        toastr.error('Email address must contain @ and .com');
        return;
    }

    if (!usernameRegex.test(username)) {
        toastr.error('Username must be alphanumeric!');
        return;
    }

    if (!mobileNoRegex.test(mobileNo)) {
        toastr.error('Mobile number must start with 7, 8, or 9 and be exactly 10 digits!');
        return;
    }

    if (!passwordRegex.test(password)) {
        toastr.error('Password must be alphanumeric and contain at least one uppercase letter, one lowercase letter, one digit, and one special character!');
        return;
    }

    toastr.success('User Registered Successfully!');
});

let generatedOtp = null;
const sendOtpButton = document.getElementById('sendOtpButton');
const submitButton = document.getElementById('submitButton');
const otpPopup = document.getElementById('otpPopup');
const verifyOtpButton = document.getElementById('verifyOtpButton');
const resendOtpButton = document.getElementById('resendOtpButton');

sendOtpButton.addEventListener('click', function() {
    const email = document.getElementById('email').value;
    if (!email) {
        toastr.warning('Please enter an email address.');
        return;
    }

    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    emailjs.send('service_t6k1xsw', 'template_5qk06de', {
        to_email: email,
        otp: generatedOtp
    }).then(function(response) {
        toastr.success('OTP sent to your email.');
        otpPopup.style.display = 'block';
        alert('OTP sent to your email.');
    }, function(error) {
        toastr.error('Failed to send OTP. Please try again.');
        console.log('FAILED...', error);
    });
});

verifyOtpButton.addEventListener('click', function() {
    const enteredOtp = document.getElementById('otpInput').value;
    if (enteredOtp === generatedOtp) {
        toastr.success('OTP verified successfully.');
        sendOtpButton.textContent = 'Verified';
        sendOtpButton.disabled = true;
        submitButton.disabled = false;
        submitButton.style.pointerEvents = 'auto';
        otpPopup.style.display = 'none';
    } else {
        toastr.error('Invalid OTP. Please try again.');
    }
});

resendOtpButton.addEventListener('click', function() {
    sendOtpButton.click();
});