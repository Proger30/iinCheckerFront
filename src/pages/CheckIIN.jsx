import * as React from 'react';

import { Button, Alert, CardContent, Card, TextField, Typography, CircularProgress, Fade, Box} from '@mui/material';
import { Male, Female, CheckCircleOutline, Block } from '@mui/icons-material';

import axios from 'axios';


export default function CheckIIN() {

	const [iin, setIin] = React.useState("")
	const [iinData, setIinData] = React.useState(null)

	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState("")

	const onCheckIIN = () => {
		setIinData(null)
		setLoading(true)
		setError("")
		axios.get("http://217.114.7.145:8080/iin_check/" + iin)
		.then(resp => {
			setIinData(resp.data.data)
		})
		.catch(err => {
			setError(err)
		})
		.finally(() => {
			setLoading(false)
		})
	}

  return (
	<Fade in={true} style={{transitionDelay: '200ms'}} unmountOnExit>
    <Box
      sx={{
        p: 10,
        display: 'flex',
        flexDirection: 'row',
		justifyContent: "space-around",
        alignItems: 'start',
        textAlign: 'center',
		gap: 1,
		width: "100%"
      }}
    >
		<Box
			component="form"
			onSubmit={(e) => {e.preventDefault(); onCheckIIN()}}
			sx={{ display: "flex", flexDirection: "column", gap: 1, marginRight: "auto"}}
			noValidate
			autoComplete="off"
			width="40%"
			>
			
			<TextField id="outlined-basic" label="IIN to check" variant="outlined" value={iin} onChange={(e) => setIin(e.target.value)} />
			<Button variant='contained' onClick={onCheckIIN} disabled={loading} >Check IIN</Button>
		</Box>
		<Box sx={{width: "40%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
			{ !loading && iinData && <Fade
			in={iinData}
			style={{
				transitionDelay: iinData ? '200ms' : '0ms',
			}}
			unmountOnExit
			>
				<Alert severity={error ? "error": "success"} variant='outlined' sx={{width: "100%"}}>{ error ? error : "IIN checked successfully!" }</Alert>
			</Fade>}
			{!error && !loading && iinData && 
			<Fade
			in={iinData}
			style={{
				transitionDelay: iinData ? '300ms' : '0ms',
			}}
			unmountOnExit
			>
			<Card sx={{ width: "100%", py: "15px", px: "10px" }}>
				<CardContent sx={{ fontSize: 14 }}>
					
					<Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mb: 2}}>

						<Typography sx={{ fontSize: "1.6em" }}>Is Correct IIN: </Typography>
						{iinData?.correct ? 
							<CheckCircleOutline sx={{fontSize: "30px"}} color="success" /> :
							<Block sx={{fontSize: "30px"}} color="error" />
						}
					</Box>
					{iinData?.correct && 
					<>
					<Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mb: 2}}>
						<Typography sx={{ fontSize: "1.6em" }}>Sex: </Typography>
						{iinData?.sex == "male" ? 
							<Male sx={{fontSize: "30px"}} color='primary'/> :
							<Female sx={{fontSize: "30px"}} color='secondary'/>
						}
					</Box>

					<Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
						<Typography sx={{ fontSize: "1.6em" }}>Date Of Birth: </Typography>
						<Typography sx={{ fontSize: "1.6em" }}>{iinData?.date_of_birth}</Typography>
					</Box>
					</>
					}
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
	</Fade>
  );
}