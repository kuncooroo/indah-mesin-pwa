import { profileUser, type ProfileFormData, type Gender } from "@/lib/data/profile";

const STORAGE_KEY = "industrialx_profile";

export function getProfileData(): ProfileFormData {
  if (typeof window === "undefined") return profileUser;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return profileUser;
    return { ...profileUser, ...JSON.parse(raw) } as ProfileFormData;
  } catch {
    return profileUser;
  }
}

export function saveProfileData(data: ProfileFormData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export type { ProfileFormData, Gender };
