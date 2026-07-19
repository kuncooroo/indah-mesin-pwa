export type SessionRole = "SUPERADMIN" | "ADMIN";

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: SessionRole;
};
