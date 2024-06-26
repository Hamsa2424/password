document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.location.pathname.split('/').pop();

    if (currentPage === 'index.html') {
        document.getElementById('login-form').addEventListener('submit', handleLogin);
    } else if (currentPage === 'verification.html') {
        document.getElementById('verification-form').addEventListener('submit', handleVerification);
    } else if (currentPage === 'dashboard.html') {
        displayApps();
    } else if (currentPage === 'password.html') {
        document.getElementById('verify-form').addEventListener('submit', handlePasswordVerification);
    } else if (currentPage === 'add-application.html') {
        document.getElementById('add-app-form').addEventListener('submit', handleAddApp);
    }
});

const handleLogin = (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Assuming email and password validation is done here
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Redirect to verification page
    window.location.href = 'verification.html';
};

const handleVerification = (event) => {
    event.preventDefault();
    const verificationCode = document.getElementById('verification-code').value;

    // For simplicity, assume the verification code is '1234'
    if (verificationCode === '725957') {
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid verification code!');
    }
};

const displayApps = () => {
    const apps = JSON.parse(localStorage.getItem('apps')) || [];
    const appList = document.getElementById('app-list');

    appList.innerHTML = '';
    apps.forEach(app => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = password.html?app=${app.name};
        link.textContent = app.name;
        li.appendChild(link);
        appList.appendChild(li);
    });
};

const handlePasswordVerification = (event) => {
    event.preventDefault();
    const userPassword = document.getElementById('user-password').value;
    const savedPassword = localStorage.getItem('password');

    if (userPassword === savedPassword) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const appName = urlParams.get('app');
        const apps = JSON.parse(localStorage.getItem('apps')) || [];
        const app = apps.find(app => app.name === appName);

        const passwordDetails = document.getElementById('password-details');
        passwordDetails.textContent = app ? Password: ${app.password} : 'No password found';
    } else {
        alert('Incorrect password!');
    }
};

const handleAddApp = (event) => {
    event.preventDefault();
    const appName = document.getElementById('app-name').value;
    const appPassword = document.getElementById('app-password').value;

    const apps = JSON.parse(localStorage.getItem('apps')) || [];
    apps.push({ name: appName, password: appPassword });
    localStorage.setItem('apps', JSON.stringify(apps));

    window.location.href = 'dashboard.html';
};

const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    window.location.href = 'index.html';
};

const goBack = () => {
    window.history.back();
};
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }