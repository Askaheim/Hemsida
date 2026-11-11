export type PageLinkProps = {
  title: string
  path: string
}[]

const pageLinks: PageLinkProps = [
  {
    title: 'Hem',
    path: '/',
  },
  {
    title: 'Skorsten & Murstock',
    path: '/features',
  },
  {
    title: 'Kakelugn',
    path: '/ovens',
  },
  {
    title: 'Om oss',
    path: '/about',
  },
  {
    title: 'Kontakt',
    path: '/contact',
  },
]

export default pageLinks
