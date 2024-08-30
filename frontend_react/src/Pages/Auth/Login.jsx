import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Login() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {  {/* handle the submission of the form*/}
        {/* fetch by default perform a get request but this end point(api/login) is expecting a post request with the values in the body of our request thats why we add the method...*/}
        {/*we need to convert the formdata from an object to a json forma that why we use json stringify */}
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(formData),
    });

     {/* await gives us a promise*/}
     {/* the errors we use here is the property in the data variable which is the response*/}

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem('token', data.token);  {/*  (key,value)*/}
      setToken(data.token);
      navigate('/');
    }
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold mt-16 mb-6">Log in</h1>

      <form onSubmit={handleLogin} className="flex max-w-md flex-col gap-4 mx-auto">
        <div>
          <Label htmlFor="email" value="Your email" />
          <TextInput
            id="email"
            type="text"
            placeholder="name@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>

            {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="password" value="Your password" />
          <TextInput
            id="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <div className="flex flex-wrap gap-2">
        <Button type="submit" gradientDuoTone="purpleToPink" className="w-full text-center shadow-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-pink-500 transition duration-300">Log In</Button>
        </div>
      </form>

      <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/register" className="text-purple-600 hover:underline">
              register
            </Link>
          </p>
    </>
  );
}
