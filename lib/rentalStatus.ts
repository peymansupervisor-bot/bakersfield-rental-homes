export type RentalStatus = 'rented' | 'pending' | 'vacant' | 'coming_soon' | string

export function statusLabel(status: RentalStatus): string {
  switch (status) {
    case 'rented':      return 'Rented'
    case 'pending':     return 'Pending'
    case 'vacant':      return 'Available Now'
    case 'coming_soon': return 'Coming Soon'
    default:            return status.charAt(0).toUpperCase() + status.slice(1)
  }
}

export function statusColor(status: RentalStatus): string {
  switch (status) {
    case 'rented':      return '#1e6040'
    case 'pending':     return '#7a5c0f'
    case 'vacant':      return '#0d7377'
    case 'coming_soon': return '#D4630A'
    default:            return '#1e6040'
  }
}

export function statusBg(status: RentalStatus): string {
  switch (status) {
    case 'rented':      return 'rgba(45,122,79,0.12)'
    case 'pending':     return 'rgba(201,169,97,0.15)'
    case 'vacant':      return 'rgba(13,115,119,0.12)'
    case 'coming_soon': return 'rgba(212,99,10,0.12)'
    default:            return 'rgba(45,122,79,0.12)'
  }
}

/** Returns false for statuses where "days on market" is meaningless */
export function showDaysOnMarket(status: RentalStatus): boolean {
  return status === 'rented' || status === 'pending'
}
