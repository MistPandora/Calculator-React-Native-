import { evaluate } from 'mathjs';
import formatNumbers from './formatNumbers';

export default getResult = (entries) => {
    try {
        const formattedStr = entries.replace(/÷/g, "/").replace(/x/g, "*").replace(/,/g, ".").replace(/\s*/g, "");
        const lastCharacter = entries[entries.length - 1];

        let result = /[0-9]/.test(lastCharacter) ? evaluate(formattedStr) : result ? evaluate(formattedStr.substring(0, formattedStr.length - 1)) : "";
        result = result.toString().replace('.', ',');
        result = formatNumbers(result);

        return result
    } catch {
        return "Erreur"
    }
}
