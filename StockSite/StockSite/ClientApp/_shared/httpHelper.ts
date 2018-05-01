import * as $ from "jquery";
import Constants from "./constants";

export module HttpHelper {
    export function getObject(onsuccess: any): JQueryXHR {
        return $.ajax({
            headers: {'Authorization': localStorage.getItem("BearerAuthorizationKey")},
            dataType: "json",
            url: Constants.VALUES_OBJECT_URL,
            success: data => onsuccess(data)
        });
    }

    export function logIn(username: string, password: string, onsuccess: any): JQueryXHR {
        return $.ajax({
            dataType: "json",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: Constants.LOGIN_URL,
            method: 'POST',
            data: JSON.stringify({"username": username, "password": password}),
            success: data => {
                localStorage.setItem("BearerAuthorizationKey", "Bearer " + data.token);
                onsuccess(data);
            }
        });
    }

    export function refreshToken(onsuccess: any): JQueryXHR {
        return $.ajax({
            dataType: "json",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: Constants.REFRESH_TOKEN_URL,
            method: 'POST',
            data: JSON.stringify({"username": username, "password": password}),
            success: data => {
                localStorage.setItem("BearerAuthorizationKey", "Bearer " + data.token);
                onsuccess(data);
            }
        });
    }
}