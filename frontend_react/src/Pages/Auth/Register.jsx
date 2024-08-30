import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { Button, Label, TextInput } from "flowbite-react";

export default function Register(){
    const{setToken}=useContext(AppContext)

    const navigate=useNavigate();

    const[formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
    });

    const[errors,setErrors]=useState({});

    async function handleRegister(e){ {/* handle the submission of the form*/}

       {/* fetch by default perform a get request but this end point(api/register) is expecting a post request with the values in the body of our request thats why we add the method...*/}
        {/*we need to convert the formdata from an object to a json forma that why we use json stringify */}
        e.preventDefault();
        const res = await fetch('/api/register',{      
            method:'post',
            body:JSON.stringify(formData),
        });
        {/* await gives us a promise*/}

        {/* the errors we use here is the property in the data variable which is the response*/}
        const data= await res.json()
        if (data.errors){
            setErrors(data.errors)
            
        }else{
            localStorage.setItem('token',data.token);  {/*  (key,value)*/}
            setToken(data.token);
            navigate('/');
            
        }


       

    }
    return (
        <>
          <h1 className="text-2xl font-bold mt-16 mb-6 text-center">Create a new account</h1>
    
          <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-6">
            <div>
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                {/* color={errors.name ? "failure" : "default"} */}
              {errors.name && <p className="text-red-600">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="text"
                placeholder="email@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>

              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="******"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>

              {errors.password && <p className="text-red-600">{errors.password}</p>}
            </div>

            <div>
              <Label htmlFor="password_confirmation" value="Confirm Password" />
              <TextInput
                id="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value }) } />
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink" className="w-full text-center shadow-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-pink-500 transition duration-300">
              Register
            </Button>
          </form>
    
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Log in
            </Link>
          </p>
        </>
      );
    }