

// interface userType{
//     email:string,
//     password:string,
//     name:string,
//     role?:string,
//     createdAt:Date,
//     products: [],
    
// }
interface DecodedToken{
    id: number,
    role: string,
    iat: Date,
    exp: Date
}


export {DecodedToken}