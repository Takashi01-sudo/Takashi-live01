import axios from "axios";

const USER = "abdillahzuhdi63";

export default async function handler(req, res) {
    try {
        const url = `https://www.tiktok.com/@${USER}`;
        const liveUrl = `https://www.tiktok.com/@${USER}/live`;

        const html = await axios.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        const isLive = html.data.includes('"isLive":true');

        return res.status(200).json({
            username: USER,
            live: isLive,
            live_url: isLive ? liveUrl : null
        });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
