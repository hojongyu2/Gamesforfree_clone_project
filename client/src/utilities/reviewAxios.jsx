import { axiosWithCSRF } from "./axiosWithCSRF"

export const writeReview = async (ratingValueWithId) => {
    try {
        const response = await axiosWithCSRF.post('reviews', ratingValueWithId)
        if (response.data.success === true){
            return response.data
        }
    } catch (e) {
        console.log("Error occurred while fetching data for submit review for the game", e)
    }
}

export const getAllReviews = async (id) => {
    const paramsData = {
        api_id : id
    }
    try {
        const response = await axiosWithCSRF.get('reviews', {
            params: paramsData
        })
            if(response.data.success === true){
                return response.data
            } 
    } catch (e) {
        console.log("Error occurred while fetching data to get all reviews for the game", e)
    }
}
