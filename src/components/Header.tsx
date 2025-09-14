import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

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
            <span className="text-xl font-bold text-foreground">Jobs Feed</span>
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
                    className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => {
                      // These are placeholder links - they don't go anywhere yet
                      toast({
                        title: "Coming Soon!",
                        description: `${item.name} feature is coming soon.`,
                      });
                    }}
                  >
                    {item.name}
                  </Button>
                )}
              </div>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-2 ml-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.email?.split('@')[0]}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="ml-4">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
          
          <div className="md:hidden flex items-center space-x-2">
            {user ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={signOut}
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button size="sm" variant="ghost">Sign In</Button>
              </Link>
            )}
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