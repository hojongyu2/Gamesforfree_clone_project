import { axiosWithCSRF } from "./axiosWithCSRF"

export const rateMygame = async (ratingValueWithId) => {
    try {
        const response = await axiosWithCSRF.post('ratings', ratingValueWithId)
        if (response.data.success === true){
            return response.data
        }
    } catch (e) {
        console.log("Error occurred while fetching data for rating the game", e)
    }
}

export const getAllRatings = async (id) => {
    const paramsData = {
        api_id : id
    }
    try {
        const response = await axiosWithCSRF.get('ratings', {
            params: paramsData
        })
            if(response.data.success === true){
                return response.data
            } 
    } catch (e) {
        console.log("Error occurred while fetching data for rating the game", e)
    }
}
