import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("firstName")} placeholder="Enter name" />
      <input {...register("email")} placeholder="Enter email" />
      <input {...register("password")} placeholder="Enter password  " />
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
}

export default Signup;

// import { useEffect, useState } from "react";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(name, password, email);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="min-h-screen flex flex-col justify-center item-center gap-y-2"
//     >
//       <input
//         type="text"
//         value={name}
//         placeholder="Enter your FirstName"
//         onChange={(e) => setName(e.target.value)}
//       ></input>
//       <input
//         type="email"
//         value={email}
//         placeholder="Enter your Email"
//         onChange={(e) => setEmail(e.target.value)}
//       ></input>
//       <input
//         type="password"
//         value={password}
//         placeholder="Enter your Password"
//         onChange={(e) => setPassword(e.target.value)}
//       ></input>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
// export default Signup;
