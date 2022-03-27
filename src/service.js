import {
    // db,
    // auth,
    functions
} from "./firebase";

export const msgService = {
    msgBot
};


async function msgBot(msg) {

    const createOrderCF = functions.httpsCallable('createOrder');
    await createOrderCF({
        "sessionId": msg,
        "queryInput": {
            "text": {
                "text": "blue",
                "languageCode": "en-US"
            }
        }
    })
        .then((response) => {
            console.log("Create order response", response);
        })
        .catch((err) => {
            console.error("Create order error", err.code, err.message);
        })

}