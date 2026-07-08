import { v4 as uuid } from "uuid";

export function getClientId() {

    let id = sessionStorage.getItem("clientId");

    if (!id) {

        id = uuid();

        sessionStorage.setItem(

            "clientId",

            id

        );

    }

    return id;

}