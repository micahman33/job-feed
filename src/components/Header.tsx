import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", active: true },
    { name: "Company Reviews", path: "#", active: false },
    { name: "Find Salaries", path: "#", active: false },
    { name: "Post a Job", path: "/post-job", active: true },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">JobSeeker</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.active ? (
                  <Link to={item.path}>
                    <Button 
                      variant={location.pathname === item.path ? "default" : "ghost"}
                      className="text-sm font-medium"
                    >
                      {item.name}
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="ghost" 
                    className="text-sm font-medium text-muted-foreground cursor-not-allowed opacity-50"
                    disabled
                  >
                    {item.name}
                  </Button>
                )}
              </div>
            ))}
          </nav>
          
          <div className="md:hidden">
            <Link to="/post-job">
              <Button size="sm">Post Job</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;