import { axiosWithCSRF } from "./axiosWithCSRF"

export const getRandomThree = async () => {
    try {
        const response = await axiosWithCSRF.get('games', {
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
getRandomThree()