import { Navbar } from "../../components/Navbar/Navbar";
import Dashboard from "../../components/Dashboard/Dashboard";
import { MarginTwoTone } from "@mui/icons-material";

export function Home() {
  return (
    <div style={{ marginLeft: "0rem", marginTop: "0vh", marginRight: "2rem" }}>
      {/* <Navbar /> */}
      <main className="loggedIn">
        <Dashboard />
      </main>
    </div>
  );
}
