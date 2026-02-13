import {REACT_APP_API_BASE_URL} from "../services/utils/request";

export async function saveDocument(data) {
    try {
        const serverUrl =  `${REACT_APP_API_BASE_URL}/document/get/${data.documentId}`

        const response = await fetch(serverUrl, {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error(`Błąd serwera: ${response.status}`);
        }

        let fileName = data.number;
        let fileExtension = ".pdf"

        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition && contentDisposition.includes('filename=')) {
            const responseFileName = contentDisposition.split('filename=')[1].replace(/"/g, '');
            fileExtension = responseFileName.split('.').pop()
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${fileName}.${fileExtension}`;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        a.remove();

    } catch (error) {
        console.error('Błąd podczas pobierania pliku:', error);
        alert('Nie udało się pobrać pliku.');
    }
}