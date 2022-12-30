
interface Isecret {
    crypto : string ,
    jwt : string,
    jwtExp : string
}
export interface Iconfig {
    PORT : number,
    SECRET : Isecret
    dbUrl : string
}