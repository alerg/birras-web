/* eslint-disable import/order */
import withRoot from '../../onepirate/modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import { FORM_ERROR } from 'final-form'

import Typography from '../../onepirate/modules/components/Typography';

import AppFooter from '../../onepirate/modules/views/AppFooter';
import AppAppBar from '../../onepirate/modules/views/AppAppBar';
import AppForm from '../../onepirate/modules/views/AppForm';

import { email, required, password } from '../../onepirate/modules/form/validation';
import RFTextField from '../../onepirate/modules/form/RFTextField';
import FormButton from '../../onepirate/modules/form/FormButton';
import FormFeedback from '../../onepirate/modules/form/FormFeedback';

import { signup } from '../../utils/api' ;

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignUp() {
  const router = useRouter()

  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(
      ['firstName', 'lastName', 'email', 'password'],
      values,
    );

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    if (!errors.password) {
      const emailError = password(values.password);
      if (emailError) {
        errors.password = emailError;
      }
    }

    return errors;
  };

  const onSubmit = async (values) => {
    setSent(true);
    const status = await signup(values);
    setSent(false);
    switch (status) {
      case 'ok':
        await signin(values);
        router.push('/')
        break;
      case 'bad':
        return { [FORM_ERROR]: 'Completa todos los campos' };
      case 'conflict':
        return { [FORM_ERROR]: 'Ya te encuentras registrado' };
      default:
        return { [FORM_ERROR]: 'Ocurrió un error. Inténtalo nuevamente.' };
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Registro
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/sign-in/" underline="always">
              ¿Ya estás registrado?
            </Link>
          </Typography>
        </React.Fragment>


        <Form
          onSubmit={onSubmit}
          validate={validate}
          subscription={{ submitting: true }}
          render = {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    autoComplete="fname"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    autoComplete="lname"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </form>
          )} />
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
