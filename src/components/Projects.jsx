import axios from "axios";
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

const Projects = () => {

  return (
    <Box sx={{ flexGrow: 1}}>
      <Typography variant="h4">Мои проекты</Typography>
      <Grid container spacing={2}>
        <Grid xs="auto">
          <Card sx={{ 
              height: 180, 
              display: 'flex', 
              p: 5,
              "borderRadius": "10px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"
              }}
            >
            <CardContent>
              <Typography variant="h5" component="div">
                проект
              </Typography>
              <CardActions>
                <Button size="small">смотреть</Button>
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
      </Grid>
    </Box>
  )
};

export default Projects;