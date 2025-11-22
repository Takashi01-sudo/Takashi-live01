import axios from "axios";

export default async function handler(req, res) {
  const USER = "abdillahzuhdi63";
  const url = `https://www.tiktok.com/@${USER}`;
  const liveUrl = `https://www.tiktok.com/@${USER}/live`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      maxRedirects: 0,   // ❗ cegah redirect login
      validateStatus: () => true
    });

    const html = response.data || "";

    const isLive =
      html.includes('"isLive":true') ||
      html.includes('"liveRoomId"') ||
      html.includes("LIVE_NOW");

    return res.status(200).json({
      username: USER,
      isLive,
      live_url: isLive ? liveUrl : null,
      status: response.status
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
