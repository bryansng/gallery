import React from "react"
import styled from "styled-components"

const Button = styled.button.attrs({
  className: `b--gray ma0 br2 ba hover-bg-light-gray`,
})`
  padding: 6px 20px;
  transition: 0.15s ease-out;
  background-color: transparent;
  min-width: 100px;
  &:hover {
    border-color: #505050;
    transition: 0.15s ease-in;
  }
`

function Account() {
  return <Button type="">Sign in</Button>
}

export default Account
