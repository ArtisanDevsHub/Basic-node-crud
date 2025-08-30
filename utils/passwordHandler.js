const bcrypt = require('bcrypt');

const saltComplexity = 10;

const hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(saltComplexity);
    return await bcrypt.hash(password, salt);
}

const isPasswordMatching = async (userEnteredPassword, savedHashedPasswrod) =>{
    return await bcrypt.compare(userEnteredPassword, savedHashedPasswrod);
}


module.exports = {
    hashPassword,
    isPasswordMatching
}