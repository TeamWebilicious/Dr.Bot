// import {
//     // db,
//     // auth,
//     functions
// } from "./firebase";
import axios from "axios";
export const msgService = {
    dialogflowGateway
};


async function dialogflowGateway(msg) {

    // const dialogflowGatewayCF = functions.httpsCallable('dialogflowGateway');
    // await dialogflowGatewayCF({
    //     "sessionId": msg,
    //     "queryInput": {
    //         "text": {
    //             "text": "blue",
    //             "languageCode": "en-US"
    //         }
    //     }
    // })
    console.log(msg);

    const article = {
        "sessionId": "fookk",
        "queryInput": {
            "text": {
                "text": msg,
                "languageCode": "en-US"
            }
        }
    }
    return await axios.post("http://localhost:5001/colombo-mail/us-central1/dialogflowGateway", article)
        .then((response) => {


            let options = []
            if (response.data.fulfillmentMessages[1])
                if (response.data.fulfillmentMessages[1].payload.fields.options.listValue) {
                    console.log("listValue");
                    let id = 1
                    response.data.fulfillmentMessages[1].payload.fields.options.listValue.values.forEach(optionRaw => {
                        console.log("values");
                        const newOption = {
                            text: optionRaw.stringValue,
                            id: ++id
                        }
                        options.push(newOption)
                    }
                    )
                }





            const res = {
                message: response.data.fulfillmentMessages[0].text.text[0],
                options: options
            }
            console.log(res);
            return res
        })
        .catch((err) => {
            console.error("Create order error", err.code, err.message);
        })

}