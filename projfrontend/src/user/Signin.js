import React, {useState} from 'react'
import Base from '../core/Base'
import {Link, Redirect} from 'react-router-dom'
import {signin, authenticate, isAuthenticate, isAuthenticated} from '../auth/helper/'

const Signin = () => {

    const [values, setValues] = useState({
        email: 'user1@lomitaswa.com',
        password: '12345',
        error: '',
        loading: false,
        didRedirect: false
    })

    const {email, password, error, loading, didRedirect } = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const loadingMessage = () => {
        return(
            loading && (
                <div className='alert alert-info'>
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 etxt-left'>
                <div className='alert alert-danger'
            style={{display: error ? '' : 'none'}}
            >
                {error}
            </div>
                </div>
            </div>
           
        )
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect:true
                    })
                })
            }
        })
        .catch(console.log('Error in signin'));
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <p>Redirect to admin</p>
            } else {
                return <p>Redirect to user dashboard</p>
            }
        }

        if(isAuthenticated()){
            return <Redirect to='/' />
        }
    }
    const signInForm = () => {
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 etxt-left'>
                    <form>
                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input onChange ={handleChange('email')}className='form-control' type='email' value={email} />
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input onChange ={handleChange('password')} className='form-control' type='password' value={password} />
                        </div>
                        <button onClick={onSubmit} className='btn btn-success btn-block'> Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return(
        <Base title='Sign in page' description='Page for user signin'>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className='text-white text-center'>{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;