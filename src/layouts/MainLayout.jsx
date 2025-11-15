import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col  text-brand-dark">
      <AppNavbar />
        <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}
