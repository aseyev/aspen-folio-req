import axios from "axios";

export default axios.create({
    baseURL: "https://api.aspenclubsoftware.com/webole.asp",
    responseType: "text",
});
