type ApiSuccess<T> = { data: T };
type ApiError = { error: string };

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiSuccess<T> | ApiError;

  if (!response.ok) {
    throw new AdminApiError(
      "error" in payload ? payload.error : "Permintaan gagal",
      response.status,
    );
  }

  return (payload as ApiSuccess<T>).data;
}

export const adminApi = {
  get<T>(url: string) {
    return fetch(url, { credentials: "include" }).then((response) =>
      parseResponse<T>(response),
    );
  },

  post<T>(url: string, body: unknown) {
    return fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => parseResponse<T>(response));
  },

  patch<T>(url: string, body: unknown) {
    return fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => parseResponse<T>(response));
  },

  delete<T>(url: string) {
    return fetch(url, {
      method: "DELETE",
      credentials: "include",
    }).then((response) => parseResponse<T>(response));
  },
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: "SUPERADMIN" | "ADMIN";
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminCategory = {
  id: string;
  slug: string;
  label: string;
  icon: string | null;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  _count?: { products: number };
};

export type AdminProduct = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  status: "READY" | "INDENT";
  statusLabel: string;
  priceLabel: string;
  priceNote: string | null;
  minOrder: number;
  rating: number;
  soldCount: number;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  category?: { id: string; slug: string; label: string };
};

export type DashboardStats = {
  users: number;
  categories: number;
  products: number;
  featuredProducts: number;
  articles: number;
  faqs: number;
  reviews: number;
  rfqs: number;
  favorites: number;
  customers: number;
};

export type AdminArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "ARTIKEL" | "TIPS_MESIN" | "TEKNOLOGI" | "EVENT";
  categoryLabel: string;
  image: string;
  featured: boolean;
  isActive: boolean;
  publishedAt: string;
};

export type AdminFaq = {
  id: string;
  category: "UMUM" | "AKUN" | "LAYANAN" | "PEMESANAN";
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
};

export type AdminReview = {
  id: string;
  productId: string | null;
  authorName: string;
  company: string;
  rating: number;
  review: string;
  image: string | null;
  dateLabel: string | null;
  isActive: boolean;
  sortOrder: number;
  product?: { id: string; slug: string; name: string } | null;
};

export type AdminCustomer = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  _count: { favorites: number; rfqs: number };
};

export type AdminFavorite = {
  id: string;
  createdAt: string;
  customer: { id: string; name: string; email: string };
  product: { id: string; slug: string; name: string };
};
