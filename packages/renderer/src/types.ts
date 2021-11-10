import { AllHTMLAttributes } from 'react'

export type CustomCanvasAttributes = Partial<{
  /* this won't render to dom unless prop start with 'data-' or 'aria-' */
  useFabric: boolean
}>

export type BaseCanvasPropsType = AllHTMLAttributes<HTMLCanvasElement> & CustomCanvasAttributes
