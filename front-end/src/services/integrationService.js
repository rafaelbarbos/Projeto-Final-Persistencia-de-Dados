import { pointsService } from './pointsService';

export const integrationService = {
    async exportData(format) {
        const points = await pointsService.getAll();

        if (format === 'json') {
            const dataStr = JSON.stringify(points, null, 2);
            return this.downloadFile(dataStr, 'pontos_turisticos.json', 'application/json');
        }

        if (format === 'csv') {
            const headers = ['id', 'name', 'city', 'state', 'category', 'rating'];
            const csvContent = [
                headers.join(','),
                ...points.map(p => [
                    p.id,
                    `"${p.name}"`,
                    `"${p.city}"`,
                    p.state,
                    p.category,
                    p.rating
                ].join(','))
            ].join('\n');
            return this.downloadFile(csvContent, 'pontos_turisticos.csv', 'text/csv');
        }

        if (format === 'xml') {
            let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<points>\n';
            points.forEach(p => {
                xml += `  <point>\n`;
                xml += `    <id>${p.id}</id>\n`;
                xml += `    <name>${p.name}</name>\n`;
                xml += `    <city>${p.city}</city>\n`;
                xml += `    <state>${p.state}</state>\n`;
                xml += `  </point>\n`;
            });
            xml += '</points>';
            return this.downloadFile(xml, 'pontos_turisticos.xml', 'application/xml');
        }
    },

    downloadFile(content, fileName, contentType) {
        const a = document.createElement('a');
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
        return Promise.resolve();
    },

    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const content = e.target.result;
                    const parsedData = JSON.parse(content);

                    if (Array.isArray(parsedData)) {
                        for (const item of parsedData) {
                            if (item.name && item.city) { // Simple validation
                                await pointsService.create(item);
                            }
                        }
                        resolve({ success: true, count: parsedData.length });
                    } else {
                        reject(new Error('Formato inválido: Esperado um array de pontos'));
                    }
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }
};
