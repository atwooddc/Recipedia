import axios from 'axios'

import { getBaseUrlClient } from './getBaseClientUrl'

export const api = api.create({
    baseURL: getBaseUrlClient(),
    withCredentials: true
})