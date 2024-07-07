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




document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the server endpoint
    fetch('/employees')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateEmployeeTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));

        function updateEmployeeTable(data) {
            const table = document.getElementById('employeeTable');
            table.querySelector('tbody').innerHTML = '';
            
            // Filter data to only include rows where Tid matches currentUser.userId
            const filteredData = data.filter(employee => employee.userId === currentUser.userId);
            
            filteredData.forEach((employee, index) => {
                const row = table.querySelector('tbody').insertRow(index);
                const columns = ['Tid', 'Accuracy', 'result'];
            
                // Add Serial number
                const serialCell = row.insertCell(0);
                serialCell.textContent = index + 1;
            
                // Add data from columns
                columns.forEach((column, columnIndex) => {
                    const cell = row.insertCell(columnIndex + 1);
                    if (column === 'result') {
                        cell.textContent = employee[column] === 1 ? 'Success' : 'Failure';
                    } else {
                        cell.textContent = employee[column];
                    }
                });
            
                // Add blank Improvement Actions cell
                const improvementCell = row.insertCell(4);
                improvementCell.textContent = '';
            });
        }
});

  