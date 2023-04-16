import { axiosWithCSRF } from "./axiosWithCSRF"

export const userSignUp = async (userDataObj) => {
    //object destructuring to extract data from userDataObj
    const { email , first_name, last_name, password, profile_pic, signup } = userDataObj
    // console.log(userDataObj)
    try{
        let response = await axiosWithCSRF.post("user/", {
            email,
            first_name,
            last_name,
            password,
            profile_pic,
            signup,
        })
        return {success: response.data}
    } catch (e) {
        console.log(e)
        return {success: false, error: e.message}
    }
    
}