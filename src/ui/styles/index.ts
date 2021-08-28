import styled, { css } from "styled-components"

// #region -- Typography definitions -- 

const fontMono = css`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
`

const FONT_SIZE = {
  xs: "0.75rem",
}

// #endregion

// #region -- Colors -- 
const RED = {
  500: "rgb(239, 68, 68)",
}

const GRAY = {
  800: "rgb(31, 41, 55)",
  900: "rgb(17, 24, 39)",
}


const SIZE = {
  1: "0.25rem",
}

export const Panel = styled.div`
  background-color: ${GRAY[800]};
  padding: ${SIZE[1]};
  height: 100%;
  border: 1px solid ${GRAY[900]};
  color: white;
`

export const PanelLabel = styled.h4`
  color: ${RED[500]};
  font-size: ${FONT_SIZE.xs};
  ${fontMono}
`
