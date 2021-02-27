export interface DecodedJwt {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}
