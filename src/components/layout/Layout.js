import Header from "./Header";
import "./Layout.css";
import Footer from "./Footer";

export default function Layout({ title, children }) {
  return (
    <div className="layout">
      <Header className="layout-header bordered" />
      <main className="layout-main bordered">
        <h2 className="layout-title bordered">{title}</h2>
        {children}
      </main>
      <Footer className="layout-footer bordered" />
    </div>
  );
}
