export function postUser(req, res) {
  console.log(`${req.method} request made on server.}`);
  res.json({ message: "Post request successful" });
}
