import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify
import { ColorModeContext } from '../../theme/MUI_MODE';
import { useRouter } from 'next/router';  // Import Next.js router for redirection
import Link from 'next/link';

function RegisterPage() {
    const { registerUser, loading, error } = useContext(ColorModeContext);
    const router = useRouter();  // Initialize router

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            accepted: false
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Name is required!').max(15, 'Name must be less than 15 characters.'),
            lastName: Yup.string().required('Last Name is required!').min(6, 'Last Name must be more than 6 characters.'),
            email: Yup.string().required('Email is required!').email('Invalid email address.'),
            password: Yup.string().required('Password is required!').min(8, 'Password must be more than 8 characters.'),
            confirmPassword: Yup.string().required('Confirm Password is required!').oneOf([Yup.ref('password'), ''], 'Passwords must match.'),
            accepted: Yup.bool().oneOf([true], 'You need to accept the terms and conditions'),
        }),

        onSubmit: (values) => {
            // Pass form values to registerUser function from context
            const isRegistered = registerUser(values, () => {
                // Redirect to login page after successful registration
                router.push('/login');
            });

            // If registration failed, no redirection occurs
            if (!isRegistered) {
                toast.error('Registration failed!'); // Show error if registration fails
            }
        },
    });

    return (
        <Box sx={{ maxWidth: '1576px', m: 'auto', px: { xs: "20px", xl: "50px" }, display: 'flex', alignItems: 'center', pt: "30px", justifyContent: 'center', gap: '30px', }}>
            {/* Register Form */}
            <Box sx={{ width: { xs: "100%", md: "600px", xl: "500px" }, }}>

                {/* Toast notification container */}
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />

                {/* title */}
                <Box sx={{ mb: "30px" }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: "600", mb: "5px", fontSize: { xs: "30px", md: "35px", xl: "40px" } }}>
                        Create Account
                    </Typography>
                    <Typography variant="grayText" component="p" sx={{ fontSize: { xs: "12px", xl: "13px" }, fontWeight: "500" }}>
                        Already have an account?
                        <Link href='/login'>
                            <a style={{ marginLeft: '5px', color: '#48cae4', }}>Login</a>
                        </Link>
                    </Typography>
                </Box>

                {/* form */}
                <form onSubmit={formik.handleSubmit}>
                    {/* Show error if any */}
                    {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

                    {/* name and lastName */}
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: "20px", md: "30px" }, mb: "10px" }}>
                        <TextField
                            label="First Name"
                            fullWidth
                            size='small'
                            name='name'
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && formik.errors.name ? true : false}
                            helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                        />
                        <TextField
                            label="Last Name"
                            fullWidth
                            size='small'
                            name='lastName'
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && formik.errors.lastName ? true : false}
                            helperText={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ""}
                        />
                    </Box>

                    {/* email */}
                    <TextField
                        label="Email"
                        fullWidth
                        size='small'
                        type='email'
                        name='email'
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && formik.errors.email ? true : false}
                        helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        sx={{ mb: "10px" }}
                    />

                    {/* password */}
                    <TextField
                        label="Password"
                        fullWidth
                        size='small'
                        type='password'
                        name='password'
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && formik.errors.password ? true : false}
                        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                        sx={{ mb: "10px" }}
                    />

                    {/* confirm password */}
                    <TextField
                        label="Confirm Password"
                        fullWidth
                        size='small'
                        type='password'
                        name='confirmPassword'
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}
                        sx={{ mb: "10px" }}
                    />

                    {/* checkbox */}
                    <FormControlLabel
                        label="I accept terms of privacy policy"
                        control={<Checkbox color='button' name='accepted' onBlur={formik.handleBlur} onChange={formik.handleChange} checked={formik.values.accepted} />}
                        sx={{ mb: "10px" }}
                    />
                    {formik.touched.accepted && formik.errors.accepted && <Typography color="error" sx={{ fontSize: '12px', marginBottom: '25px' }}>{formik.errors.accepted}</Typography>}

                    {/* submit button */}
                    <Button variant='contained' type='submit' color='button' fullWidth sx={{ height: "45px", }} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default RegisterPage;