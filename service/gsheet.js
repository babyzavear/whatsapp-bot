const axios = require('axios')

const baseUrl = "https://script.google.com/macros/s/AKfycby60QQ8mRkpJ4ez1cOAHqcNxPk9Pj0i36-zqWtsLdxh32sSYraLub8G-CyhWAzXrb_3LA/exec"

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
})

exports.getData = async (whatsapp) => {
    console.log(">>>", whatsapp)
    try {
        const response = await axiosInstance.get();
        let responseStr = ""
        response.data.data.forEach(element => {

            if (element.whatsapp.toString() === whatsapp) {
                responseStr += `Jenis Cucian : *${element.jenis_cucian}* *(${element.pcs})*\nHarga : *Rp.* *${element.total_bayar}*\nStatus : *${element.status}*\n\n`
            }
            
        });
        if (responseStr.length === 0){
            responseStr = "Anda tidak memiliki cucian di kami atau pastikan anda menghubungi kami dengan nomer yang sudah didaftarkan. Terimakasih"
        }
        return responseStr
    } catch(error){
        console.log('>>>>', error)
    }
}