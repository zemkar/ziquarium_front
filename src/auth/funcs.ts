import authHeader from './service/authHeader';

const authorization = () => {
    var accessToken: string | null = localStorage.getItem("access");
    if (accessToken) {
        return authHeader(accessToken)
    }
    return null;

}


const authFuncs = {
    authorization,
}

export default authFuncs