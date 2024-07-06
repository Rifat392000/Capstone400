// Retrieve user information from sessionStorage
const currentUserJSON = sessionStorage.getItem('currentUser');
const currentUser = JSON.parse(currentUserJSON);

if (currentUser) {
    document.querySelectorAll('.empName').forEach(element => {
        element.innerText = currentUser.empName;
    });

    document.querySelectorAll('.empId').forEach(element => {
        element.innerText = currentUser.empId;
    });

    document.getElementById('desg').innerText = currentUser.employeeDesignation;

    
    

    const imgElement = document.querySelectorAll('.empImg');

    if (currentUser.empId === 1001) {
        imgElement.forEach(img => {
            img.src = 'rifat.png';
        });
       
    } else if (currentUser.empId === 1002) {
        imgElement.forEach(img => {
            img.src = 'ifty.png';
        });
    } else if (currentUser.empId === 1003) {
        imgElement.forEach(img => {
            img.src = 'saif.png';
        });
    } else if (currentUser.empId === 1004) {
        imgElement.forEach(img => {
            img.src = 'zaman.png';
        });
    } else if (currentUser.empId === 1005) {
        imgElement.forEach(img => {
            img.src = 'uddin.png';
        });
    }
} else {
    alert('User information not found. Please log in.');
    window.location.href = 'index.html';
}


document.getElementById('log_out').addEventListener('click', () => {
    // Remove user from session storage
    sessionStorage.removeItem('currentUser');
    
    window.location.href = 'index.html';

    // Manipulate the browser's history to prevent going back
    history.pushState(null, null, 'index.html');
});

// Disable the back button functionality
window.onpopstate = function(event) {
    history.pushState(null, null, 'index.html');
};