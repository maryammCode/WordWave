"use client";
import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { AppContext } from "../Context/AppContext";

export default function Layout() {

  const { user, token, setUser, setToken, setSuccess } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch('/api/logout', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await res.json();

    if (res.ok) {
      setSuccess(data.message);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  return (
    <>
      <header>
        <Navbar fluid rounded>
          <Navbar.Brand>
            <img src="https://cdn-icons-png.freepik.com/256/13408/13408915.png" className="mr-3 h-6 sm:h-9" alt="App Logo" />
            <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-semibold">
              WordWave
            </span>
          </Navbar.Brand>
         
          <div className="flex md:order-2">
            {user ? (
             <>
                <Link to="/" className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-semibold mr-8">Home</Link>

                <DarkThemeToggle />

              <Dropdown
                 arrowIcon={false}
                 inline
                label={
                  <Avatar className="ml-4"
                    alt="User settings"
                    img="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user.name}</span>
                  <span className="block truncate text-sm font-medium">{user.email}</span>
                </Dropdown.Header>

                <Dropdown.Item>
                  <Link to="/create">Create post</Link>
                </Dropdown.Item>

                <Dropdown.Divider />
               
                 <form onSubmit={handleLogout}>
                    <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 block text-left dark:text-white">Sign out</button>
                 </form>
                
              </Dropdown>
              </>
            ) : (
              <div className="space-x-4">
                <DarkThemeToggle />
                <Link to="/register" className="nav-link">Register</Link>
                <Link to="/login" className="nav-link">Login</Link>
              </div>
            )}
           
          </div>
        </Navbar>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
