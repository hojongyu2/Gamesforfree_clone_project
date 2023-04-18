import { axiosWithCSRF } from "./axiosWithCSRF"

export const userSignUp = async (userDataObj) => {
    //object destructuring to extract data from userDataObj
    const { email , first_name, last_name, password, profile_pic, signup } = userDataObj

    // FormData() is a built in javascript function that can handle binary data, such as images. EX: 
    // Sending JSON object file can't handle binary data especially when making HTTP requests, so Formdata is useful here.
    const formData = new FormData()
    formData.append("email", email);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("password", password);
    formData.append("signup", signup);

    if (profile_pic) {
        formData.append("profile_pic", profile_pic);
    }
    try {
        // Send the request using FormData
        const response = await axiosWithCSRF.post("user/", formData);
        return { success: response.data };
    } catch (e) {
        console.log(e);
        return { success: false, error: e.message };
    }

    ////// JSON object example 
    // try{
    //     let response = await axiosWithCSRF.post("user/", {
    //         email,
    //         first_name,
    //         last_name,
    //         password,
    //         profile_pic,
    //         signup,
    //     })
    //     return {success: response.data}
    // } catch (e) {
    //     console.log(e)
    //     return {success: false, error: e.message}
    // }
}

export const userLogin = async (userDataObj) => {
    const {email, password, login} = userDataObj
    const response = await axiosWithCSRF.post("user/", {
        email,
        password,
        login,
    })
    return response.data
}

export const userLogout = async () => {
    const response = await axiosWithCSRF.put("user/", {
        logout: true
    })
    return response.data.success
}