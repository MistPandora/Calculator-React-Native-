export default formatNumbers = (str) => {
    return str.replace(/\d+/g, (match, offset) => {
        return offset == 0 ? match.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : match;
    });
};