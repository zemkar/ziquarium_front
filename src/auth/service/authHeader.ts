import jwt from "jwt-decode";

export default function authHeader(accessToken: string) {
  if (accessToken) {
    var decodedToken: any = jwt(accessToken);
    var expireTime: number = decodedToken?.exp || 0;
    var delta: number = expireTime * 1000 - Date.now();
    if (delta > 0) {
      return {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken
      };
    }
  }
}
