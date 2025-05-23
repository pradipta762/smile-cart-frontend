import axios from "axios";

const fetch = () => axios.get("states", { params })

const statesApi = { fetch }

export default statesApi;