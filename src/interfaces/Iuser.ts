export interface Iuser{
    id : string,
    username : string,
    email : string,
    password :string,
    checkPassword : (passwd : string) => boolean
}