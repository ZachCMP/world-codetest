import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

const Breadcrumbs = ({ crumbs = [] }) => {
  const activeIndex = crumbs.filter(e => e).length - 1

  return (
    <div>
      <Breadcrumb>
        {crumbs.filter(e => e).map(({ display, url }, i) => (
          <BreadcrumbItem key={i} active={i === activeIndex}>
            {i === activeIndex ? display : <Link to={url}>{display}</Link>}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  )
}

export default Breadcrumbs