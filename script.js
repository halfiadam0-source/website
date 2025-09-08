const form = document.getElementById('reportForm');
const reportsList = document.getElementById('reportsList');

// Récupérer les signalements depuis le localStorage
let reports = JSON.parse(localStorage.getItem('reports')) || [];

function displayReports() {
    reportsList.innerHTML = '';
    reports.forEach((report, index) => {
        const div = document.createElement('div');
        div.classList.add('report');
        div.innerHTML = `
            <h3>${report.title}</h3>
            <p>${report.description}</p>
            <p><strong>Localisation:</strong> ${report.location}</p>
            ${report.photo ? `<img src="${report.photo}" alt="Photo" width="200">` : ''}
        `;
        reportsList.appendChild(div);
    });
}

// Gestion du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newReport = {
        title: form.title.value,
        description: form.description.value,
        location: form.location.value,
        photo: ''
    };

    // Gestion de la photo
    const file = form.photo.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function() {
            newReport.photo = reader.result;
            reports.push(newReport);
            localStorage.setItem('reports', JSON.stringify(reports));
            displayReports();
            form.reset();
        };
        reader.readAsDataURL(file);
    } else {
        reports.push(newReport);
        localStorage.setItem('reports', JSON.stringify(reports));
        displayReports();
        form.reset();
    }
});

displayReports();
