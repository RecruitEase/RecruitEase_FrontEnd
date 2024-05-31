import React from 'react'
import { Link } from 'react-router-dom';

function MenuLink(props) {
  return (
    <Link to={props.url} style={{margin:10,textDecoration:'none',color:'white'}}>{props.urlText}</Link>

  )
}

export default MenuLink