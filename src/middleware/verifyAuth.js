import jwt from "jsonwebtoken";

export function verifyAuth(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(authHeader);

  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      return res.sendStatus(404);
    }

    return res.json({ message: "User verified." });
  });
}
