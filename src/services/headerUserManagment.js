import { ref } from 'vue'

const localStorageToken = ref(false);
const isAdmin = ref(false);

const getAdmin = () => {
    const token = localStorage.getItem("localcashToken");

    if (!token) {
        return false;
    }

    const decodedToken = parseJwt(token);

    return !!(decodedToken && decodedToken.isAdmin === true);
};

const parseJwt = (token) => {

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

const updateVariable = () => {
    const token = localStorage.getItem("localcashToken");

    if (token) {
        localStorageToken.value = true;
        isAdmin.value = getAdmin();
    } else {
        localStorageToken.value = false;
        isAdmin.value = false;
    }
};

export { isAdmin, localStorageToken, updateVariable };

