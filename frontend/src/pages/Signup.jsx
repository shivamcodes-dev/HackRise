import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z.object({
  firstName: z.string().min(3, "Name should contain at least 3 characters"),

  emailId: z.string().email("Please enter a valid email"),

  password: z.string().min(8, "Password should contain at least 8 characters"),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Ye function missing tha
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">HackRise</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text">First Name</span>
              </label>

              <input
                type="text"
                placeholder="John"
                className={`input input-bordered ${
                  errors.firstName ? "input-error" : ""
                }`}
                {...register("firstName")}
              />

              {errors.firstName && (
                <span className="text-error">{errors.firstName.message}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-control mt-4">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered ${
                  errors.emailId ? "input-error" : ""
                }`}
                {...register("emailId")}
              />

              {errors.emailId && (
                <span className="text-error">{errors.emailId.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-control mt-4">
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered ${
                  errors.password ? "input-error" : ""
                }`}
                {...register("password")}
              />

              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full mt-6">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { email, z } from "zod";

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Namw should contain at lest 3 char"),
//   emailId: z.string().email(),
//   password: z.string().min(8, "Password Should contain atlest 8 char"),
// });
// function Signup() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(signupSchema) });

//   return (
//   <div className="min-h-screen flex items-center justify-center p-4">
//     {/* Centering container */}
//     <div className="card w-96 bg-base-100 shadow-xl">
//       {/* Existing card styling */}
//       <div className="card-body">

//         {/* Centered title */}
//         <h2 className="card-title justify-center text-3xl">
//           Leetcode
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)}>

//           {/* First Name */}
//           <div className="form-control">
//             <label className="label mb-1">
//               <span className="label-text">First Name</span>
//             </label>

//             <input
//               type="text"
//               placeholder="John"
//               className={`input input-bordered ${
//                 errors.firstName && "input-error"
//               }`}
//               {...register("firstName")}
//             />

//             {errors.firstName && (
//               <span className="text-error">
//                 {errors.firstName.message}
//               </span>
//             )}
//           </div>

//           {/* Email */}
//           <div className="form-control mt-4">
//             <label className="label mb-1">
//               <span className="label-text">Email</span>
//             </label>

//             <input
//               type="email"
//               placeholder="john@example.com"
//               className={`input input-bordered ${
//                 errors.emailId && "input-error"
//               }`}
//               {...register("emailId")}
//             />

//             {errors.emailId && (
//               <span className="text-error">
//                 {errors.emailId.message}
//               </span>
//             )}
//           </div>

//           {/* Password */}
//           <div className="form-control mt-4">
//             <label className="label mb-1">
//               <span className="label-text">Password</span>
//             </label>

//             <input
//               type="password"
//               placeholder="••••••••"
//               className={`input input-bordered ${
//                 errors.password && "input-error"
//               }`}
//               {...register("password")}
//             />

//             {errors.password && (
//               <span className="text-error">
//                 {errors.password.message}
//               </span>
//             )}
//           </div>

//           {/* Submit button */}
//           <button type="submit" className="btn btn-primary w-full mt-6">
//             Sign Up
//           </button>

//         </form>
//       </div>
//     </div>
//   </div>
// );
// }

// export default Signup;

// // import { useEffect, useState } from "react";

// // function Signup() {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log(name, password, email);
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className="min-h-screen flex flex-col justify-center item-center gap-y-2"
// //     >
// //       <input
// //         type="text"
// //         value={name}
// //         placeholder="Enter your FirstName"
// //         onChange={(e) => setName(e.target.value)}
// //       ></input>
// //       <input
// //         type="email"
// //         value={email}
// //         placeholder="Enter your Email"
// //         onChange={(e) => setEmail(e.target.value)}
// //       ></input>
// //       <input
// //         type="password"
// //         value={password}
// //         placeholder="Enter your Password"
// //         onChange={(e) => setPassword(e.target.value)}
// //       ></input>
// //       <button type="submit">Submit</button>
// //     </form>
// //   );
// // }
// // export default Signup;
