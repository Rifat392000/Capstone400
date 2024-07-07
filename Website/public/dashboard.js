// Retrieve user information from sessionStorage
const currentUserJSON = sessionStorage.getItem('currentUser');
const currentUser = JSON.parse(currentUserJSON);

if (currentUser) {
    document.querySelectorAll('.empName').forEach(element => {
        element.innerText = currentUser.userName;
    });

    document.querySelectorAll('.empId').forEach(element => {
        element.innerText = currentUser.userId;
    });

    if(currentUser.userLevel== 1)
    document.getElementById('desg').innerText = "Trainee";
    else
    document.getElementById('desg').innerText = "Observer";
    
    

    const imgElement = document.querySelectorAll('.empImg');

    if (currentUser.userId === 1001) {
        imgElement.forEach(img => {
            img.src = 'rifat.png';
        });
       
    } else if (currentUser.userId === 1002) {
        imgElement.forEach(img => {
            img.src = 'ifty.png';
        });
    } else if (currentUser.userId === 1003) {
        imgElement.forEach(img => {
            img.src = 'saif.png';
        });
    } else if (currentUser.userId === 1004) {
        imgElement.forEach(img => {
            img.src = 'zaman.png';
        });
    } else if (currentUser.userId === 1005) {
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