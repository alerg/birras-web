/* eslint-disable import/order */
import withRoot from '../../onepirate/modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { useRouter } from 'next/router'

import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { FORM_ERROR } from 'final-form'

import Typography from '../../onepirate/modules/components/Typography';
import AppFooter from '../../onepirate/modules/views/AppFooter';
import AppAppBar from '../../onepirate/modules/views/AppAppBar';
import AppForm from '../../onepirate/modules/views/AppForm';
import { email, required } from '../../onepirate/modules/form/validation';
import RFTextField from '../../onepirate/modules/form/RFTextField';
import FormButton from '../../onepirate/modules/form/FormButton';
import FormFeedback from '../../onepirate/modules/form/FormFeedback';

import { signin } from '../../utils/api' ;

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

function SignIn() {
  const router = useRouter()

  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const onSubmit = async (values) => {
    setSent(true);
    const status = await signin(values);
    setSent(false);
    switch (status) {
      case 'ok':
        router.push('/')
        break;
      case 'bad':
        return { [FORM_ERROR]: 'Completa todos los campos' };
      case 'not_exists':
        return { [FORM_ERROR]: 'No existe ningún usuario con las credenciales ingresadas.' };
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
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link
              href="/sign-up/"
              align="center"
              underline="always"
            >
              Registrate
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
          validate={validate}
          render = {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
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
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </form>
          )} />
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
