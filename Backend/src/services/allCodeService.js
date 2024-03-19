import db from "../models";

let getAll = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            let allCode = {};
            if (!typeInput) {
                allCode = await db.AllCode.findAll();

            } else {
                allCode = await db.AllCode.findAll({
                    where: { type: typeInput },
                });
            }
            res.errCode = 0;
            res.errMessage = 'Get all success!';
            res.data = allCode;
            resolve(res);
        } catch (error) {
            console.log('Err: ', error);
            reject(error);
        }
    })
}

let getAllNoUnique = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let allCode;
            if (!typeInput) {
                allCode = await db.AllCode.findAll();
            } else {
                allCode = await db.AllCode.findAll({
                    where: { type: typeInput },
                });
            }
            // Lọc dữ liệu không bị trùng lặp về value_En hoặc value_Vi
            const uniqueValues = new Set();
            const uniqueData = allCode.filter(code => {
                const valueEn = code.value_En;
                const valueVi = code.value_Vi;
                if (uniqueValues.has(valueEn) || uniqueValues.has(valueVi)) {
                    return false; // Bỏ qua nếu giá trị đã tồn tại trong Set
                }
                uniqueValues.add(valueEn); // Thêm giá trị value_En vào Set để kiểm tra lần sau
                uniqueValues.add(valueVi); // Thêm giá trị value_Vi vào Set để kiểm tra lần sau
                return true; // Giữ lại giá trị không trùng lặp
            });

            res.errCode = 0;
            res.errMessage = 'Get all success!';
            res.data = uniqueData;
            resolve(res);
        } catch (error) {
            console.log('Err: ', error);
            reject(error);
        }
    });
};
module.exports = {
    getAll: getAll,
    getAllNoUnique: getAllNoUnique
}