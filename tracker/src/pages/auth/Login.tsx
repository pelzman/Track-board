import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "../../api/httpservice"
import { toast } from "react-toastify";


const schema = z.object({
    email: z.string().min(1, { message: "This field cannot be empty" }).email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Character must not lessthan 6 " })

})
export type FormData = z.infer<typeof schema>

const Login = () => {
    //  const[users , setUsers] = useState({})
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

    const onSubmit = (user: FormData) => {
        async function fetchData() {
            await axios.post("/login", user)
                .then(({ data }) => {
                    localStorage.setItem("user", JSON.stringify(data))
                    localStorage.setItem("token", data.token)
                    navigate("/home")
                    toast.success(data.message)
                    reset()

                })
                .catch(error => {
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
            <form onSubmit={handleSubmit(onSubmit)}

                className='m-[50px] text-start bg-white shadow-md py-[50px] px-[100px]' >


                <div className='mb-[20px]'>
                    <label htmlFor="" className='mb-[10px] text-start '> Email</label><br />
                    <input{...register('email')} id="email" type="text" className=' w-[300px] h-[50px] border pl-[10px] focus:outline-none rounded-md' />

                </div>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                <div className='mb-[20px]'>
                    <label htmlFor="" className='mb-[10px] text-start '> Password</label><br />
                    <input  {...register('password')} id="password" type="password" className=' w-[300px] h-[50px] border pl-[10px] focus:outline-none rounded-md' />

                </div>
                {errors.password && <p className="text-red-500"> {errors.password.message}</p>}
                <div>
                    <button type="submit" className='btn btn-primary'>
                        Login
                    </button>
                </div>

                <p>Don't have an account <span className='text-green-400'><Link to="/">Register here</Link></span></p>




            </form>
        </div>
    )
}

export default Login