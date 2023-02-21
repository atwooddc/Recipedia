import axios from "axios";

import { getBaseUrlClient } from "./getBaseClientUrl";

export const api = axios.create({
    baseURL: getBaseUrlClient(),
    withCredentials: true,
});
