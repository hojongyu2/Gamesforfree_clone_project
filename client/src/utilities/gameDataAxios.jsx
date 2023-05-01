import { axiosWithCSRF } from "./axiosWithCSRF"

export const getRandomThree = async () => {
    try {
        const response = await axiosWithCSRF.get('games/', { // params are required to send data in the URL
            params: {
                get_random_three: true
            }
        });
        const data = response.data
        return data
    } catch (error) {
        console.error('Error fetching random three:', error);
    }
};

export const getGameList = async (filters) => {
    const defaultFilters = {
        sort_by: null,
        category: null,
        platform: null,
    }
    //
    const updateFilters = {
        ...defaultFilters,
        ...filters,
    }

    const asArray = Object.entries(updateFilters) // turn into an array
    const filteredFromAsArray = asArray.filter(([key, value]) => {return value !== null}) // filter out null value
    const arrayToObjectWithUpdatedFilters = Object.fromEntries(filteredFromAsArray) // transforms list of key-value paris into an object

    try {
        const response = await axiosWithCSRF.get('games/', {
            params: arrayToObjectWithUpdatedFilters, // send params with filtered data
        })
        // console.log(response)
        const data = response.data
        return data
    } catch (e) {
        console.log('Error while fetching game data', e)
    }
}

export const getGameDetailById = async (id) => {
    const filters = {
        get_detail: id
    }

    try {
        const response = await axiosWithCSRF.get('games/', {
            params: filters
        })
        const data= response.data
        return data
    } catch (e) {
        console.log('Error while fetching game data', e)
    }
}

export const saveGameDataAndAddToMyFavList = async (data) => {
    try {
        const response = await axiosWithCSRF.post('games/', data)
            return response.data
    } catch (e) {
        console.log('Error while fetching game data', e)
    }
}

export const getMyFavoriteGameList = async () => {
    const paramsData = {
        my_game_list: true,
    }
    try {
        const response = await axiosWithCSRF.get('games/', {
            params: paramsData
        })
            return response.data
    } catch (e) {
        console.log('Error while fetching game data', e)
    }
}

export const deleteFromMyGameList = async (api_id) => {
    try {
        const response = await axiosWithCSRF.put('games/', {
            api_id : api_id
        } )
            return response.data
    } catch (e) {
        console.log('Error while fetching game data', e)
    }
}

export const searchGames = async (input) => {
    try {
        const response = await axiosWithCSRF.get('games/', {
            params: {
                search_term: input
            }
        });
        const data = response.data
        return data
    } catch (error) {
        console.error('Error fetching random three:', error);
    }
}
