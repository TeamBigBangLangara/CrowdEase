import axios from "axios";

const project = axios.create({
    baseURL: "http://crowdease.wmdd4950.com",
});

export default project;