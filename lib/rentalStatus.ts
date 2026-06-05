export type RentalStatus = 'rented' | 'pending' | 'vacant' | string

export function statusLabel(status: RentalStatus): string {
  switch (status) {
    case 'rented':  return 'Rented'
    case 'pending': return 'Pending'
    case 'vacant':  return 'Available Now'
    default:        return status.charAt(0).toUpperCase() + status.slice(1)
  }
}

export function statusColor(status: RentalStatus): string {
  switch (status) {
    case 'rented':  return '#2D7A4F'
    case 'pending': return '#C9A961'
    case 'vacant':  return '#2D7A4F'
    default:        return '#2D7A4F'
  }
}

export function statusBg(status: RentalStatus): string {
  switch (status) {
    case 'rented':  return 'rgba(45,122,79,0.12)'
    case 'pending': return 'rgba(201,169,97,0.15)'
    case 'vacant':  return 'rgba(45,122,79,0.12)'
    default:        return 'rgba(45,122,79,0.12)'
  }
}

/** Returns false for statuses where "days on market" is meaningless */
export function showDaysOnMarket(status: RentalStatus): boolean {
  return status === 'rented' || status === 'pending'
}
