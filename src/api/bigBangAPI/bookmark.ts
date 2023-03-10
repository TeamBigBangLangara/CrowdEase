import project from "./baseURL";


export const addBookmark = async(postData: {user_id:string, event_id?:string}) => { 

    // const postData = {
    //         user_id: ' ',
    //         event_id: eventId,
    // };

    await project.post('/bookmark', postData).then((res) => {
    console.log( res.status);
    });
};