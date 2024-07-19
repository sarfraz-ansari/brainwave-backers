// let notifications = [];
// let notificationIndex = 0;

// // Function to handle the file input
// document.getElementById('file-input').addEventListener('change', async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         await readExcelFile(file);
//     }
// });

// // Function to read the Excel file
// async function readExcelFile(file) {
//     const reader = new FileReader();
//     reader.onload = async function (e) {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];

//         // Convert the sheet to JSON
//         const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//         const [headers, ...rows] = jsonData;

//         // Map rows to notification objects
//         notifications = rows.map(row => ({
//             Time: row[0],
//             Message: row[1]
//         }));
        
//         updateBadge();
//         handleNotifications(); // Check for notifications
//     };
//     reader.readAsArrayBuffer(file);
// }

// // Function to display the notifications
// function displayNotifications() {
//     if (notifications.length > 0) {
//         const notification = notifications[notificationIndex];
//         showNotification(notification.Message);
//         notificationIndex = (notificationIndex + 1) % notifications.length;
//         updateBadge();
//     }
// }

// // Function to show the notification
// function showNotification(message) {
//     const notification = document.getElementById('notification');
//     notification.textContent = message;
//     notification.style.display = 'block';
//     setTimeout(() => {
//         notification.style.display = 'none';
//     }, 5000);  // Notification duration (5 seconds)
// }

// // Function to update the notification badge
// function updateBadge() {
//     const badge = document.getElementById('notification-badge');
//     badge.textContent = notifications.length;
// }

// // Function to handle notifications
// function handleNotifications() {
//     // Get current time and convert to minutes
//     const now = new Date();
//     const nowMinutes = now.getHours() * 60 + now.getMinutes();

//     const upcomingNotifications = notifications.filter(row => {
//         const [hours, minutes] = row.Time.split(':').map(Number);
//         const notificationTime = (hours % 12 + (row.Time.includes('PM') ? 12 : 0)) * 60 + minutes;
//         return notificationTime === nowMinutes;
//     });

//     notifications = upcomingNotifications;

//     if (notifications.length > 0) {
//         displayNotifications();
//     }

//     // Refresh notifications every minute
//     setInterval(handleNotifications, 60000);
// }

// // Handle icon click to show the next notification
// document.getElementById('notification-icon').addEventListener('click', () => {
//     displayNotifications();
// });

// // Initialize the notification setup
// document.addEventListener('DOMContentLoaded', () => {
//     // Ensure the badge is set to zero initially
//     updateBadge();
// });

// async function fetchNotifactionCount() {
//     try {
//         const responce = await fetch('data.csv');
//         const text = await responce.text();
//         const count = parseInt(text, 10);

//         document.getElementById('data.csv').textContent = count;
//     }

//     catch (error) {
//         console.log(error in fetching)
//     }
// }

function redirectToNotification() {
    window.location.href = "notify.html"
}

