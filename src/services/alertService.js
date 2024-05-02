import { ref } from 'vue'

const AlertMessage = ref("");
const isAlert = ref(false);

const setAlertMessage = (message) => {
    AlertMessage.value = message;
    isAlert.value = true;
};

const setAlert = (alert) => {
    isAlert.value = alert;
}

export { isAlert, AlertMessage, setAlertMessage, setAlert };

