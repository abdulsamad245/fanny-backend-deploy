import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Box, Button, TextField, Typography } from '@mui/material';

// Formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Icons
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { useContext } from 'react'; //
import { ColorModeContext } from '../../theme/MUI_MODE';
import { useRouter } from 'next/router';

function LoginPage() {
    const { loginUser, loading, error } = useContext(ColorModeContext);
    const router = useRouter();


    const savedUsers = localStorage.getItem('loggedInUser');
    if (savedUsers && (JSON.parse(savedUsers).lastName)) router.push('/products');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is Required!').email('Invalid E-mail address.'),
            password: Yup.string().required('Password is Required!').min(8, 'Password must be more than 8 characters.'),
        }),
        onSubmit: async (values) => {
            const success = await loginUser(values, () => {
                router.push('/products');
            } );
        },
    });

    return (
        <Box sx={{
            maxWidth: '1576px', m: 'auto', px: { xs: "20px", xl: "50px" },
            display: 'flex', alignItems: 'center', pt: "30px",
            justifyContent: 'center', gap: '30px',
            flexDirection: { xs: "row-reverse", md: "row" }
        }}>

            {/* Login Form */}
            <Box sx={{
                width: { xs: "100%", md: "600px", xl: "500px" },
            }}>

                {/* Title */}
                <Box sx={{ mb: "30px" }}>
                    <Typography variant="h5" component="h2" sx={{
                        fontWeight: "600", mb: "5px",
                        fontSize: { xs: "30px", md: "35px", xl: "40px" },
                    }}>
                        Log in
                    </Typography>

                    <Typography variant="grayText" component="p" sx={{
                        fontSize: { xs: "12px", xl: "13px" },
                        fontWeight: "500",
                    }}>
                        Don&apos;t have an account?
                        <Link href='/register'>
                            <a style={{ marginLeft: '5px', color: '#48cae4', }}>
                                Register
                            </a>
                        </Link>
                    </Typography>
                </Box>

                {/* Form */}
                <form onSubmit={formik.handleSubmit}>

                    {/* Show error if any */}
                    {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

                    {/* Email */}
                    <Box sx={{ mb: "10px" }}>
                        <Typography variant='body1' sx={{
                            fontWeight: "600", mb: "3px",
                            fontSize: { xs: "13px", md: "15px" }
                        }}>
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            size='small'
                            type='text'
                            name='email'
                            id='email'
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && formik.errors.email ? true : false}
                            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        />
                    </Box>

                    {/* Password */}
                    <Box sx={{ mb: "10px" }}>
                        <Typography variant='body1' sx={{
                            fontWeight: "600", mb: "3px",
                            fontSize: { xs: "14px", md: "15px" }
                        }}>
                            Password
                        </Typography>
                        <TextField
                            fullWidth
                            size='small'
                            type='password' // Change type to password
                            name='password'
                            id='password'
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && formik.errors.password ? true : false}
                            helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                        />
                    </Box>

                    {/* Submit Button */}
                    <Button
                        variant='contained'
                        type='submit'
                        color='button'
                        fullWidth
                        sx={{ height: "45px", }}
                        disabled={loading} // Disable button when loading
                    >
                        <Typography variant='subtitle1' sx={{
                            color: 'white', fontWeight: "600",
                            fontSize: { xs: "13px", xl: "14px" },
                        }}>
                            {loading ? 'Logging in...' : 'Log in'}
                        </Typography>
                    </Button>

                    {/* OR */}
                    <Typography variant='subtitle1' sx={{
                        fontSize: { xs: "12px", xl: "14px" },
                        textAlign: "center", my: "20px",
                    }}>
                        OR
                    </Typography>

                    {/* Register with Google and Facebook */}
                    <Box sx={{
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between", gap: { xs: "15px" },
                        flexDirection: { xs: "column", md: "row" }
                    }}>

                        {/* Google */}
                        <Button variant='outlined' sx={{
                            height: "45px", width: { xs: "100%", md: "280px", xl: "240px" }
                        }}>
                            <FcGoogle size={25} />
                            <Typography variant='subtitle1' sx={{
                                ml: "7px", fontWeight: "600",
                                fontSize: { xs: "12px", md: "12px" },
                            }}>
                                Log in with Google
                            </Typography>
                        </Button>

                        {/* Facebook */}
                        <Button variant='outlined' sx={{
                            height: "45px", width: { xs: "100%", md: "280px", xl: "240px" }
                        }}>
                            <FaFacebookSquare size={25} style={{ color: "#0077b6" }} />
                            <Typography variant='subtitle1' sx={{
                                ml: "7px", fontWeight: "600",
                                fontSize: { xs: "12px", md: "12px" },
                            }}>
                                Log in with Facebook
                            </Typography>
                        </Button>

                    </Box>

                </form>

            </Box>

            {/* Image */}
            <Box sx={{
                display: { xs: "none", xl: 'flex' },
                alignItems: 'center', justifyContent: "center",
            }}>
                <Image src="/pictures/Login.jpg" alt='banner'
                    width={550} height={750}
                    style={{ borderRadius: "10px" }}
                />
            </Box>

        </Box>
    );
}

export default LoginPage;
