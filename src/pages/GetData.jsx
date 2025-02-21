import * as React from 'react';

import { Button, ButtonGroup, Alert, CardContent, Card, TextField, Typography, CircularProgress, Fade, Box} from '@mui/material';

import ViewTable from '../components/Table'

import axios from 'axios';


export default function CheckIIN() {

	const [value, setValue] = React.useState("")
	const [peopleData, setPeopleData] = React.useState(null)
	const [peoplesData, setPeoplesData] = React.useState([])

	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState("")

	const onGetByValue = (attribute) => {
		setPeopleData(null)
		setPeoplesData([])
		setLoading(true)
		setError("")
		axios.get(`http://217.114.7.145:8080/people/info/${attribute}/${value}`)
		.then(resp => {
			attribute == "phone" && resp.data?.data.length === 0 ? setError("no records found in the database :(") : attribute == "phone" && setPeoplesData(resp.data.data);
			(attribute == "iin") ? setPeopleData(resp.data?.data) : null;
		})
		.catch(err => {
			setError(err.response?.status ? err.response.data.message : err.message ? err.message : "Some error happend :(")
		})
		.finally(() => {
			setLoading(false)
		})
	}

	React.useEffect(()=> {
	}, [peoplesData])

  return (
	<Fade in={true} style={{transitionDelay: '200ms'}} unmountOnExit>
	<Box sx={{
		display: "flex",
		flexDirection: "column",
		// justifyContent: "space-around",
		alignItems: "center",
		mb: 10
	}}>
    <Box
      sx={{
        p: 10,
        display: 'flex',
        flexDirection: 'row',
		justifyContent: "space-around",
        alignItems: '',
        textAlign: 'center',
		gap: 1,
		width: "100%"
      }}
    >
		<Box
			component="form"
			onSubmit={(e) => {e.preventDefault(); onGetByValue("iin")}}
			sx={{ display: "flex", flexDirection: "column", gap: 1, marginRight: "auto"}}
			noValidate
			autoComplete="off"
			width="40%"
			>
			
			<TextField id="outlined-basic" label="Text to find" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
			<ButtonGroup
				aria-label="button group"
				>
					<Button onClick={() => {onGetByValue("iin")}} variant="contained">By IIN</Button>
					<Button onClick={() => {onGetByValue("phone")}} variant='outlined'>By Part of Name</Button>
				</ButtonGroup>
		</Box>
		<Box sx={{width: "40%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
			{ !loading && (peopleData || peoplesData.length !== 0 || error) && <Fade
			in={peopleData || peoplesData.length !== 0 || error}
			style={{
				transitionDelay: peopleData ? '200ms' : '0ms',
			}}
			unmountOnExit
			>
				<Alert severity={error ? "error": "success"} variant='outlined' sx={{width: "100%"}}>{ error ? error : "Data taked successfully!" }</Alert>
			</Fade>}
			{!error && !loading && peopleData && 
			<Fade
			in={peopleData}
			style={{
				transitionDelay: peopleData ? '300ms' : '0ms',
			}}
			unmountOnExit
			>
			<Card sx={{ width: "100%", py: "15px", px: "10px" }}>
				<CardContent sx={{ fontSize: 14 }}>
					
					<Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mb: 2}}>

						<Typography sx={{ fontSize: "1.6em" }}>IIN: </Typography>
						<Typography sx={{ fontSize: "1.6em" }}>{peopleData?.iin}</Typography>
					</Box>
					<Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mb: 2}}>
						<Typography sx={{ fontSize: "1.6em" }}>Name: </Typography>
						<Typography sx={{ fontSize: "1.6em" }}>{peopleData?.name}</Typography>
					</Box>

					<Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
						<Typography sx={{ fontSize: "1.6em" }}>Phone: </Typography>
						<Typography sx={{ fontSize: "1.6em" }}>{peopleData?.phone}</Typography>
					</Box>
				</CardContent>
			</Card>
			</Fade>
			}
			{loading && <Box sx={{ height: 40 }}>
				<Fade
				in={loading}
				style={{
					transitionDelay: loading ? '200ms' : '0ms',
				}}
				unmountOnExit
				>
				<CircularProgress />
				</Fade>
			</Box>}
		</Box>
    </Box>
	{peoplesData.length !== 0 && <ViewTable data={peoplesData} />}
	</Box>
	</Fade>
  );
}