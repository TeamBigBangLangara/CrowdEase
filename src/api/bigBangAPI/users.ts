import project from "./baseURL";

export const requestUsers = async () => {
    return await project.get(`/user/all`).then((res) => {
        return res.data;
    });
};

export const addUser = async(email:string) => { 
    const UID='';
    const user_name='';
    const postData = {
            email: email,
            UID: ' ',
            user_name: ' ',
    };

    await project.post('/user', postData).then((res) => {
    console.log( res.status);
    });
};