import axios from 'axios';

// TODO: Pasarlo a una env variable
const PAGE_SPEED_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const api = axios.create({
    baseURL: PAGE_SPEED_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;