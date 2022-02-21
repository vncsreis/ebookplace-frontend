import { AuthProvider } from "./AuthContext";
import { UIProvider } from "./UIContext";

interface ContextWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export function ContextWrapper(props: ContextWrapperProps) {
  return (
    <AuthProvider>
      <UIProvider>{props.children}</UIProvider>
    </AuthProvider>
  );
}
