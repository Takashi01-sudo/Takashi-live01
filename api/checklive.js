export default async function handler(req, res) {
  const username = "abdillahzuhdi63";

  try {
    const r = await fetch(`https://www.tiktok.com/@${username}/live`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 14; SM-G996B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Connection": "keep-alive",
        "Referer": `https://www.tiktok.com/@${username}`
      }
    });

    const html = await r.text();

    // Tidak live → TikTok menampilkan teks-teks ini
    if (
      html.includes("is not live") ||
      html.includes("LIVE isn't available") ||
      html.includes("This LIVE") ||
      html.includes("currently offline") ||
      html.includes("offline")
    ) {
      return res.status(200).json({
        live: false,
        username,
        live_url: null
      });
    }

    // Jika live
    const liveUrl = `https://www.tiktok.com/@${username}/live`;

    return res.status(200).json({
      live: true,
      username,
      live_url: liveUrl
    });

  } catch (e) {
    return res.status(500).json({
      live: false,
      error: "Gagal fetch halaman TikTok"
    });
  }
}
