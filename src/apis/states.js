import axios from "axios";

// eslint-disable-next-line no-undef
const fetch = () => axios.get("states", { params });

const statesApi = { fetch };

export default statesApi;
