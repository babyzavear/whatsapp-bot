const axios = require('axios')

const baseUrl = "https://script.google.com/macros/s/AKfycbzgicnjme92yJMTXLpb82A23-sCDsietsYj96Xp1ESnjoZzNcYMStWN7AP3NJhw6ebe/exec"

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
})

exports.getData = async () => {
    try {
        const response = await axiosInstance.get();
        let responseStr = ""
        
        // Iterasi melalui setiap elemen data dan membangun string hasil
        response.data.data.forEach(element => {
            responseStr += `Masa Berlaku Promo : *${element.masa_promo}*\nJenis Promo : *${element.deskripsi_promo}*\n\n`
        });

        // Jika tidak ada data, tampilkan pesan default
        if (responseStr.length === 0){
            responseStr = "Tidak ada Promo Saat Ini."
        }

        return responseStr
    } catch(error){
        console.log('>>>>', error)
        return "Terjadi kesalahan dalam mengambil data."
    }
}