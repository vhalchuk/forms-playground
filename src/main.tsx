import { ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SimplestForm } from "./slides/simplest-form.tsx";
import './index.css'

const slides: (() => ReactNode)[] = [
    SimplestForm,
];

const CurrentSlide = slides[0];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrentSlide />
  </StrictMode>,
)
