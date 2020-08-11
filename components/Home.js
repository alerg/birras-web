/* eslint-disable import/order */
import withRoot from './onepirate/modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';

import AppFooter from './onepirate/modules/views/AppFooter';
import AppAppBar from './onepirate/modules/views/AppAppBar';
import ProductHero from './onepirate/modules/views/ProductHero';
import ProductCategories from './onepirate/modules/views/ProductCategories';
import Button from './onepirate/modules/components/Button';

import Modal from './Modal';

import {
  getAllMeetups,
  getWeatherByDate,
  joinMeetup,
} from '../utils/api';
import { 
  getLoggedUser,
} from '../utils/user';
import { 
  formatDate
} from '../utils/date';

const useStyles = makeStyles((theme) => ({
  centered: {
    'text-align': 'center',
  },
  accu:{
    'background-image': "url('/static/accWeather.png')",
    'background-size': 'cover',
    width: '110px',
    height: '15px',
    'text-align': 'end',
  },
  temperature: {
    position: 'relative',
    'font-size': '18px',
    'font-weight': 600,
    color: '#FF7D33',
  }
}));

function Index() {
  const [meetups, setMeetups] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [meetupTemp, setMeetupTemp] = React.useState('');

  const [modalChildren, setModalChildren] = React.useState("");
  const router = useRouter();
  const classes = useStyles();

  React.useEffect(() => {
    if (!meetups) {
      getAllMeetups().then((meetups) => {
        setMeetups(meetups);
      });
    }
  }, [meetups]);
  
  const handlerButton = (meetup) => {
    joinMeetup(meetup._id).then((status) => {
      console.log("status", status);
      let message = '¡Te uniste con éxito a la mmetup!';
      if (status !== 'ok') {
        message = 'Sucedióun error. Vuelve a intertarlo más tarde';
      }
      setModalChildren(<div>
      <p id="simple-modal-description" className={classes.centered}>
        {message}
      </p>
      <div className={classes.centered}>
          <Button
            onClick={() => setOpen(false)}
            variant="contained" 
            color="primary" 
            size="small"
          >
            Cerrar
          </Button>
        </div>
      </div>)
    });
  }

   const handlerProductCategoriesAction = (meetup) => {
    const user = getLoggedUser();
    getWeatherByDate(new Date(meetup.date).valueOf())
      .then((data) => setMeetupTemp(data.temperature));

    if (user) {
      const joined = user.meetups.includes(meetup._id);
      setModalChildren(<div>
        <h2 id="simple-modal-title" className={classes.centered}>{meetup.title}</h2>
        <h3 id="simple-modal-title" className={classes.centered}>{formatDate(meetup.date)} - <span className={classes.temperature}>{meetupTemp || 0}° Max</span>
</h3>
        <p id="simple-modal-description" className={classes.centered}>
          {
          user.type === 'user' ? 
            meetup.description : 
            (meetup.box_beers > 0 && `Deben comprar ${meetup.box_beers} Cajas de Birra`)
          }
        </p>
        <div className={classes.centered}>
            {user.type === 'user' && (joined ? 
              <Button
              onClick={() => setOpen(false)}
              variant="contained" 
              size="small"
            >
              Unido
            </Button>
            :
            <Button 
              onClick={() => handlerButton(meetup)} 
              variant="contained" 
              color="secondary" 
              size="small"
            >
              Unirte
            </Button>
            )}
          </div>
        </div>
      );
      setOpen(true);
    } else {
      router.push('/sign-in')
    }
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductCategories meetups={meetups} handlerAction={handlerProductCategoriesAction}/>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
      >
        {modalChildren}
        </Modal>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
