import React from 'react'
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'

const PaginationComponent = ({
  page=1,
  pages=1,
  hasNext=false,
  hasPrev=false,
  range=1,
  changePage=() => {},
}) => {

  const shownPages = (
    Array(pages).fill()
    .map((_, i) => Math.abs(i + 1 - page) <= range ? i + 1 : null)
    .filter(e => e)
  )

  return (
    <Pagination aria-label="Page navgation" style={{ justifyContent: 'center' }}>
      <PaginationItem>
        <PaginationLink first onClick={() => changePage(1)} />
      </PaginationItem>
      <PaginationItem disabled={!hasPrev}>
        <PaginationLink previous onClick={() => changePage(page - 1)} />
      </PaginationItem>

      {!shownPages.includes(1) ? (
        <PaginationItem disabled>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      ) : null}

      {shownPages.map(p => (
        <PaginationItem 
          key={p} 
          active={page === p}
        >
          <PaginationLink onClick={() => changePage(p)}>
            {p}
          </PaginationLink>
        </PaginationItem>
      ))}

      {!shownPages.includes(pages) ? (
        <PaginationItem disabled>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      ) : null}

      <PaginationItem disabled={!hasNext}>
        <PaginationLink next onClick={() => changePage(page + 1)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last onClick={() => changePage(pages)} />
      </PaginationItem>
    </Pagination>
  )
}

export default PaginationComponent