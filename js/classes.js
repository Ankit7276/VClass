document.addEventListener('DOMContentLoaded', function () {
    fetch('get-files.php')
        .then(response => response.json())
        .then(files => {
            const videoSection = document.querySelector('#videoSection .files');
            const pdfSection = document.querySelector('#pdfSection .files');
            const audioSection = document.querySelector('#audioSection .files');

            files.forEach(file => {
                const fileElement = document.createElement('div');
                fileElement.className = 'file-item';
                fileElement.setAttribute('data-title', file.title.toLowerCase());
                fileElement.setAttribute('data-creator', file.creator.toLowerCase());
                fileElement.innerHTML = `
                    <h3>${file.title}</h3>
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
                    audio.innerHTML = 'Your browser does not support the audio element.';
                    fileElement.appendChild(audio);
                    audioSection.appendChild(fileElement);
                }
            });
        })
        .catch(error => console.error('Error fetching the files:', error));


        // Function to filter content based on search query
        function filterContent() {
            const query = document.getElementById('searchInput').value.toLowerCase();
        
            // Filter files based on title or creator name
            const filteredFiles = allFiles.filter(file => {
                return (
                    file.title.toLowerCase().includes(query) || 
                    file.creator.toLowerCase().includes(query)
                );
            });
        
            // Display the filtered content
            displayContent(filteredFiles);
        }


});


// Initialize section visibility and search functionalities


// function filterContent() {
//     const query = document.getElementById('searchInput').value.toLowerCase();
//     const activeSection = document.querySelector('.section.active');
//     const files = activeSection.querySelectorAll('.file-item');

//     files.forEach(file => {
//         const title = file.getAttribute('data-title');
//         const creator = file.getAttribute('data-creator');

//         if (title.includes(query) || creator.includes(query)) {
//             file.style.display = 'block';
//         } else {
//             file.style.display = 'none';
//         }
//     });
// }

// function initializeSectionAndSearch() {
//     showSection('videoSection'); // Default section to display

//     document.querySelectorAll('#filterButtons button').forEach(button => {
//         button.addEventListener('click', () => {
//             const sectionId = button.getAttribute('data-section');
//             showSection(sectionId);
//         });
//     });

//     document.getElementById('searchInput').addEventListener('input', filterContent);
//     document.getElementById('searchButton').addEventListener('click', filterContent);
// }
