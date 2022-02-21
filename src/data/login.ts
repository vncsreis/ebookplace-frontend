import { profiles } from "./db/profile";

export function login(profile: { email: string; password: string }) {
  const loggedProfile = profiles.filter((p) => p.email === profile.email)[0];
  if (loggedProfile) {
    return { loggedProfile, token: "1234" };
  } else {
    throw new Error("Failed to login");
  }
}

export function loginById(id: string) {
  return profiles.filter((p) => p.id === id)[0];
}
