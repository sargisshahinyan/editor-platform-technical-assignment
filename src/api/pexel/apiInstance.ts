import axios from "axios";

import { config } from "../../config";

export const apiInstance = axios.create({
  baseURL: "https://api.pexels.com/v1",
  headers: {
    Authorization: config.pexelsApiKey,
  },
});
