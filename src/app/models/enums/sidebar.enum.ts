export enum SidebarEnum {
  INBOX = 0,
  OUTBOX = 1,
  FAVORITES = 2,
  ARCHIVED = 3,
  TRASH = 4,
  SPAM = 5,
  CREATE = 6
}

export const sidebarTranslated: Record<SidebarEnum, string> = {
  [SidebarEnum.INBOX]: 'Caixa de entrada',
  [SidebarEnum.OUTBOX]: 'Enviados',
  [SidebarEnum.ARCHIVED]: 'Arquivados',
  [SidebarEnum.FAVORITES]: 'Favoritos',
  [SidebarEnum.SPAM]: 'Spam',
  [SidebarEnum.TRASH]: 'Lixeira',
  [SidebarEnum.CREATE]: 'Novo Email',
}
