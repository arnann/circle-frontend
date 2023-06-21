import request from "../config/request.ts";
import {setUserState} from "../states/user.ts";
export const getCurrentUser = async () => {
    const res = await request.get("/user/current");
    if (res.data){
        setUserState(res.data);
        return res.data;
    }
    return null;
}

