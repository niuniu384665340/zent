import { createContext, useContext, CSSProperties } from 'react';

export interface IFormChild {
  valid(): boolean;
  getDOMNode(): Element | null | undefined;
}

export interface IZentFormChildrenContext {
  children: IFormChild[];
  disabled: boolean;
}

export const FormChildrenContext = createContext<IZentFormChildrenContext | null>(
  null
);

FormChildrenContext.displayName = 'ZentFormChildrenContext';

export function useFormChildrenContext(): IZentFormChildrenContext {
  const ctx = useContext(FormChildrenContext);
  if (ctx === null) {
    throw new Error('Component must be used under Form');
  }
  return ctx;
}

export interface IZentFormContext {
  labelWidth?: string | number;
  labelPosition?: CSSProperties['justifyContent'];
}

export const FormContext = createContext<IZentFormContext>({});
