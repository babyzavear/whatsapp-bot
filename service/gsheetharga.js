const axios = require('axios')

const baseUrl = "https://script.google.com/macros/s/AKfycbx9TkOWDx3B5Xf-wFj6uB7tf1U3uBWFaSdKNijArG-3Kcq05qhdBvjudj_i7BZ5hF6r/exec"

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
            responseStr += `${element.jenis_cucian} : *Rp.* *${element.harga}* / ${element.satuan}\n`
        });

        // Jika tidak ada data, tampilkan pesan default
        if (responseStr.length === 0){
            responseStr = "Tidak ada Harga Saat Ini."
        }

        return responseStr
    } catch(error){
        console.log('>>>>', error)
        return "Terjadi kesalahan dalam mengambil data."
    }
}