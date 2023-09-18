export interface IUserModelAttr {
    chat_id: number;
    point_id: number;
    fullname:string;
    username: string;
}

export interface IUpdateUser {
    points: number;
}