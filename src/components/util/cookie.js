import {Cookies} from "react-cookie";

const cookies = new Cookies();
// 쿠키 저장 => Cookie cookie = new Cookie(name,value)
// cookie.setPath() setMaxAge()
export const setCookie = (name, value,options) => {
    return cookies.set(name, value, {...options})
}
//쿠키 찾기
/*
    for(int i=cookie.length-1; i>0; i--){
        if(cookies.getName().startsWith("food_")){

        }
    }
 */
export const getCookie = (name) => {
    return cookies.get(name)
}
// 전체 쿠키 읽기 Cookie[] cookies = request.getCookies()
export const getAll = () => {
    return cookies.getAll()
}