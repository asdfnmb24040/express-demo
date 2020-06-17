const bcrypt = require('bcrypt');

async function run() {
    const psw = '99806';
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(psw, salt);
    console.log(salt);
    console.log(hashed);

}
run();