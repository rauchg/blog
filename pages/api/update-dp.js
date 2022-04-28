async function getLatestDP(username) {
  const response = await fetch(
    `https://api.twitter.com/1.1/users/show.json?screen_name=${username}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.json();

  if (data.errors) {
    return `https://avatar.tobi.sh/${username}`; // use `avatar.tobi.sh` as a placeholder image
  } else {
    return data.profile_image_url_https.replace('_normal', '');
  }
}

export default async function handler(req, res) {
  const { username } = req.query;

  const latestDP = await getLatestDP(username);

  res.status(200).json({ src: latestDP });
}
