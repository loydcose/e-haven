import { Tab } from "@/app/admin/page"
import { create } from "zustand"

type Sort = "asc" | "desc" | null

type AdminFilterStore = {
  sort: Sort
  setSort: (sort: Sort) => void

  search: string
  setSearch: (search: string) => void

  activeSection: Tab
  setActiveSection: (section: Tab) => void
}

export const useAdminFilterStore = create<AdminFilterStore>()((set) => ({
  sort: null,
  setSort: (sort) => set(() => ({ sort })),

  search: "",
  setSearch: (search) => set(() => ({ search })),

  activeSection: "users",
  setActiveSection: (section) =>
    set(() => ({ activeSection: section, sort: null, search: "" })),
}))
