import Typography from '@/components/Typography/Typography'
import { BLOCKS, INLINES, MARKS, Node } from '@contentful/rich-text-types'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

let keyCounter = 0
export const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Node, children: ReactNode) => {
      const key = `paragraph-${keyCounter++}`
      return (
        <p key={key} className={'my-1 text-text-primary-light dark:text-text-primary-dark font-poppins'}>
          {children}
        </p>
      )
    },
    [BLOCKS.HEADING_1]: (node: Node, children: ReactNode) => {
      const key = `heading-1-${keyCounter++}`
      return (
        <Typography key={key} variant='h1' className={'my-4'}>
          {children}
        </Typography>
      )
    },
    [BLOCKS.HEADING_2]: (node: Node, children: ReactNode) => {
      const key = `heading-2-${keyCounter++}`
      return (
        <Typography key={key} variant='h2' className={'my-3'}>
          {children}
        </Typography>
      )
    },
    [BLOCKS.HEADING_3]: (node: Node, children: ReactNode) => {
      const key = `heading-3-${keyCounter++}`
      return (
        <Typography key={key} variant='h3' className={'my-2'}>
          {children}
        </Typography>
      )
    },
    [BLOCKS.HEADING_4]: (node: Node, children: ReactNode) => {
      const key = `heading-4-${keyCounter++}`
      return (
        <Typography key={key} variant='h4' className={'my-1'}>
          {children}
        </Typography>
      )
    },
    [BLOCKS.HEADING_5]: (node: Node, children: ReactNode) => {
      const key = `heading-5-${keyCounter++}`
      return (
        <Typography key={key} variant='h5' className={'my-1'}>
          {children}
        </Typography>
      )
    },
    [BLOCKS.HEADING_6]: (node: Node, children: ReactNode) => {
      const key = `heading-6-${keyCounter++}`
      return (
        <Typography key={key} variant='h6' className={'my-1'}>
          {children}
        </Typography>
      )
    },
    [INLINES.HYPERLINK]: (node: Node, children: ReactNode) => {
      const key = `hyperlink-${keyCounter++}`
      return (
        <Link
          key={key}
          href={node.data.uri || ''}
          target='_blank'
          className='underline'
        >
          {children}
        </Link>
      )
    },
    [INLINES.ENTRY_HYPERLINK]: (node: Node, children: ReactNode) => {
      const key = `entry-hyperlink-${keyCounter++}`
      return (
        <Link
          key={key}
          href={node.data.uri || ''}
          target='_blank'
          className='underline'
        >
          {children}
        </Link>
      )
    },
    [BLOCKS.LIST_ITEM]: (node: Node, children: ReactNode) => {
      const key = `list-item-${keyCounter++}`
      return (
        <li key={key} className='py-4'>
          {children}
        </li>
      )
    },
    [BLOCKS.UL_LIST]: (node: Node, children: ReactNode) => {
      const key = `ul-list-${keyCounter++}`
      return (
        <ul key={key} className='[&>li]:list-disc'>
          {children}
        </ul>
      )
    },
    [BLOCKS.OL_LIST]: (node: Node, children: ReactNode) => {
      const key = `ol-list-${keyCounter++}` // 💡 LADE TILL NYCKEL HÄR
      return (
        <ol key={key} className='[&>li]:list-decimal marker:[&>li]:font-semibold'>
          {children}
        </ol>
      )
    },
    [BLOCKS.QUOTE]: (node: Node, children: ReactNode) => {
      const key = `quote-${keyCounter++}` // 💡 LADE TILL NYCKEL HÄR
      return (
        <Typography
          key={key}
          variant='blockquote'
          className='border-l-4 border-gray-500 pl-4'
        >
          {children}
        </Typography>
      )
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
      const key = `asset-${keyCounter++}` // 💡 LADE TILL NYCKEL HÄR
      return (
        <Image
          key={key}
          src={node.data.target.fields.file.url}
          alt={node.data.target.fields.title}
        />
      )
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
      const key = `entry-${keyCounter++}` // 💡 LADE TILL NYCKEL HÄR
      return <div key={key}>{node.data.target.fields.title}</div>
    },
    [BLOCKS.HR]: () => {
      const key = `hr-${keyCounter++}` // 💡 LADE TILL NYCKEL HÄR
      return <hr key={key} className='my-4' />
    },
    [BLOCKS.TABLE]: (node: Node, children: ReactNode) => {
      const key = `table-${keyCounter++}`
      return (
        <table key={key} className='w-full border-collapse'>
          <tbody>{children}</tbody>
        </table>
      )
    },
    [BLOCKS.TABLE_ROW]: (node: Node, children: ReactNode) => {
      const key = `table-row-${keyCounter++}`
      return <tr key={key}>{children}</tr>
    },
    [BLOCKS.TABLE_CELL]: (node: Node, children: ReactNode) => {
      const key = `table-cell-${keyCounter++}`
      return (
        <td key={key} className='border border-gray-300 p-2'>
          {children}
        </td>
      )
    },
    [BLOCKS.TABLE_HEADER_CELL]: (node: Node, children: ReactNode) => {
      const key = `table-header-cell-${keyCounter++}`
      return (
        <th key={key} className='border border-gray-300 bg-gray-100 p-2'>
          {children}
        </th>
      )
    },
  },
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => (
      <span className={'font-bold'}>{text}</span>
    ),
    [MARKS.ITALIC]: (text: ReactNode) => (
      <span className={'italic'}>{text}</span>
    ),
    [MARKS.UNDERLINE]: (text: ReactNode) => (
      <span className={'underline'}>{text}</span>
    ),
  },
  preserveWhitespace: true,
}