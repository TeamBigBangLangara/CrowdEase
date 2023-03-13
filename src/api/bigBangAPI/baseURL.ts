import axios from "axios";

const project = axios.create({
    baseURL: "https://crowdease.wmdd4950.com",
});

export default project;
