import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

interface AppLayoutProps {

    children: React.ReactNode;

}

const AppLayout = ({children}: AppLayoutProps) =>{
    return (
        <div>
        <Header />
        <div className="flex flex-row">
          <NavBar />
          <div>{children}</div>
        </div>
      </div>
    )
}

export default AppLayout;