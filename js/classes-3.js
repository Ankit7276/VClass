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
        });
});
