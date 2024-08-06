import axios from 'axios'

const http = axios.create({
    baseURL: "http://localhost:8000/api"
})

function getAllStocks() {
    return http.get('/trades')
        .then(res => res.data)
        .catch(error => {
            throw error;
        })
}

function addOneStock(stock) {
    return http.post('/trades/add', stock)
        .then(res => res.data)
        .catch(error => {
            console.log(error)
            throw error;
        })
}

function deleteOneStock(id) {
    return http.delete(`/trade/${id})`)
        .then((res) => res.data)
        .catch((error) => {
        console.log(error);
        throw error;
        });
    }

const StockService = {
    getAllStocks: getAllStocks,
    addOneStock: addOneStock,
    deleteOneStock: deleteOneStock
}

export default StockService