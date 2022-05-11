import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardContent } from '@mui/material';
import { getSession, postSession } from '../api/ApiService';
import LoadingIcon from '../utility/icon';
import CustomTextField from '../components/TextField';
import Notification from '../components/Notification';

interface ListObject {
  [name: string]: any;
}

interface Noti {
  type: string;
  text: string;
  show: boolean;
}

const Home: NextPage = () => {
  const initState = {
    formList: [],
    loading: true,
  };
  const [formVal, dispatch] = React.useReducer(
    (curVal: ListObject, newVal: ListObject) => ({ ...curVal, ...newVal }),
    initState
  );

  const [noti, setNoti] = React.useState<Noti>({
    type: '',
    text: '',
    show: false,
  });

  const [disableButton, setDisableButton] = React.useState(true);

  const fetchData = async () => {
    await getSession('/form').then((data) => {
      dispatch({ formList: data, loading: false });
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (disableButton) {
      setDisableButton(false);
    }
    const list: any = [...formVal.formList];
    list[index] = {
      ...list[index],
      value: event.target.value,
    };
    dispatch({ ...formVal, formList: list });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const UpdateData = formVal.formList.reduce(
      (obj: ListObject, item: ListObject) =>
        Object.assign(obj, { [item.fieldName]: item.value }),
      {}
    );

    await postSession('/form', UpdateData)
      .then((res) =>
        setNoti({ type: 'success', text: 'SuccessFully Updated', show: true })
      )
      .catch((err: any) =>
        setNoti({
          type: 'error',
          text: err.response.data.message,
          show: true,
        })
      );
  };

  return (
    <Container maxWidth='lg'>
      <Notification {...noti} setNoti={setNoti} />
      <Box
        sx={{
          margin: '50px auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '500px' }}>
          <Typography
            component='h1'
            fontWeight='600'
            textAlign='center'
            fontSize='1.7rem'
            mt='1rem'
            color='primary'
          >
            Dynamic From
          </Typography>

          <CardContent>
            <form onSubmit={onSubmit} noValidate>
              {formVal.loading ? (
                <LoadingIcon width='120px' height='120px' />
              ) : (
                formVal.formList &&
                formVal.formList.map(
                  (item: { [name: string]: any }, i: number) => (
                    <Box key={i} my='1rem'>
                      <CustomTextField
                        item={item}
                        index={i}
                        handleChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => handleChange(i, e)}
                      />
                    </Box>
                  )
                )
              )}
              <Box justifyContent='center' display='flex' mt='1rem'>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={disableButton}
                  className='btn btn-primary'
                >
                  Create
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
