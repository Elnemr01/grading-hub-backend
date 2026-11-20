

const createResponse= (data:null | any, message: string, status: string)=> {
    return {
        data,
        message,
        status,
    };
}


export default createResponse;

