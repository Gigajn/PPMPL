function tambah(a, b) {
    if (a === null || b === null || typeof a === "string" || typeof b === "string") {
        throw new Error("Tidak bisa jika nilainya string atau null");
    }
    return a + b;
}

function kali(a, b) {
    return a * b;
}
function kurang(a, b) {
    return a - (b);
}
function bagi(a, b) {
    if (b!=0) {
        return a / b;
    } else {
        throw new Error("Tidak bisa membagi dengan nol")
    }
    
}
module.exports = { tambah, kali, kurang, bagi };