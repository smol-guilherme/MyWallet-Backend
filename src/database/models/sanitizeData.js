import { stripHtml } from "string-strip-html";

export default function sanitizeData(data) {
    const output = { ...data };
    for(let param in data) {
        if(typeof output[param] === 'string'){
          output[param] = (stripHtml(data[param]).result).trim();
        }
    }
    console.log(output);
    return output;
}