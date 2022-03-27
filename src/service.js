import {
    // db,
    // auth,
    functions
} from "./firebase";

export const msgService = {
    dialogflowGateway
};


async function dialogflowGateway(msg) {

    const dialogflowGatewayCF = functions.httpsCallable('dialogflowGateway');
    await dialogflowGatewayCF({
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
            return response
        })
        .catch((err) => {
            console.error("Create order error", err.code, err.message);
        })

}