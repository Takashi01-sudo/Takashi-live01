// api/checklive.js
import axios from "axios";

const USER = "abdillahzuhdi63"; // fixed user
const PROFILE_URL = `https://www.tiktok.com/@${USER}`;
const LIVE_URL = `https://www.tiktok.com/@${USER}/live`;

export default async function handler(req, res) {
  try {
    const response = await axios.get(PROFILE_URL, {
      headers: {
        // gunakan user-agent "browser-like"
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      },
      maxRedirects: 0,
      validateStatus: () => true
    });

    const html = response.data || "";

    // heuristik cek live (beberapa indikator berbeda)
    const isLive =
      html.includes('"isLive":true') ||
      html.includes('"liveRoomId"') ||
      /LIVE(_NOW)?/i.test(html) ||
      html.includes('"is_external_live":true');

    return res.status(200).json({
      username: USER,
      live: !!isLive,
      live_url: isLive ? LIVE_URL : null,
      status: response.status
    });
  } catch (err) {
    // jangan crash - selalu return JSON
    return res.status(500).json({
      error: "internal",
      message: err?.message ?? String(err)
    });
  }
}
