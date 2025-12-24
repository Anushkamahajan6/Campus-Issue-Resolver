export function Form({ children }: any) {
  return <form>{children}</form>;
}
export const FormField = ({ children }: any) => children;
export const FormItem = ({ children }: any) => <div>{children}</div>;
export const FormLabel = ({ children }: any) => <label>{children}</label>;
export const FormControl = ({ children }: any) => children;
export const FormMessage = () => null;
