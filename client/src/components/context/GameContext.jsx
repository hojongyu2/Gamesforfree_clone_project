import { createContext, useState, useEffect } from "react";
import { getMyFavoriteGameList } from "../../utilities/gameDataAxios";

export const gameContext = createContext();

export default function GameContextProvider (props) {
    const { children } = props
    const [gameDataById, setGameDataById] = useState([])
    const [myFavGameList, setMyFavGameList]= useState([])
    const [isUpdated, setIsUpdated] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState("");
    
    useEffect(()=> {
        const fetchData = async () => {
            const data = await getMyFavoriteGameList()
            if(data.success === true){
                setMyFavGameList(data.data)
            }else {
                // console.log(data, "Unable to get Favorite game list")
                return
            }
        }
        fetchData()
    },[isUpdated])

    return (
        <gameContext.Provider value={{gameDataById, setGameDataById, myFavGameList, setMyFavGameList, isUpdated, setIsUpdated, backgroundImage, setBackgroundImage}}>
            {children}
        </gameContext.Provider>
    )
}