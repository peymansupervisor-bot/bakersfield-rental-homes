export type RentalStatus = 'rented' | 'pending' | 'vacant' | string

export function statusLabel(status: RentalStatus): string {
  switch (status) {
    case 'rented':  return 'Rented'
    case 'pending': return 'Pending'
    case 'vacant':  return 'Coming Soon'
    default:        return status.charAt(0).toUpperCase() + status.slice(1)
  }
}

export function statusColor(status: RentalStatus): string {
  switch (status) {
    case 'rented':  return '#2D7A4F'
    case 'pending': return '#C9A961'
    case 'vacant':  return '#B03A2E'
    default:        return '#B03A2E'
  }
}

export function statusBg(status: RentalStatus): string {
  switch (status) {
    case 'rented':  return 'rgba(45,122,79,0.12)'
    case 'pending': return 'rgba(201,169,97,0.15)'
    case 'vacant':  return 'rgba(176,58,46,0.1)'
    default:        return 'rgba(176,58,46,0.1)'
  }
}

/** Returns false for statuses where "days on market" is meaningless */
export function showDaysOnMarket(status: RentalStatus): boolean {
  return status === 'rented' || status === 'pending'
}
