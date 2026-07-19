export type HomeService = {
  id: string;
  label: string;
};

export const homeServices: HomeService[] = [
  { id: "mesin", label: "Mesin" },
  { id: "sparepart", label: "Sparepart" },
  { id: "instalasi", label: "Instalasi" },
  { id: "training", label: "Training" },
  { id: "maintenance", label: "Maintenance" },
];
