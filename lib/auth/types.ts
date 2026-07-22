export type SessionRole = "SUPERADMIN" | "ADMIN" | "CUSTOMER";

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: SessionRole;
};
