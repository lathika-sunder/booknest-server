const bcryptjs=require('bcryptjs')
const validatePassword=(enteredPassword,hashedPassword)=>{
   const result= bcryptjs.compareSync(enteredPassword,hashedPassword)
   return result;
}

module.exports=validatePassword