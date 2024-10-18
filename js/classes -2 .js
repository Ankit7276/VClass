document.addEventListener('DOMContentLoaded', function () {
    // Fetch and populate files
    fetch('get-files.php')
        .then(response => response.json())
        .then(files => {
            console.log('Files fetched:', files); // Log the fetched files

            const videoSection = document.querySelector('#videoSection .files');
            const pdfSection = document.querySelector('#pdfSection .files');
            const audioSection = document.querySelector('#audioSection .files');

            files.forEach(file => {
                const fileElement = document.createElement('div');
                fileElement.className = 'file-item';
                fileElement.setAttribute('data-title', file.title);
                fileElement.setAttribute('data-creator', file.creator);
                fileElement.innerHTML = `
                    <h3>${file.title} (${file.type})</h3>
                    <p>Creator: ${file.creator}</p>
                `;

                if (file.type === 'video') {
                    const video = document.createElement('video');
                    video.src = file.filePath;
                    video.controls = true;
                    fileElement.appendChild(video);
                    videoSection.appendChild(fileElement);
                } else if (file.type === 'pdf') {
                    const pdfLink = document.createElement('a');
                    pdfLink.href = file.filePath;
                    pdfLink.target = '_blank';
                    pdfLink.innerText = 'View PDF';
                    fileElement.appendChild(pdfLink);
                    pdfSection.appendChild(fileElement);
                } else if (file.type === 'audio') {
                    const audio = document.createElement('audio');
                    audio.src = file.filePath;
                    audio.controls = true;
                    fileElement.appendChild(audio);
                    audioSection.appendChild(fileElement);
                }
            });

            // Initialize the section visibility and search functionalities
            initializeSectionAndSearch();
        });

    // Function to show only the selected section
    function showSection(id) {
        console.log('Showing section:', id); // Log which section is being shown
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            if (section.id === id) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        filterContent(); // Filter content whenever a section is shown
    }

    // Function to filter content based on search input
    function filterContent() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        console.log('Filtering content with query:', query); // Log the search query
        const visibleSections = document.querySelectorAll('.section.active');
        visibleSections.forEach(section => {
            const files = section.querySelectorAll('.files .file-item');
            files.forEach(file => {
                const title = file.getAttribute('data-title') ? file.getAttribute('data-title').toLowerCase() : '';
                const creator = file.getAttribute('data-creator') ? file.getAttribute('data-creator').toLowerCase() : '';
                if (title.includes(query) || creator.includes(query)) {
                    file.style.display = 'block';
                } else {
                    file.style.display = 'none';
                }
            });
        });
    }

    // Function to initialize section and search functionalities
    function initializeSectionAndSearch() {
        console.log('Initializing sections and search'); // Log initialization
        // Set default section to display
        showSection('videoSection');

        // Add event listeners to filter buttons
        document.querySelectorAll('#filterButtons button').forEach(button => {
            button.addEventListener('click', () => {
                const sectionId = button.getAttribute('data-section');
                console.log('Filter button clicked:', sectionId); // Log which button is clicked
                showSection(sectionId);
            });
        });

        // Add event listener to search input
        document.getElementById('searchInput').addEventListener('input', filterContent);

        // Add event listener to search button
        document.getElementById('searchButton').addEventListener('click', filterContent);
    }
});
