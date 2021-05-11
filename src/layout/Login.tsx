import { Dialog, Grid, IconButton, Slide, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useLogin, useNotify, useTranslate } from 'ra-core';
import React, { useState } from 'react';
import { Notification, useRedirect, useRefresh } from 'react-admin';
import { Field, withTypes } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import { apiURL } from '../dataProvider/rest';
import { lightTheme } from './themes';



const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'url(https://source.unsplash.com/collection/9503874)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        fontFamily: 'Montserrat, sans-serif'
    },
    
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    card1: {
        minWidth: 300,
        // marginTop: '3em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.primary.main,
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    select:{
        width:'20em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
}));

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        required
        fullWidth
    />
);

interface FormValues {
    username?: string;
    password?: string;
    // build?: string;
    email_id?: string;
    company_name?:string;
    company_type?: string;
    mobile_number?: string;
    confirm_password?: string;
    iec_code?: string;

}

const { Form } = withTypes<FormValues>();

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Login = (props: any) => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();
    const redirect = useRedirect();
    const classes = useStyles();
    const notify = useNotify();
    const login = useLogin();
    const refresh = useRefresh();
    const [open1, setOpen1] = React.useState(false);
    // const [first, setFirst] = React.useState(false);
    // const [first1, setFirst1] = React.useState(false);

    const location = useLocation<{ nextPathname: string } | null>();

    const handleSubmit = (auth: FormValues) => {
        setLoading(true);

        login(auth, location.state ? location.state.nextPathname :  '/' ).then(()=>{
            if(sessionStorage.getItem('firsttime_user')==='0'){
                redirect('/first_user/create')
            }
        }).catch(
            (error: Error) => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                    'warning'
                );
            }
        );
    };
    const handleSubmit1 = (auth: FormValues) => {
        setLoading(true);
        const request = new Request(apiURL + '/login/register', {
            method: 'POST',
            body: JSON.stringify(auth),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        
         fetch(request)
            .then(response => {
                setLoading(false);
                setOpen1(false);
               
                // refresh();
                // location.state ? location.state.nextPathname : '/login'
                if (response.status < 200 || response.status >= 300) {
                    return response.json().then((value:any)=>{
                        throw new Error(value.message);
                    })
                }
                response.json().then((value:any)=>{
                    notify(value.message)
                    // window.location.reload();
                })
                
            }).catch(
                (error: Error) => {
                    setLoading(false);
                    notify(
                        typeof error === 'string'
                            ? error
                            : typeof error === 'undefined' || !error.message
                            ? 'unexpected error occured'
                            : error.message,
                        'warning'
                    );
                    // window.location.reload();
                }
            );;
    };
    const validate = (values: FormValues) => {
        const errors: FormValues = {};
        if (!values.username) {
            errors.username = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };

    // const validateEmail = (email:any) => {
    //     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    //   }

    // const validate1 = (values: FormValues) => {
    //     const errors: FormValues = {};
    //     if (!values.company_name) {
    //         errors.company_name = translate('ra.validation.required');
    //     }
    //     if (!values.email_id) {
    //         errors.email_id = translate('ra.validation.required');
    //     }
        // else if(values.email== '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
        // {
        //     errors.email = 'Enter Valid Email Address';
        // }
        // if (!validateEmail) {
        //     // if(validateEmail(values.email))
        //     errors.email = translate('pos.email');
        // }
    //     if (!values.password) {
    //         errors.password = translate('ra.validation.required');
    //     }
        
    //     else if (values.password.length < 8) {
    //         errors.password = 'Password is too short';
    //     }
    //     if (!values.confirm_password) {
    //         errors.confirm_password = translate('ra.validation.required');
    //     }
    //     if (!values.iec_code) {
    //         errors.iec_code = translate('ra.validation.required');
    //     }
    //     if (!values.company_type) {
    //         errors.company_type = translate('ra.validation.required');
    //     }
    //     if (!values.mobile_number) {
    //         errors.mobile_number = translate('ra.validation.required');
    //     }
    //     if (values.password !== values.confirm_password) {
    //         errors.confirm_password = translate('pos.confirm_password');
    //     }
    //     return errors;
    // };

// const required = (value:any) => (value ? undefined : 'Required')

    const { onClose, ...other } = props;

const handleClickOpen2 = (e: any) => {
      setOpen1(true);
    e.preventDefault();
  };

  const handleClose2 = () => {
    //   form.reset();
    setOpen1(false);
    refresh();
  };

    return (
        <div>
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.main}>
                        <Card className={classes.card}>
                            <div className={classes.avatar}>
                                <Avatar className={classes.icon}>
                                    <LockIcon />
                                </Avatar>
                            </div>
                            <div className={classes.hint}>
                                Please Login
                            </div>
                            <div className={classes.form}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        name="username"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={"Email Address"}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={classes.input}>
                                    <Field
                                        name="password"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={"Password "}
                                        type="password"
                                        disabled={loading}
                                    />
                                </div>
                                {/* <div className={classes.input}>
                                <SelectInput className={classes.select} name="build" source="build" choices={[
                                    { id: 'PROD', name: 'PROD' },
                                    { id: 'DEV', name: 'DEV' },
                                    { id: 'QA', name: 'QA' },
                                    ]} defaultValue={'PROD'}/>
                            </div> */}
                            </div>

                            {/* <CardActions className={classes.actions}> */}
                            <div style={{padding:'0 1em 0 1em'}}>
                                
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disabled={loading}
                                    fullWidth
                                >
                                    {loading && (
                                        <CircularProgress
                                            size={25}
                                            thickness={2}
                                        />
                                    )}
                                    {translate('ra.auth.sign_in')}
                                </Button>
                               </div>

                               <div style={{padding:'0.4em 1em', textAlign:'end'}}>
                                
                                <Button
                                    href="#/login/forgotpassword"
                                    color="primary"
                                    disabled={loading}
                                >
                                forgot password?
                                </Button>
                               </div>

                                {/* <Button
                                    variant="contained"
                                    href="#/signup"
                                    color="primary"
                                    disabled={loading}
                                    fullWidth
                                >Sign Up </Button> */}
                                 <div style={{padding:'0 1em 0 1em'}}>
                                <p style={{marginTop:'0'}}>Click here to reach 
                                <Button color="primary" onClick={handleClickOpen2} >
                                <u style={{color:'#3f51b5'}}>
                                    ADMIN 
                                    </u>                                  
                                 </Button>
                                for credentials</p>
                                </div>
                            {/* </CardActions> */}
                        </Card>
                        <Notification />
                    </div>

                </form>
            )}
        />

        <Dialog fullWidth maxWidth="md" keepMounted open={open1} disableBackdropClick disableEscapeKeyDown
        aria-labelledby="alert-dialog-slide-title"
          TransitionComponent={Transition} aria-describedby="alert-dialog-slide-description" >
          <MuiDialogTitle className="appBarSend"  {...other}>
            <IconButton size="medium" className="closeButtonSend" color="inherit" onClick={handleClose2} aria-label="close"><CloseIcon />
            </IconButton>
            <Typography variant="h6" className="sendTypo"><b>Registration Form</b></Typography>
          </MuiDialogTitle>
          <Form
            onSubmit={handleSubmit1}
            // validate={validate1}
            render={({ handleSubmit, form, submitting, pristine,invalid }) => (
                <form onSubmit={async event => {
                    await handleSubmit(event)
                    form.reset()
                  }}>
                <Card className={classes.card1}>
                           
                            {/* <div className={classes.hint}>
                            Registration Form
                            </div> */}
                            <div className={classes.form}>
                                {/* <div className={classes.input}> */}
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                      <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        name="company_name"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={"COMPANY NAME"}
                                        disabled={loading}
                                    />
                                    </div>

                                    <div className={classes.input}>
                                    <Field name="company_type" >
                                    {({ input, meta }) => (
                                      <Grid container spacing={2}>
                                      <Grid item xs={4} style={{padding:'2em 0.5em'}}>
                                    <label style={{minWidth:'100%', display:'inline-block', color:'rgba(0, 0, 0, 0.54)'}}>COMPANY TYPE*</label>
                                   </Grid>
                                   <Grid item xs={8}>
                                    <select {...input} style={{width:'100%', height:'2.5em', border:'1px solid #ccc', borderRadius:'3px',marginTop:'1em'}} required>  
                                    <option />
                                    <option value="0">Exporter(Merchant)</option>
                                    <option value="1">Exporter(Manufacturer)</option>
                                    <option value='2'>Importer</option>
                                    <option value='3'>Exporter & Importer</option>
                                    <option value="4">OceanLiner</option>
                                    <option value="5">Shipper</option>
                                    <option value="6">FreightForwarder</option>
                                    <option value="9">Insurance</option>
                                    <option value="7">Others</option>
                                  
                                    </select>
                                    {meta.error && meta.touched && 
                                    <p style={{color:'#f44336', fontWeight: 400, lineHeight: '1.66', letterSpacing: '0.03333em',margin: '0',fontSize: '0.75rem',marginTop: '3px',textAlign: 'left'}}>
                                    {meta.error}</p>}      
                                                   
                                    </Grid></Grid>
                                      )} 

                                       </Field>
                                     </div>

                                     <div className={classes.input}>
                                    <Field
                                        
                                        name="mobile_number"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={"MOBILE NUMBER"}
                                        disabled={loading}
                                    />
                                    </div>
                                    
                                    </Grid>
                                    <Grid item xs={6}>
                                {/* </div>
                                <div className={classes.input}> */}
                                    <div className={classes.input}>
                                <Field
                                       
                                        name="iec_code"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={"IEC NUMBER"}
                                        disabled={loading}
                                    />
                                     </div>
                                    <div className={classes.input}>
                                    <Field
                                       
                                        name="email_id"
                                        type="email"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={"EMAIL ADDRESS"}
                                       
                                        disabled={loading}
                                    />
                                     </div>
                                </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                  <div className={classes.input}>
                                    <Field
                                       
                                        name="password"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={"PASSWORD"}
                                        type="password"
                                        disabled={loading}
                                        // helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
                                    />
                                    </div>
                                  </Grid>
                                  <Grid item xs={6}>
                                  <div className={classes.input}>
                                    <Field
                                        name="confirm_password"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={"CONFIRM PASSWORD"}
                                        type="password"
                                        disabled={loading}
                                    />
                                    </div>
                                </Grid></Grid>
                            </div>

                            {/* <div style={{padding:'1em'}}> */}
                               <CardActions className={classes.actions} style={{float:'right'}}>  
                                <Button
                                    variant="contained"
                                    type="submit"
                                    // color="default"
                                    disabled={invalid || submitting || pristine}
                                    style={{float:'right',backgroundColor:'#4caf50', color:'#ffffff'}}
                                >
                                    {loading && (
                                        <CircularProgress
                                            size={25}
                                            thickness={2}
                                        />
                                    )}
                                    Register
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        form.reset();
                                        setOpen1(false);                                 
                                    }}
                                    color="primary"
                                    disabled={loading}
                                    style={{float:'right',backgroundColor:'#f44336', color:'#ffffff'}}
                                >
                                    Cancel
                                </Button>
                                </CardActions>
                                {/* <div style={{padding:'1em 1em 1em 1em'}}></div>
                               </div> */}
                        </Card>
                        </form>
            )}
        />
                    </Dialog>
                    </div>
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = (props: any) => (
    <ThemeProvider theme={createMuiTheme(lightTheme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;
