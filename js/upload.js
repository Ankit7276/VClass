document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const creator = document.getElementById('creator').value;
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    const fileSize = (file.size / 1024 / 1024).toFixed(2); // Size in MB

    const uploadedFilesContainer = document.getElementById('uploadedFiles');

    const uploadedFileDiv = document.createElement('div');
    uploadedFileDiv.className = 'uploaded-file';

    uploadedFileDiv.innerHTML = `
        <h3>${title} (${type})</h3>
        <p><strong>Creator/Author:</strong> ${creator}</p>
        <p><strong>File Name:</strong> ${file.name}</p>
        <p><strong>File Size:</strong> ${fileSize} MB</p>
    `;

    if (type === 'image') {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = '100%';
        uploadedFileDiv.appendChild(img);
    } else if (type === 'video' || type === 'audio') {
        const media = document.createElement(type);
        media.controls = true;
        media.src = URL.createObjectURL(file);
        uploadedFileDiv.appendChild(media);
    } else if (type === 'pdf') {
        const pdfLink = document.createElement('a');
        pdfLink.href = URL.createObjectURL(file);
        pdfLink.target = '_blank';
        pdfLink.innerText = 'View PDF';
        uploadedFileDiv.appendChild(pdfLink);
    }

    uploadedFilesContainer.appendChild(uploadedFileDiv);

    // Reset form
    document.getElementById('uploadForm').reset();
});
