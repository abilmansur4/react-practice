import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import { useNavigate } from "react-router-dom";

const Main = () => {

  const navigate = useNavigate();

  // const userComponents = [
  //   {}
  // ]

  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2}>
        <Grid xs="auto">
          <Card sx={{ 
              height: 180, 
              display: 'flex', 
              // alignItems: 'center',
              // backgroundImage: 'url(/images/profile.svg)',
              // backgroundSize: 'cover',
              p: 5,
              "borderRadius": "10px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"
              }}
            >
            <CardContent>
              <Typography variant="h5" component="div">
                Кабинет
              </Typography>
              <CardActions>
                <Button size="small" onClick={() => navigate("/cabinet")}>Перейти</Button>
              </CardActions>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 180 }}
              image="/images/profile.svg"
              alt="Live from space album cover"
            />
          </Card>
        </Grid>
        <Grid xs="auto">
          <Card sx={{ height: 180, display: 'flex', alignItems: 'center', p: 5, "borderRadius": "10px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"  }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Библиотека
              </Typography>
              <CardActions>
                <Button size="small">Открыть</Button>
              </CardActions>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 180 }}
              image="/images/library.svg"
              alt="Live from space album cover"
            />
          </Card>
        </Grid>
        <Grid xs="auto">
          <Card sx={{ height: 180, display: 'flex', alignItems: 'center', p: 5, "borderRadius": "10px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"  }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Проекты
              </Typography>
              <CardActions>
                <Button size="small" onClick={() => {navigate("/projects")}}>Перейти</Button>
              </CardActions>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 180 }}
              image="/images/process.svg"
              alt="Live from space album cover"
            />
          </Card>
        </Grid>
        <Grid xs="auto">
          <Card sx={{ height: 180, display: 'flex', alignItems: 'center', p: 5, "borderRadius": "10px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"  }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Документооборот
              </Typography>
              <CardActions>
                <Button size="small">Посмотреть</Button>
              </CardActions>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 180 }}
              image="/images/docs.svg"
              alt="Live from space album cover"
            />
          </Card>
        </Grid>
        <Grid xs="auto">
          <Card sx={{ height: 180, display: 'flex', alignItems: 'center', p: 5, "borderRadius": "10px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"  }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Задачи
              </Typography>
              <CardActions>
                <Button size="small">Перейти</Button>
              </CardActions>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 180 }}
              image="/images/tasks.svg"
              alt="Live from space album cover"
            />
          </Card>
        </Grid>
        <Grid xs="auto">
          <Card sx={{ height: 180, display: 'flex', alignItems: 'center', p: 5, "borderRadius": "10px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"  }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Новости
              </Typography>
              <CardActions>
                <Button size="small">Смотреть</Button>
              </CardActions>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 180 }}
              image="/images/news.svg"
              alt="Live from space album cover"
            />
          </Card>
        </Grid>
        <Grid xs="auto">
          <Card sx={{ height: 180, display: 'flex', alignItems: 'center', p: 5, "borderRadius": "10px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"  }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Справочник
              </Typography>
              <CardActions>
                <Button size="small">Открыть</Button>
              </CardActions>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 180 }}
              image="/images/spravochnik.svg"
              alt="Live from space album cover"
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
};

export default Main;