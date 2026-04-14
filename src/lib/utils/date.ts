export function formatDate(date: string | Date) {
  const d = new Date(date)

  const dayName = d.toLocaleDateString("en-US", { weekday: "long" })
  const month = d.toLocaleDateString("en-US", { month: "long" })
  const day = d.getDate()

  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  return `${dayName} ${day} ${month} - ${time}`
}