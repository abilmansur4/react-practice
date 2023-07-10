import { useState } from 'react';
import { Stack, Box, Container, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useAuth } from '../../hook/useAuth';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';

import SnackbarComponent from '../SnackbarComponent';

const ManagerEditClient = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [fio, setFio] = useState('');
  const [applicationDate, setApplicationDate] = useState(null);
  const [iin, setIin] = useState('');
  const [phone, setPhone] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [dischargeDateByKMIS, setDischargeDateByKMIS] = useState(null);
  const [lastRehabDischargeDate, setLastRehabDischargeDate] = useState(null);
  const [source, setSource] = useState('');
  const [dischargeSend, setDischargeSend] = useState(false);
  const [hospNotif, setHospNotif] = useState(false);
  const [actualArrivalDate, setActualArrivalDate] = useState(null);
  const [receivedByHoD, setReceivedByHoD] = useState(false);

  const [hospNotifDate, setHospNotifDate] = useState(null);
  const [MKBcode, setMKBcode] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [treatmentType, setTreatmentType] = useState('');
  const [patientType, setPatientType] = useState('');
  const [plannedReceiptDate, setPlannedReceiptDate] = useState(null);
  const [rejectionDate, setRejectionDate] = useState(null);
  const [comments, setComments] = useState('');

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const auth = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const fromPage = location.state?.from?.pathname || "/";

  // Уведомления
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const dischargeSendCheckbox = (event) => {
    setDischargeSend(event.target.checked);
  }

  const hospNotifCheckbox = (event) => {
    setHospNotif(event.target.checked);
  }

  const receivedByHoDCheckbox = (event) => {
    setReceivedByHoD(event.target.checked);
  }

  const handlePaymentType = (event) => {
    setPaymentType(event.target.value);
  }

  const handleTreatmentType = (event) => {
    setTreatmentType(event.target.value);
  }

  const handlePatientType = (event) => {
    setPatientType(event.target.value);
  }

  const handleSubmit = () => {
    setMessage("Пациент успешно зарегистрирован!");
    setSeverity("success");
    setOpen(true);
    // auth.login(username, password);
    // try{
    //   const response = await auth.register(username, password, email, phone, ruleAccept);
    //   if(response.status === 200){
    //     setMessage("Вы успешно прошли регистрацию!");
    //     setSeverity("success");
    //     setOpen(true);
    //     setTimeout(() => {
    //       navigate("/login");
    //     }, 2000);
    //   } else if (response.status === 400) {
    //     console.log(response.data.message);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    // auth.register(username, password, email, phone, ruleAccept);
  };

  return (
    <Container 
      sx={{
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"  
      }}
    >
      <Box sx={{ width: "100%", padding: 4, "bordeRadius": "20px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"}}>
      <Typography variant="h5" sx={{mb: 3}}>Регистрация пациента</Typography>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Stack spacing={2}>
              
              <TextField disabled size="small" className="txtField" label="ФИО" value={fio} variant="outlined" onChange={(e) => setFio(e.target.value)}/>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Дата обращения" value={applicationDate} onChange={(newValue) => setApplicationDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <TextField disabled size="small" className="txtField" label="ИИН" value={iin} variant="outlined" onChange={(e) => setIin(e.target.value)}/>
              <TextField disabled size="small" className="txtField" label="Телефон" value={phone} variant="outlined" onChange={(e) => setPhone(e.target.value)}/>
              <TextField disabled size="small" className="txtField" label="Диагноз, примечание" value={diagnosis} variant="outlined" onChange={(e) => setDiagnosis(e.target.value)}/>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Дата выписки по КМИС" value={dischargeDateByKMIS} onChange={(newValue) => setDischargeDateByKMIS(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Дата выписки последней реабилитации(госпитализации)" value={lastRehabDischargeDate} onChange={(newValue) => setLastRehabDischargeDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <TextField disabled size="small" className="txtField" label="Источник" value={source} variant="outlined" onChange={(e) => setSource(e.target.value)}/>
              <FormGroup>
                <FormControlLabel disabled control={<Checkbox onChange={dischargeSendCheckbox} size="small"/>} label="Отправка выписки врачу" />
                <FormControlLabel disabled control={<Checkbox onChange={hospNotifCheckbox} size="small"/>} label="Напоминание о госпитализации" />
              </FormGroup>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Факт дата прихода (Приемный покой)" value={actualArrivalDate} onChange={(newValue) => setActualArrivalDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <FormGroup>
                <FormControlLabel disabled control={<Checkbox onChange={receivedByHoDCheckbox} size="small"/>} label="Поступившие (Зав. отделению)" />
              </FormGroup>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack sx={{ flexGrow: 1 }} spacing={2}> 
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Дата напоминания о госпитализации" value={hospNotifDate} onChange={(newValue) => setHospNotifDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <TextField size="small" className="txtField" label="Код МКБ" value={MKBcode} variant="outlined" onChange={(e) => setMKBcode(e.target.value)}/>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Вид оплаты</InputLabel>
                <Select
                  value={paymentType}
                  label="Вид оплаты"
                  onChange={handlePaymentType}
                >
                  <MenuItem value={"Бесплатный"}>Бесплатный</MenuItem>
                  <MenuItem value={"Платный"}>Платный</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Вид лечения</InputLabel>
                <Select
                  value={treatmentType}
                  label="Вид лечения"
                  onChange={handleTreatmentType}
                >
                  <MenuItem value={"Дневной"}>Дневной</MenuItem>
                  <MenuItem value={"Круглосуточный"}>Круглосуточный</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Вид пациента</InputLabel>
                <Select
                  value={patientType}
                  label="Вид пациента"
                  onChange={handlePatientType}
                >
                  <MenuItem value={"Ухаж"}>Ухаж</MenuItem>
                  <MenuItem value={"Самост"}>Самост</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Планируемая дата приема" value={plannedReceiptDate} onChange={(newValue) => setPlannedReceiptDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Дата отказа" value={rejectionDate} onChange={(newValue) => setRejectionDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <TextField size="small" className="txtField" label="Комментарии" value={comments} variant="outlined" onChange={(e) => setComments(e.target.value)}/>
              <Button type="submit" variant="contained" onClick={handleSubmit}>Сохранить</Button>
              <SnackbarComponent 
                open={open} 
                onClose={handleCloseSuccess} 
                severity={severity} 
                message={message} 
              />
            </Stack>
          </Grid>
          {/* <Grid xs="6" md="6">
            
          </Grid> */}
        </Grid>
      </Box>
    </Container>  
  );
};

export default ManagerEditClient;
