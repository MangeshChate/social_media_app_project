import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INTIAL_STATE =  {
    user:{
        "_id": {
          "$oid": "650c4ad9dd6305ae6eb8c148"
        },
        "username": "mangesh",
        "email": "mangesh@gmail.com",
        "password": "$2b$10$bVlSVG67uyvfcvBDkZTvL.iZMuPZ2s1Wx.o2PBcmk2HYEWOrTRCry",
        "profilePicture": "",
        "coverPicture": "",
        "followers": [],
        "following": [],
        "isAdmin": false,
        "createdAt": {
          "$date": "2023-09-21T13:53:29.625Z"
        },
        "updatedAt": {
          "$date": "2023-09-21T14:12:15.267Z"
        },
        "__v": 0,
        "desc": "Hey I am Mangesh Chate",
        "city": "Nanded",
        "from": "Nanded",
        "relationship": 1
      },
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INTIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state , dispatch] = useReducer(AuthReducer,INTIAL_STATE);

    return(
        <AuthContext.Provider 
        value={({
            user:state.user , 
            isFetching:state.isFetching ,
            error:state.error,
            dispatch
        })}>
            {children}
        </AuthContext.Provider>
    )
}