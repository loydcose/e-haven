import { Tab } from "@/app/admin/page"
import { create } from "zustand"
import { useAdminFilterStore } from "./admin-filter"

type AdminTab = {
  activeSection: Tab
  setActiveSection: (section: Tab) => void
}

export const useAdminTabStore = (initActiveSelection: Tab) => {
  const { setSort, setSearch } = useAdminFilterStore()

  return create<AdminTab>()((set) => ({
    activeSection: initActiveSelection,
    setActiveSection: (section) =>
      set(() => {
        setSort("asc")
        setSearch("")
        return { activeSection: section }
      }),
  }))
}
