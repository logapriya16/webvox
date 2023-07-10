export const userReducer=(state,action)=>{
switch(action.type){
    case "set_users":
        return {...state,users:action.payload}
    case "set_bio":
        return {...state,userbio:action.payload}
    case "set_portfolio":
        return {...state,userProfolio:action.payload}
    case "set_avatar":
        return {...state,userAvatar:action.payload}
    case "user_loading":
        return {...state,user_loadig:action.payload}
    default:
        return state;
}
}