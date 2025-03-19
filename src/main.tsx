import { ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SimplestForm } from "./slides/simplest-form.tsx";
import { FieldValidation } from "./slides/field-validation.tsx";
import { SubmitValidation } from "./slides/submit-validation.tsx";
import './index.css'

const slides: (() => ReactNode)[] = [
    SimplestForm,
    FieldValidation,
    SubmitValidation,
];

const CurrentSlide = slides[0];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrentSlide />
  </StrictMode>,
)
