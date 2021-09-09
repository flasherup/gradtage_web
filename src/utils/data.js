const NUMBER_OF_HEADER_LINES = 9;

export const CSVDataParser = (src, separator) => {
    const byLines = src.split(/\n/g) || [];
    const headerLines = byLines.slice(0, NUMBER_OF_HEADER_LINES)
    const dataLines = byLines.slice(NUMBER_OF_HEADER_LINES+1)

    let headers = {}
    headerLines.forEach(line => {
        const l = parseHeaderLine(line, separator);
        headers = {...headers, ...l}
    });

    const data = dataLines.map(line => {
        return parseDataLine(line, separator)
    });

    console.log("headerLines", headerLines, "dataLines", dataLines);

    return {headers, data}
}

const parseHeaderLine = (src, separator) => {
    const line = src.split(separator);
    if(line.length > 1 && line[0].length > 1) {
        return {[line[0]]:line[1]}
    }

    return {}
}

const parseDataLine = (src, separator) => {
    const split = src.split(separator);
    if (split.length > 1) {
        let hdd = 0.0;
        let hddValue = parseFloat(split[1]);
        if (!isNaN(hddValue)) {
            hdd = hddValue;
        }
        const date = new Date(split[0]);

        return {date, hdd}
    }

    return {};
}