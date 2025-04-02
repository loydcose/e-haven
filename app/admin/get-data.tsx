import { Admin, AdminData } from "./admin"
import { getAccommodations } from "../actions"
import { getReservationsWithUserAndAccommodation } from "../actions"
import { getUsers } from "../actions"
import { Tab } from "./page"

interface DataFetcherProps {
  tab: Tab
}

async function DataFetcher({ tab }: DataFetcherProps) {
  // Fetch only the data needed for the current tab
  let data: AdminData
  switch (tab) {
    case "accommodations":
      data = { type: "accommodations", data: await getAccommodations() }
      break
    case "reservations":
      data = { type: "reservations", data: await getReservationsWithUserAndAccommodation() }
      break
    case "users":
    default:
      data = { type: "users", data: await getUsers() }
      break
  }

  // Pass the tab directly to ensure UI consistency
  return <Admin data={data} defaultTab={tab} />
}

export default DataFetcher
