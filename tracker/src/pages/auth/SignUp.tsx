import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "../../api/httpservice"
import { useNavigate } from "react-router-dom";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify";
const schema = z.object({
    userName: z.string().min(1, { message: "This field cannot be empty" }),
    email: z.string().min(1, { message: "This field cannot be empty" }).email({ message: "invalid email" }),
    password: z.string().min(6, { message: "Character must not lessthan 6 " })
})
export type FormData = z.infer<typeof schema>

const SignUp = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

    const onSubmit = (user: FormData) => {
        async function fetchData() {
            await axios.post("/create", user)
                .then(({ data }) => {

                    navigate("/login")
                    toast.success(data.message)


                }).catch(error => {
                    if (error.response) {
                        toast.error(error.response.data.message)
                    } else if (error.request) {
                        toast.error(`Internal Server Error`)
                    }
                })
        }
        fetchData()


    }

    return (
        <div className="flex justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="m-[50px] text-start bg-white shadow-md py-[50px] px-[100px]"
            >
                <div className="mb-[20px]">
                    <label htmlFor="" className="mb-[10px] text-start">
                        UserName
                    </label>
                    <br />
                    <input
                        {...register('userName')}
                        id="name"
                        type="text"
                        className="w-[300px] h-[50px] border pl-[10px] focus:outline-none rounded-md"
                    />
                </div>
                {errors.userName && <p className="text-red-500"> {errors.userName.message}</p>}
                <div className="mb-[20px]">
                    <label htmlFor="" className="mb-[10px] text-start">
                        Email
                    </label>
                    <br />
                    <input
                        {...register('email')}
                        id="email"
                        type="email"
                        className="w-[300px] h-[50px] border pl-[10px] focus:outline-none rounded-md"

                    />
                </div>
                {errors.email && <p className="text-red-500"> {errors.email.message}</p>}
                <div className="mb-[20px]">
                    <label htmlFor="" className="mb-[10px] text-start">
                        Password
                    </label>
                    <br />
                    <input
                        {...register('password')}
                        id="password"
                        type="password"
                        className="w-[300px] h-[50px] border pl-[10px] focus:outline-none rounded-md"
                    />
                </div>
                {errors.password && <p className="text-red-500"> {errors.password.message}</p>}
                <div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

                <p>
                    Already have an account{" "}
                    <span className="text-green-400">
                        <Link to="/login">Login</Link>
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignUp;